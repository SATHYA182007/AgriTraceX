"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Layers, AlertCircle } from "lucide-react";

// Use Leaflet Map
const ParcelMap = dynamic(() => import('@/components/maps/ParcelMap'), { ssr: false });

const FARMER_MARKERS = [
  { id: 1, name: "Green Valley", lat: 18.5204, lng: 73.8567, farmer: "Ramesh", district: "Pune", status: "Claim Active", risk: "High", health: "92%", crop: "Wheat", area_ha: 2.5 },
  { id: 2, name: "Sunrise Acres", lat: 19.9975, lng: 73.7898, farmer: "Suresh", district: "Nashik", status: "Stable", risk: "Low", health: "70%", crop: "Grapes", area_ha: 4.1 },
  { id: 3, name: "Golden Harvest", lat: 17.6805, lng: 74.0183, farmer: "Mahesh", district: "Satara", status: "Under Review", risk: "Critical", health: "45%", crop: "Sugarcane", area_ha: 5.0 },
];

export default function InsuranceMapPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto stagger-in h-[calc(100vh-120px)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 shrink-0">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-rose-500">Risk Assessment Map</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            Realtime <span className="text-rose-500">Claims Map</span>
          </h1>
        </div>
        <div className="flex gap-4">
           <Button className="bg-white text-foreground border border-border shadow-sm rounded-xl font-bold gap-2">
              <Layers size={18} /> Satellite View
           </Button>
           <Button className="bg-rose-500 text-white shadow-xl shadow-rose-500/20 rounded-xl font-bold gap-2">
              <AlertCircle size={18} /> Claims Overlay
           </Button>
        </div>
      </div>

      <div className="flex-1 rounded-[32px] overflow-hidden bg-white border border-[#EEF2EE] shadow-soft relative group">
         <ParcelMap parcels={FARMER_MARKERS} height="100%" />
         <div className="absolute top-8 left-8 z-10 space-y-4">
            <div className="px-6 py-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-border shadow-soft">
               <h4 className="text-xs font-black uppercase tracking-widest text-text-soft mb-3">Live Risk Matrix</h4>
               <div className="space-y-2">
                  <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-emerald-500" /> <span className="text-sm font-bold">Safe (1,240)</span></div>
                  <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-amber-500" /> <span className="text-sm font-bold">Moderate (450)</span></div>
                  <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" /> <span className="text-sm font-bold text-rose-500">High Claim Risk (84)</span></div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
