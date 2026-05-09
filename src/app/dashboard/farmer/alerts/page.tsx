"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Search, 
  Filter, 
  Info, 
  FileText, 
  ShieldAlert, 
  Activity,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MOCK_ALERTS = [
  { id: '1', type: 'SOIL DRY', severity: 'CRITICAL', parcel: 'Sector 04-A1', time: '14:21:03', status: 'Active' },
  { id: '2', type: 'HEAT WAVE', severity: 'HIGH', parcel: 'Sector 04-A1', time: '13:45:12', status: 'Monitoring' },
  { id: '3', type: 'NPK DEFICIT', severity: 'MEDIUM', parcel: 'Sector 04-A1', time: '12:10:00', status: 'Alert' },
];

export default function FarmerAlertsPage() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-12 max-w-[1400px] mx-auto stagger-in">
      
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(22,163,74,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Signal Node: TELEMETRY-RISK</p>
          </div>
          <h1 className="text-6xl font-manrope font-extrabold tracking-tighter text-foreground leading-tight">
            Risk <span className="text-primary">Intelligence</span>
          </h1>
          <p className="text-lg text-text-soft font-medium max-w-xl">
             Real-time detection of biotic and abiotic field threats via ESP32 telemetry.
          </p>
        </div>

        <div className="flex gap-3 bg-white p-2 rounded-[24px] border border-border shadow-soft">
           <Button 
              onClick={() => setFilter("all")} 
              className={`h-12 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 filter === "all" ? 'bg-primary text-white shadow-lg' : 'bg-transparent text-text-soft hover:bg-surface-soft'
              }`}
           >
              All Signals
           </Button>
           <Button 
              onClick={() => setFilter("critical")} 
              className={`h-12 px-8 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                 filter === "critical" ? 'bg-rose-500 text-white shadow-lg' : 'bg-transparent text-rose-500 hover:bg-rose-50'
              }`}
           >
              Critical
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence mode="popLayout">
           {MOCK_ALERTS.map((alert, idx) => (
             <motion.div
               key={alert.id}
               layout
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95 }}
               transition={{ delay: idx * 0.1 }}
             >
               <div className="premium-card p-1 flex flex-col md:flex-row items-stretch overflow-hidden group">
                  <div className={`w-full md:w-48 flex flex-col items-center justify-center p-12 relative overflow-hidden ${
                     alert.severity === 'CRITICAL' ? 'bg-rose-500 text-white' : 
                     alert.severity === 'HIGH' ? 'bg-amber-500 text-white' : 
                     'bg-primary text-white'
                  }`}>
                     <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-30" />
                     <AlertTriangle size={42} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
                     <p className="relative z-10 text-[9px] font-black uppercase tracking-[0.3em] mt-4 opacity-70">{alert.severity}</p>
                  </div>

                  <div className="flex-1 p-10 md:p-12 grid grid-cols-1 md:grid-cols-4 gap-10 items-center">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-text-soft uppercase tracking-widest opacity-40 leading-none">Detection Vector</p>
                        <h3 className="text-3xl font-manrope font-extrabold text-foreground tracking-tighter uppercase">{alert.type}</h3>
                     </div>

                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-text-soft uppercase tracking-widest opacity-40 leading-none">Field Node</p>
                        <div className="flex items-center gap-3 text-foreground font-bold text-sm tracking-tight">
                           <Zap size={16} className="text-primary" />
                           {alert.parcel}
                        </div>
                     </div>

                     <div className="space-y-1">
                        <p className="text-[10px] font-black text-text-soft uppercase tracking-widest opacity-40 leading-none">Transmission</p>
                        <div className="flex items-center gap-3 text-foreground font-jetbrains font-bold text-sm tracking-tight">
                           <Clock size={16} className="text-primary" />
                           {alert.time}
                        </div>
                     </div>

                     <div className="flex justify-end gap-4">
                        <Button variant="ghost" className="h-14 px-8 bg-surface-soft text-primary font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white hover:border-primary/20 transition-all flex items-center justify-center gap-3">
                           <ShieldAlert size={18} />
                           Advice
                        </Button>
                        <Button className="h-14 px-8 bg-foreground text-white font-black uppercase tracking-widest text-[10px] rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-all">
                           <Activity size={18} />
                           Sync
                        </Button>
                     </div>
                  </div>
               </div>
             </motion.div>
           ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
