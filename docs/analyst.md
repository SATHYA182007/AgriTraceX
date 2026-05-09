# 🌾 AGRITRACE X — ANALYST PORTAL UPGRADE PROMPT

Upgrade ONLY the Analyst Portal inside AgriTrace X.

⚠ IMPORTANT:
- KEEP all existing backend logic, Supabase schema, GIS intelligence, Edge Functions, realtime systems, role systems, and workflows EXACTLY THE SAME.
- DO NOT remove any feature.
- DO NOT simplify workflows.
- ONLY redesign and expand the Analyst role experience and UI.
- Maintain the SAME premium AquaSmart-inspired white + light green enterprise dashboard style already used across AgriTrace X.

==================================================
🎯 ANALYST PORTAL GOAL
==================================================

The Analyst Portal should feel like:

“A professional agricultural intelligence verification and certification control center.”

The interface must:
- Look enterprise-grade
- Feel realtime
- Be analytics-focused
- Be GIS-driven
- Be verification-oriented
- Support land certification workflows
- Support subsidy and loan verification workflows
- Look premium and government-ready

==================================================
🧭 SIDEBAR MENU
==================================================

Analyst sidebar menu items:

- Dashboard
- Realtime Map
- Verification
- System Alerts
- Certification Center
- Settings

Sidebar style:
- White background
- Rounded active item
- Soft shadows
- Green active indicator
- Smooth Framer Motion transitions

==================================================
📊 1. DASHBOARD PAGE
==================================================

Create a premium realtime analytics dashboard.

--------------------------------------------------
TOP SENSOR KPI CARDS
--------------------------------------------------

Display:

1. Soil Value
Example:
4095

2. Temperature
Example:
30.9°C

3. Humidity
Example:
63.5%

4. Soil Status
Example:
DRY / WET
Color-coded status badge

5. GPS Coordinates
Example:
18.5204° N
73.8567° E

6. LED Status
Example:
RED LED ON

Use:
- JetBrains Mono for metrics
- Animated counters
- White premium cards
- Green accent indicators

--------------------------------------------------
📈 SOIL MOISTURE TREND GRAPH
--------------------------------------------------

Create a smooth animated area graph using Recharts.

Timeline:
- 6 AM
- 9 AM
- 12 PM
- 3 PM
- 6 PM
- 9 PM

Graph Features:
- Green gradient fill
- Smooth curves
- Hover tooltips
- Animated loading

--------------------------------------------------
🌡 ADDITIONAL ANALYTICS SECTION
--------------------------------------------------

Add:
- Temperature trend graph
- Humidity trend graph
- Soil health analytics
- Risk level distribution chart

==================================================
🗺 2. REALTIME MAP PAGE
==================================================

Create a premium realtime GIS map.

Use:
- Google Maps API
OR
- Leaflet with satellite layer

Features:
- Live farmer location markers
- Realtime status updates
- GIS overlays
- Smooth zoom transitions
- Pulsing alert markers

Marker Info Card:
--------------------------------
Farmer Name
Land Name
District
Soil Status
Temperature
Humidity
Risk Level
Verification Status
--------------------------------

Example Locations:
- Pune
- Nashik
- Nagpur
- Kolhapur
- Satara

Marker Colors:
- Green → Healthy
- Amber → Moderate Risk
- Red → Critical

Additional Features:
- Satellite view toggle
- NDVI overlay
- District boundaries
- Verification markers

==================================================
✅ 3. VERIFICATION PAGE
==================================================

Create an analyst verification management system.

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
- Forward to Certification

--------------------------------------------------
📋 VERIFICATION DETAILS MODAL
--------------------------------------------------

When clicking “View Details” show:

- GIS map preview
- Drone image preview
- NDVI heatmap preview
- Sensor values
- GPS coordinates
- Field officer notes
- Timestamp
- Soil metrics
- Uploaded evidence images

==================================================
🚨 4. SYSTEM ALERTS PAGE
==================================================

Create a realtime agricultural alert monitoring page.

Alert Cards Should Include:
--------------------------------

- Land Name
- District
- Alert Type
- Severity
- Timestamp
- Current Status

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
⚠ Crop Stress Detected
Severity: Medium
--------------------------------

Features:
- Animated alert borders
- Pulsing warning indicators
- Severity color coding
- Realtime updates
- Toast notifications

Severity Colors:
- Red → Critical
- Amber → Warning
- Green → Stable

==================================================
📜 5. CERTIFICATION CENTER
==================================================

THIS IS THE CORE ANALYST FEATURE.

Create a premium land certification and approval system.

==================================================
WORKFLOW
==================================================

1. Field Officer verifies the land
2. Data uploaded to AgriTrace X
3. Analyst reviews:
   - GIS data
   - Drone imagery
   - Sensor values
   - NDVI analytics
   - Verification reports
4. Analyst provides:
   - Verification Seal
   - Certification Status
5. Certification forwarded for:
   - Subsidy processing
   - Loan processing
   - Government approval
   - Agricultural certification

==================================================
📄 CERTIFICATION PANEL
==================================================

Each certification card should include:

- Land Name
- Farmer Name
- District
- Certification ID
- Verification Status
- Risk Score
- Soil Health Status
- Analyst Name
- Date Issued

Example:
--------------------------------
Land:
Green Valley

Certification ID:
AGX-CERT-2045

Status:
Verified

Risk Score:
Low

Soil Health:
Good

Issued By:
Analyst Team

Issued Date:
09 May 2026
--------------------------------

==================================================
🟢 VERIFICATION SEAL SYSTEM
==================================================

When approved:
Generate a premium digital verification seal.

Seal contains:
- AgriTrace X seal
- Verified badge
- QR code placeholder
- Timestamp
- Analyst signature placeholder
- Certification number

Seal Style:
- Green verified stamp
- Premium government-style appearance
- Modern digital certificate design

==================================================
📄 CERTIFICATE OUTPUT
==================================================

Generate downloadable:
- PDF certification
- Subsidy invoice
- Loan approval verification document

Buttons:
- Download Certificate
- Forward to Government
- Forward to Bank
- Generate Subsidy Invoice

==================================================
⚙ 6. SETTINGS PAGE
==================================================

Create a clean analyst settings page.

Include:
- Profile Settings
- Notification Preferences
- GIS Layer Settings
- Realtime Alert Controls
- Language Settings
- Security Settings
- Analyst Signature Upload
- Certification Preferences

Style:
- White cards
- Rounded sections
- Premium enterprise settings UI

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
- Card fade-ins
- Counter animations
- Alert pulses
- Verification transitions
- Graph loading
- Sidebar animations
- Certification generation animations
- Toast notifications

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

PDF:
- PDF generation support for certificates

==================================================
🏆 FINAL RESULT
==================================================

The Analyst Portal should feel like:

“A professional agricultural intelligence certification and verification center.”

The system must:
- Look premium
- Feel realtime
- Support certification workflows
- Support subsidy verification
- Support agricultural loan verification
- Be GIS-focused
- Be analytics-rich
- Match the enterprise AgriTrace X design system perfectly