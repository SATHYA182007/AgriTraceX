"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Map as MapIcon, Wheat, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const ParcelMap = dynamic(() => import("@/components/maps/ParcelMap"), { ssr: false });

const MOCK_PARCELS = [
  { id: "aaaaaaaa", name: "North Field", farmer: "Ramesh Kumar", district: "Aheri", crop_type: "Cotton", area_ha: 2.5, health: "watch", lat: 19.4, lng: 79.98, last_reading: "2h ago" },
  { id: "bbbbbbbb", name: "River Patch", farmer: "Ramesh Kumar", district: "Aheri", crop_type: "Rice", area_ha: 1.2, health: "alert", lat: 19.41, lng: 79.99, last_reading: "4h ago" },
  { id: "cccccccc", name: "East Farm", farmer: "Suresh Patil", district: "Aheri", crop_type: "Soybean", area_ha: 4.0, health: "good", lat: 19.38, lng: 80.01, last_reading: "1h ago" },
  { id: "dddddddd", name: "Hillside", farmer: "Suresh Patil", district: "Aheri", crop_type: "Wheat", area_ha: 1.5, health: "good", lat: 19.39, lng: 80.05, last_reading: "3h ago" },
];

const HEALTH_BADGE: Record<string, string> = {
  good: "bg-sage/10 text-sage border-sage/30",
  watch: "bg-amber/10 text-amber border-amber/30",
  alert: "bg-destructive/10 text-destructive border-destructive/30",
};

export default function FOParcelsPage() {
  const [mapView, setMapView] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = MOCK_PARCELS.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.farmer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-sora font-bold">District Parcels</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage and monitor all parcels in Aheri district</p>
        </div>
        <div className="flex gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search farmer or parcel..." 
              className="pl-9 bg-card/50 border-border/50"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="gap-2 border-border/50"
            onClick={() => setMapView(!mapView)}
          >
            <MapIcon className="w-4 h-4" />
            {mapView ? "Table" : "Map"}
          </Button>
        </div>
      </div>

      {mapView ? (
        <Card className="overflow-hidden border-border/50 bg-card/50">
          <ParcelMap parcels={filtered} center={[19.4, 80.0]} zoom={12} height="550px" />
        </Card>
      ) : (
        <Card className="bg-card/50 border-border/50 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent text-xs uppercase text-muted-foreground tracking-wider">
                <TableHead>Parcel</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Crop</TableHead>
                <TableHead className="text-right">Area (ha)</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p, i) => (
                <motion.tr
                  key={p.id}
                  className="border-border/50 hover:bg-muted/20 transition-colors"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="text-muted-foreground">{p.farmer}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1">
                      <Wheat className="w-3 h-3 text-amber" />
                      {p.crop_type}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-jetbrains">{p.area_ha}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={HEALTH_BADGE[p.health]}>
                      {p.health}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" className="text-role-field_officer hover:bg-role-field_officer/10">
                      Details
                    </Button>
                  </TableCell>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                    No parcels found matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
