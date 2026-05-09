OVERWRITE the current dashboard UI and simplify the AgriTrace X frontend to focus ONLY on the essential real-time agricultural IoT monitoring data coming from the ESP32 field device.

IMPORTANT:
- REMOVE unnecessary fake analytics, unnecessary enterprise cards, and unrelated AquaSmart placeholder content.
- KEEP the AquaSmart-inspired PREMIUM UI STYLE ONLY.
- KEEP the AgriTrace X branding and architecture.
- KEEP Supabase backend and realtime subscriptions.
- KEEP the green + white premium SaaS aesthetic.
- ONLY show the REAL sensor telemetry data listed below as the PRIMARY dashboard content.

==================================================
CORE DASHBOARD PURPOSE
==================================================

This website is now a REAL-TIME SMART AGRICULTURE MONITORING PLATFORM.

The dashboard should mainly display LIVE FIELD DATA from:
- ESP32 sensors
- Soil sensors
- NPK sensors
- GPS module

The interface should feel like:
“Premium real-time agricultural telemetry terminal.”

==================================================
ONLY SHOW THESE ESSENTIAL DETAILS
==================================================

The dashboard should ONLY focus on these sensor values:

1. Temperature
2. Humidity
3. Soil Value
4. Soil Status
5. LED Status
6. Nitrogen (N)
7. Phosphorus (P)
8. Potassium (K)
9. GPS Status

DO NOT clutter the dashboard with unnecessary cards.

==================================================
REAL SENSOR DATA FORMAT
==================================================

Use this exact data structure:

Temperature : 30.90 °C
Humidity    : 63.50 %
Soil Value  : 4095
Soil Status : DRY
LED Status  : RED LED ON

Nitrogen (N)   : 34 mg/kg
Phosphorus (P) : 34 mg/kg
Potassium (K)  : 34 mg/kg

GPS STATUS:
Connecting to satellite...

==================================================
UI STYLE
==================================================

The UI MUST visually resemble AquaSmart AI:
- white background
- light green theme
- soft shadows
- rounded cards
- modern enterprise dashboard
- premium spacing
- beautiful typography
- realtime telemetry feeling

==================================================
FONTS
==================================================

Use:
- Headings → Manrope
- Body → Inter
- Sensor values → JetBrains Mono

==================================================
COLOR PALETTE
==================================================

:root {
  --background: #F7FAF7;
  --surface: #FFFFFF;
  --primary: #16A34A;
  --primary-light: #DCFCE7;
  --border: #E5E7EB;
  --text: #0F172A;
  --text-soft: #64748B;
  --danger: #DC2626;
  --warning: #F59E0B;
  --success: #16A34A;
}

==================================================
LOGIN PAGE
==================================================

Create a BEAUTIFUL login page inspired by AquaSmart AI.

LEFT SIDE:
- Fullscreen farming image
- Green overlay gradient
- Large heading:

“Smart Agriculture.
Realtime Monitoring.
Healthier Crops.”

- Small feature pills:
  - IoT Monitoring
  - NPK Analysis
  - GPS Tracking
  - Smart Irrigation
  - Realtime Alerts

RIGHT SIDE:
- White rounded login card
- Sign In form
- Sign Up form
- Role selector:
  - Farmer
  - Field Officer
  - Government
  - Insurance
  - Super Admin

==================================================
DASHBOARD LAYOUT
==================================================

Dashboard structure MUST include:

1. Fixed Left Sidebar
2. Sticky Topbar
3. Search bar
4. Notification icon
5. User profile section
6. Floating AI chatbot button

==================================================
SIDEBAR MENU
==================================================

Sidebar items:

- Dashboard
- Sensor Monitoring
- NPK Analysis
- GPS Status
- Alerts
- Reports
- Settings

Style:
- White sidebar
- Soft borders
- Active menu item → light green background

==================================================
MAIN DASHBOARD CONTENT
==================================================

TOP SECTION:
Large AI Insight Banner.

Example:

“⚠ Soil is dry and temperature is high.
Irrigation recommended within 24 hours.”

Green gradient banner with rounded corners.

==================================================
LIVE SENSOR CARDS
==================================================

Create BEAUTIFUL KPI cards for:

1. Temperature
- Show:
  30.9°C
- Red/orange accent if high
- Thermometer icon

2. Humidity
- Show:
  63.5%
- Blue/green accent
- Water icon

3. Soil Value
- Show:
  4095
- Progress bar
- Sensor chip icon

4. Soil Status
- Show:
  DRY
- Amber/red warning badge
- Pulsing animation

5. LED Status
- Show:
  RED LED ON
- Glowing red LED indicator

==================================================
NPK ANALYSIS SECTION
==================================================

Create a dedicated section titled:

“NPK Soil Intelligence”

Show 3 cards:

- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)

Each card includes:
- Value in mg/kg
- Circular progress ring
- Status label:
  Low / Medium / Optimal

Example:
Nitrogen
34 mg/kg
Status: Medium

==================================================
GPS STATUS SECTION
==================================================

Create a premium GPS telemetry widget.

Display:
- GPS Status
- Satellite connection state
- Signal strength
- Last sync timestamp

Example:
“Connecting to satellite...”

Include:
- Animated radar pulse
- Satellite icon
- Live signal animation

==================================================
REALTIME TELEMETRY CONSOLE
==================================================

Add a live telemetry console panel.

Style:
- Terminal-like
- JetBrains Mono font
- Green realtime logs

Example logs:

[14:21:03] Soil moisture critical
[14:21:05] RED LED activated
[14:21:08] GPS syncing...
[14:21:10] NPK values updated

==================================================
MAP SECTION
==================================================

Add a small Leaflet map.

Show:
- Parcel location
- Sensor marker
- GPS location
- Green theme map styling

Popup should display:
- Temperature
- Humidity
- Soil Status
- NPK values
- GPS status

==================================================
SUPABASE REALTIME
==================================================

Use realtime subscriptions to update dashboard instantly.

Sensor values should auto-refresh live.

==================================================
ANIMATIONS
==================================================

Use Framer Motion:
- smooth card fade-ins
- hover lift effects
- animated counters
- glowing LED effect
- radar pulse animations

==================================================
REMOVE
==================================================

REMOVE:
- fake AquaSmart water management data
- unnecessary irrigation graphs
- unrelated business analytics
- excessive placeholder charts
- complicated enterprise clutter

KEEP ONLY:
- real sensor monitoring
- realtime agricultural telemetry
- NPK intelligence
- GPS monitoring
- alerts
- clean premium UI

==================================================
FINAL RESULT
==================================================

The final UI should feel like:

“A modern realtime agricultural IoT intelligence dashboard.”

It should look:
- premium
- futuristic
- minimal
- scientific
- clean
- enterprise-grade
- realtime
- beautiful

while showing ONLY the essential ESP32 field telemetry and agricultural monitoring data.