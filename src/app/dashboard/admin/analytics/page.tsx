"use client";

import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

const SENSOR_TRAFFIC = [
  { name: 'Jan', data: 4000 },
  { name: 'Feb', data: 3000 },
  { name: 'Mar', data: 2000 },
  { name: 'Apr', data: 2780 },
  { name: 'May', data: 1890 },
  { name: 'Jun', data: 2390 },
  { name: 'Jul', data: 3490 },
];

const CLAIMS_DATA = [
  { name: 'Processed', value: 4852, color: '#10B981' },
  { name: 'Pending', value: 342, color: '#F59E0B' },
  { name: 'Rejected', value: 120, color: '#F43F5E' },
];

const API_USAGE = [
  { day: 'Mon', requests: 120000 },
  { day: 'Tue', requests: 150000 },
  { day: 'Wed', requests: 180000 },
  { day: 'Thu', requests: 140000 },
  { day: 'Fri', requests: 190000 },
  { day: 'Sat', requests: 220000 },
  { day: 'Sun', requests: 250000 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-purple-500">Platform Intelligence</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            System <span className="text-purple-500">Analytics</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-10">
          <div className="premium-card p-8 h-[400px]">
            <h3 className="text-sm font-black uppercase tracking-widest text-text-soft mb-8">Sensor Data Traffic Volume (TB)</h3>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={SENSOR_TRAFFIC}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94A3B8" }} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="data" stroke="#10B981" strokeWidth={4} fillOpacity={1} fill="url(#colorTraffic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="premium-card p-8 h-[400px]">
             <h3 className="text-sm font-black uppercase tracking-widest text-text-soft mb-8">API & Edge Function Requests</h3>
             <ResponsiveContainer width="100%" height="80%">
               <BarChart data={API_USAGE}>
                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94A3B8" }} />
                 <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} cursor={{ fill: 'transparent' }} />
                 <Bar dataKey="requests" fill="#A855F7" radius={[8, 8, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-10">
          <div className="premium-card p-8 flex flex-col justify-center min-h-[400px]">
            <h3 className="text-sm font-black uppercase tracking-widest text-text-soft mb-8 w-full text-left">Claims Processing Status</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={CLAIMS_DATA} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {CLAIMS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="w-full mt-8 space-y-4">
              {CLAIMS_DATA.map((item) => (
                <div key={item.name} className="flex justify-between items-center text-sm font-bold">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-text-soft">{item.name}</span>
                  </div>
                  <span className="font-jetbrains text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
