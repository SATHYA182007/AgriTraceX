# AgriSense — Field Terminal

> Production-grade, multi-role agricultural intelligence platform for rural India.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server  
npm run dev -- --port 3001
# App runs at http://localhost:3001
```

Navigate to `/login` and use the **demo bypass** — select a role, enter any email, click **Access Terminal**.

---

## 🔐 Demo Login (No Supabase Required)

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| Farmer | farmer1@agrisense.com | password123 | /dashboard/farmer |
| Field Officer | fo1@agrisense.com | password123 | /dashboard/field-officer |
| Government | govt@agrisense.com | password123 | /dashboard/government |
| Insurance | insurance@agrisense.com | password123 | /dashboard/insurance |
| Super Admin | admin@agrisense.com | password123 | /dashboard/admin |

> **Demo mode**: If no Supabase/Anthropic keys are set, all data is mock data and auth routes directly from role selector.

---

## ⚙️ Environment Variables

Create `.env.local` (already present as a template):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ANTHROPIC_API_KEY=sk-ant-...
```

---

## 🗄️ Database Setup (Supabase)

1. Create a Supabase project at https://supabase.com
2. Copy your project URL and anon key to `.env.local`
3. Run the migration in the Supabase SQL editor:
   ```
   supabase/migrations/20240101000000_core.sql
   ```
4. Run the seed data:
   ```
   supabase/seed.sql
   ```
5. Enable PostGIS extension in Supabase → Database → Extensions

---

## 🌐 Application Routes

### Authentication
| Route | Description |
|-------|-------------|
| `/login` | Unified login with role selector |
| `/` | Redirects to `/login` |

### Farmer Dashboard
| Route | Description |
|-------|-------------|
| `/dashboard/farmer` | Home with KPIs, map, alerts |
| `/dashboard/farmer/parcels` | All parcels with sensor data |
| `/dashboard/farmer/alerts` | Filterable alert list |
| `/dashboard/farmer/reports` | AI crop intelligence reports |
| `/dashboard/farmer/claims` | Claim submission & tracking |

### Field Officer Dashboard
| Route | Description |
|-------|-------------|
| `/dashboard/field-officer` | Home with district map |
| `/dashboard/field-officer/alerts` | Pending alerts to verify |
| `/dashboard/field-officer/parcels/[id]/verify` | Verification form with map |
| `/dashboard/field-officer/requests` | Extension visit requests |
| `/dashboard/field-officer/notes` | Field notes journal |

### Government Dashboard
| Route | Description |
|-------|-------------|
| `/dashboard/government` | District heatmap + risk table |
| `/dashboard/government/alerts` | All alerts with FO status |
| `/dashboard/government/actions` | Government intervention log |
| `/dashboard/government/relief` | Relief fund & payout chart |
| `/dashboard/government/analytics` | Multi-chart analytics |

### Insurance Dashboard
| Route | Description |
|-------|-------------|
| `/dashboard/insurance` | Kanban pipeline |
| `/dashboard/insurance/claims` | Claims review with FO evidence |
| `/dashboard/insurance/analytics` | Payout trends & top claims |

### Admin Dashboard
| Route | Description |
|-------|-------------|
| `/dashboard/admin` | System KPIs + activity firehose |
| `/dashboard/admin/users` | Full user CRUD + invite |
| `/dashboard/admin/parcels` | All parcels (table/map toggle) |
| `/dashboard/admin/models` | AI model versions + retrain |
| `/dashboard/admin/health` | System health + service status |

### API Routes
| Route | Description |
|-------|-------------|
| `/api/chat` | AgriBot — role-aware Anthropic AI |

---

## 🤖 AgriBot AI Assistant

Every dashboard has a floating **AgriBot** FAB (bottom-right).

- Click the wheat stalk icon to open the chat panel
- Role-aware: system prompt changes per role (Farmer/FO/Govt/Insurance/Admin)
- Requires `ANTHROPIC_API_KEY` for real responses
- Falls back to demo mode message if key is not set
- Uses `claude-sonnet-4-5` model

---

## ⚡ Edge Functions (Supabase Deno)

Located in `supabase/functions/`:

| Function | Trigger | Description |
|----------|---------|-------------|
| `process_satellite` | Storage upload to `satellite-images/` | Calculates NDVI, inserts alert if threshold breached |
| `generate_report` | INSERT on `reports` table | Generates PDF crop intelligence report |
| `retrain_model` | Manual (Admin) | Computes new accuracy from verifications, logs model version |
| `generate_claim_pdf` | UPDATE `claims.status` = `APPROVED` | Generates loss assessment PDF |
| `notify_farmers` | INSERT on `government_actions` | Sends push notifications to district farmers |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Components | shadcn/ui (base-ui variant) |
| Database | Supabase Postgres + PostGIS |
| Auth | Supabase Auth |
| Maps | Leaflet.js + react-leaflet |
| Charts | Recharts |
| Animation | Framer Motion |
| AI | Anthropic Claude (claude-sonnet-4-5) |
| Realtime | Supabase Realtime channels |
| Edge Functions | Supabase Deno Edge Functions |
| Toast | Sonner |
| Fonts | Sora + JetBrains Mono + Nunito |

---

## 🎨 Design System

- **Theme**: "Field Terminal" — earthy, data-dense, utilitarian-premium
- **Primary surface**: Deep forest green (`#0D3B2E`)
- **Accent**: Warm amber (`#E8A838`)
- **Cards**: Off-white (`#F5F0E8`) with subtle grain texture overlay
- **Role accent strips** on sidebar: Farmer=amber, FO=sky blue, Govt=indigo, Insurance=coral, Admin=violet
- **Staggered fade-in** animations on dashboard load
- **Monospaced font** (JetBrains Mono) for all data/numbers
