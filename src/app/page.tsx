"use client";

import { motion } from "framer-motion";
import { 
  Sprout, 
  ChevronRight, 
  Play, 
  Globe, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Database, 
  Layers, 
  Navigation,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-inter selection:bg-primary/10 selection:text-primary overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-[#EEF2EE]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Sprout className="text-white w-6 h-6" />
            </div>
            <span className="font-manrope font-extrabold text-2xl tracking-tighter text-foreground">AgriTrace <span className="text-primary">X</span></span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <NavLink href="#features">Features</NavLink>
            <NavLink href="#solutions">Solutions</NavLink>
            <NavLink href="#technology">Technology</NavLink>
            <NavLink href="#government">Government</NavLink>
            <NavLink href="#insurance">Insurance</NavLink>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-semibold text-foreground/60 hover:text-primary transition-colors">Login</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-primary text-white font-bold rounded-xl px-6 py-6 shadow-xl shadow-primary/20 hover:scale-105 transition-all">Launch Platform</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-tight">
              <Zap size={14} className="fill-primary" />
              <span>Next-Gen Agricultural Intelligence</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-manrope font-extrabold tracking-tighter leading-[0.95] text-foreground max-w-4xl mx-auto">
              AI-Powered <span className="text-primary">Agricultural Intelligence</span> for Modern Farming
            </h1>
            <p className="text-xl md:text-2xl text-text-soft font-medium max-w-2xl mx-auto leading-relaxed">
              Fuse satellite imagery, drone analytics, and IoT sensor networks into one predictive agricultural intelligence platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/login">
              <Button className="h-16 px-10 bg-primary text-white text-lg font-bold rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 transition-all flex items-center gap-4">
                Launch Platform <ChevronRight size={20} />
              </Button>
            </Link>
            <Button variant="outline" className="h-16 px-10 bg-white text-lg font-bold rounded-2xl border-border hover:bg-surface-soft transition-all flex items-center gap-4">
              <Play size={20} className="fill-foreground" /> Watch Demo
            </Button>
          </motion.div>

          {/* Hero Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="pt-16 relative"
          >
            <div className="relative mx-auto max-w-6xl rounded-[2.5rem] border-[12px] border-foreground/5 shadow-2xl overflow-hidden bg-white">
              <Image 
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" 
                alt="AgriTrace X Dashboard" 
                width={2000} 
                height={1200}
                className="w-full h-auto opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              
              {/* Floating KPI Overlay Mockups */}
              <div className="absolute top-10 right-10 flex flex-col gap-4 scale-75 md:scale-100">
                <FloatingKPI label="NDVI Index" value="0.84" color="text-primary" />
                <FloatingKPI label="Soil Moisture" value="32%" color="text-blue-500" />
              </div>
              <div className="absolute bottom-20 left-10 scale-75 md:scale-100">
                <AlertCard />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-surface-soft/50 border-y border-[#EEF2EE]">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
          <p className="text-sm font-black text-text-soft uppercase tracking-[0.3em]">Trusted across smart agriculture ecosystems</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale">
            {/* Logos Placeholder */}
            <div className="flex items-center gap-2 font-manrope font-black text-2xl">🌍 ECO-AGRI</div>
            <div className="flex items-center gap-2 font-manrope font-black text-2xl">🌱 GREEN-TECH</div>
            <div className="flex items-center gap-2 font-manrope font-black text-2xl">📡 SATELLITE-X</div>
            <div className="flex items-center gap-2 font-manrope font-black text-2xl">🛡️ SECURE-FARM</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">Advanced Intelligence Layers</h2>
            <p className="text-lg text-text-soft font-medium max-w-xl mx-auto">Multimodal data fusion delivering precision insights for every hectare.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Globe} 
              title="NDVI Analytics" 
              desc="Realtime multispectral vegetation vigor monitoring from Sentinel-2 telemetry." 
            />
            <FeatureCard 
              icon={Layers} 
              title="Flood Detection" 
              desc="SAR-based flood mapping and predictive inundation modeling." 
            />
            <FeatureCard 
              icon={Activity} 
              title="Crop Stress" 
              desc="Automated biotic and abiotic stress detection via infrared signatures." 
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Insurance Intel" 
              desc="Blockchain-ready automated loss assessment and claim verification." 
            />
            <FeatureCard 
              icon={Navigation} 
              title="Relief Coordination" 
              desc="State-wide government dashboard for strategic disaster response." 
            />
            <FeatureCard 
              icon={Sprout} 
              title="FO Verification" 
              desc="Mobile-optimized ground-truth verification and reporting for agents." 
            />
            <FeatureCard 
              icon={Database} 
              title="Zone Engine" 
              desc="Proprietary data fusion engine for zone-specific farming decisions." 
            />
            <FeatureCard 
              icon={Zap} 
              title="GIS Monitoring" 
              desc="Dynamic Leaflet-powered GIS interface with live sensor overlays." 
            />
          </div>
        </div>
      </section>

      {/* Interactive Demo Section Placeholder */}
      <section className="py-32 bg-foreground text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-8">
            <Badge text="Zone Intelligence Engine" />
            <h2 className="text-5xl md:text-6xl font-manrope font-extrabold tracking-tighter leading-[1.1]">
              Predictive Power in <span className="text-primary">Realtime.</span>
            </h2>
            <p className="text-xl text-white/60 leading-relaxed font-medium">
              AgriTrace X automatically segments your land into tactical zones based on health indices, moisture levels, and historical yield patterns.
            </p>
            <div className="space-y-6 pt-4">
              <CheckItem text="Automated Zone A/B/C Segmentation" />
              <CheckItem text="Real-time IoT Ground-Sensor Sync" />
              <CheckItem text="Autonomous Risk Scoring for Insurance" />
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl p-8 overflow-hidden group">
               <Image 
                 src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop" 
                 alt="Terrain" 
                 width={1000} 
                 height={1000}
                 className="w-full h-full object-cover rounded-[2rem] opacity-40 group-hover:scale-110 transition-transform duration-[10s]"
               />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 border-4 border-primary/40 rounded-full animate-ping" />
                  <div className="absolute w-4 h-4 bg-primary rounded-full shadow-[0_0_20px_rgba(22,163,74,0.8)]" />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Sprout className="text-white w-5 h-5" />
              </div>
              <span className="font-manrope font-extrabold text-xl tracking-tighter text-foreground">AgriTrace X</span>
            </div>
            <p className="text-text-soft text-sm leading-relaxed">
              Advancing global agriculture via planetary-scale intelligence and autonomous data fusion.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground">Platform</h4>
            <ul className="space-y-4 text-text-soft text-sm font-medium">
              <li><Link href="/login" className="hover:text-primary transition-colors">Farmer Hub</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Field Officer Node</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Gov Command</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Insurance Actuary</Link></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground">Company</h4>
            <ul className="space-y-4 text-text-soft text-sm font-medium">
              <li><NavLink href="#">Technology</NavLink></li>
              <li><NavLink href="#">Partners</NavLink></li>
              <li><NavLink href="#">Contact</NavLink></li>
              <li><NavLink href="#">Careers</NavLink></li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground">Legal</h4>
            <ul className="space-y-4 text-text-soft text-sm font-medium">
              <li><NavLink href="#">Privacy Protocol</NavLink></li>
              <li><NavLink href="#">Service Terms</NavLink></li>
              <li><NavLink href="#">Security Audit</NavLink></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-24 border-t border-border mt-24 text-center">
          <p className="text-text-soft text-xs font-bold uppercase tracking-widest">© 2026 AgriTrace Intelligence Systems. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-bold text-text-soft hover:text-foreground transition-colors tracking-tight">
      {children}
    </Link>
  );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <div className="premium-card p-10 space-y-6 group">
      <div className="w-16 h-16 rounded-2xl bg-surface-soft flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
        <Icon size={28} />
      </div>
      <div className="space-y-3">
        <h3 className="text-xl font-manrope font-extrabold text-foreground tracking-tight">{title}</h3>
        <p className="text-sm text-text-soft leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}

function FloatingKPI({ label, value, color }: any) {
  return (
    <motion.div 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-[#EEF2EE] min-w-[180px] flex items-center gap-4"
    >
      <div className={`w-3 h-10 rounded-full ${color.replace('text-', 'bg-')}`} />
      <div>
        <p className="text-[10px] font-black text-text-soft uppercase tracking-widest">{label}</p>
        <p className={`text-2xl font-jetbrains font-black ${color}`}>{value}</p>
      </div>
    </motion.div>
  );
}

function AlertCard() {
  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-rose-100 min-w-[280px] space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-rose-500">
          <Activity size={18} className="animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest">Live Alert</span>
        </div>
        <span className="text-[9px] font-bold text-text-soft uppercase">2m ago</span>
      </div>
      <p className="font-manrope font-bold text-sm text-foreground">Flood Risk Detected: Sector 4-A1</p>
      <div className="flex items-center gap-2">
        <div className="w-full h-1.5 bg-rose-100 rounded-full overflow-hidden">
          <div className="w-[70%] h-full bg-rose-500" />
        </div>
        <span className="text-[10px] font-black text-rose-500">CRITICAL</span>
      </div>
    </motion.div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
        <ArrowRight size={14} className="text-primary" />
      </div>
      <span className="text-lg text-white/80 font-medium">{text}</span>
    </div>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest">
      {text}
    </div>
  );
}
