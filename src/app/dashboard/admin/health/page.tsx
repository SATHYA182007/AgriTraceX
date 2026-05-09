"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Wifi, Zap, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const METRICS = [
  {
    label: "Supabase Storage",
    value: "2.4 GB",
    max: "8 GB",
    pct: 30,
    color: "bg-sage",
    icon: Database,
    status: "healthy",
  },
  {
    label: "Realtime Connections",
    value: "12 active",
    max: "200 limit",
    pct: 6,
    color: "bg-role-field_officer",
    icon: Wifi,
    status: "healthy",
  },
  {
    label: "Edge Function Invocations (30d)",
    value: "1,842",
    max: "500,000 limit",
    pct: 0.4,
    color: "bg-role-super_admin",
    icon: Zap,
    status: "healthy",
  },
];

const SERVICES = [
  { name: "Auth Service", status: "operational", latency: "12ms" },
  { name: "Postgres (Supabase)", status: "operational", latency: "4ms" },
  { name: "PostGIS Extension", status: "operational", latency: "6ms" },
  { name: "Storage Bucket", status: "operational", latency: "18ms" },
  { name: "Realtime Service", status: "operational", latency: "8ms" },
  { name: "Edge Functions", status: "operational", latency: "34ms" },
  { name: "Satellite Ingestion", status: "degraded", latency: "N/A" },
];

export default function AdminHealthPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-sora font-bold">System Health</h1>
        <p className="text-muted-foreground text-sm mt-1">Real-time platform infrastructure status</p>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {METRICS.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <m.icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{m.label}</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-sage" />
                </div>
                <div className="flex items-end justify-between mb-2">
                  <span className="font-jetbrains text-2xl font-bold">{m.value}</span>
                  <span className="text-xs text-muted-foreground">{m.max}</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${m.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.pct}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-right">{m.pct}% used</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Service Status */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-md font-sora flex items-center gap-2">
            <Wifi className="w-4 h-4 text-role-super_admin" />
            Service Status
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/50">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-between px-6 py-3 hover:bg-muted/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${svc.status === "operational" ? "bg-sage animate-pulse" : "bg-amber animate-pulse"}`} />
                  <span className="font-medium text-sm">{svc.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-jetbrains text-xs text-muted-foreground">{svc.latency}</span>
                  <span className={`text-xs font-medium ${svc.status === "operational" ? "text-sage" : "text-amber"}`}>
                    {svc.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Last Satellite Ingestion */}
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-lg bg-amber/10">
            <Clock className="w-5 h-5 text-amber" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Last Satellite Data Ingestion</p>
            <p className="font-jetbrains font-bold text-lg">2024-03-10 06:32:14 IST</p>
          </div>
          <div className="ml-auto">
            <span className="flex items-center gap-1 text-amber text-sm">
              <AlertTriangle className="w-4 h-4" />
              Satellite feed degraded — manual check required
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
