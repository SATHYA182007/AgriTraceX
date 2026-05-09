"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Plus, Clock, CheckCircle2, XCircle, FileText, Download, Landmark, ShieldAlert, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MOCK_CLAIMS = [
  { id: '1', date: '02 May 2026', parcel: 'North Wing A1', amount: '₹1.2L', status: 'Verification', type: 'Moisture Stress' },
  { id: '2', date: '15 Apr 2026', parcel: 'East Slope C4', amount: '₹85k', status: 'Disbursed', type: 'Hail Protocol' },
];

export default function FarmerClaimsPage() {
  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Financial Node: CLM-Alpha</p>
          </div>
          <h1 className="text-7xl font-sora font-black tracking-tighter text-foreground leading-[0.8]">
            Indemnity <span className="text-primary">Portal</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-xl">
             Autonomous loss assessment and smart-contract based claim disbursement portal.
          </p>
        </div>

        <div className="flex gap-4">
           <Button className="h-16 px-10 bg-primary text-white rounded-3xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-4">
              <Plus size={20} /> File New Claim
           </Button>
        </div>
      </div>

      {/* Strategic KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="glass-card rounded-[3rem] p-10 space-y-6 bg-foreground text-white border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
               <ShieldCheck size={120} />
            </div>
            <div className="relative z-10 space-y-6">
               <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary/80">Active Coverage</p>
               <div className="flex items-baseline gap-4">
                  <h3 className="text-5xl font-sora font-black tracking-tighter">₹12.5L</h3>
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">Total Security Value</span>
               </div>
               <Badge className="bg-primary text-white border-none font-black text-[9px] px-4 py-1.5 uppercase tracking-widest rounded-full">Tier 1 Protection</Badge>
            </div>
         </div>

         <AdminKPICard label="Avg. Settlement" value="48h" sub="Autonomous Processing" icon={Clock} color="text-primary" />
         <AdminKPICard label="Pending Payout" value="₹1.2L" sub="Verification Stage" icon={Landmark} color="text-blue-500" />
      </div>

      <div className="space-y-8">
         <div className="flex items-center justify-between">
            <h2 className="text-[12px] font-black tracking-[0.4em] text-foreground uppercase flex items-center gap-4">
               <ShieldAlert size={20} className="text-primary" />
               Claim Pipeline
            </h2>
         </div>

         <div className="grid grid-cols-1 gap-6">
            {MOCK_CLAIMS.map((claim) => (
               <div key={claim.id} className="p-10 rounded-[3rem] bg-white border-4 border-white shadow-soft hover:shadow-2xl transition-all group flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="flex items-center gap-8">
                     <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center bg-secondary shadow-soft border border-white group-hover:rotate-6 transition-transform duration-500 ${claim.status === 'Disbursed' ? 'text-primary' : 'text-amber-500'}`}>
                        <ShieldCheck size={32} />
                     </div>
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60 leading-none">Node: {claim.parcel} — {claim.type}</p>
                        <h4 className="text-2xl font-sora font-black text-foreground leading-none">{claim.date} / CLM-505-{claim.id}</h4>
                     </div>
                  </div>

                  <div className="flex items-center gap-12 text-right">
                     <div className="space-y-2">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40 leading-none">Indemnity Value</p>
                        <p className="text-3xl font-jetbrains font-black text-foreground leading-none">{claim.amount}</p>
                     </div>
                     <div className="space-y-2 min-w-[140px]">
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40 leading-none">Pipeline Status</p>
                        <Badge className={`text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full border-none ${claim.status === 'Disbursed' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-amber-100 text-amber-600'}`}>
                           {claim.status}
                        </Badge>
                     </div>
                     <Button variant="ghost" size="icon" className="h-16 w-16 rounded-[2rem] bg-secondary/30 text-primary hover:bg-primary hover:text-white transition-all group">
                        <Download size={24} className="group-hover:scale-110 transition-transform" />
                     </Button>
                  </div>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}

function AdminKPICard({ label, value, sub, icon: Icon, color }: any) {
  return (
    <div className="glass-card rounded-[3rem] p-10 space-y-6 group transition-all hover:scale-[1.03] hover:shadow-2xl">
      <div className={`w-16 h-16 rounded-[1.5rem] bg-white shadow-soft flex items-center justify-center ${color} border border-white/50 group-hover:rotate-6 transition-transform duration-500`}>
        <Icon size={28} />
      </div>
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2 opacity-60">{label}</p>
        <div className="flex items-baseline gap-4">
           <h3 className="text-5xl font-sora font-black tracking-tighter text-foreground leading-none">{value}</h3>
           <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">{sub}</span>
        </div>
      </div>
    </div>
  );
}
