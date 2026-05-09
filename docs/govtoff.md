# 🌾 AGRITRACE X — GOVERNMENT AUTHORITY PORTAL UPGRADE PROMPT

Upgrade ONLY the Government Authority Portal inside AgriTrace X.

⚠ IMPORTANT:
- KEEP the existing farmer portal EXACTLY as it is.
- KEEP all backend logic, Supabase schema, realtime systems, GIS workflows, Edge Functions, maps, authentication, and role systems unchanged.
- ONLY redesign and expand the Government Authority dashboard features and UI.
- Maintain the SAME premium white + light green AquaSmart-style enterprise dashboard design already used in AgriTrace X.

==================================================
🎯 GOVERNMENT AUTHORITY PORTAL GOAL
==================================================

The Government Authority Portal should feel like:

“A realtime agricultural disaster monitoring and verification command center.”

The interface must look:
- Premium
- Government-grade
- Realtime
- GIS-driven
- Analytics-rich
- Clean
- Modern
- Spacious
- Enterprise-level

==================================================
🧭 SIDEBAR MENU
==================================================

Government sidebar menu items:

- Dashboard
- Realtime Map
- Verification
- System Alerts
- Advanced Analytics
- Settings

Sidebar style:
- White background
- Soft borders
- Rounded active state
- Light green active indicator
- Framer Motion transitions

==================================================
📊 1. DASHBOARD PAGE
==================================================

Create a premium analytics dashboard.

TOP KPI CARDS:
--------------------------------

1. Total Area Monitored
- Example:
  12,540 Acres
- Include small growth indicator
- Animated counter

2. Estimated Loss Risk
- Example:
  ₹ 4.2 Crores
- Show warning indicator

3. Active Verification Alerts
- Example:
  48 Pending
- Pulsing alert badge

4. Districts Under Monitoring
- Example:
  16 Districts

--------------------------------------------------
📈 ANALYTICS SECTION
--------------------------------------------------

A. Loss Risk by District
--------------------------------
Create a premium BAR GRAPH using Recharts.

Districts:
- Pune
- Nashik
- Nagpur
- Kolhapur
- Satara
- Aurangabad

Values should be shown in:
LAKHS (₹)

Example:
- Pune → ₹12L
- Nashik → ₹18L
- Nagpur → ₹9L

Use:
- Green bars
- Smooth animation
- Hover tooltips

--------------------------------------------------

B. District Wise Alerts Trend
--------------------------------
Create a premium LINE GRAPH.

Timeline:
- Mon
- Tue
- Wed
- Thu
- Fri
- Sat
- Sun

Show:
- Increasing/decreasing alerts
- Animated line graph
- Soft gradients

--------------------------------------------------

C. Regional Breakdown
--------------------------------

Create a district analytics section with cards:

Each card contains:
- District name
- Active alerts
- Flood risk %
- Crop health %
- Verification count

Example:
--------------------------------
Pune
- Alerts: 12
- Flood Risk: 68%
- Crop Health: 82%
- Verifications: 21
--------------------------------

==================================================
🗺 2. REALTIME MAP PAGE
==================================================

Create a PREMIUM realtime GIS monitoring map.

Use:
- Google Maps API
OR
- Leaflet with Google satellite tiles

Features:
- Live farmer location markers
- Animated pulses on active zones
- Hoverable info cards
- Realtime updates
- Smooth zoom transitions

Each marker should show:
--------------------------------
Farmer Name
Land Name
District
Soil Status
Temperature
Humidity
Risk Status
--------------------------------

Example Locations:
- Pune
- Nashik
- Nagpur
- Satara
- Kolhapur

Map Features:
- Satellite view toggle
- NDVI overlay toggle
- District boundaries
- Alert markers
- Verification markers

Marker Colors:
- Green → Healthy
- Amber → Moderate Risk
- Red → Critical

==================================================
✅ 3. VERIFICATION PAGE
==================================================

Create a verification management interface.

Design:
- AquaSmart-style table cards
- Soft shadows
- Rounded rows
- Status pills

Verification Queue should contain:

| Land Name         | Farmer Name | District     | Status     |
|------------------|-------------|--------------|------------|
| Green Valley     | Ramesh      | Pune         | Pending    |
| Sunrise Acres    | Suresh      | Nashik       | Pending    |
| Golden Harvest   | Mahesh      | Satara       | Pending    |
| RiverSide Farms  | Kiran       | Kolhapur     | Pending    |
| EcoField Lands   | Arjun       | Nagpur       | Pending    |
| GreenRoots Farm  | Vijay       | Pune         | Pending    |
| AgroNova Fields  | Rajesh      | Aurangabad   | Pending    |

Each row should have:
- View Details button
- Approve button
- Reject button

View Details modal should show:
- GIS map preview
- Drone image preview
- Sensor values
- Verification notes
- Timestamp
- GPS coordinates

==================================================
🚨 4. SYSTEM ALERTS PAGE
==================================================

Create a realtime alert monitoring system.

Alert Cards:
--------------------------------

Each alert card contains:
- Land Name
- District
- Warning Type
- Severity
- Timestamp
- Status Indicator

Example Alerts:
--------------------------------
Green Valley
⚠ High Flood Risk
Severity: Critical
--------------------------------

Sunrise Acres
⚠ Soil Moisture Low
Severity: Medium
--------------------------------

Golden Harvest
⚠ Heat Stress Detected
Severity: High
--------------------------------

Use:
- Animated alert borders
- Realtime pulsing indicators
- Toast notifications
- Severity colors:
  - Red
  - Amber
  - Green

==================================================
📈 5. ADVANCED ANALYTICS PAGE
==================================================

Create a premium sensor intelligence dashboard.

TOP SENSOR CARDS:
--------------------------------

1. Soil Value
- Example:
  4095

2. Temperature
- Example:
  30.9°C

3. Humidity
- Example:
  63.5%

4. Soil Status
- DRY / WET
- Color-coded badge

5. GPS Coordinates
- Example:
  18.5204° N
  73.8567° E

6. LED Status
- RED LED ON / GREEN LED ON

Use:
- JetBrains Mono for values
- Animated counters
- Sensor-style cards

--------------------------------------------------
📉 SOIL MOISTURE TREND GRAPH
--------------------------------------------------

Create a smooth animated AREA GRAPH.

Timeline:
- 6 AM
- 9 AM
- 12 PM
- 3 PM
- 6 PM
- 9 PM

Graph should:
- Animate smoothly
- Use green gradients
- Show moisture fluctuations

--------------------------------------------------
🌡 ENVIRONMENT ANALYTICS
--------------------------------------------------

Additional charts:
- Temperature trend
- Humidity trend
- Risk distribution pie chart

==================================================
⚙ 6. SETTINGS PAGE
==================================================

Create a clean general settings page.

Include:
- Profile Settings
- Notification Settings
- Realtime Alert Toggle
- Theme Preferences
- GIS Layer Controls
- API Integrations
- Language Selection
- Account Security

Style:
- Premium SaaS settings UI
- Rounded cards
- Toggle switches
- White clean layout

==================================================
🎨 DESIGN RULES
==================================================

Maintain:
- White + light green AquaSmart design
- Premium spacing
- Glassmorphism topbar
- White cards
- Soft shadows
- Rounded 24px cards
- Framer Motion animations

Typography:
- Headings → Manrope
- Body → Inter
- Metrics → JetBrains Mono

==================================================
⚡ REQUIRED ANIMATIONS
==================================================

Use Framer Motion for:
- Fade-in sections
- Animated counters
- Graph loading
- Hover lift effects
- Realtime map marker pulses
- Toast notifications
- Smooth sidebar transitions

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

The Government Authority Portal should feel like:

“A realtime agricultural disaster intelligence and verification command center.”

The UI must:
- Look enterprise-grade
- Feel realtime
- Be GIS-focused
- Be analytics-heavy
- Be visually stunning
- Match the premium AquaSmart-inspired AgriTrace X design system