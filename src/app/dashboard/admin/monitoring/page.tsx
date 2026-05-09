"use client";

import { Activity, Server, Database, Cloud, MapIcon, Zap, Wifi } from "lucide-react";

export default function SystemMonitoringPage() {
  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-purple-500">Infrastructure</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            System <span className="text-purple-500">Monitoring</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <HealthPanel title="API Services" value="Operational" icon={Server} status="good" />
        <HealthPanel title="Realtime Supabase" value="1,284 Active" icon={Activity} status="good" pulsing />
        <HealthPanel title="Edge Functions" value="Healthy" icon={Zap} status="good" />
        <HealthPanel title="Database Usage" value="72% Load" icon={Database} status="warning" />
        <HealthPanel title="Sensor Network" value="Syncing" icon={Wifi} status="good" />
        <HealthPanel title="GIS Map Servers" value="Operational" icon={MapIcon} status="good" />
        <HealthPanel title="MQTT Telemetry" value="Connected" icon={Cloud} status="good" />
        <HealthPanel title="WebSocket Mesh" value="Stable" icon={Activity} status="good" />
      </div>

      <div className="space-y-6">
        <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-foreground">Live Telemetry Event Stream</h3>
        <div className="premium-card p-6 h-[400px] overflow-hidden flex flex-col relative bg-[#F8FAF9]">
           <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#F8FAF9] to-transparent z-10" />
           <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#F8FAF9] to-transparent z-10" />
           <div className="flex-1 overflow-hidden relative">
              <div className="space-y-4 animate-[scroll_20s_linear_infinite] hover:[animation-play-state:paused]">
                 <EventRow time="10:45:01" source="Govt Node" message="Verification batch approved" type="success" />
                 <EventRow time="10:45:04" source="Edge AI" message="Sensor data fusion complete (Pune Zone)" type="info" />
                 <EventRow time="10:45:12" source="Supabase" message="User login detected (Analyst_09)" type="info" />
                 <EventRow time="10:45:18" source="MQTT Broker" message="Node XYZ-12 lost connection" type="error" />
                 <EventRow time="10:45:22" source="Insurance" message="Claim CLM-2045 marked for settlement" type="warning" />
                 <EventRow time="10:45:30" source="GIS Server" message="New NDVI heatmap layer generated" type="info" />
                 <EventRow time="10:45:41" source="Farmer App" message="Image upload complete (Crop failure)" type="info" />
                 <EventRow time="10:45:45" source="Govt Node" message="Verification batch approved" type="success" />
                 <EventRow time="10:45:48" source="Edge AI" message="Sensor data fusion complete (Nashik Zone)" type="info" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function HealthPanel({ title, value, icon: Icon, status, pulsing }: any) {
  const isGood = status === 'good';
  const color = isGood ? 'text-emerald-500' : 'text-amber-500';
  const bg = isGood ? 'bg-emerald-50' : 'bg-amber-50';

  return (
    <div className="premium-card p-6 flex flex-col justify-between min-h-[140px]">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center ${color} relative`}>
          <Icon size={20} />
          {pulsing && <div className="absolute inset-0 border-2 border-current opacity-20 rounded-2xl animate-ping" />}
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isGood ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
           {status}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold text-text-soft mb-1">{title}</p>
        <h3 className={`font-jetbrains font-extrabold tracking-tighter text-xl ${color}`}>{value}</h3>
      </div>
    </div>
  );
}

function EventRow({ time, source, message, type }: any) {
   const colorMap: any = {
      success: 'text-emerald-500 bg-emerald-50',
      info: 'text-blue-500 bg-blue-50',
      error: 'text-rose-500 bg-rose-50',
      warning: 'text-amber-500 bg-amber-50'
   };

   return (
      <div className="flex items-center gap-4 p-3 rounded-xl bg-white border border-border shadow-sm">
         <div className="font-jetbrains text-xs font-bold text-text-soft">{time}</div>
         <div className={`px-2 py-1 rounded text-[10px] font-black uppercase ${colorMap[type]}`}>{source}</div>
         <div className="text-sm font-medium text-foreground">{message}</div>
      </div>
   )
}
