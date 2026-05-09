"use client";

import { useState } from "react";
import { 
  FileText, ShieldAlert, BadgeIndianRupee, MapPin, Search, Check, X, RefreshCw, Send 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CLAIMS = [
  { id: "CLM-2045", farmer: "Ramesh / Green Valley", alert: "Flood Risk Detected", evidence: "Drone + NDVI Data", status: "Pending" },
  { id: "CLM-2046", farmer: "Suresh / Sunrise Acres", alert: "Soil Damage", evidence: "Sensor Evidence", status: "Pending" },
  { id: "CLM-2047", farmer: "Mahesh / Golden Harvest", alert: "Heat Stress", evidence: "GIS Analytics", status: "Pending" },
  { id: "CLM-2048", farmer: "Kiran / RiverSide Farms", alert: "Crop Failure", evidence: "Drone Imagery", status: "Pending" },
  { id: "CLM-2049", farmer: "Arjun / EcoField Lands", alert: "Drought Alert", evidence: "Satellite Evidence", status: "Pending" },
];

export default function InsuranceDashboard() {
  const [selectedClaim, setSelectedClaim] = useState<any>(null);

  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-rose-500">Indemnity Protocol</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            Risk <span className="text-rose-500">Management</span>
          </h1>
          <p className="text-lg text-text-soft font-medium max-w-xl">
             Real-time claims intelligence and verification command center.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <KPICard label="Total Policy Volume" value="₹ 48.5 Cr" icon={BadgeIndianRupee} color="text-rose-500" />
        <KPICard label="Pending Claims" value="126 Claims" icon={FileText} color="text-amber-500" pulsing />
        <KPICard label="Reserve Funds" value="₹ 12.8 Cr" icon={ShieldAlert} color="text-emerald-500" />
        <KPICard label="Active Risk Zones" value="18 Zones" icon={MapPin} color="text-indigo-500" />
      </div>

      <div className="space-y-6">
        <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-foreground">Claim Settlement Loop</h3>
        <div className="premium-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-soft/50 border-b border-border/50">
                  <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">Claim ID</th>
                  <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">Farmer & Parcel</th>
                  <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">Alert Context</th>
                  <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">Loss Evidence</th>
                  <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {CLAIMS.map((claim) => (
                  <tr key={claim.id} className="hover:bg-surface-soft/30 transition-colors">
                    <td className="p-6 font-jetbrains font-bold text-foreground">{claim.id}</td>
                    <td className="p-6 font-bold text-text-soft">{claim.farmer}</td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-rose-500/10 text-rose-600 font-bold text-xs rounded-full">{claim.alert}</span>
                    </td>
                    <td className="p-6 font-medium text-text-soft">{claim.evidence}</td>
                    <td className="p-6 flex justify-end gap-3">
                      <Button onClick={() => setSelectedClaim(claim)} className="bg-rose-50 hover:bg-rose-100 text-rose-500 font-bold rounded-xl gap-2">
                        <Search size={16} /> Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedClaim && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedClaim(null)}>
            <div className="bg-white rounded-[32px] w-full max-w-5xl p-10 relative overflow-hidden max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
               <div className="absolute top-0 left-0 w-full h-2 bg-rose-500" />
               <button onClick={() => setSelectedClaim(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-soft">
                  <X size={20} />
               </button>
               
               <h2 className="text-3xl font-manrope font-extrabold mb-2">Claim Details: {selectedClaim.id}</h2>
               <p className="text-text-soft font-bold mb-8">{selectedClaim.farmer}</p>
               
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-text-soft mb-2">Loss Evidence Visuals</h4>
                        <div className="h-48 rounded-2xl bg-surface-soft border border-border flex items-center justify-center overflow-hidden relative group">
                           <img src="https://images.unsplash.com/photo-1595844730298-b960fa31e1fb?auto=format&fit=crop&q=80&w=800" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform" />
                           <span className="relative z-10 bg-white/90 px-4 py-2 rounded-full text-xs font-bold shadow-sm">Drone + NDVI Overlay</span>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/10"><span className="text-[10px] uppercase font-bold text-rose-500">Estimated Damage</span><p className="font-jetbrains font-bold text-xl text-rose-500">68%</p></div>
                        <div className="p-4 rounded-xl bg-surface-soft"><span className="text-[10px] uppercase font-bold text-text-soft">Suggested Payout</span><p className="font-jetbrains font-bold text-xl">₹ 1.2 Lakhs</p></div>
                     </div>
                  </div>
                  
                  <div className="space-y-6">
                     <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-text-soft mb-2">Sensor & GIS Data</h4>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 rounded-xl bg-surface-soft"><span className="text-[10px] uppercase font-bold text-text-soft">GPS</span><p className="font-jetbrains font-bold text-sm">18.5204° N, 73.8567° E</p></div>
                           <div className="p-4 rounded-xl bg-surface-soft"><span className="text-[10px] uppercase font-bold text-text-soft">Timestamp</span><p className="font-jetbrains font-bold text-sm">09 May 2026, 14:30</p></div>
                        </div>
                     </div>
                     <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-text-soft mb-2">Verification Notes</h4>
                        <p className="text-sm font-medium text-foreground p-4 rounded-xl border border-border bg-white shadow-sm leading-relaxed">
                           Field officer confirms severe crop failure due to sudden flooding. Satellite imagery aligns with ground sensor water level spikes. Highly recommend swift settlement.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 pt-10 border-t border-border">
                  <Button className="bg-emerald-500 text-white font-bold rounded-xl h-12 flex gap-2">
                     <Check size={16} /> Approve Claim
                  </Button>
                  <Button variant="outline" className="text-rose-500 font-bold rounded-xl h-12 flex gap-2 border-rose-200 bg-rose-50 hover:bg-rose-100">
                     <X size={16} /> Reject Claim
                  </Button>
                  <Button variant="outline" className="font-bold rounded-xl h-12 flex gap-2 border-border bg-white text-foreground hover:bg-surface-soft">
                     <RefreshCw size={16} /> Reverification
                  </Button>
                  <Button className="bg-rose-500 text-white font-bold rounded-xl h-12 flex gap-2 hover:bg-rose-600">
                     <Send size={16} /> Generate Settlement
                  </Button>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}

function KPICard({ label, value, icon: Icon, color, pulsing }: any) {
  return (
    <div className="premium-card p-8 flex flex-col justify-between min-h-[160px]">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl bg-surface-soft flex items-center justify-center ${color} relative`}>
          <Icon size={20} />
          {pulsing && <div className="absolute inset-0 border-2 border-current opacity-20 rounded-2xl animate-ping" />}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-soft mb-2">{label}</p>
        <h3 className="font-jetbrains font-extrabold tracking-tighter text-foreground text-3xl">{value}</h3>
      </div>
    </div>
  );
}
