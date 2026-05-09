"use client";

import { useState } from "react";
import { Check, X, Eye, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const VERIFICATIONS = [
  { id: 1, land: "Green Valley", farmer: "Ramesh", district: "Pune", status: "Pending" },
  { id: 2, land: "Sunrise Acres", farmer: "Suresh", district: "Nashik", status: "Pending" },
  { id: 3, land: "Golden Harvest", farmer: "Mahesh", district: "Satara", status: "Pending" },
  { id: 4, land: "RiverSide Farms", farmer: "Kiran", district: "Kolhapur", status: "Pending" },
  { id: 5, land: "EcoField Lands", farmer: "Arjun", district: "Nagpur", status: "Pending" },
  { id: 6, land: "GreenRoots Farm", farmer: "Vijay", district: "Pune", status: "Pending" },
  { id: 7, land: "AgroNova Fields", farmer: "Rajesh", district: "Aurangabad", status: "Pending" },
  { id: 8, land: "Harvest Bloom", farmer: "Prakash", district: "Solapur", status: "Pending" },
  { id: 9, land: "NatureNest Farm", farmer: "Anand", district: "Ahmednagar", status: "Pending" },
];

export default function AnalystVerificationPage() {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-500">Analyst Review</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            Verification <span className="text-blue-500">Queue</span>
          </h1>
        </div>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-soft/50 border-b border-border/50">
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">Land Name</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">Farmer Name</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">District</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">Status</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {VERIFICATIONS.map((v) => (
                <tr key={v.id} className="hover:bg-surface-soft/30 transition-colors">
                  <td className="p-6 font-bold text-foreground">{v.land}</td>
                  <td className="p-6 font-medium text-text-soft">{v.farmer}</td>
                  <td className="p-6 font-medium text-text-soft">{v.district}</td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-600 font-bold text-xs rounded-full uppercase tracking-widest">
                      {v.status}
                    </span>
                  </td>
                  <td className="p-6 flex justify-end gap-3">
                    <Button variant="ghost" size="icon" onClick={() => setSelected(v)} className="h-10 w-10 text-blue-500 bg-blue-50 hover:bg-blue-100 rounded-xl" title="View Details">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-emerald-500 bg-emerald-50 hover:bg-emerald-100 rounded-xl" title="Approve">
                      <Check size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl" title="Reject">
                      <X size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-indigo-500 bg-indigo-50 hover:bg-indigo-100 rounded-xl" title="Forward to Certification">
                      <Send size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <div className="bg-white rounded-[32px] w-full max-w-4xl p-10 relative overflow-hidden" onClick={e => e.stopPropagation()}>
               <div className="absolute top-0 left-0 w-full h-2 bg-blue-500" />
               <button onClick={() => setSelected(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-soft">
                  <X size={20} />
               </button>
               
               <h2 className="text-3xl font-manrope font-extrabold mb-8">Verification Details: {selected.land}</h2>
               
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                     <h4 className="text-sm font-black uppercase tracking-widest text-text-soft">GIS & Drone Preview</h4>
                     <div className="h-48 rounded-2xl bg-surface-soft border border-border flex items-center justify-center overflow-hidden relative group">
                        <img src="https://images.unsplash.com/photo-1595844730298-b960fa31e1fb?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform" />
                        <span className="relative z-10 bg-white/90 px-4 py-2 rounded-full text-xs font-bold shadow-sm">NDVI Heatmap View</span>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                     <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-text-soft mb-2">Sensor Metrics</h4>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 rounded-xl bg-surface-soft"><span className="text-[10px] uppercase font-bold text-text-soft">Soil Moisture</span><p className="font-jetbrains font-bold text-lg">12% (DRY)</p></div>
                           <div className="p-4 rounded-xl bg-surface-soft"><span className="text-[10px] uppercase font-bold text-text-soft">Temperature</span><p className="font-jetbrains font-bold text-lg">36°C</p></div>
                        </div>
                     </div>
                     <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-text-soft mb-2">Field Officer Notes</h4>
                        <p className="text-sm font-medium text-foreground p-4 rounded-xl border border-border bg-white shadow-sm">
                           Severe heat stress observed. Leaves are wilting. Immediate irrigation subsidy validation recommended.
                        </p>
                     </div>
                     <div className="flex justify-end gap-4 mt-6">
                        <Button className="bg-emerald-500 text-white rounded-xl font-bold">Approve</Button>
                        <Button className="bg-blue-500 text-white rounded-xl font-bold">Forward to Certification</Button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
