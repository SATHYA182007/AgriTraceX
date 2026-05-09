"use client";

import { motion } from "framer-motion";
import { 
  Droplets, 
  Thermometer, 
  Sun, 
  TrendingUp, 
  Activity,
  Leaf,
  Scan,
  Database,
  Search,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

// Dynamic import for Recharts to avoid SSR issues
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });
const AreaChart = dynamic(() => import('recharts').then(mod => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import('recharts').then(mod => mod.Area), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });

const MOCK_HEALTH_DATA = [
  { date: "01 May", ndvi: 0.65, moisture: 22 },
  { date: "02 May", ndvi: 0.68, moisture: 24 },
  { date: "03 May", ndvi: 0.70, moisture: 23 },
  { date: "04 May", ndvi: 0.72, moisture: 25 },
  { date: "05 May", ndvi: 0.71, moisture: 24 },
  { date: "06 May", ndvi: 0.73, moisture: 22 },
  { date: "07 May", ndvi: 0.72, moisture: 24 },
];

export default function CropHealthPage() {
  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Intelligence Node: Health-01</p>
          </div>
          <h1 className="text-7xl font-sora font-black tracking-tighter text-foreground leading-[0.8]">
            Vegetation <span className="text-primary">Vigor</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-xl">
             Multispectral deep-scan of chlorophyll density and hydration indices for Sector 4-A1.
          </p>
        </div>

        <div className="flex gap-4">
           <Button className="h-16 px-10 bg-primary text-white rounded-3xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-4">
              <Scan size={20} /> Initiate Deep Scan
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
         {/* Main Vigor Analysis */}
         <div className="xl:col-span-8 space-y-8">
            <div className="glass-card rounded-[3rem] p-12 relative overflow-hidden border-4 border-white">
               <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                  <Activity size={300} className="text-primary" />
               </div>

               <div className="flex items-center justify-between mb-12 relative z-10">
                  <div className="space-y-1">
                     <h3 className="text-[12px] font-black tracking-[0.4em] text-foreground uppercase">NDVI Satellite Trend</h3>
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Sensor: Sentinel-2 Path A</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-none font-black text-[10px] px-4 py-2 rounded-full uppercase tracking-widest">Optimal Growth Range</Badge>
               </div>

               <div className="h-[450px] relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={MOCK_HEALTH_DATA}>
                        <defs>
                           <linearGradient id="colorNdvi" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" strokeOpacity={0.5} />
                        <XAxis 
                           dataKey="date" 
                           axisLine={false} 
                           tickLine={false} 
                           tick={{ fontSize: 10, fontWeight: 900, fill: '#64748B', letterSpacing: '0.1em' }} 
                        />
                        <YAxis hide domain={['dataMin - 0.1', 'dataMax + 0.1']} />
                        <Tooltip 
                           contentStyle={{ 
                              borderRadius: '24px', 
                              border: 'none', 
                              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', 
                              fontWeight: 900,
                              padding: '16px 24px',
                              background: 'rgba(255, 255, 255, 0.9)',
                              backdropFilter: 'blur(20px)'
                           }}
                        />
                        <Area 
                           type="monotone" 
                           dataKey="ndvi" 
                           stroke="#22C55E" 
                           strokeWidth={4} 
                           fillOpacity={1} 
                           fill="url(#colorNdvi)" 
                           animationDuration={2000}
                        />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="glass-card rounded-[3rem] p-10 space-y-8">
                  <h3 className="text-[11px] font-black tracking-[0.3em] text-foreground uppercase opacity-60">Hydration Index (EVI)</h3>
                  <div className="h-[250px]">
                     <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={MOCK_HEALTH_DATA}>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" strokeOpacity={0.3} />
                           <XAxis 
                              dataKey="date" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fontSize: 9, fontWeight: 900, fill: '#94A3B8' }} 
                           />
                           <Tooltip 
                              contentStyle={{ borderRadius: '20px', border: 'none', background: 'rgba(255,255,255,0.9)' }}
                           />
                           <Line 
                              type="stepAfter" 
                              dataKey="moisture" 
                              stroke="#3B82F6" 
                              strokeWidth={3} 
                              dot={{ r: 6, fill: "#3B82F6", strokeWidth: 3, stroke: "#fff" }} 
                              animationDuration={2500}
                           />
                        </LineChart>
                     </ResponsiveContainer>
                  </div>
               </div>

               <div className="glass-card rounded-[3rem] p-10 flex flex-col justify-center items-center text-center space-y-6">
                  <div className="w-20 h-20 rounded-[2rem] bg-secondary flex items-center justify-center text-primary shadow-soft">
                     <ShieldCheck size={40} className="animate-pulse" />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-2xl font-sora font-black text-foreground leading-none">Security Lock</h3>
                     <p className="text-sm font-medium text-muted-foreground">No anomalies or biotic stress detected in current cycle.</p>
                  </div>
                  <Badge variant="outline" className="border-primary/20 text-primary font-black text-[10px] px-6 py-2 rounded-full uppercase tracking-widest">System Stable</Badge>
               </div>
            </div>
         </div>

         {/* Right Sidebar: Diagnostics */}
         <div className="xl:col-span-4 flex flex-col gap-8">
            <div className="glass-card rounded-[3rem] p-10 space-y-10 flex-1 relative overflow-hidden">
               <div className="space-y-2 relative z-10">
                  <h3 className="text-[12px] font-black tracking-[0.4em] text-foreground uppercase">Field Diagnostics</h3>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Ground Sensor Array Sync</p>
               </div>

               <div className="space-y-6 relative z-10">
                  <DiagnosticCard label="Chlorophyll Level" value="High Vigor" sub="0.84 NDVI" icon={Leaf} color="text-emerald-500" />
                  <DiagnosticCard label="Pest Probability" value="Minimal" sub="< 2.1%" icon={Scan} color="text-blue-500" />
                  <DiagnosticCard label="Nitrogen Level" value="Optimal" sub="Stable" icon={Database} color="text-indigo-500" />
                  <DiagnosticCard label="Hydration Node" value="Nominal" sub="32% Avg" icon={Droplets} color="text-blue-500" />
               </div>

               <div className="pt-6 relative z-10">
                  <Button className="w-full h-16 rounded-[2rem] bg-foreground text-white font-black uppercase tracking-widest text-[11px] shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-4 group">
                     Full Technical Audit
                     <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function DiagnosticCard({ label, value, sub, icon: Icon, color }: any) {
  return (
    <div className="p-8 rounded-[2rem] bg-secondary/20 border border-white hover:bg-secondary/40 transition-all group flex items-center gap-6">
       <div className={`w-14 h-14 rounded-2xl bg-white shadow-soft flex items-center justify-center ${color} border border-white/50 group-hover:rotate-6 transition-transform duration-500`}>
          <Icon size={24} />
       </div>
       <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60 mb-1">{label}</p>
          <div className="flex items-baseline gap-3">
             <h4 className="text-xl font-sora font-black text-foreground leading-none">{value}</h4>
             <span className="text-[9px] font-black text-muted-foreground uppercase font-jetbrains">{sub}</span>
          </div>
       </div>
    </div>
  );
}
