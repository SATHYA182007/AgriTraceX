-- Enable PostGIS
create extension if not exists postgis schema extensions;

-- Core
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text check (role in ('farmer','field_officer','government','insurance','super_admin')),
  district text,
  phone text,
  avatar_url text
);

create table public.parcels (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid references public.profiles(id) on delete cascade,
  name text,
  area_ha numeric,
  crop_type text,
  location geography(Point, 4326),
  boundary geography(Polygon, 4326),
  created_at timestamptz default now()
);

create table public.readings (
  id uuid primary key default gen_random_uuid(),
  parcel_id uuid references public.parcels(id) on delete cascade,
  sensor_type text,
  value numeric,
  unit text,
  recorded_at timestamptz default now()
);

create table public.alerts (
  id uuid primary key default gen_random_uuid(),
  type text check (type in ('FLOOD','DROUGHT','PEST','FIRE','FROST')),
  severity text check (severity in ('LOW','MEDIUM','HIGH','CRITICAL')),
  parcel_id uuid references public.parcels(id) on delete cascade,
  district text,
  description text,
  acknowledged boolean default false,
  created_at timestamptz default now()
);

create table public.extension_requests (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid references public.profiles(id) on delete cascade,
  parcel_id uuid references public.parcels(id) on delete cascade,
  alert_id uuid references public.alerts(id) on delete set null,
  requested_date date,
  photo_url text,
  status text check (status in ('PENDING','SCHEDULED','COMPLETED')) default 'PENDING',
  created_at timestamptz default now()
);

create table public.verifications (
  id uuid primary key default gen_random_uuid(),
  alert_id uuid references public.alerts(id) on delete cascade,
  fo_user_id uuid references public.profiles(id) on delete cascade,
  decision text check (decision in ('ACCEPT','REJECT')),
  corrected_crop_type text,
  corrected_risk_score numeric,
  notes text,
  photo_url text,
  verified_at timestamptz default now()
);

create table public.field_notes (
  id uuid primary key default gen_random_uuid(),
  parcel_id uuid references public.parcels(id) on delete cascade,
  fo_user_id uuid references public.profiles(id) on delete cascade,
  note text,
  photo_url text,
  created_at timestamptz default now()
);

create table public.reports (
  id uuid primary key default gen_random_uuid(),
  parcel_id uuid references public.parcels(id) on delete cascade,
  generated_at timestamptz default now(),
  storage_path text,
  status text check (status in ('pending','verified','rejected')) default 'pending',
  ai_crop_type text,
  ai_risk_score numeric
);

create table public.government_actions (
  id uuid primary key default gen_random_uuid(),
  action text check (action in ('WATER_RELEASE','SUBSIDY_DISBURSE','PEST_SPRAY','RELIEF_FUND')),
  district text,
  target_parcel_ids uuid[],
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now()
);

create table public.claims (
  id uuid primary key default gen_random_uuid(),
  farmer_id uuid references public.profiles(id) on delete cascade,
  parcel_id uuid references public.parcels(id) on delete cascade,
  alert_id uuid references public.alerts(id) on delete set null,
  status text check (status in ('PENDING','UNDER_REVIEW','APPROVED','REJECTED')) default 'PENDING',
  claimed_amount numeric,
  payout_amount numeric,
  report_url text,
  created_at timestamptz default now()
);

create table public.model_versions (
  id uuid primary key default gen_random_uuid(),
  version_name text,
  accuracy numeric,
  deployed_at timestamptz default now(),
  is_current boolean default false
);

create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  role text check (role in ('user','assistant')),
  content text,
  created_at timestamptz default now()
);

-- RLS Policies

alter table public.profiles enable row level security;
alter table public.parcels enable row level security;
alter table public.readings enable row level security;
alter table public.alerts enable row level security;
alter table public.extension_requests enable row level security;
alter table public.verifications enable row level security;
alter table public.field_notes enable row level security;
alter table public.reports enable row level security;
alter table public.government_actions enable row level security;
alter table public.claims enable row level security;
alter table public.model_versions enable row level security;
alter table public.chat_messages enable row level security;

-- Profile Policies
create policy "Users can view their own profile" on public.profiles for select using (auth.uid() = id);
create policy "Super admin can view all profiles" on public.profiles for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "Field officers can view profiles in their district" on public.profiles for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'field_officer' and district = public.profiles.district));
create policy "Government can view profiles in their district" on public.profiles for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'government' and district = public.profiles.district));

-- Allow inserting profile upon signup via trigger
create function public.handle_new_user() returns trigger as $$
begin
  insert into public.profiles (id, full_name, role, district, phone)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'role', new.raw_user_meta_data->>'district', new.raw_user_meta_data->>'phone');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Parcels
create policy "Farmers see their own parcels" on public.parcels for select using (farmer_id = auth.uid());
create policy "FOs see their district parcels" on public.parcels for select using (
  exists (
    select 1 from public.profiles fo
    join public.profiles farmer on farmer.id = public.parcels.farmer_id
    where fo.id = auth.uid() and fo.role = 'field_officer' and fo.district = farmer.district
  )
);
create policy "Super admin see all parcels" on public.parcels for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "Govt see district parcels" on public.parcels for select using (
  exists (
    select 1 from public.profiles govt
    join public.profiles farmer on farmer.id = public.parcels.farmer_id
    where govt.id = auth.uid() and govt.role = 'government' and govt.district = farmer.district
  )
);
create policy "Insurance see all parcels" on public.parcels for select using (exists (select 1 from public.profiles where id = auth.uid() and role = 'insurance'));

-- Allow public access for now to simplify demo, or keep it strict
-- Since this is a demo, let's just create a wildcard select for super_admin on all
create policy "Admin all" on public.profiles for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "Admin all parcels" on public.parcels for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "Admin all readings" on public.readings for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "Admin all alerts" on public.alerts for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "Admin all extension_requests" on public.extension_requests for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "Admin all verifications" on public.verifications for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "Admin all field_notes" on public.field_notes for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "Admin all reports" on public.reports for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "Admin all govt actions" on public.government_actions for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "Admin all claims" on public.claims for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "Admin all model_versions" on public.model_versions for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));
create policy "Admin all chat_messages" on public.chat_messages for all using (exists (select 1 from public.profiles where id = auth.uid() and role = 'super_admin'));

-- To make it easy to develop, I'll add loose read/write access for authenticated users for the demo.
-- Real production would need granular policies.
create policy "Authenticated read all" on public.profiles for select using (auth.role() = 'authenticated');
create policy "Authenticated read all parcels" on public.parcels for select using (auth.role() = 'authenticated');
create policy "Authenticated read all readings" on public.readings for select using (auth.role() = 'authenticated');
create policy "Authenticated read all alerts" on public.alerts for select using (auth.role() = 'authenticated');
create policy "Authenticated read all extension_requests" on public.extension_requests for select using (auth.role() = 'authenticated');
create policy "Authenticated read all verifications" on public.verifications for select using (auth.role() = 'authenticated');
create policy "Authenticated read all field_notes" on public.field_notes for select using (auth.role() = 'authenticated');
create policy "Authenticated read all reports" on public.reports for select using (auth.role() = 'authenticated');
create policy "Authenticated read all govt actions" on public.government_actions for select using (auth.role() = 'authenticated');
create policy "Authenticated read all claims" on public.claims for select using (auth.role() = 'authenticated');
create policy "Authenticated read all model_versions" on public.model_versions for select using (auth.role() = 'authenticated');
create policy "Authenticated read all chat_messages" on public.chat_messages for select using (auth.role() = 'authenticated');

create policy "Users can insert their own chat messages" on public.chat_messages for insert with check (auth.uid() = user_id);
create policy "Farmers can insert extension requests" on public.extension_requests for insert with check (auth.uid() = farmer_id);
create policy "Farmers can insert claims" on public.claims for insert with check (auth.uid() = farmer_id);
create policy "FOs can insert verifications" on public.verifications for insert with check (auth.uid() = fo_user_id);
create policy "FOs can insert field notes" on public.field_notes for insert with check (auth.uid() = fo_user_id);
create policy "Govt can insert actions" on public.government_actions for insert with check (auth.uid() = created_by);
create policy "Insurance can update claims" on public.claims for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'insurance'));

-- Allow update on alerts for FO
create policy "FO can update alerts" on public.alerts for update using (exists (select 1 from public.profiles where id = auth.uid() and role = 'field_officer'));

