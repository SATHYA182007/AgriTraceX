# 🌾 AGRITRACE X — PLATFORM ADMIN PORTAL UPGRADE PROMPT

Upgrade ONLY the Platform Admin Portal inside AgriTrace X.

⚠ IMPORTANT:
- KEEP all existing backend logic, Supabase schema, realtime systems, GIS workflows, Edge Functions, role systems, authentication systems, APIs, maps, and business logic EXACTLY THE SAME.
- DO NOT remove any feature.
- DO NOT simplify workflows.
- ONLY redesign and expand the Platform Admin role experience and UI.
- Maintain the SAME premium AquaSmart-inspired white + light green enterprise dashboard style already used across AgriTrace X.

==================================================
🎯 PLATFORM ADMIN PORTAL GOAL
==================================================

The Platform Admin Portal should feel like:

“A realtime agricultural intelligence platform operations and monitoring command center.”

The interface must:
- Look enterprise-grade
- Feel realtime
- Be analytics-focused
- Be platform-monitoring oriented
- Be GIS-driven
- Manage all users and system operations
- Monitor realtime platform health
- Look futuristic and government-grade

==================================================
🧭 SIDEBAR MENU
==================================================

Platform Admin sidebar menu items:

- Dashboard
- Realtime Map
- User Management
- System Monitoring
- Alerts Center
- Analytics
- Settings

Sidebar style:
- White background
- Soft borders
- Rounded active state
- Green active indicator
- Framer Motion transitions

==================================================
📊 1. DASHBOARD PAGE
==================================================

Create a premium platform operations dashboard.

==================================================
TOP KPI CARDS
==================================================

Display:

1. Total Platform Users
Example:
12,458 Users

2. Active Realtime Sessions
Example:
1,284 Active

3. Total Monitored Lands
Example:
8,742 Lands

4. Platform Health Status
Example:
99.8% Operational

5. Total Claims Processed
Example:
4,852 Claims

6. Active GIS Zones
Example:
126 Zones

Use:
- Animated counters
- JetBrains Mono metrics
- White premium cards
- Green realtime indicators

==================================================
📈 ANALYTICS SECTION
==================================================

A. User Growth Graph
--------------------------------
Create a premium LINE GRAPH using Recharts.

Timeline:
- Jan
- Feb
- Mar
- Apr
- May
- Jun

Show:
- Platform user growth
- Active sessions growth
- Smooth animations
- Hover tooltips

--------------------------------------------------

B. System Load Analytics
--------------------------------
Create an AREA GRAPH.

Metrics:
- API usage
- Realtime traffic
- Sensor requests
- Edge Function activity

--------------------------------------------------

C. Platform Distribution
--------------------------------
Create analytics cards showing:

- Farmers
- Field Officers
- Analysts
- Insurance Managers
- Government Authorities

Each card should show:
- Total users
- Active today
- Verification count
- Realtime activity

==================================================
🗺 2. REALTIME MAP PAGE
==================================================

Create a premium realtime GIS operations map.

Use:
- Google Maps API
OR
- Leaflet with satellite layer

==================================================
MAP FEATURES
==================================================

Show ALL platform users on the map:
- Farmers
- Field Officers
- Analysts
- Insurance Managers
- Government Authorities

Features:
- Live location markers
- Animated realtime pulses
- User activity overlays
- GIS district boundaries
- Zoom transitions
- Realtime updates

==================================================
USER MARKER DETAILS
==================================================

When clicking a user marker show:

--------------------------------
User Name
Role
District
Current Activity
Verification Status
Active Alerts
GPS Coordinates
Last Active Timestamp
Assigned Lands
--------------------------------

Example:
--------------------------------
Name:
Ramesh Patil

Role:
Farmer

District:
Pune

Current Activity:
Monitoring Crop Health

Status:
Active

GPS:
18.5204° N, 73.8567° E
--------------------------------

==================================================
MARKER COLORS
==================================================

- Green → Farmers
- Blue → Field Officers
- Amber → Analysts
- Purple → Insurance Managers
- Red → Government Authorities

==================================================
ADDITIONAL MAP FEATURES
==================================================

- Satellite layer toggle
- NDVI overlay
- User clustering
- District heatmap
- Active alert markers
- Live activity indicators
- Search users by role

==================================================
👥 3. USER MANAGEMENT PAGE
==================================================

Create a premium enterprise user management interface.

Style:
- AquaSmart-inspired user tables
- White rounded cards
- Soft shadows
- Premium SaaS admin UI

==================================================
USER TABLE
==================================================

Columns:
--------------------------------

| User Name      | Role                | District     | Status   | Last Active | Actions |
|----------------|---------------------|--------------|----------|-------------|---------|
| Ramesh Patil   | Farmer              | Pune         | Active   | 2 min ago   | Manage  |
| Suresh Kumar   | Field Officer       | Nashik       | Active   | 5 min ago   | Manage  |
| Priya Sharma   | Analyst             | Nagpur       | Active   | 1 min ago   | Manage  |
| Kiran Joshi    | Insurance Manager   | Satara       | Active   | 8 min ago   | Manage  |
| Vijay Rao      | Government Officer  | Kolhapur     | Active   | 3 min ago   | Manage  |
| Anand Patel    | Farmer              | Aurangabad   | Inactive | 1 hr ago    | Manage  |
| Rajesh Mehta   | Analyst             | Pune         | Active   | 7 min ago   | Manage  |

==================================================
USER ACTIONS
==================================================

Each row should have:
- View Profile
- Suspend User
- Edit Permissions
- Assign District
- View Activity Logs
- Reset Access

==================================================
USER PROFILE MODAL
==================================================

When clicking “Manage” show:

- User details
- Role information
- Activity history
- Assigned districts
- Verification stats
- Claims handled
- Certification history
- GPS activity
- Current session status

==================================================
⚙ 4. SYSTEM MONITORING PAGE
==================================================

Create a realtime platform monitoring center.

==================================================
SYSTEM HEALTH PANELS
==================================================

Display:

- API Health
- Supabase Realtime Status
- Edge Function Health
- Database Usage
- Sensor Connectivity
- GIS Server Status
- MQTT Connection Status
- Active WebSocket Connections

Example:
--------------------------------
API Status:
Operational

Realtime Connections:
1,284 Active

Database Usage:
72%

Edge Functions:
Healthy
--------------------------------

==================================================
📡 REALTIME EVENT STREAM
==================================================

Create a live scrolling activity feed.

Events:
- User logins
- Verification approvals
- Claim submissions
- Sensor uploads
- Alert triggers
- Certificate generations

Use:
- Realtime animation
- Live update badges
- Timestamp indicators

==================================================
🚨 5. ALERTS CENTER
==================================================

Create a platform-wide realtime alerts system.

Alert Categories:
- Critical platform alerts
- GIS failures
- Sensor disconnects
- Realtime sync failures
- High-risk agricultural alerts
- Verification delays

Alert Card Example:
--------------------------------
⚠ GIS Server Latency High
Severity: Medium
Timestamp: 10:45 AM
--------------------------------

Features:
- Severity filters
- Realtime toast notifications
- Alert acknowledgment
- Resolve alert button

Severity Colors:
- Red → Critical
- Amber → Warning
- Green → Stable

==================================================
📈 6. ANALYTICS PAGE
==================================================

Create a platform intelligence analytics page.

Include:
- User activity analytics
- Claims processing trends
- Verification trends
- District performance
- Sensor data traffic
- GIS usage analytics
- Realtime connection analytics

Charts:
- Line charts
- Bar charts
- Area graphs
- Pie charts

Use:
- Recharts
- Smooth animations
- Green gradients

==================================================
⚙ 7. SETTINGS PAGE
==================================================

Create a premium admin settings interface.

Include:
- Platform Settings
- Security Controls
- GIS Layer Controls
- API Integrations
- Notification Settings
- Role Management
- Access Policies
- Database Controls
- Backup Settings
- Language Preferences

Style:
- White cards
- Rounded sections
- Enterprise-grade SaaS settings UI

==================================================
🎨 DESIGN RULES
==================================================

Maintain:
- White + light green AquaSmart-inspired theme
- Premium SaaS spacing
- White rounded cards
- Glassmorphism topbar
- Soft shadows
- Framer Motion animations

Typography:
- Headings → Manrope
- Body → Inter
- Metrics → JetBrains Mono

==================================================
⚡ REQUIRED ANIMATIONS
==================================================

Use Framer Motion for:
- Dashboard fade-ins
- Animated counters
- Realtime marker pulses
- Sidebar transitions
- Toast notifications
- Chart animations
- User management modals
- Realtime event feed updates

==================================================
🛠 TECH STACK
==================================================

Frontend:
- Next.js
- React
- Tailwind CSS
- Framer Motion

Charts:
- Recharts

Maps:
- Google Maps API
OR
- Leaflet

Realtime:
- Supabase realtime preserved

==================================================
🏆 FINAL RESULT
==================================================

The Platform Admin Portal should feel like:

“A realtime AI-powered agricultural platform operations command center.”

The UI must:
- Look enterprise-grade
- Feel realtime
- Support platform-wide monitoring
- Support realtime GIS tracking
- Support user management workflows
- Be analytics-rich
- Be visually stunning
- Match the premium AgriTrace X enterprise design system perfectly 