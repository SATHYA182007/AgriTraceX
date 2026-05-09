"use client";

import { useState, useEffect } from "react";
import { 
  Activity, 
  Droplets, 
  Thermometer, 
  Cpu, 
  AlertTriangle, 
  Zap,
  Terminal,
  Database,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { motion } from "framer-motion";

export default function SensorsPage() {
  const [sensors, setSensors] = useState({
    temp: 30.90,
    humidity: 63.50,
    soilValue: 4095,
    soilStatus: "DRY",
    ledStatus: "RED LED ON"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => ({
        ...prev,
        temp: +(prev.temp + (Math.random() - 0.5) * 0.1).toFixed(2),
        humidity: +(prev.humidity + (Math.random() - 0.5) * 0.2).toFixed(2),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12 max-w-[1400px] mx-auto stagger-in">
      <div className="space-y-4">
        <h1 className="text-6xl font-manrope font-extrabold tracking-tighter text-foreground leading-tight">
          Sensor <span className="text-primary">Monitoring</span>
        </h1>
        <p className="text-text-soft font-medium text-lg">Real-time ESP32 field telemetry stream.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SensorDetailCard 
          label="Ambient Temperature" 
          value={`${sensors.temp}°C`} 
          icon={Thermometer} 
          color="text-danger" 
          desc="Thermal flux monitoring"
        />
        <SensorDetailCard 
          label="Atmospheric Humidity" 
          value={`${sensors.humidity}%`} 
          icon={Droplets} 
          color="text-blue-500" 
          desc="Transpiration index"
        />
        <SensorDetailCard 
          label="Soil Moisture (Raw)" 
          value={sensors.soilValue} 
          icon={Cpu} 
          color="text-amber-600" 
          desc="Capacitive sensor feed"
        />
        <SensorDetailCard 
          label="Moisture Condition" 
          value={sensors.soilStatus} 
          icon={AlertTriangle} 
          color="text-danger" 
          desc="Hydration priority"
          pulsing={true}
        />
        <SensorDetailCard 
          label="Actuator Signal" 
          value={sensors.ledStatus} 
          icon={Zap} 
          color="text-danger" 
          desc="Hardware feedback loop"
          glowing={true}
        />
      </div>

    </div>
  );
}

function SensorDetailCard({ label, value, icon: Icon, color, desc, pulsing, glowing }: any) {
  return (
    <div className="premium-card p-10 space-y-8 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className={`w-16 h-16 rounded-2xl bg-surface-soft flex items-center justify-center ${color} border border-border/50 relative shadow-sm`}>
          <Icon size={28} />
          {pulsing && <div className="absolute -inset-2 border-2 border-current opacity-20 rounded-2xl animate-ping" />}
          {glowing && <div className="absolute inset-0 bg-current opacity-10 blur-xl rounded-2xl animate-pulse" />}
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-text-soft uppercase tracking-widest opacity-40">{desc}</p>
          <ArrowUpRight size={14} className="text-text-soft ml-auto mt-1" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-text-soft opacity-60 leading-none">{label}</p>
        <h3 className="text-5xl font-jetbrains font-extrabold tracking-tighter text-foreground">{value}</h3>
      </div>
    </div>
  );
}
