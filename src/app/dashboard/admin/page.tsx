"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { 
  Activity, 
  Droplets, 
  Sun, 
  AlertTriangle, 
  Database, 
  Satellite, 
  CheckCircle2, 
  Zap,
  Thermometer,
  Cpu,
  Radio,
  Signal,
  Terminal,
  ChevronRight,
  Globe,
  Settings,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
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
  { time: "14:21:03", msg: "SysAdmin: Global IoT cluster online", type: "success" },
  { time: "14:21:05", msg: "Edge gateway latency optimized (14ms)", type: "info" },
  { time: "14:21:08", msg: "ESP32 firmware handshake active", type: "warning" },
  { time: "14:21:10", msg: "Realtime data fusion protocol enabled", type: "success" },
];

export default function AdminDashboard() {
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
      
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-purple-500">Infrastructure Node: SYS-ROOT-01</p>
          </div>
          <h1 className="text-7xl font-manrope font-extrabold tracking-tighter text-foreground leading-[0.8]">
            System <span className="text-purple-500">Control Desk</span>
          </h1>
          <p className="text-lg text-text-soft font-medium max-w-2xl">
             Universal oversight of platform IoT infrastructure and real-time sensor pipelines.
          </p>
        </div>

        <div className="flex gap-4">
           <Button className="h-16 px-10 bg-purple-500 text-white rounded-2xl font-bold uppercase tracking-widest text-[11px] shadow-2xl shadow-purple-500/20 hover:scale-105 transition-all flex items-center gap-4">
              <ShieldCheck size={20} /> System Audit
           </Button>
           <Button variant="outline" className="h-16 px-10 bg-white border-purple-500/10 rounded-2xl font-bold uppercase tracking-widest text-[11px] text-purple-500 hover:bg-surface-soft transition-all flex items-center gap-4 shadow-soft">
              <Settings size={20} /> Global Config
           </Button>
        </div>
      </div>

      {/* Primary Telemetry KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
         <SensorKPICard label="Cluster Temp" value={`${sensors.temp}°C`} icon={Thermometer} color="text-purple-500" bg="bg-white" />
         <SensorKPICard label="Node Humidity" value={`${sensors.humidity}%`} icon={Droplets} color="text-blue-500" bg="bg-white" />
         <SensorKPICard label="Fusion Load" value={sensors.soilValue} icon={Cpu} color="text-amber-600" bg="bg-white" sub="IoT Matrix" />
         <SensorKPICard label="Global Status" value={sensors.soilStatus} icon={AlertTriangle} color="text-danger" bg="bg-white" pulsing={true} />
         <SensorKPICard label="System Signal" value={sensors.ledStatus} icon={Zap} color="text-danger" bg="bg-white" glowing={true} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
         <div className="xl:col-span-8 space-y-10">
            {/* NPK Intelligence */}
            <div className="space-y-6">
               <h2 className="text-[12px] font-black tracking-[0.4em] text-foreground uppercase">Infrastructure Data Fusion</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <NPKCard label="Nitrogen Stream" value={sensors.npk.n} status="Active" color="text-emerald-500" />
                  <NPKCard label="Phosphorus Stream" value={sensors.npk.p} status="Stable" color="text-blue-500" />
                  <NPKCard label="Potassium Stream" value={sensors.npk.k} status="Alert" color="text-rose-500" />
               </div>
            </div>

            {/* Map */}
            <div className="relative h-[500px] rounded-[32px] overflow-hidden bg-white border border-[#EEF2EE] shadow-soft group">
               <ParcelMap parcels={[{ id: 1, name: "Global Infrastructure Node", area_ha: 0, crop: "SysOps", health: "100%", lat: 19.4, lng: 79.98 }]} height="100%" />
            </div>
         </div>

         <div className="xl:col-span-4 flex flex-col gap-10">
            {/* GPS Matrix */}
            <div className="premium-card p-10 space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-[12px] font-black tracking-[0.4em] text-foreground uppercase">Universal GPS Matrix</h3>
                  <Globe size={20} className="text-purple-500" />
               </div>
                     <div className="flex items-center gap-5 overflow-hidden">
                        <div className="relative shrink-0">
                           <div className="w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center relative">
                              <Satellite size={20} className="text-purple-500" />
                           </div>
                           <div className="absolute -inset-1 border-2 border-purple-500/20 rounded-full animate-ping" />
                        </div>
                        <div className="min-w-0">
                           <p className="text-[8px] font-black text-text-soft uppercase tracking-widest leading-none mb-1 opacity-40">Matrix Uplink</p>
                           <h4 className="text-base font-manrope font-extrabold text-foreground tracking-tight truncate">{sensors.gps.status}</h4>
                        </div>
                     </div>
            </div>

            {/* Live Console */}
            <div className="premium-card p-10 flex-1 flex flex-col bg-[#0F172A] border-none text-white overflow-hidden">
               <div className="flex items-center justify-between mb-8 text-[10px] font-black tracking-[0.3em] uppercase text-white/60">
                  <div className="flex items-center gap-3">
                     <Terminal size={16} className="text-purple-400" />
                     <span>Root System Feed</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
               </div>
               <div className="flex-1 font-jetbrains text-[12px] space-y-4 overflow-y-auto">
                  {logs.map((log, i) => (
                     <div key={i} className="flex gap-4 opacity-80">
                        <span className="text-purple-400/50">[{log.time}]</span>
                        <span className={log.type === 'error' ? 'text-rose-400' : 'text-purple-300'}>{log.msg}</span>
                     </div>
                  ))}
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
