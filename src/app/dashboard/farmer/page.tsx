"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { 
  Activity, 
  Droplets, 
  Sun, 
  AlertTriangle, 
  Search, 
  Satellite, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Plus, 
  Map as MapIcon,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Thermometer,
  Cpu,
  Radio,
  Navigation,
  Signal,
  Database,
  Terminal,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const ParcelMap = dynamic(() => import('@/components/maps/ParcelMap'), { ssr: false });

// Mock data for initial state
const INITIAL_SENSORS = {
  temp: 30.90,
  humidity: 63.50,
  soilValue: 4095,
  soilStatus: "DRY",
  ledStatus: "RED LED ON",
  npk: { n: 34, p: 34, k: 34 },
  gps: { status: "Connecting to satellite...", signal: 0, lastSync: "N/A" }
};

const TELEMETRY_LOGS = [
  { time: "14:21:03", msg: "Soil moisture critical", type: "error" },
  { time: "14:21:05", msg: "RED LED activated", type: "warning" },
  { time: "14:21:08", msg: "GPS syncing...", type: "info" },
  { time: "14:21:10", msg: "NPK values updated", type: "success" },
];

export default function FarmerDashboard() {
  const [sensors, setSensors] = useState(INITIAL_SENSORS);
  const [logs, setLogs] = useState(TELEMETRY_LOGS);

  // Simulate realtime updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => ({
        ...prev,
        temp: +(prev.temp + (Math.random() - 0.5) * 0.1).toFixed(2),
        humidity: +(prev.humidity + (Math.random() - 0.5) * 0.2).toFixed(2),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      
      {/* AI Insight Banner - AquaSmart Style */}
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="relative p-10 rounded-[32px] bg-gradient-to-r from-primary to-primary-dark text-white overflow-hidden shadow-2xl shadow-primary/20"
      >
         <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Zap size={300} className="fill-white" />
         </div>
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-4">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/30 text-xs font-black uppercase tracking-widest">
                  <Activity size={14} /> AI Insight Node
               </div>
               <h2 className="text-4xl font-manrope font-extrabold tracking-tighter leading-tight max-w-2xl">
                  ⚠ Soil is dry and temperature is high. <span className="underline decoration-white/30 underline-offset-8">Irrigation recommended</span> within 24 hours.
               </h2>
               <p className="text-white/70 font-medium max-w-xl">
                  Moisture index is at {sensors.soilValue} (Critical). Environmental heat flux of {sensors.temp}°C is accelerating transpiration.
               </p>
            </div>
            <Button className="h-16 px-10 bg-white text-primary font-bold rounded-2xl shadow-xl hover:scale-105 transition-all flex items-center gap-4">
               Deploy Irrigation Sync <CheckCircle2 size={20} />
            </Button>
         </div>
      </motion.div>

      {/* Primary Telemetry KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
         <SensorKPICard 
            label="Temperature" 
            value={`${sensors.temp}°C`} 
            icon={Thermometer} 
            color={sensors.temp > 30 ? "text-rose-500" : "text-primary"} 
         />
         <SensorKPICard 
            label="Humidity" 
            value={`${sensors.humidity}%`} 
            icon={Droplets} 
            color="text-blue-500" 
         />
         <SensorKPICard 
            label="Soil Value" 
            value={sensors.soilValue} 
            icon={Cpu} 
            color="text-amber-600" 
            sub="ESP32 RAW"
         />
         <SensorKPICard 
            label="Soil Status" 
            value={sensors.soilStatus} 
            icon={AlertTriangle} 
            color={sensors.soilStatus === "DRY" ? "text-rose-500" : "text-primary"} 
            pulsing={sensors.soilStatus === "DRY"}
         />
         <SensorKPICard 
            label="LED Status" 
            value={sensors.ledStatus} 
            icon={Zap} 
            color="text-rose-500" 
            glowing={true}
         />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
         {/* Left Side: Map & NPK */}
         <div className="xl:col-span-8 space-y-10">
            {/* NPK Intelligence Section */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <h2 className="text-[12px] font-black tracking-[0.4em] text-foreground uppercase">NPK Soil Intelligence</h2>
                  <Badge variant="outline" className="border-primary/20 text-primary font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-widest">Live Bio-Scan</Badge>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <NPKCard label="Nitrogen (N)" value={sensors.npk.n} status="Medium" color="text-emerald-500" />
                  <NPKCard label="Phosphorus (P)" value={sensors.npk.p} status="Optimal" color="text-blue-500" />
                  <NPKCard label="Potassium (K)" value={sensors.npk.k} status="Low" color="text-rose-500" />
               </div>
            </div>

            {/* Tactical Map */}
            <div className="relative h-[500px] rounded-[32px] overflow-hidden bg-white border border-[#EEF2EE] shadow-soft group">
               <ParcelMap parcels={[{ id: 1, name: "Active Field Node", area_ha: 2.5, crop: "Monitoring", health: "92%", lat: 19.4, lng: 79.98 }]} height="100%" />
               <div className="absolute top-8 left-8 z-10">
                  <div className="px-6 py-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-border shadow-soft flex items-center gap-4">
                     <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                     <p className="text-[11px] font-black uppercase tracking-[0.2em] text-foreground">Field Uplink: <span className="text-primary">ESP32-TX-01</span></p>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Side: GPS & Terminal */}
         <div className="xl:col-span-4 flex flex-col gap-10">
            {/* GPS Telemetry Widget */}
            <div className="premium-card p-10 space-y-8 relative overflow-hidden">
               <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
                  <Radio size={200} className="text-primary animate-spin-slow" />
               </div>
               
               <div className="flex items-center justify-between relative z-10">
                  <h3 className="text-[12px] font-black tracking-[0.4em] text-foreground uppercase">GPS Telemetry</h3>
                  <div className="w-8 h-8 rounded-lg bg-surface-soft flex items-center justify-center">
                     <Navigation size={14} className="text-primary" />
                  </div>
               </div>

               <div className="space-y-6 relative z-10">
                     <div className="flex items-center gap-5 overflow-hidden">
                        <div className="relative shrink-0">
                           <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                              <Satellite size={20} className="text-primary" />
                           </div>
                           <div className="absolute -inset-1 border-2 border-primary/20 rounded-full animate-ping" />
                        </div>
                        <div className="min-w-0">
                           <p className="text-[8px] font-black text-text-soft uppercase tracking-widest leading-none mb-1 opacity-40">GPS Uplink</p>
                           <h4 className="text-base font-manrope font-extrabold text-foreground tracking-tight truncate">{sensors.gps.status}</h4>
                        </div>
                     </div>

                  <div className="p-6 rounded-2xl bg-surface-soft border border-border/50 space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-text-soft uppercase">Satellite Sync</span>
                        <div className="flex gap-1">
                           {[1, 2, 3, 4, 5].map(i => (
                              <div key={i} className={`w-1 h-3 rounded-full ${i <= 2 ? 'bg-primary' : 'bg-border'}`} />
                           ))}
                        </div>
                     </div>
                     <div className="flex justify-between items-center border-t border-border/50 pt-4">
                        <span className="text-[10px] font-bold text-text-soft uppercase">Signal Strength</span>
                        <span className="text-xs font-jetbrains font-bold text-foreground">32.4 dBHz</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Live Telemetry Console */}
            <div className="premium-card p-10 flex-1 flex flex-col bg-[#0F172A] border-none text-white overflow-hidden group">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                     <Terminal size={16} className="text-emerald-500" />
                     <h3 className="text-[10px] font-black tracking-[0.3em] uppercase text-white/60">Live Console</h3>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10B981]" />
               </div>

               <div className="flex-1 font-jetbrains text-[12px] space-y-4 overflow-y-auto custom-scrollbar">
                  {logs.map((log, i) => (
                     <div key={i} className="flex gap-4 opacity-80 hover:opacity-100 transition-opacity">
                        <span className="text-emerald-500/50">[{log.time}]</span>
                        <span className={log.type === 'error' ? 'text-rose-400' : log.type === 'warning' ? 'text-amber-400' : 'text-emerald-400'}>
                           {log.msg}
                        </span>
                     </div>
                  ))}
                  <div className="flex gap-4 animate-pulse">
                     <span className="text-emerald-500/50">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                     <span className="text-emerald-400">Listening for ESP32 packets...</span>
                  </div>
               </div>

               <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Protocol: ESP-NOW / MQTT</p>
                  <ChevronRight size={14} className="text-white/20" />
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function SensorKPICard({ label, value, icon: Icon, color, sub, pulsing, glowing }: any) {
  const isLong = value.toString().length > 8;
  return (
    <div className="premium-card p-7 flex flex-col justify-between h-full min-h-[200px]">
      <div className={`w-10 h-10 rounded-xl bg-surface-soft flex items-center justify-center ${color} border border-border/50 relative shadow-sm`}>
        <Icon size={18} />
        {pulsing && <div className="absolute inset-0 border-2 border-current opacity-20 rounded-xl animate-ping" />}
        {glowing && <div className="absolute inset-0 bg-current opacity-5 blur-xl rounded-xl animate-pulse" />}
      </div>
      <div className="space-y-1">
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-soft opacity-40 leading-none">{label}</p>
        <div className="flex flex-col gap-0.5">
           <h3 className={`font-jetbrains font-extrabold tracking-tighter text-foreground leading-tight ${isLong ? 'text-lg' : 'text-2xl'}`}>
              {value}
           </h3>
           {sub && <span className="text-[8px] font-bold text-text-soft uppercase tracking-[0.2em] opacity-30">{sub}</span>}
        </div>
      </div>
    </div>
  );
}

function NPKCard({ label, value, status, color }: any) {
   return (
      <div className="premium-card p-7 flex flex-col justify-between min-h-[180px] group">
         <div className="flex items-center justify-between">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-text-soft opacity-40">{label}</p>
            <Database size={16} className={color} />
         </div>
         <div className="flex items-center gap-5 mt-3">
            <div className="relative w-14 h-14 shrink-0">
               <svg className="w-full h-full -rotate-90">
                  <circle cx="28" cy="28" r="24" className="stroke-surface-soft fill-none" strokeWidth="5" />
                  <motion.circle 
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: value / 100 }}
                     transition={{ duration: 2, ease: "easeOut" }}
                     cx="28" cy="28" r="24" 
                     className={`stroke-current fill-none ${color}`} 
                     strokeWidth="5" 
                     strokeLinecap="round"
                  />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center font-jetbrains font-bold text-[9px]">
                  {value}%
               </div>
            </div>
            <div className="min-w-0 flex-1">
               <p className="text-lg font-jetbrains font-extrabold text-foreground tracking-tight truncate leading-none">
                  {value}<span className="text-[9px] ml-1 text-text-soft font-bold">mg/kg</span>
               </p>
               <p className={`text-[8px] font-black uppercase tracking-widest mt-1.5 ${color}`}>Status: {status}</p>
            </div>
         </div>
      </div>
   );
}
