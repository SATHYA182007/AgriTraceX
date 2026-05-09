"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Layers, Activity, Users } from "lucide-react";

// Use Leaflet Map
const ParcelMap = dynamic(() => import('@/components/maps/ParcelMap'), { ssr: false });

// Reusing farmer markers but acting as mixed user cluster
const USER_MARKERS = [
  { id: 1, name: "Ramesh Patil", lat: 18.5204, lng: 73.8567, farmer: "Farmer", district: "Pune", status: "Active", risk: "Safe", health: "Monitoring Crop Health", crop: "Wheat", area_ha: 2.5 },
  { id: 2, name: "Suresh Kumar", lat: 19.9975, lng: 73.7898, farmer: "Field Officer", district: "Nashik", status: "Active", risk: "Safe", health: "On-site Verification", crop: "N/A", area_ha: 0 },
  { id: 3, name: "Priya Sharma", lat: 17.6805, lng: 74.0183, farmer: "Analyst", district: "Satara", status: "Active", risk: "Safe", health: "Reviewing Claims", crop: "N/A", area_ha: 0 },
  { id: 4, name: "Kiran Joshi", lat: 18.8204, lng: 74.8567, farmer: "Insurance Mgr", district: "Ahmednagar", status: "Active", risk: "Safe", health: "Processing Settlements", crop: "N/A", area_ha: 0 },
];

export default function AdminMapPage() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto stagger-in h-[calc(100vh-120px)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 shrink-0">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-purple-500">Fleet Operations</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            GIS <span className="text-purple-500">Global Map</span>
          </h1>
        </div>
        <div className="flex gap-4">
           <Button className="bg-white text-foreground border border-border shadow-sm rounded-xl font-bold gap-2">
              <Layers size={18} /> Base Map
           </Button>
           <Button className="bg-white text-foreground border border-border shadow-sm rounded-xl font-bold gap-2">
              <Users size={18} /> User Clustering
           </Button>
           <Button className="bg-purple-500 text-white shadow-xl shadow-purple-500/20 rounded-xl font-bold gap-2">
              <Activity size={18} /> Live Activity
           </Button>
        </div>
      </div>

      <div className="flex-1 rounded-[32px] overflow-hidden bg-white border border-[#EEF2EE] shadow-soft relative group">
         <ParcelMap parcels={USER_MARKERS} height="100%" />
         <div className="absolute top-8 left-8 z-10 space-y-4">
            <div className="px-6 py-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-border shadow-soft">
               <h4 className="text-xs font-black uppercase tracking-widest text-text-soft mb-3">Live Fleet Matrix</h4>
               <div className="space-y-2">
                  <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-emerald-500" /> <span className="text-sm font-bold">Farmers (984)</span></div>
                  <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-blue-500" /> <span className="text-sm font-bold">Field Officers (156)</span></div>
                  <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-amber-500" /> <span className="text-sm font-bold">Analysts (89)</span></div>
                  <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-rose-500" /> <span className="text-sm font-bold">Insurance (42)</span></div>
                  <div className="flex items-center gap-3"><div className="w-3 h-3 rounded-full bg-indigo-500" /> <span className="text-sm font-bold">Government (12)</span></div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
