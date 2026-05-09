"use client";

import { 
  Thermometer, Droplets, Cpu, AlertTriangle, MapPin, Zap 
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell 
} from "recharts";

const MOISTURE_TREND = [
  { time: "6 AM", value: 30 },
  { time: "9 AM", value: 45 },
  { time: "12 PM", value: 60 },
  { time: "3 PM", value: 55 },
  { time: "6 PM", value: 40 },
  { time: "9 PM", value: 25 },
];

const ENV_TREND = [
  { time: "6 AM", temp: 24, humidity: 80 },
  { time: "12 PM", temp: 35, humidity: 45 },
  { time: "6 PM", temp: 28, humidity: 65 },
  { time: "12 AM", temp: 22, humidity: 85 },
];

const RISK_DATA = [
  { name: 'Healthy', value: 400, color: '#10B981' },
  { name: 'Moderate', value: 300, color: '#F59E0B' },
  { name: 'Critical', value: 100, color: '#F43F5E' },
];

export default function AnalystDashboard() {
  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-500">Analyst Platform</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            Intelligence <span className="text-blue-500">Dashboard</span>
          </h1>
          <p className="text-lg text-text-soft font-medium max-w-xl">
             Real-time agricultural telemetry and verification monitoring.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <SensorCard label="Soil Value" value="4095" icon={Cpu} color="text-amber-600" />
        <SensorCard label="Temperature" value="30.9°C" icon={Thermometer} color="text-rose-500" />
        <SensorCard label="Humidity" value="63.5%" icon={Droplets} color="text-blue-500" />
        <SensorCard label="Soil Status" value="DRY" icon={AlertTriangle} color="text-rose-500" />
        <SensorCard label="LED Status" value="RED ON" icon={Zap} color="text-rose-500" />
        <SensorCard label="GPS Coord" value="18.5°N, 73.8°E" icon={MapPin} color="text-emerald-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-10">
          <div className="premium-card p-8 h-[400px]">
            <h3 className="text-sm font-black uppercase tracking-widest text-text-soft mb-8">Soil Moisture Trend</h3>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={MOISTURE_TREND}>
                <defs>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94A3B8" }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={4} fillOpacity={1} fill="url(#colorMoisture)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="premium-card p-8 h-[400px]">
            <h3 className="text-sm font-black uppercase tracking-widest text-text-soft mb-8">Environment Trend (Temp & Humidity)</h3>
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={ENV_TREND}>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94A3B8" }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                <Line type="monotone" dataKey="temp" stroke="#F43F5E" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} />
                <Line type="monotone" dataKey="humidity" stroke="#3B82F6" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-4">
          <div className="premium-card p-8 h-full flex flex-col items-center justify-center">
            <h3 className="text-sm font-black uppercase tracking-widest text-text-soft mb-8 w-full text-left">Risk Level Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={RISK_DATA} innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value">
                  {RISK_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full mt-8 space-y-3">
              {RISK_DATA.map((item) => (
                <div key={item.name} className="flex justify-between items-center text-sm font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-text-soft">{item.name}</span>
                  </div>
                  <span className="font-jetbrains">{item.value} Nodes</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SensorCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="premium-card p-6 flex flex-col justify-between h-full min-h-[140px] hover:scale-105 transition-transform cursor-pointer">
      <div className={`w-10 h-10 rounded-xl bg-surface-soft flex items-center justify-center ${color} mb-4`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-text-soft opacity-60 leading-none mb-1">{label}</p>
        <h3 className="font-jetbrains font-extrabold tracking-tighter text-foreground text-xl">
          {value}
        </h3>
      </div>
    </div>
  );
}
