"use client";

import { AlertTriangle, Clock, Server, Zap, WifiOff } from "lucide-react";

const ALERTS = [
  { id: 1, type: "GIS Server Latency High", category: "Infrastructure", severity: "Medium", time: "10:45 AM", icon: Server },
  { id: 2, type: "Node Connection Lost (Nashik)", category: "Sensors", severity: "Critical", time: "10:30 AM", icon: WifiOff },
  { id: 3, type: "Edge Function Timeout", category: "Backend", severity: "Critical", time: "10:15 AM", icon: Zap },
  { id: 4, type: "Realtime Socket Drop", category: "Network", severity: "Medium", time: "09:50 AM", icon: AlertTriangle },
];

export default function AdminAlertsPage() {
  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-purple-500">Incident Matrix</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            Alerts <span className="text-purple-500">Center</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {ALERTS.map(alert => {
          const isCritical = alert.severity === 'Critical';
          const color = isCritical ? 'text-rose-500' : 'text-amber-500';
          const bg = isCritical ? 'bg-rose-500/10' : 'bg-amber-500/10';
          const border = isCritical ? 'border-rose-500/30' : 'border-amber-500/30';
          const Icon = alert.icon;
          
          return (
            <div key={alert.id} className={`premium-card p-8 border-2 ${border} relative overflow-hidden group hover:-translate-y-1 transition-transform`}>
              {isCritical && <div className="absolute top-0 left-0 w-full h-1 bg-rose-500 animate-pulse" />}
              
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center ${color}`}>
                  <Icon size={20} />
                </div>
                <div className={`px-3 py-1.5 rounded-full ${bg} ${color} text-[10px] font-black uppercase tracking-widest`}>
                  {alert.severity}
                </div>
              </div>

              <h3 className="text-lg font-manrope font-extrabold mb-2">{alert.type}</h3>
              <p className="text-sm font-bold text-text-soft uppercase tracking-widest mb-6">{alert.category}</p>
              
              <div className="space-y-4 pt-6 border-t border-border/50 flex justify-between items-center">
                <div className="flex items-center gap-2 text-text-soft text-sm font-medium">
                  <Clock size={14} /> {alert.time}
                </div>
                <button className="text-[11px] font-black uppercase tracking-widest text-emerald-500 hover:text-emerald-600 transition-colors">
                   Acknowledge
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
