"use client";

import { useState } from "react";
import { Download, Send, BadgeCheck, FileArchive, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const CERTIFICATIONS = [
  { id: "AGX-CERT-2045", land: "Green Valley", farmer: "Ramesh", district: "Pune", risk: "Low", health: "Good", date: "09 May 2026", status: "Verified" },
  { id: "AGX-CERT-2046", land: "Sunrise Acres", farmer: "Suresh", district: "Nashik", risk: "Moderate", health: "Fair", date: "09 May 2026", status: "Verified" },
];

export default function CertificationCenter() {
  const [selected, setSelected] = useState<any>(CERTIFICATIONS[0]);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
     setGenerating(true);
     setTimeout(() => setGenerating(false), 1500);
  };

  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-500">Core Analyst Feature</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            Certification <span className="text-emerald-500">Center</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
         <div className="xl:col-span-4 space-y-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-text-soft">Verified Queue</h3>
            <div className="space-y-4">
               {CERTIFICATIONS.map(cert => (
                  <div 
                     key={cert.id} 
                     onClick={() => setSelected(cert)}
                     className={`premium-card p-6 cursor-pointer border-2 transition-all ${selected?.id === cert.id ? 'border-emerald-500 shadow-xl' : 'border-transparent hover:border-border'}`}
                  >
                     <div className="flex justify-between items-start mb-4">
                        <BadgeCheck size={24} className="text-emerald-500" />
                        <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">{cert.status}</span>
                     </div>
                     <h4 className="font-manrope font-extrabold text-lg">{cert.land}</h4>
                     <p className="text-xs text-text-soft font-bold mb-4">{cert.farmer} • {cert.district}</p>
                     <p className="text-[10px] font-jetbrains text-text-soft">{cert.id}</p>
                  </div>
               ))}
            </div>
         </div>

         <div className="xl:col-span-8">
            {selected && (
               <div className="premium-card p-10 relative overflow-hidden h-full flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />
                  
                  <div className="relative z-10 space-y-10">
                     <div className="flex justify-between items-start border-b border-border/50 pb-8">
                        <div>
                           <h2 className="text-3xl font-manrope font-extrabold text-foreground mb-2">Digital Verification Seal</h2>
                           <p className="text-text-soft font-medium">Certificate ID: <span className="font-jetbrains font-bold text-foreground">{selected.id}</span></p>
                        </div>
                        <div className="w-24 h-24 rounded-full border-[6px] border-emerald-500 flex flex-col items-center justify-center text-emerald-500 rotate-12 bg-emerald-50/80 backdrop-blur-sm shadow-xl shadow-emerald-500/20">
                           <CheckCircle2 size={24} className="mb-1" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight">Verified<br/>AgriTrace</span>
                        </div>
                     </div>

                     <div className="grid grid-cols-2 gap-8">
                        <div><p className="text-xs font-black uppercase tracking-widest text-text-soft mb-1">Land Name</p><p className="font-bold text-lg">{selected.land}</p></div>
                        <div><p className="text-xs font-black uppercase tracking-widest text-text-soft mb-1">Risk Score</p><p className="font-bold text-lg">{selected.risk}</p></div>
                        <div><p className="text-xs font-black uppercase tracking-widest text-text-soft mb-1">Issued Date</p><p className="font-bold text-lg">{selected.date}</p></div>
                        <div><p className="text-xs font-black uppercase tracking-widest text-text-soft mb-1">Soil Health</p><p className="font-bold text-lg">{selected.health}</p></div>
                     </div>
                     
                     <div className="p-6 rounded-2xl bg-surface-soft border border-border flex items-center justify-between">
                        <div>
                           <p className="text-xs font-black uppercase tracking-widest text-text-soft mb-1">Analyst Signature</p>
                           <p className="font-cursive text-2xl text-foreground mt-2">Analyst Team Signature</p>
                        </div>
                        <div className="w-20 h-20 bg-white rounded-xl shadow-sm border border-border flex items-center justify-center text-[10px] font-black text-text-soft">
                           QR CODE
                        </div>
                     </div>
                  </div>

                  <div className="relative z-10 grid grid-cols-2 xl:grid-cols-4 gap-4 mt-12">
                     <Button onClick={handleGenerate} className="bg-emerald-500 text-white font-bold rounded-xl h-12 flex gap-2 w-full">
                        {generating ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Download size={16} />}
                        PDF Certificate
                     </Button>
                     <Button variant="outline" className="font-bold rounded-xl h-12 flex gap-2 border-border bg-white text-foreground hover:bg-surface-soft w-full">
                        <Send size={16} /> Govt Portal
                     </Button>
                     <Button variant="outline" className="font-bold rounded-xl h-12 flex gap-2 border-border bg-white text-foreground hover:bg-surface-soft w-full">
                        <Send size={16} /> Bank API
                     </Button>
                     <Button className="bg-blue-500 text-white font-bold rounded-xl h-12 flex gap-2 w-full hover:bg-blue-600">
                        <FileArchive size={16} /> Subsidy Invoice
                     </Button>
                  </div>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
