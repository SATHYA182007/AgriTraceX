"use client";

import { AlertTriangle, Clock, MapPin } from "lucide-react";

const ALERTS = [
  { id: 1, land: "Green Valley", district: "Pune", warning: "Flood Risk Detected", severity: "Critical", time: "14:20:00" },
  { id: 2, land: "Sunrise Acres", district: "Nashik", warning: "Soil Moisture Low", severity: "Medium", time: "13:45:12" },
  { id: 3, land: "Golden Harvest", district: "Satara", warning: "Heat Stress Warning", severity: "High", time: "11:30:45" },
  { id: 4, land: "RiverSide Farms", district: "Kolhapur", warning: "Crop Failure Risk", severity: "Critical", time: "10:15:30" },
];

export default function AlertsPage() {
  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-rose-500">Active Monitoring</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            System <span className="text-rose-500">Alerts</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ALERTS.map(alert => {
          const isCritical = alert.severity === 'Critical';
          const isHigh = alert.severity === 'High';
          const color = isCritical ? 'text-rose-500' : isHigh ? 'text-orange-500' : 'text-emerald-500';
          const bg = isCritical ? 'bg-rose-500/10' : isHigh ? 'bg-orange-500/10' : 'bg-emerald-500/10';
          const border = isCritical ? 'border-rose-500/30' : isHigh ? 'border-orange-500/30' : 'border-emerald-500/30';
          
          return (
            <div key={alert.id} className={`premium-card p-8 border-2 ${border} relative overflow-hidden group hover:-translate-y-1 transition-transform`}>
              {isCritical && <div className="absolute top-0 left-0 w-full h-1 bg-rose-500 animate-pulse" />}
              
              <div className="flex items-start justify-between mb-6">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center ${color}`}>
                  <AlertTriangle size={20} />
                </div>
                <div className={`px-3 py-1.5 rounded-full ${bg} ${color} text-[10px] font-black uppercase tracking-widest`}>
                  {alert.severity}
                </div>
              </div>

              <h3 className="text-xl font-manrope font-extrabold mb-2">{alert.warning}</h3>
              
              <div className="space-y-3 mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center gap-3 text-text-soft text-sm font-medium">
                  <MapPin size={16} /> {alert.land}, {alert.district}
                </div>
                <div className="flex items-center gap-3 text-text-soft text-sm font-medium">
                  <Clock size={16} /> {alert.time}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
