"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Sprout, 
  Globe, 
  Landmark, 
  UserCog, 
  Lock, 
  ArrowRight, 
  User, 
  ArrowLeft,
  Activity,
  Zap,
  Navigation,
  Database,
  Cpu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ROLES = [
  { id: 'farmer', name: 'Farmer', icon: Sprout, desc: 'IoT Field Node' },
  { id: 'field-officer', name: 'Field Agent', icon: Globe, desc: 'Telemetry Sync' },
  { id: 'government', name: 'Strategic', icon: Landmark, desc: 'State Oversight' },
  { id: 'insurance', name: 'Actuary', icon: ShieldCheck, desc: 'Risk Models' },
  { id: 'admin', name: 'Super Admin', icon: UserCog, desc: 'SysOps Matrix' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      router.push(`/dashboard/${selectedRole}`);
    }, 1500);
  };

  return (
    <div className="h-screen bg-white flex flex-col lg:flex-row font-inter overflow-hidden">
      
      {/* LEFT SIDE: Brand & Vision - AquaSmart Inspired */}
      <div className="lg:w-[55%] relative overflow-hidden hidden lg:block h-full">
         <div className="absolute inset-0">
            <img 
               src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" 
               alt="Aerial Agriculture" 
               className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/70 to-transparent" />
         </div>

         <div className="relative h-full flex flex-col justify-between p-16 z-10">
            <div className="space-y-12">
               <Link href="/" className="group flex items-center gap-3 text-white/70 hover:text-white transition-all w-fit">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all border border-white/20">
                     <ArrowLeft size={18} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Site</span>
               </Link>

               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-2xl">
                     <Zap className="text-primary w-7 h-7 fill-primary/10" />
                  </div>
                  <span className="font-manrope font-extrabold text-3xl tracking-tighter text-white">AgriTrace <span className="opacity-50">X</span></span>
               </div>
            </div>

            <div className="space-y-12">
               <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-7xl font-manrope font-extrabold tracking-tighter text-white leading-[0.9] max-w-2xl"
               >
                  Smart Agriculture.<br />
                  Realtime Monitoring.<br />
                  Healthier Crops.
               </motion.h2>

               <div className="flex flex-wrap gap-4">
                  <Pill icon={Cpu} text="IoT Monitoring" />
                  <Pill icon={Database} text="NPK Analysis" />
                  <Pill icon={Navigation} text="GPS Tracking" />
                  <Pill icon={Activity} text="Smart Irrigation" />
                  <Pill icon={Zap} text="Realtime Alerts" />
               </div>
            </div>

            <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">
               © 2026 AgriTrace Intelligence Systems. Global Field Coverage Active.
            </div>
         </div>
      </div>

      {/* RIGHT SIDE: Auth Card */}
      <div className="flex-1 h-full flex flex-col items-center justify-center p-8 md:p-16 lg:p-20 bg-[#F7FAF7] relative overflow-y-auto lg:overflow-hidden">
         {/* Mobile Logo */}
         <div className="absolute top-12 left-12 lg:hidden">
            <div className="flex items-center gap-3">
               <Zap className="text-primary w-6 h-6 fill-primary/10" />
               <span className="font-manrope font-extrabold text-xl tracking-tighter text-foreground">AgriTrace X</span>
            </div>
         </div>

         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md space-y-10"
         >
            <div className="space-y-3">
               <h3 className="text-4xl font-manrope font-extrabold tracking-tighter text-foreground">Welcome Back</h3>
               <p className="text-text-soft font-medium text-base">Access your agricultural command center.</p>
            </div>

            <div className="space-y-10">
               {/* Role Selector */}
               <div className="space-y-6">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-soft">Select Operational Role</label>
                  <Tabs value={selectedRole} onValueChange={setSelectedRole} className="w-full">
                     <TabsList className="w-full h-20 bg-white border border-border p-2 rounded-[24px] gap-2 shadow-soft">
                        {ROLES.map((role) => (
                           <TabsTrigger 
                              key={role.id} 
                              value={role.id}
                              className="flex-1 h-full rounded-[18px] data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg shadow-primary/20 transition-all duration-300"
                           >
                              <role.icon size={20} />
                           </TabsTrigger>
                        ))}
                     </TabsList>
                  </Tabs>
                  <div className="flex items-center justify-between px-2 pt-2">
                     <span className="text-sm font-black uppercase tracking-widest text-foreground">{ROLES.find(r => r.id === selectedRole)?.name}</span>
                     <Badge className="bg-primary-light text-primary border-none font-black text-[9px] px-3 py-1 rounded-full uppercase tracking-widest">
                        {ROLES.find(r => r.id === selectedRole)?.desc}
                     </Badge>
                  </div>
               </div>

               {/* Auth Inputs */}
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-text-soft">Intelligence ID</label>
                     <div className="relative group">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 text-text-soft w-5 h-5 group-focus-within:text-primary transition-colors" />
                        <input 
                           type="text" 
                           placeholder="Enter your field ID" 
                           className="w-full h-16 bg-white rounded-[20px] border border-border px-14 font-medium focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-sm"
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-text-soft">Secure Passcode</label>
                     <div className="relative group">
                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-text-soft w-5 h-5 group-focus-within:text-primary transition-colors" />
                        <input 
                           type="password" 
                           placeholder="••••••••" 
                           className="w-full h-16 bg-white rounded-[20px] border border-border px-14 font-medium focus:border-primary/30 focus:ring-4 focus:ring-primary/5 outline-none transition-all shadow-sm"
                        />
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <Button 
                     onClick={handleLogin}
                     disabled={isLoggingIn}
                     className="w-full h-16 bg-primary text-white text-lg font-bold rounded-[20px] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 group"
                  >
                     {isLoggingIn ? (
                        <>
                           <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           Synchronizing...
                        </>
                     ) : (
                        <>
                           Sign In <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
                        </>
                     )}
                  </Button>
                  
                  <div className="flex items-center justify-between pt-2">
                     <button className="text-xs font-black uppercase tracking-widest text-text-soft hover:text-primary transition-colors">Request Access</button>
                     <button className="text-xs font-black uppercase tracking-widest text-text-soft hover:text-primary transition-colors">OTP Protocol</button>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* Security Footer */}
         <div className="absolute bottom-8 lg:bottom-12 flex items-center gap-4 text-text-soft opacity-60">
            <ShieldCheck size={18} className="text-primary" />
            <p className="text-[9px] font-black uppercase tracking-[0.2em] leading-none">Quantum Encryption Matrix Active</p>
         </div>
      </div>
    </div>
  );
}

function Pill({ text, icon: Icon }: { text: string, icon: any }) {
   return (
      <div className="px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-3 hover:bg-white/20 transition-all cursor-default">
         <Icon size={14} className="opacity-70" />
         {text}
      </div>
   );
}

function Badge({ children, className }: any) {
   return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
         {children}
      </span>
   );
}
