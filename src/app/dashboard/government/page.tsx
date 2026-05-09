"use client";

import { useState } from "react";
import { 
  Activity, MapPin, AlertTriangle, ShieldCheck, PieChart, TrendingUp 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, LineChart, Line 
} from "recharts";

const DISTRICT_DATA = [
  { name: "Pune", loss: 12, alerts: 12, floodRisk: 68, cropHealth: 82, verifications: 21 },
  { name: "Nashik", loss: 18, alerts: 24, floodRisk: 45, cropHealth: 76, verifications: 34 },
  { name: "Nagpur", loss: 9, alerts: 8, floodRisk: 30, cropHealth: 90, verifications: 12 },
  { name: "Kolhapur", loss: 22, alerts: 30, floodRisk: 85, cropHealth: 60, verifications: 45 },
  { name: "Satara", loss: 5, alerts: 4, floodRisk: 20, cropHealth: 92, verifications: 8 },
  { name: "Aurangabad", loss: 14, alerts: 18, floodRisk: 55, cropHealth: 78, verifications: 26 }
];

const TREND_DATA = [
  { day: "Mon", alerts: 42 },
  { day: "Tue", alerts: 58 },
  { day: "Wed", alerts: 45 },
  { day: "Thu", alerts: 70 },
  { day: "Fri", alerts: 65 },
  { day: "Sat", alerts: 85 },
  { day: "Sun", alerts: 96 }
];

export default function GovernmentDashboard() {
  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500">Command Center</p>
          </div>
          <h1 className="text-7xl font-manrope font-extrabold tracking-tighter text-foreground leading-[0.8]">
            State <span className="text-indigo-500">Analytics</span>
          </h1>
          <p className="text-lg text-text-soft font-medium max-w-xl">
             Real-time agricultural disaster monitoring and verification.
          </p>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <KPICard label="Total Area Monitored" value="12,540 Acres" icon={MapPin} color="text-indigo-500" trend="+4.2%" />
        <KPICard label="Estimated Loss Risk" value="₹ 4.2 Cr" icon={PieChart} color="text-rose-500" trend="+12%" />
        <KPICard label="Active Verifications" value="48 Pending" icon={ShieldCheck} color="text-amber-500" pulsing />
        <KPICard label="Districts Monitored" value="16 Districts" icon={Activity} color="text-emerald-500" />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        <div className="premium-card p-8 h-[400px]">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-soft mb-8">Loss Risk by District (₹ Lakhs)</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={DISTRICT_DATA}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94A3B8" }} />
              <Tooltip cursor={{ fill: "rgba(16, 185, 129, 0.05)" }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="loss" fill="#10B981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="premium-card p-8 h-[400px]">
          <h3 className="text-sm font-black uppercase tracking-widest text-text-soft mb-8">District Wise Alerts Trend</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={TREND_DATA}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94A3B8" }} />
              <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="alerts" stroke="#6366F1" strokeWidth={4} dot={{ r: 6, fill: "#6366F1", strokeWidth: 4, stroke: "#fff" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regional Breakdown */}
      <div className="space-y-6">
        <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-foreground">Regional Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DISTRICT_DATA.map((district) => (
            <div key={district.name} className="premium-card p-8 hover:-translate-y-1 transition-transform cursor-pointer">
              <h4 className="text-xl font-manrope font-extrabold mb-6">{district.name}</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-text-soft uppercase tracking-wider">Active Alerts</span>
                  <span className="text-sm font-jetbrains font-bold text-rose-500">{district.alerts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-text-soft uppercase tracking-wider">Flood Risk</span>
                  <span className={`text-sm font-jetbrains font-bold ${district.floodRisk > 50 ? 'text-rose-500' : 'text-emerald-500'}`}>{district.floodRisk}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-text-soft uppercase tracking-wider">Crop Health</span>
                  <span className="text-sm font-jetbrains font-bold text-emerald-500">{district.cropHealth}%</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <span className="text-xs font-bold text-text-soft uppercase tracking-wider">Verifications</span>
                  <span className="text-sm font-jetbrains font-bold text-indigo-500">{district.verifications}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, icon: Icon, color, trend, pulsing }: any) {
  return (
    <div className="premium-card p-8 flex flex-col justify-between min-h-[180px]">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl bg-surface-soft flex items-center justify-center ${color} relative`}>
          <Icon size={20} />
          {pulsing && <div className="absolute inset-0 border-2 border-current opacity-20 rounded-2xl animate-ping" />}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[10px] font-black tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1.5 rounded-full">
            <TrendingUp size={12} /> {trend}
          </div>
        )}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-soft mb-2">{label}</p>
        <h3 className="font-jetbrains font-extrabold tracking-tighter text-foreground text-3xl">{value}</h3>
      </div>
    </div>
  );
}
