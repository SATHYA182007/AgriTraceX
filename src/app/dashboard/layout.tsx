"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  Menu, 
  X, 
  UserCog,
  LogOut, 
  ChevronRight, 
  Map as MapIcon, 
  Search, 
  FileText, 
  Droplets, 
  TrendingUp, 
  ShieldCheck,
  LayoutDashboard,
  Zap,
  Activity,
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chatbot } from "@/components/Chatbot";
import { User } from "lucide-react";

const ROLE_CONFIGS: Record<string, { name: string, color: string, badge: string }> = {
  farmer: { name: "Farmer Node", color: "text-primary", badge: "PRIMARY SECTOR" },
  "field-officer": { name: "Tactical Agent", color: "text-blue-500", badge: "FIELD OPS" },
  government: { name: "State Authority", color: "text-indigo-500", badge: "STRATEGIC" },
  insurance: { name: "Loss Actuary", color: "text-rose-500", badge: "INDEMNITY" },
  admin: { name: "System Admin", color: "text-purple-500", badge: "INFRASTRUCTURE" },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadAlerts, setUnreadAlerts] = useState(3);

  const roleMatch = pathname.match(/\/dashboard\/([^\/]+)/);
  const roleKey = roleMatch ? roleMatch[1] : "farmer";
  const config = ROLE_CONFIGS[roleKey] || ROLE_CONFIGS["farmer"];

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background flex font-inter antialiased">
      
      {/* Sidebar - AquaSmart Inspired */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-[260px] bg-white border-r border-[#EEF2EE] flex flex-col transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}`}>
        
        {/* Brand Header */}
        <div className="h-24 px-8 flex items-center justify-between border-b border-[#EEF2EE]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Zap className="text-white w-5 h-5 fill-white" />
            </div>
            <span className="font-manrope font-extrabold text-xl tracking-tighter text-foreground">AgriTrace <span className="text-primary">X</span></span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={20} className="text-text-soft" />
          </button>
        </div>

        {/* Navigation Clusters */}
        <div className="flex-1 overflow-y-auto px-4 py-8 space-y-8">
           <div className="space-y-1">
              <p className="px-4 text-[10px] font-black uppercase tracking-widest text-text-soft mb-4">Intelligence Menu</p>
              <NavLink href={`/dashboard/${roleKey}`} icon={LayoutDashboard}>Dashboard</NavLink>
              <NavLink href={`/dashboard/${roleKey}/sensors`} icon={Activity}>Sensor Monitoring</NavLink>
              <NavLink href={`/dashboard/${roleKey}/npk`} icon={Zap}>NPK Analysis</NavLink>
              <NavLink href={`/dashboard/${roleKey}/gps`} icon={Globe}>GPS Status</NavLink>
              <NavLink href={`/dashboard/${roleKey}/alerts`} icon={Bell} badge={unreadAlerts}>Alerts</NavLink>
              <NavLink href={`/dashboard/${roleKey}/reports`} icon={FileText}>Reports</NavLink>
              <NavLink href={`/dashboard/${roleKey}/settings`} icon={UserCog}>Settings</NavLink>
           </div>

           <div className="space-y-1 pt-4 border-t border-[#EEF2EE]">
              <p className="px-4 text-[10px] font-black uppercase tracking-widest text-text-soft mb-4">Account</p>
              <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold text-text-soft hover:bg-rose-50 hover:text-rose-500 transition-all">
                 <LogOut size={18} /> Logout Session
              </button>
           </div>
        </div>

        {/* System Profile */}
        <div className="p-6 border-t border-[#EEF2EE] bg-surface-soft/30">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#EEF2EE] flex items-center justify-center text-primary shadow-soft">
                 <User size={20} />
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-[10px] font-black uppercase tracking-widest text-text-soft leading-none mb-1">Operator Node</p>
                 <p className="text-xs font-bold text-foreground truncate">{config.name}</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Framework */}
      <main className="flex-1 min-h-screen flex flex-col relative overflow-x-hidden">
        
        {/* Topbar - Centered Search Intelligence */}
        <header className="sticky top-0 z-40 h-24 bg-white/70 backdrop-blur-xl border-b border-[#EEF2EE] px-8 flex items-center justify-between">
          <div className="flex items-center gap-6 flex-1 max-w-2xl">
             <button className="lg:hidden p-2 rounded-xl bg-surface-soft text-text-soft" onClick={() => setSidebarOpen(true)}>
                <Menu size={20} />
             </button>
             
             <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-soft w-4 h-4 group-focus-within:text-primary transition-colors" />
                <input 
                   type="text" 
                   placeholder="Query platform intelligence..." 
                   className="w-full h-12 bg-surface-soft border border-transparent rounded-xl pl-12 pr-6 text-sm font-medium outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all"
                />
             </div>
          </div>

          <div className="flex items-center gap-8 pl-8">
             <div className="hidden xl:flex items-center gap-4 px-5 py-2.5 rounded-full bg-primary/5 border border-primary/10">
                <Activity size={14} className="text-primary animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Live Feed Active</span>
             </div>

             <div className="flex items-center gap-4 border-l border-[#EEF2EE] pl-8">
                <Button variant="ghost" size="icon" className="relative h-11 w-11 rounded-xl bg-surface-soft text-text-soft hover:text-primary transition-all">
                   <Bell size={20} />
                   <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full border-2 border-white" />
                </Button>
                <div className="w-11 h-11 rounded-xl bg-primary text-white font-bold text-xs flex items-center justify-center shadow-lg shadow-primary/20">
                   OA
                </div>
             </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-8 lg:p-12 overflow-y-auto">
           {children}
        </div>

        <Chatbot />
      </main>
    </div>
  );
}

function NavLink({ href, icon: Icon, children, badge }: any) {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link href={href}>
      <div className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group relative ${
        isActive 
          ? "bg-primary/10 text-primary shadow-sm" 
          : "text-text-soft hover:bg-surface-soft hover:text-foreground"
      }`}>
        <div className="flex items-center gap-4">
          <Icon size={18} className={`${isActive ? "text-primary" : "text-text-soft group-hover:text-primary transition-colors"}`} />
          <span className="text-[13px] font-bold tracking-tight">{children}</span>
        </div>
        
        {isActive && (
          <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-full" />
        )}

        {badge !== undefined && badge > 0 && (
          <span className={`px-2 py-0.5 rounded-lg ${isActive ? 'bg-primary text-white' : 'bg-primary/10 text-primary'} text-[9px] font-black tracking-widest`}>
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
}
