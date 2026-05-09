"use client";

import { UserCog, Bell, Shield, Smartphone, Globe, Lock, Cpu, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SettingsPage() {
  return (
    <div className="space-y-12 max-w-[1200px] mx-auto stagger-in">
      <div className="space-y-4">
        <h1 className="text-6xl font-manrope font-extrabold tracking-tighter text-foreground leading-tight">
          System <span className="text-primary">Settings</span>
        </h1>
        <p className="text-text-soft font-medium text-lg">Configure your field telemetry node and security protocols.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <SettingsCard 
          icon={UserCog} 
          title="Profile Intelligence" 
          desc="Manage your operator credentials and authority level."
        />
        <SettingsCard 
          icon={Bell} 
          title="Notification Matrix" 
          desc="Configure threshold alerts for sensor telemetry."
        />
        <SettingsCard 
          icon={Cpu} 
          title="IoT Node Config" 
          desc="Manage ESP32 field devices and MQTT protocols."
        />
        <SettingsCard 
          icon={Shield} 
          title="Security & Keys" 
          desc="Manage encryption keys and access tokens."
        />
      </div>

      <div className="premium-card p-12 bg-white space-y-10">
         <div className="flex items-center justify-between border-b border-border pb-8">
            <div className="space-y-1">
               <h3 className="text-2xl font-manrope font-extrabold text-foreground tracking-tight">System Identity</h3>
               <p className="text-sm text-text-soft font-medium">Node Operator: Farmer Alpha-01</p>
            </div>
            <Button variant="outline" className="h-12 px-8 rounded-xl font-bold uppercase tracking-widest text-[10px] text-primary border-primary/20 hover:bg-primary/5">Edit Node</Button>
         </div>

         <div className="space-y-8">
            <ToggleItem title="Real-time Push Notifications" desc="Instant alerts for critical soil and NPK triggers." active={true} />
            <ToggleItem title="Hardware Feedback (LED)" desc="Enable physical hardware signals for field status." active={true} />
            <ToggleItem title="Satellite Sync (GPS)" desc="Maintain continuous satellite localization uplink." active={false} />
            <ToggleItem title="Telemetry Data Storage" desc="Archive historical sensor data for predictive analysis." active={true} />
         </div>
      </div>
    </div>
  );
}

function SettingsCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="premium-card p-10 flex items-start gap-8 group cursor-pointer hover:border-primary/20 transition-all">
      <div className="w-16 h-16 rounded-[1.5rem] bg-surface-soft flex items-center justify-center text-primary border border-border group-hover:rotate-6 transition-transform">
        <Icon size={28} />
      </div>
      <div className="space-y-2 flex-1">
        <h3 className="text-xl font-manrope font-extrabold text-foreground tracking-tight group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-text-soft font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function ToggleItem({ title, desc, active }: any) {
   return (
      <div className="flex items-center justify-between p-6 rounded-2xl hover:bg-surface-soft transition-colors group">
         <div className="space-y-1">
            <h4 className="text-sm font-bold text-foreground">{title}</h4>
            <p className="text-xs text-text-soft font-medium">{desc}</p>
         </div>
         <div className={`w-14 h-8 rounded-full p-1 transition-all ${active ? 'bg-primary' : 'bg-border'}`}>
            <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-all ${active ? 'translate-x-6' : 'translate-x-0'}`} />
         </div>
      </div>
   );
}
