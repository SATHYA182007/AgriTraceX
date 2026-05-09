"use client";

import { Bell, Globe, Lock, User, FileSignature } from "lucide-react";

export default function AnalystSettingsPage() {
  return (
    <div className="space-y-12 max-w-[1000px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-500">Analyst Profile</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            System <span className="text-blue-500">Settings</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SettingsCard title="Profile Settings" icon={User} items={[
          { label: "Analyst Name", type: "text", value: "Tushar" },
          { label: "Analyst ID", type: "text", value: "AGX-ANL-101" },
          { label: "Zone Assigment", type: "text", value: "Maharashtra West" },
        ]} />

        <SettingsCard title="Notification Preferences" icon={Bell} items={[
          { label: "Verification Alerts", type: "toggle", enabled: true },
          { label: "Critical Risk Ping", type: "toggle", enabled: true },
          { label: "Daily Summary", type: "toggle", enabled: false },
        ]} />

        <SettingsCard title="Certification Preferences" icon={FileSignature} items={[
          { label: "Auto-Sign Verified", type: "toggle", enabled: false },
          { label: "Digital Seal Quality", type: "text", value: "High-Res" },
          { label: "Generate Subsidy Invoices", type: "toggle", enabled: true },
        ]} />

        <SettingsCard title="GIS Layer Settings" icon={Globe} items={[
          { label: "Default Overlay", type: "text", value: "NDVI Heatmap" },
          { label: "Display Risk Borders", type: "toggle", enabled: true },
        ]} />

        <SettingsCard title="Account Security" icon={Lock} items={[
          { label: "Two-Factor Auth", type: "toggle", enabled: true },
          { label: "Last Login", type: "text", value: "Today, 10:45 AM" },
        ]} />
      </div>
    </div>
  );
}

function SettingsCard({ title, icon: Icon, items }: any) {
  return (
    <div className="premium-card p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
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
