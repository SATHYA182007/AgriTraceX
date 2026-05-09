# 🌾 AGRITRACE X — INSURANCE MANAGER PORTAL UPGRADE PROMPT

Upgrade ONLY the Insurance Manager Portal inside AgriTrace X.

⚠ IMPORTANT:
- KEEP all backend logic, Supabase schema, GIS systems, realtime systems, Edge Functions, authentication flows, role systems, and verification workflows EXACTLY THE SAME.
- DO NOT remove any feature.
- DO NOT simplify workflows.
- ONLY redesign and expand the Insurance Manager role experience and UI.
- Maintain the SAME AquaSmart-inspired premium white + light green enterprise dashboard design already used across AgriTrace X.

==================================================
🎯 INSURANCE MANAGER PORTAL GOAL
==================================================

The Insurance Manager Portal should feel like:

“A realtime agricultural claims intelligence and risk management command center.”

The interface must:
- Look enterprise-grade
- Feel realtime
- Be analytics-focused
- Be GIS-driven
- Be claims-oriented
- Support agricultural insurance verification
- Support loss evidence workflows
- Look premium and government-ready

==================================================
🧭 SIDEBAR MENU
==================================================

Insurance Manager sidebar menu items:

- Dashboard
- Realtime Map
- Verification
- System Alerts
- Settings

Sidebar style:
- White background
- Rounded active menu items
- Soft shadows
- Green active indicator
- Smooth Framer Motion transitions

==================================================
📊 1. DASHBOARD PAGE
==================================================

Create a premium agricultural insurance intelligence dashboard.

==================================================
TOP KPI CARDS
==================================================

Display:

1. Total Policy Volume
Example:
₹ 48.5 Crores

2. Pending Claims
Example:
126 Claims

3. Reserve Funds
Example:
₹ 12.8 Crores

4. Active Risk Zones
Example:
18 Zones

Use:
- Animated counters
- JetBrains Mono metrics
- White premium cards
- Green analytics indicators

==================================================
📋 CLAIM SETTLEMENT LOOP
==================================================

THIS IS THE CORE INSURANCE FEATURE.

Create a premium claims management section.

Style:
- Enterprise claims workflow UI
- AquaSmart-inspired table cards
- Rounded rows
- Realtime updates
- Status pills

Claims Table Should Include:
--------------------------------------------------

| Claim ID   | Farmer & Parcel      | Alert Context        | Loss Evidence       | Actions |
|------------|----------------------|----------------------|---------------------|---------|
| CLM-2045   | Ramesh / Green Valley| Flood Risk Detected  | Drone + NDVI Data   | Review  |
| CLM-2046   | Suresh / Sunrise Acres| Soil Damage         | Sensor Evidence     | Review  |
| CLM-2047   | Mahesh / Golden Harvest| Heat Stress        | GIS Analytics       | Review  |
| CLM-2048   | Kiran / RiverSide Farms| Crop Failure       | Drone Imagery       | Review  |
| CLM-2049   | Arjun / EcoField Lands| Drought Alert       | Satellite Evidence  | Review  |

==================================================
📄 CLAIM DETAILS PANEL
==================================================

When clicking “Review” show:

- Farmer information
- Parcel / land information
- GIS map preview
- Drone imagery
- NDVI heatmap
- Sensor values
- Verification notes
- Field officer report
- Estimated damage %
- Suggested payout
- Timestamp
- GPS coordinates

Action Buttons:
- Approve Claim
- Reject Claim
- Request Reverification
- Generate Settlement

==================================================
🗺 2. REALTIME MAP PAGE
==================================================

Create a premium realtime GIS monitoring map.

Use:
- Google Maps API
OR
- Leaflet with satellite layer

Features:
- Live farmer location markers
- Realtime claims markers
- Risk zone overlays
- GIS district boundaries
- Animated pulses on active alerts

Marker Info Card:
--------------------------------
Farmer Name
Land Name
District
Claim Status
Risk Level
Soil Status
Temperature
Humidity
Verification Status
--------------------------------

Example Locations:
- Pune
- Nashik
- Nagpur
- Kolhapur
- Satara

Marker Colors:
- Green → Safe
- Amber → Moderate Risk
- Red → High Claim Risk

Additional Features:
- Satellite toggle
- NDVI overlay
- Claims heatmap
- Risk overlay
- District boundaries

==================================================
✅ 3. VERIFICATION PAGE
==================================================

Create an insurance verification management interface.

Style:
- AquaSmart-style verification cards
- Premium table UI
- Rounded cards
- Soft shadows
- Realtime updates

Verification Queue:

| Land Name         | Farmer Name | District     | Status     |
|------------------|-------------|--------------|------------|
| Green Valley     | Ramesh      | Pune         | Pending    |
| Sunrise Acres    | Suresh      | Nashik       | Pending    |
| Golden Harvest   | Mahesh      | Satara       | Pending    |
| RiverSide Farms  | Kiran       | Kolhapur     | Pending    |
| EcoField Lands   | Arjun       | Nagpur       | Pending    |
| GreenRoots Farm  | Vijay       | Pune         | Pending    |
| AgroNova Fields  | Rajesh      | Aurangabad   | Pending    |
| Harvest Bloom    | Prakash     | Solapur      | Pending    |
| NatureNest Farm  | Anand       | Ahmednagar   | Pending    |

Each row should have:
- View Details
- Approve
- Reject
- Request Inspection

==================================================
📋 VERIFICATION DETAILS MODAL
==================================================

Show:
- GIS map preview
- Drone image
- NDVI heatmap
- Sensor metrics
- GPS coordinates
- Uploaded evidence
- Field officer notes
- Analyst certification status
- Timestamp

==================================================
🚨 4. SYSTEM ALERTS PAGE
==================================================

Create a realtime agricultural insurance alert monitoring system.

Alert Cards Should Include:
--------------------------------

- Land Name
- District
- Alert Type
- Severity
- Timestamp
- Claim Risk Status

Example Alerts:
--------------------------------
Green Valley
⚠ Flood Risk Detected
Severity: Critical
--------------------------------

Sunrise Acres
⚠ Soil Moisture Low
Severity: Medium
--------------------------------

Golden Harvest
⚠ Heat Stress Warning
Severity: High
--------------------------------

RiverSide Farms
⚠ Crop Failure Risk
Severity: Critical
--------------------------------

Features:
- Animated alert borders
- Realtime pulsing indicators
- Severity color coding
- Toast notifications
- Realtime updates

Severity Colors:
- Red → Critical
- Amber → Warning
- Green → Stable

==================================================
⚙ 5. SETTINGS PAGE
==================================================

Create a clean insurance manager settings page.

Include:
- Profile Settings
- Claims Notification Settings
- GIS Layer Controls
- Realtime Alert Preferences
- Language Settings
- Security Settings
- Policy Preferences
- Settlement Controls

Style:
- White premium cards
- Rounded sections
- Enterprise SaaS settings UI

==================================================
🎨 DESIGN RULES
==================================================

Maintain:
- White + light green AquaSmart-inspired theme
- Premium enterprise spacing
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
- Card fade-ins
- Animated counters
- Alert pulses
- Claims transitions
- Graph loading
- Sidebar animations
- Toast notifications
- Realtime marker pulses

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

The Insurance Manager Portal should feel like:

“A realtime agricultural insurance intelligence and claims verification command center.”

The UI must:
- Look enterprise-grade
- Feel realtime
- Support insurance verification workflows
- Support claims settlement workflows
- Be GIS-focused
- Be analytics-rich
- Match the premium AgriTrace X enterprise design system perfectly