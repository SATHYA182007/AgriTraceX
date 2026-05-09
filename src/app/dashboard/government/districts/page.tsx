"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ParcelMap = dynamic(() => import("@/components/maps/ParcelMap"), { ssr: false });

const DISTRICT_STATS = [
  { district: "Aheri", parcels: 1240, active_alerts: 12, risk_level: "High", color: "text-destructive" },
  { district: "Gadchiroli", parcels: 850, active_alerts: 4, risk_level: "Medium", color: "text-amber" },
  { district: "Chamorshi", parcels: 620, active_alerts: 2, risk_level: "Low", color: "text-sage" },
  { district: "Mulchera", parcels: 410, active_alerts: 0, risk_level: "Low", color: "text-sage" },
];

export default function GovtDistrictsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-sora font-bold">District Map</h1>
          <p className="text-muted-foreground text-sm mt-1">Regional risk heatmap and parcel distribution</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* District Map */}
        <Card className="lg:col-span-2 overflow-hidden border-border/50 bg-card/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-sora flex items-center gap-2">
              <MapPin className="w-4 h-4 text-role-government" />
              Regional Heatmap
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
             {/* Note: In a real app, this would be a choropleth map. For demo, we use the ParcelMap with district centers */}
            <ParcelMap 
              parcels={[]} 
              center={[19.4, 79.9]} 
              zoom={9} 
              height="500px" 
            />
          </CardContent>
        </Card>

        {/* District Stats */}
        <div className="space-y-4">
          <h2 className="text-sm font-sora font-semibold text-muted-foreground uppercase tracking-wider">District Summary</h2>
          {DISTRICT_STATS.map((stat, i) => (
            <motion.div
              key={stat.district}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-card/50 border-border/50 hover:border-role-government/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-sora font-semibold">{stat.district}</h3>
                    <Badge variant="outline" className={`${stat.color} border-current`}>{stat.risk_level}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Parcels: <span className="text-foreground font-jetbrains">{stat.parcels}</span></div>
                    <div className="text-muted-foreground">Alerts: <span className={`font-jetbrains ${stat.active_alerts > 0 ? "text-destructive font-bold" : "text-foreground"}`}>{stat.active_alerts}</span></div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          <Card className="bg-role-government/5 border-role-government/20 mt-6">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-role-government" />
              <p className="text-xs text-muted-foreground">
                All district reports for <strong>March 2024</strong> have been generated and synced with the state server.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
