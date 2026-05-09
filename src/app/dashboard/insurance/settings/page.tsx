"use client";

import { Bell, Globe, Lock, ShieldAlert, User, Briefcase } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-12 max-w-[1000px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-rose-500">Configuration</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            System <span className="text-rose-500">Settings</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SettingsCard title="Profile Settings" icon={User} items={[
          { label: "Account Authority", type: "text", value: "AGR-INS-01" },
          { label: "Email Address", type: "text", value: "claims@agriinsurance.com" },
          { label: "Phone Number", type: "text", value: "+91 98765 43210" },
        ]} />

        <SettingsCard title="Claims Notifications" icon={Bell} items={[
          { label: "Realtime Claims Alerts", type: "toggle", enabled: true },
          { label: "High Risk Pings", type: "toggle", enabled: true },
          { label: "Settlement Digests", type: "toggle", enabled: false },
        ]} />

        <SettingsCard title="GIS Layer Controls" icon={Globe} items={[
          { label: "Satellite View Default", type: "toggle", enabled: true },
          { label: "NDVI Overlay Autoload", type: "toggle", enabled: false },
          { label: "District Boundaries", type: "toggle", enabled: true },
        ]} />

        <SettingsCard title="Settlement Controls" icon={Briefcase} items={[
          { label: "Auto-Approve Low Risk", type: "toggle", enabled: false },
          { label: "Max Auto-Payout", type: "text", value: "₹ 50,000" },
          { label: "Require 2FA for Payouts", type: "toggle", enabled: true },
        ]} />

        <SettingsCard title="Security & Policies" icon={Lock} items={[
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
        <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
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
