-- Seed data for AgriSense

-- First, we need to insert users into auth.users.
-- However, inserting directly into auth.users requires hashing passwords etc.
-- To simplify the demo, let's create a helper function or just rely on manual sign up if needed.
-- But since we need seed data, let's bypass auth.users and insert directly into profiles for the demo (will temporarily disable the FK constraint or just use dummy UUIDs if Supabase allows, wait, profiles has a FK to auth.users).
-- Actually, in Supabase local, we can insert into auth.users.

insert into auth.users (id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
values
('11111111-1111-1111-1111-111111111111', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'farmer1@agrisense.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Ramesh Kumar","role":"farmer","district":"Aheri","phone":"+919876543210"}', now(), now(), '', '', '', ''),
('22222222-2222-2222-2222-222222222222', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'farmer2@agrisense.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Suresh Patil","role":"farmer","district":"Aheri","phone":"+919876543211"}', now(), now(), '', '', '', ''),
('33333333-3333-3333-3333-333333333333', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'farmer3@agrisense.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Vilas Rao","role":"farmer","district":"Aheri","phone":"+919876543212"}', now(), now(), '', '', '', ''),

('44444444-4444-4444-4444-444444444444', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'fo1@agrisense.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Amit Sharma","role":"field_officer","district":"Aheri","phone":"+918888888881"}', now(), now(), '', '', '', ''),
('55555555-5555-5555-5555-555555555555', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'fo2@agrisense.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Priya Singh","role":"field_officer","district":"Aheri","phone":"+918888888882"}', now(), now(), '', '', '', ''),

('66666666-6666-6666-6666-666666666666', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'govt@agrisense.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Collector Aheri","role":"government","district":"Aheri","phone":"+917777777771"}', now(), now(), '', '', '', ''),

('77777777-7777-7777-7777-777777777777', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'insurance@agrisense.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"LIC Agent","role":"insurance","district":"Maharashtra","phone":"+916666666661"}', now(), now(), '', '', '', ''),

('88888888-8888-8888-8888-888888888888', '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated', 'admin@agrisense.com', crypt('password123', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Super Admin","role":"super_admin","district":"All","phone":"+915555555551"}', now(), now(), '', '', '', '');

-- Note: The trigger on auth.users will automatically create rows in public.profiles.
-- But just in case, if the trigger is created after, we may need to insert them.
-- Assuming the trigger handles it, we will just proceed with the next tables.

-- Insert 5 parcels across 3 farmers
insert into public.parcels (id, farmer_id, name, area_ha, crop_type, location)
values
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'North Field', 2.5, 'Cotton', ST_GeogFromText('SRID=4326;POINT(79.98 19.4)')),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'River Patch', 1.2, 'Rice', ST_GeogFromText('SRID=4326;POINT(79.99 19.41)')),
('cccccccc-cccc-cccc-cccc-cccccccccccc', '22222222-2222-2222-2222-222222222222', 'East Farm', 4.0, 'Soybean', ST_GeogFromText('SRID=4326;POINT(80.01 19.38)')),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '22222222-2222-2222-2222-222222222222', 'Hillside', 1.5, 'Wheat', ST_GeogFromText('SRID=4326;POINT(80.05 19.39)')),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '33333333-3333-3333-3333-333333333333', 'Main Parcel', 3.0, 'Sugarcane', ST_GeogFromText('SRID=4326;POINT(80.02 19.45)'));

-- 1 active FLOOD alert
insert into public.alerts (id, type, severity, parcel_id, district, description, acknowledged)
values
('f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'FLOOD', 'HIGH', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Aheri', 'Severe waterlogging detected via satellite SAR.', false);

-- 1 extension request linked to alert
insert into public.extension_requests (id, farmer_id, parcel_id, alert_id, requested_date, status)
values
('r1r1r1r1-r1r1-r1r1-r1r1-r1r1r1r1r1r1', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', CURRENT_DATE, 'PENDING');

-- 1 verification (REJECT, by FO 1)
insert into public.verifications (id, alert_id, fo_user_id, decision, corrected_crop_type, corrected_risk_score, notes)
values
('v1v1v1v1-v1v1-v1v1-v1v1-v1v1v1v1v1v1', 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', '44444444-4444-4444-4444-444444444444', 'REJECT', 'Cotton', 40, 'Water receded, soil saturated but crop is fine.');

-- 1 pending claim
insert into public.claims (id, farmer_id, parcel_id, alert_id, status, claimed_amount)
values
('c1c1c1c1-c1c1-c1c1-c1c1-c1c1c1c1c1c1', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f1f1', 'PENDING', 100000);

-- 2 crop intelligence reports
insert into public.reports (id, parcel_id, status, ai_crop_type, ai_risk_score)
values
('p1p1p1p1-p1p1-p1p1-p1p1-p1p1p1p1p1p1', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'pending', 'Cotton', 85),
('p2p2p2p2-p2p2-p2p2-p2p2-p2p2p2p2p2p2', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'verified', 'Rice', 20);

-- Sensor readings
insert into public.readings (parcel_id, sensor_type, value, unit)
values
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'moisture', 65, '%'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'temperature', 30, 'C'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'pH', 6.8, 'pH'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'moisture', 80, '%'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'temperature', 28, 'C'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'pH', 6.5, 'pH');

-- Government action
insert into public.government_actions (id, action, district, notes, created_by)
values
('g1g1g1g1-g1g1-g1g1-g1g1-g1g1g1g1g1g1', 'WATER_RELEASE', 'Aheri', 'Emergency water release authorized due to heatwave.', '66666666-6666-6666-6666-666666666666');

