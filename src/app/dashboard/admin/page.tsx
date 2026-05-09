"use client";

import { Users, Server, Activity, Globe, Database, ShieldCheck } from "lucide-react";
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell 
} from "recharts";

const GROWTH_TREND = [
  { month: "Jan", users: 4000, sessions: 2400 },
  { month: "Feb", users: 5000, sessions: 3398 },
  { month: "Mar", users: 6500, sessions: 4800 },
  { month: "Apr", users: 8200, sessions: 6908 },
  { month: "May", users: 10500, sessions: 8500 },
  { month: "Jun", users: 12458, sessions: 11200 },
];

const LOAD_DATA = [
  { time: "00:00", api: 1200, traffic: 800 },
  { time: "04:00", api: 800, traffic: 500 },
  { time: "08:00", api: 4500, traffic: 3200 },
  { time: "12:00", api: 8900, traffic: 6700 },
  { time: "16:00", api: 6500, traffic: 4800 },
  { time: "20:00", api: 3400, traffic: 2100 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-purple-500">Root Access</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            Platform <span className="text-purple-500">Operations</span>
          </h1>
          <p className="text-lg text-text-soft font-medium max-w-xl">
             Realtime platform health and monitoring command center.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <KPICard label="Total Platform Users" value="12,458" icon={Users} color="text-purple-500" />
        <KPICard label="Active Realtime Sessions" value="1,284" icon={Activity} color="text-emerald-500" pulsing />
        <KPICard label="Total Monitored Lands" value="8,742" icon={Globe} color="text-blue-500" />
        <KPICard label="Platform Health" value="99.8%" icon={Server} color="text-emerald-500" />
        <KPICard label="Total Claims Processed" value="4,852" icon={Database} color="text-amber-500" />
        <KPICard label="Active GIS Zones" value="126" icon={Globe} color="text-indigo-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-6">
          <div className="premium-card p-8 h-[400px]">
            <h3 className="text-sm font-black uppercase tracking-widest text-text-soft mb-8">User Growth Trend</h3>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={GROWTH_TREND}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94A3B8" }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="users" stroke="#A855F7" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} />
                <Line type="monotone" dataKey="sessions" stroke="#10B981" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-6">
          <div className="premium-card p-8 h-[400px]">
            <h3 className="text-sm font-black uppercase tracking-widest text-text-soft mb-8">System Load Analytics</h3>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={LOAD_DATA}>
                <defs>
                  <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94A3B8" }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="api" stroke="#3B82F6" strokeWidth={4} fillOpacity={1} fill="url(#colorApi)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-foreground">Platform Distribution Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
           <DistributionCard role="Farmers" count="10,245" active="984" color="bg-emerald-50 text-emerald-600" border="border-emerald-500" />
           <DistributionCard role="Field Officers" count="840" active="156" color="bg-blue-50 text-blue-600" border="border-blue-500" />
           <DistributionCard role="Analysts" count="342" active="89" color="bg-amber-50 text-amber-600" border="border-amber-500" />
           <DistributionCard role="Insurance Mgrs" count="124" active="42" color="bg-rose-50 text-rose-600" border="border-rose-500" />
           <DistributionCard role="Govt Authorities" count="56" active="12" color="bg-indigo-50 text-indigo-600" border="border-indigo-500" />
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, icon: Icon, color, pulsing }: any) {
  return (
    <div className="premium-card p-6 flex flex-col justify-between min-h-[140px]">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-10 h-10 rounded-xl bg-surface-soft flex items-center justify-center ${color} relative`}>
          <Icon size={18} />
          {pulsing && <div className="absolute inset-0 border-2 border-current opacity-20 rounded-xl animate-ping" />}
        </div>
      </div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-soft mb-1 line-clamp-1">{label}</p>
        <h3 className="font-jetbrains font-extrabold tracking-tighter text-foreground text-2xl">{value}</h3>
      </div>
    </div>
  );
}

function DistributionCard({ role, count, active, color, border }: any) {
   return (
      <div className={`premium-card p-6 border-b-4 hover:-translate-y-1 transition-transform ${border}`}>
         <h4 className="text-sm font-black uppercase tracking-widest text-text-soft mb-4">{role}</h4>
         <div className="space-y-2">
            <div className="flex justify-between items-center"><span className="text-xs font-bold text-text-soft">Total Users</span><span className="font-jetbrains font-bold">{count}</span></div>
            <div className="flex justify-between items-center"><span className="text-xs font-bold text-text-soft">Active Today</span><span className={`px-2 py-1 rounded-md text-[10px] font-black ${color}`}>{active} Online</span></div>
         </div>
      </div>
   )
}
