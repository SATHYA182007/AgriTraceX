"use client";

import { useState, useEffect } from "react";
import { Navigation, Satellite, Radio, Globe, Signal, MapPin, Compass, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ParcelMap = dynamic(() => import('@/components/maps/ParcelMap'), { ssr: false });

export default function GPSPage() {
  const [gps, setGps] = useState({
    status: "Connecting to satellite...",
    lat: 19.4321,
    lng: 79.9876,
    alt: "452m",
    satellites: 8,
    hdop: "1.2",
    signal: "32.4 dBHz"
  });

  return (
    <div className="space-y-12 max-w-[1400px] mx-auto stagger-in">
      <div className="space-y-4">
        <h1 className="text-6xl font-manrope font-extrabold tracking-tighter text-foreground leading-tight">
          GPS <span className="text-primary">Status</span>
        </h1>
        <p className="text-text-soft font-medium text-lg">Real-time satellite localization and signal telemetry.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Left Side: GPS Details */}
        <div className="xl:col-span-5 space-y-8">
           <div className="premium-card p-12 space-y-10 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 opacity-5 pointer-events-none">
                 <Radio size={400} className="text-primary animate-spin-slow" />
              </div>
              
              <div className="flex items-center gap-6 relative z-10">
                 <div className="relative">
                    <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                       <Satellite size={32} className="text-primary" />
                    </div>
                    <div className="absolute -inset-2 border-2 border-primary/20 rounded-full animate-ping" />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-text-soft uppercase tracking-[0.4em] leading-none mb-3">Sync Status</p>
                    <h2 className="text-3xl font-manrope font-extrabold text-foreground tracking-tighter">{gps.status}</h2>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-8 relative z-10">
                 <TelemetryGroup label="Latitude" value={gps.lat} icon={MapPin} />
                 <TelemetryGroup label="Longitude" value={gps.lng} icon={Globe} />
                 <TelemetryGroup label="Altitude" value={gps.alt} icon={Compass} />
                 <TelemetryGroup label="Signal" value={gps.signal} icon={Signal} />
              </div>

              <div className="pt-8 border-t border-border/50 relative z-10">
                 <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black text-text-soft uppercase tracking-widest">Active Satellites</span>
                    <span className="text-lg font-jetbrains font-extrabold text-primary">{gps.satellites}</span>
                 </div>
                 <div className="flex gap-2">
                    {[...Array(12)].map((_, i) => (
                       <div key={i} className={`flex-1 h-3 rounded-full ${i < gps.satellites ? 'bg-primary' : 'bg-surface-soft'} shadow-sm`} />
                    ))}
                 </div>
              </div>
           </div>

           <div className="glass-card p-10 rounded-[32px] border-none shadow-soft flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                 <ShieldCheck size={24} />
              </div>
              <div>
                 <p className="text-sm font-bold text-foreground">Encryption Protocol Active</p>
                 <p className="text-xs text-text-soft font-medium">GPS data encrypted via field-node AES-256.</p>
              </div>
           </div>
        </div>

        {/* Right Side: Map Localization */}
        <div className="xl:col-span-7">
           <div className="relative h-full min-h-[600px] rounded-[32px] overflow-hidden bg-white border border-[#EEF2EE] shadow-soft group">
              <ParcelMap parcels={[{ id: 1, name: "Node Localisation", lat: gps.lat, lng: gps.lng, crop: "IoT Node" }]} height="100%" />
              <div className="absolute top-10 right-10 z-10">
                 <div className="px-6 py-3 rounded-full bg-white/90 backdrop-blur-xl border border-border shadow-soft flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-foreground">HDOP: {gps.hdop}</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function TelemetryGroup({ label, value, icon: Icon }: any) {
   return (
      <div className="space-y-3">
         <div className="flex items-center gap-2 opacity-40">
            <Icon size={14} className="text-text-soft" />
            <p className="text-[10px] font-black text-text-soft uppercase tracking-widest leading-none">{label}</p>
         </div>
         <p className="text-2xl font-jetbrains font-extrabold text-foreground tracking-tighter">{value}</p>
      </div>
   );
}
