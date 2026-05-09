"use client";

import { Bell, Globe, Lock, ShieldCheck, User, Zap } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-12 max-w-[1000px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500">Configuration</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            System <span className="text-indigo-500">Settings</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SettingsCard title="Profile Settings" icon={User} items={[
          { label: "Account Authority", type: "text", value: "MAHA-OPS-01" },
          { label: "Email Address", type: "text", value: "ops@maharashtra.gov.in" },
          { label: "Phone Number", type: "text", value: "+91 98765 43210" },
        ]} />

        <SettingsCard title="Notification Preferences" icon={Bell} items={[
          { label: "Realtime Alerts", type: "toggle", enabled: true },
          { label: "Weekly Digest", type: "toggle", enabled: false },
          { label: "SMS Warnings", type: "toggle", enabled: true },
        ]} />

        <SettingsCard title="GIS Layer Controls" icon={Globe} items={[
          { label: "Satellite View Default", type: "toggle", enabled: true },
          { label: "NDVI Overlay Autoload", type: "toggle", enabled: false },
          { label: "District Boundaries", type: "toggle", enabled: true },
        ]} />

        <SettingsCard title="API & Integrations" icon={Zap} items={[
          { label: "ESP32 Sync Interval", type: "text", value: "3 Seconds" },
          { label: "Supabase Webhook", type: "toggle", enabled: true },
          { label: "External DB Sync", type: "toggle", enabled: false },
        ]} />

        <SettingsCard title="Security & Authentication" icon={ShieldCheck} items={[
          { label: "Two-Factor Auth", type: "toggle", enabled: true },
          { label: "Session Timeout", type: "text", value: "15 Minutes" },
        ]} />
      </div>
    </div>
  );
}

function SettingsCard({ title, icon: Icon, items }: any) {
  return (
    <div className="premium-card p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500">
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
