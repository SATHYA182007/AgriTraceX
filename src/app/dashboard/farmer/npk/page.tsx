"use client";

import { useState } from "react";
import { Database, Activity, TrendingUp, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

export default function NPKPage() {
  const [npk, setNpk] = useState({ n: 34, p: 34, k: 34 });

  return (
    <div className="space-y-12 max-w-[1400px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-manrope font-extrabold tracking-tighter text-foreground leading-tight">
            NPK <span className="text-primary">Intelligence</span>
          </h1>
          <p className="text-text-soft font-medium text-lg">Bio-chemical soil composition analysis.</p>
        </div>
        <Badge variant="outline" className="border-primary/20 text-primary font-black text-[12px] px-6 py-2 rounded-full uppercase tracking-[0.2em] h-fit">Optical Sensor Link Active</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <NPKDeepCard label="Nitrogen (N)" value={npk.n} status="Medium" color="text-emerald-500" desc="Essential for leaf growth and protein synthesis." />
        <NPKDeepCard label="Phosphorus (P)" value={npk.p} status="Optimal" color="text-blue-500" desc="Critical for root development and energy transfer." />
        <NPKDeepCard label="Potassium (K)" value={npk.k} status="Low" color="text-rose-500" desc="Key for water regulation and enzyme activation." />
      </div>

      <div className="premium-card p-12 bg-white space-y-8">
         <div className="flex items-center gap-4 text-primary">
            <TrendingUp size={24} />
            <h2 className="text-[12px] font-black tracking-[0.4em] uppercase text-foreground">Soil Chemistry Trends</h2>
         </div>
         <div className="h-64 flex items-end gap-1 px-4 relative">
            <div className="absolute inset-0 flex flex-col justify-between opacity-5">
               {[...Array(5)].map((_, i) => <div key={i} className="w-full h-px bg-foreground" />)}
            </div>
            {[...Array(24)].map((_, i) => {
               const h = 30 + Math.random() * 60;
               return (
                  <motion.div 
                     key={i}
                     initial={{ height: 0 }}
                     animate={{ height: `${h}%` }}
                     transition={{ delay: i * 0.05, duration: 1 }}
                     className="flex-1 bg-primary/10 rounded-t-lg relative group"
                  >
                     <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
                  </motion.div>
               );
            })}
         </div>
         <div className="flex justify-between text-[10px] font-black text-text-soft uppercase tracking-widest px-4">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:59</span>
         </div>
      </div>
    </div>
  );
}

function NPKDeepCard({ label, value, status, color, desc }: any) {
  return (
    <div className="premium-card p-12 space-y-10 group hover:border-primary/20 transition-all">
      <div className="flex items-center justify-between">
        <div className={`w-16 h-16 rounded-[2rem] bg-surface-soft flex items-center justify-center ${color} border border-border/50 group-hover:rotate-6 transition-transform duration-500`}>
          <Database size={28} />
        </div>
        <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${color} bg-current/5 px-4 py-2 rounded-full`}>
           Status: {status}
        </div>
      </div>

      <div className="space-y-6">
         <div className="flex items-baseline gap-3">
            <h3 className="text-6xl font-jetbrains font-extrabold tracking-tighter text-foreground">{value}</h3>
            <span className="text-sm font-bold text-text-soft uppercase">mg/kg</span>
         </div>
         <p className="text-[11px] font-black uppercase tracking-[0.3em] text-text-soft opacity-60 leading-none">{label}</p>
      </div>

      <div className="p-6 rounded-2xl bg-surface-soft border border-border/50 flex items-start gap-4">
         <Info size={16} className="text-text-soft mt-0.5 shrink-0" />
         <p className="text-xs text-text-soft font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
