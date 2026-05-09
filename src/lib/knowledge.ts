// ============================================================
// AgriTrace X — Agricultural Knowledge Base
// Simple static RAG knowledge chunks for retrieval
// ============================================================

export interface KnowledgeChunk {
  id: string;
  category: string;
  keywords: string[];
  content: string;
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  // ── PLATFORM OVERVIEW ──
  {
    id: "platform-001",
    category: "platform",
    keywords: ["agritrace", "platform", "what is", "about", "overview", "system"],
    content: `AgriTrace X is a realtime agricultural intelligence platform that combines GIS mapping, IoT sensor data, drone imagery, and AI analytics to help farmers, field officers, government authorities, insurance managers, and analysts monitor and manage agricultural land at scale. It provides end-to-end workflows for land verification, crop monitoring, claims processing, and subsidy management.`,
  },
  {
    id: "platform-002",
    category: "platform",
    keywords: ["roles", "users", "farmer", "analyst", "government", "insurance", "admin", "field officer"],
    content: `AgriTrace X supports 5 role-based portals:
1. **Farmer Portal** – Monitors sensor data, NPK levels, GPS tracking, crop alerts, and field reports.
2. **Field Officer (Analyst) Portal** – Performs on-site verification, land certification, soil assessments, and subsidy recommendations.
3. **Government Authority Portal** – Oversees district-level monitoring, verifies land data, approves subsidies, and manages disaster alerts.
4. **Insurance Manager Portal** – Handles crop insurance claims, damage assessments, risk scoring, and payout settlements.
5. **Platform Admin Portal** – Manages all users, monitors system health, GIS zones, and platform analytics.`,
  },

  // ── NDVI / GIS ──
  {
    id: "ndvi-001",
    category: "gis",
    keywords: ["ndvi", "vegetation", "index", "satellite", "green", "red", "infrared", "crop health"],
    content: `NDVI (Normalized Difference Vegetation Index) is a satellite-derived metric that measures crop health and vegetation density. NDVI ranges from -1 to +1:
- **0.6 to 1.0** → Dense, healthy vegetation (excellent crop health)
- **0.3 to 0.6** → Moderate vegetation (average crop health)
- **0.1 to 0.3** → Sparse vegetation (stressed or early-stage crops)
- **Below 0.1** → Bare soil, water, or severely stressed crops

In AgriTrace X, the Realtime Map overlays NDVI heatmaps to identify zones requiring intervention. Red zones on the NDVI map indicate poor crop health and require immediate field inspection.`,
  },
  {
    id: "ndvi-002",
    category: "gis",
    keywords: ["zone", "gis", "district", "boundary", "risk", "heatmap", "critical", "red", "amber", "green"],
    content: `AgriTrace X divides monitored land into GIS zones with risk classifications:
- **Green Zone** – Healthy, low-risk area. No immediate action needed.
- **Amber Zone** – Moderate risk. Field officer inspection recommended.
- **Red Zone** – Critical risk. Immediate intervention required. Could indicate flood, drought, pest attack, or severe soil degradation.

Zone risk is calculated using NDVI scores, soil moisture sensor data, weather patterns, and historical crop performance. When a zone turns red, the system automatically triggers alerts to the relevant government authority and field officer.`,
  },
  {
    id: "gis-001",
    category: "gis",
    keywords: ["satellite", "map", "layer", "toggle", "drone", "aerial", "imagery"],
    content: `AgriTrace X uses multiple map layers:
1. **Satellite Layer** – High-resolution satellite imagery from Sentinel-2 and Landsat.
2. **NDVI Overlay** – Color-coded vegetation health index.
3. **Risk Heatmap** – District-level agricultural risk visualization.
4. **Sensor Markers** – Real-time IoT sensor locations showing soil moisture, temperature, and NPK readings.
5. **Drone Imagery** – High-resolution drone footage for field-level analysis.

Field officers can toggle between layers to get a comprehensive view of land conditions before and after field visits.`,
  },

  // ── SOIL & SENSORS ──
  {
    id: "soil-001",
    category: "farming",
    keywords: ["soil", "dry", "moisture", "water", "drought", "irrigation", "low moisture"],
    content: `**Why is my soil dry?**
Dry soil (low soil moisture) in AgriTrace X is detected when sensor readings fall below the crop-specific threshold. Common causes:
- Insufficient rainfall or irrigation
- High temperatures causing rapid evaporation
- Sandy or low-organic-matter soil with poor water retention
- Damaged or blocked irrigation system

**AgriTrace X Response:** When soil moisture drops below 30%, the system generates a yellow alert. Below 20%, a critical red alert is triggered and the farmer dashboard shows an irrigation recommendation.`,
  },
  {
    id: "soil-002",
    category: "farming",
    keywords: ["npk", "nitrogen", "phosphorus", "potassium", "fertilizer", "nutrients", "soil health"],
    content: `**NPK Analysis in AgriTrace X**
NPK stands for Nitrogen (N), Phosphorus (P), and Potassium (K) — the three primary soil nutrients:
- **Nitrogen (N)** – Promotes leaf growth and green color. Low nitrogen = yellow leaves, stunted growth.
- **Phosphorus (P)** – Supports root development and flowering. Low phosphorus = poor root systems.
- **Potassium (K)** – Improves overall crop health and disease resistance. Low potassium = weak stems.

AgriTrace X IoT sensors measure NPK levels continuously. When levels drop below optimal thresholds, the system alerts the farmer with specific fertilizer recommendations.`,
  },
  {
    id: "soil-003",
    category: "farming",
    keywords: ["moisture", "improve", "retain", "water holding", "organic", "mulch", "compost"],
    content: `**How to improve soil moisture retention:**
1. Add organic matter (compost, manure) to increase water-holding capacity
2. Use mulching to reduce surface evaporation by up to 70%
3. Practice drip irrigation instead of flood irrigation (40% water savings)
4. Plant cover crops to reduce soil crusting
5. Use soil conditioners like hydrogel polymers for sandy soils
6. Implement contour farming on slopes to reduce runoff

AgriTrace X sensors track the effectiveness of these interventions over time, showing moisture trend graphs in the farmer dashboard.`,
  },

  // ── IRRIGATION ──
  {
    id: "irrigation-001",
    category: "farming",
    keywords: ["irrigate", "irrigation", "when", "schedule", "water", "drip", "flood"],
    content: `**When should I irrigate?**
AgriTrace X recommends irrigation based on real-time sensor data and crop stage:
- **Critical threshold:** Irrigate when soil moisture drops below 35% field capacity
- **Wheat:** Irrigate at tillering, jointing, flowering, and grain filling stages
- **Rice:** Maintain 2-5cm standing water during vegetative stage
- **Cotton:** Irrigate every 10-14 days; avoid waterlogging

The platform calculates the optimal irrigation window by combining soil moisture readings, evapotranspiration rates, and upcoming weather forecasts. Farmers receive push notifications when irrigation is due.`,
  },

  // ── CROP HEALTH ──
  {
    id: "crop-001",
    category: "farming",
    keywords: ["crop", "stress", "disease", "pest", "health", "yellow", "wilting", "damage"],
    content: `**What causes crop stress?**
Crop stress detected on AgriTrace X can result from:
1. **Water stress** – Too much or too little moisture (most common)
2. **Nutrient deficiency** – Low NPK or micronutrient levels
3. **Pest attack** – Identified through drone imagery and farmer reports
4. **Disease** – Fungal, bacterial, or viral infections affecting leaf color/texture
5. **Temperature extremes** – Frost damage or heat stress during flowering
6. **Waterlogging** – Root oxygen deprivation from excess rain
7. **Soil pH imbalance** – Too acidic or alkaline soil blocking nutrient uptake

AgriTrace X cross-references satellite NDVI drops with sensor anomalies to automatically classify the type of crop stress.`,
  },
  {
    id: "crop-002",
    category: "farming",
    keywords: ["flood", "waterlogging", "excess rain", "submergence", "damage", "reduce"],
    content: `**How to reduce flood damage to crops:**
1. **Immediate actions:** Open drainage channels to remove standing water within 24 hours
2. **Apply potassium fertilizer** after water recedes to help recovery
3. **Spray fungicide** to prevent post-flood fungal diseases
4. **Assess crop stage** – crops in vegetative stage recover better than those in flowering
5. **Report to AgriTrace X** – Upload drone/photo evidence to initiate insurance claim process

AgriTrace X flood alerts are triggered when rainfall exceeds 50mm/24hrs and soil saturation reaches 95%. Government authorities receive automatic flood risk notifications for affected districts.`,
  },
  {
    id: "crop-003",
    category: "farming",
    keywords: ["best crop", "humid", "climate", "recommend", "which crop", "season", "rainfall"],
    content: `**Best crops for humid climates:**
For high-humidity, high-rainfall regions (AgriTrace X Zone Type: H1-H3):
- **Rice (Paddy)** – Ideal for 1500mm+ annual rainfall
- **Sugarcane** – Thrives in humid, tropical conditions
- **Banana** – Excellent for warm, humid areas
- **Coconut** – Coastal humid zones
- **Black Pepper & Cardamom** – High-value crops for humid forest zones
- **Arecanut** – Suitable for stable humid environments

AgriTrace X uses historical rainfall data, soil type, and NDVI trends to recommend the best crop variety for each GIS zone.`,
  },

  // ── CERTIFICATION ──
  {
    id: "cert-001",
    category: "certification",
    keywords: ["certification", "land certificate", "verify", "verification", "analyst", "field officer"],
    content: `**Land Certification in AgriTrace X**
The land certification process:
1. **Farmer submits** land details with GPS coordinates and documents
2. **Field Officer visits** the land for physical verification
3. **Soil samples** are collected and analyzed for NPK, pH, organic matter
4. **Drone survey** captures aerial imagery of the land
5. **AgriTrace X AI** generates an NDVI health score and risk classification
6. **Analyst reviews** all data and issues a Digital Verification Seal
7. **Certificate generated** with unique ID (format: AGX-CERT-XXXX) containing land details, GPS coordinates, soil health, and risk score

Land certificates are used for:
- Bank loan applications
- Government subsidy eligibility
- Insurance policy enrollment
- Property ownership verification`,
  },
  {
    id: "cert-002",
    category: "certification",
    keywords: ["loan", "bank", "subsidy", "certificate use", "eligibility"],
    content: `**How land certification is used for loans and subsidies:**
- **Bank Loans:** AgriTrace X certificates are accepted by partner banks as official land health documentation. The certificate includes the Digital Verification Seal with a unique QR code that banks can scan to verify authenticity.
- **Government Subsidies:** Verified land certificates are required for PM-KISAN, crop insurance schemes, and state agricultural subsidies. The government portal in AgriTrace X processes subsidy eligibility automatically using certificate data.
- **Insurance Claims:** Insurance managers use the certificate baseline to calculate damage percentage during claim assessment.`,
  },

  // ── INSURANCE ──
  {
    id: "insurance-001",
    category: "insurance",
    keywords: ["insurance", "claim", "verify", "evidence", "payout", "settlement", "damage"],
    content: `**How insurance claims work in AgriTrace X:**
1. **Farmer files a claim** through the app with photo/video evidence of crop damage
2. **Insurance Manager reviews** the claim in the Claims Management dashboard
3. **AI damage assessment** – AgriTrace X compares pre-disaster and post-disaster NDVI scores to calculate crop loss percentage
4. **Field verification** – Field officer is dispatched to physically verify the damage
5. **Financial calculation** – Payout = (Land Area × Crop Value × Damage%) − Policy Deductible
6. **Settlement approval** – Insurance Manager approves payout within the auto-payout limit
7. **Direct bank transfer** – Approved claims are processed within 7-14 business days

Claims are classified as: Minor (< 25% damage), Moderate (25-60%), Major (60-80%), or Total Loss (> 80%).`,
  },
  {
    id: "insurance-002",
    category: "insurance",
    keywords: ["evidence", "claim document", "proof", "required", "what to submit"],
    content: `**Evidence required for insurance claims:**
- GPS-tagged photographs of crop damage (minimum 5 photos from different angles)
- Farmer's land certificate (AgriTrace X AGX-CERT number)
- Date and description of the disaster event (flood, drought, pest, hail)
- Soil sensor readings from the event period (auto-extracted from AgriTrace X)
- NDVI comparison report (pre vs post disaster — auto-generated by the platform)
- Local weather station data confirming the event
- Village/taluka disaster declaration (for large-scale events)

All documents are uploaded through the AgriTrace X Farmer app or portal.`,
  },
  {
    id: "insurance-003",
    category: "insurance",
    keywords: ["payout", "calculate", "amount", "how much", "compensation"],
    content: `**How insurance payout is calculated:**
The AgriTrace X formula:
**Payout = (Insured Area × MSP of Crop × Damage Percentage) − Deductible**

Where:
- **Insured Area** = Verified land area from AGX certificate (hectares)
- **MSP** = Minimum Support Price per quintal × expected yield per hectare
- **Damage %** = Calculated from NDVI difference + field officer report
- **Deductible** = Policy-specific threshold (usually 10-15% of insured value)

Example: 2.5 ha wheat × ₹2,015/quintal × 35 q/ha yield × 60% damage = ₹1,06,237 gross claim.`,
  },

  // ── GOVERNMENT / SUBSIDY ──
  {
    id: "govt-001",
    category: "government",
    keywords: ["subsidy", "government", "scheme", "pm kisan", "eligibility", "verification", "crop loss"],
    content: `**How subsidy verification works in AgriTrace X:**
1. **Farmer applies** through the portal with land certificate and crop details
2. **AgriTrace X system** auto-validates land ownership, crop type, and NDVI health score
3. **Field officer verification** – Physical spot check for large subsidy amounts
4. **Government portal review** – Authority reviews consolidated district-level applications
5. **Subsidy approval** – Approved subsidies are disbursed through DBT (Direct Benefit Transfer) to farmer's Aadhaar-linked bank account
6. **Audit trail** – All approvals are logged on the platform with timestamps and digital signatures

Common schemes supported: PM-KISAN, PMFBY (Pradhan Mantri Fasal Bima Yojana), Soil Health Card scheme, and state-specific packages.`,
  },
  {
    id: "govt-002",
    category: "government",
    keywords: ["crop loss", "calculate", "disaster", "government", "assessment"],
    content: `**How crop loss is calculated for government compensation:**
AgriTrace X uses a multi-source approach:
1. **Satellite NDVI** – Pre and post disaster vegetation index comparison
2. **Sensor Data** – Soil moisture, temperature extremes recorded during event
3. **Drone Survey** – High-resolution aerial imagery for field-level damage
4. **Field Officer Report** – Physical assessment with geotagged photos
5. **Weather Station Data** – Rainfall, wind speed, temperature during event

The system generates an automated **Damage Assessment Report** that classifies loss at village, taluka, and district levels. This report is used by government authorities to declare disaster status and release compensation funds.`,
  },

  // ── ALERTS ──
  {
    id: "alerts-001",
    category: "platform",
    keywords: ["alert", "notification", "warning", "critical", "trigger", "when"],
    content: `**AgriTrace X Alert System:**
Alerts are triggered automatically based on sensor thresholds and AI analysis:

**Critical Alerts (Red):**
- Soil moisture < 20% (drought risk)
- Rainfall > 80mm/24hrs (flood risk)
- Temperature > 42°C or < 2°C (extreme weather)
- NDVI drop > 30% in 7 days (sudden crop stress)

**Warning Alerts (Amber):**
- NPK levels below optimal range
- Soil pH outside 5.5-7.5 range
- Pest risk score > 60%

**Info Alerts (Green):**
- Irrigation schedule reminders
- Fertilizer application windows
- Harvest timing recommendations

All alerts are sent via app notification, SMS, and email. Government authorities receive district-wide alert summaries every 6 hours.`,
  },

  // ── SENSORS / GPS ──
  {
    id: "sensor-001",
    category: "platform",
    keywords: ["sensor", "iot", "mqtt", "realtime", "data", "gps", "track", "connectivity"],
    content: `**AgriTrace X IoT Sensor Network:**
Each monitored farm has ground sensors that measure:
- **Soil Moisture** (capacitive sensors, 0-100% VWC)
- **Soil Temperature** (0-60°C range)
- **NPK Levels** (Nitrogen, Phosphorus, Potassium in mg/kg)
- **Soil pH** (4.0 to 9.0 range)
- **Air Temperature & Humidity** (DHT22 sensors)
- **Rainfall** (tipping bucket rain gauge, 0.2mm resolution)

Data is transmitted every 15 minutes via MQTT protocol to the AgriTrace X cloud platform. GPS tracking shows the exact location of each sensor and farmer device. Real-time dashboards display all sensor values with historical trend charts.`,
  },

  // ── WEATHER ──
  {
    id: "weather-001",
    category: "farming",
    keywords: ["weather", "temperature", "rain", "forecast", "climate", "humidity", "wind"],
    content: `**Weather Intelligence in AgriTrace X:**
The platform integrates live weather data from:
- IMD (India Meteorological Department) API
- OpenWeatherMap API
- On-farm weather stations

Weather parameters monitored:
- Temperature (°C), Humidity (%), Rainfall (mm)
- Wind speed and direction
- Solar radiation (for evapotranspiration calculations)
- 7-day weather forecast for irrigation planning

Severe weather warnings (cyclone, hailstorm, frost) are automatically escalated to the Government Authority portal and trigger pre-emptive alerts to farmers in the affected GIS zone.`,
  },
];

// ── Simple keyword-based retrieval ──
export function retrieveContext(question: string, topK = 4): KnowledgeChunk[] {
  const q = question.toLowerCase();
  
  // Score each chunk by keyword overlap + content match
  const scored = KNOWLEDGE_BASE.map(chunk => {
    let score = 0;
    
    // Keyword match
    for (const kw of chunk.keywords) {
      if (q.includes(kw.toLowerCase())) score += 3;
    }
    
    // Content word overlap
    const contentWords = chunk.content.toLowerCase().split(/\W+/);
    const queryWords = q.split(/\W+/).filter(w => w.length > 3);
    for (const word of queryWords) {
      if (contentWords.includes(word)) score += 1;
    }
    
    // Category boost
    if (q.includes(chunk.category)) score += 2;
    
    return { chunk, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(s => s.chunk);
}
