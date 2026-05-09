"use client";

import { Server, ShieldCheck, Key, Globe, Database, HardDrive, Bell } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-12 max-w-[1000px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-purple-500">Root Configuration</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            System <span className="text-purple-500">Settings</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SettingsCard title="Platform Settings" icon={Server} items={[
          { label: "Maintenance Mode", type: "toggle", enabled: false },
          { label: "Max Active Sessions", type: "text", value: "50,000" },
          { label: "Environment", type: "text", value: "Production" },
        ]} />

        <SettingsCard title="Security Controls" icon={ShieldCheck} items={[
          { label: "Enforce 2FA System-Wide", type: "toggle", enabled: true },
          { label: "Strict IP Whitelisting", type: "toggle", enabled: false },
          { label: "JWT Expiry Time", type: "text", value: "24 Hours" },
        ]} />

        <SettingsCard title="Database Controls" icon={Database} items={[
          { label: "Supabase Realtime Backup", type: "toggle", enabled: true },
          { label: "Auto-Prune Old Logs", type: "toggle", enabled: true },
          { label: "Current Postgres Load", type: "text", value: "32%" },
        ]} />

        <SettingsCard title="API Integrations" icon={Key} items={[
          { label: "Google Maps API Key", type: "text", value: "•••••••••••••" },
          { label: "Enable Webhooks", type: "toggle", enabled: true },
          { label: "Rate Limiting", type: "toggle", enabled: true },
        ]} />

        <SettingsCard title="GIS Overlays" icon={Globe} items={[
          { label: "High-Res Satellite Cache", type: "toggle", enabled: true },
          { label: "Drone Auto-Sync Interval", type: "text", value: "15 mins" },
        ]} />
      </div>
    </div>
  );
}

function SettingsCard({ title, icon: Icon, items }: any) {
  return (
    <div className="premium-card p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500">
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-manrope font-extrabold">{title}</h3>
      </div>
      <div className="space-y-6">
        {items.map((item: any, i: number) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-sm font-bold text-text-soft">{item.label}</span>
            {item.type === 'toggle' ? (
              <div className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors cursor-pointer ${item.enabled ? 'bg-emerald-500' : 'bg-surface-soft'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${item.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
              </div>
            ) : (
              <span className="text-sm font-jetbrains font-bold text-foreground">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
