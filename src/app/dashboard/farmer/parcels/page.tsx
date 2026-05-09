"use client";

import { motion } from "framer-motion";
import { Map as MapIcon, Plus, Info, Droplets, Thermometer, TrendingUp, Activity, Globe, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MOCK_PARCELS = [
  { id: '1', name: "North Wing A1", area: "2.5 Ha", crop: "Cotton", health: "Optimal", moisture: "24%", temp: "31°C" },
  { id: '2', name: "River Patch B2", area: "1.2 Ha", crop: "Rice", health: "Warning", moisture: "18%", temp: "33°C" },
  { id: '3', name: "East Slope C4", area: "3.8 Ha", crop: "Maize", health: "Optimal", moisture: "28%", temp: "29°C" },
];

export default function FarmerParcelsPage() {
  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Registry Node: PARCEL-ALPHA</p>
          </div>
          <h1 className="text-7xl font-sora font-black tracking-tighter text-foreground leading-[0.8]">
            Sector <span className="text-primary">Registry</span>
          </h1>
          <p className="text-lg text-muted-foreground font-medium max-w-xl">
             Management of active parcel vectors and fused ground-sensor telemetry nodes.
          </p>
        </div>

        <div className="flex gap-4">
           <Button className="h-16 px-10 bg-primary text-white rounded-3xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-4">
              <Plus size={20} /> Provision New Sector
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {MOCK_PARCELS.map((parcel, idx) => (
          <motion.div
            key={parcel.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.15 }}
          >
            <div className="glass-card rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl group hover:scale-[1.02] transition-all duration-500">
               {/* Cover Image with Multispectral Overlay */}
               <div className="h-56 bg-secondary/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute top-8 right-8">
                     <Badge className={`${parcel.health === 'Optimal' ? 'bg-primary' : 'bg-amber-500'} text-white border-none font-black text-[9px] uppercase tracking-widest px-4 py-2 rounded-full shadow-xl`}>
                        {parcel.health} Vigor
                     </Badge>
                  </div>

                  <div className="absolute bottom-8 left-8 flex items-center gap-5">
                     <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center text-primary shadow-soft border border-white">
                        <Globe size={24} />
                     </div>
                     <div>
                        <h3 className="font-sora font-black text-2xl text-foreground leading-none">{parcel.name}</h3>
                        <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">{parcel.area} Area Vector</p>
                     </div>
                  </div>
               </div>
               
               <div className="p-10 space-y-10">
                  <div className="grid grid-cols-3 gap-6">
                     <DataPoint label="Hydration" value={parcel.moisture} icon={Droplets} color="text-blue-500" />
                     <DataPoint label="Thermal" value={parcel.temp} icon={Thermometer} color="text-amber-500" />
                     <DataPoint label="Vigor" value="0.72" icon={TrendingUp} color="text-primary" />
                  </div>

                  <div className="pt-8 border-t border-primary/5 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Activity size={16} className="text-primary animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Syncing Node A-1</span>
                     </div>
                     <Button variant="ghost" className="h-12 px-6 rounded-2xl bg-secondary/30 text-primary font-black uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all flex items-center gap-3 group">
                        Tactical Log <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </Button>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function DataPoint({ label, value, icon: Icon, color }: any) {
   return (
      <div className="space-y-2">
         <div className="flex items-center gap-2">
            <Icon size={14} className={`${color} opacity-80`} />
            <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-40">{label}</p>
         </div>
         <p className="text-xl font-jetbrains font-black text-foreground">{value}</p>
      </div>
   );
}
