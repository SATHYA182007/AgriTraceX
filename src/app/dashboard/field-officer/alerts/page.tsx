"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, CheckCircle2, Droplets, Bug, Flame, Snowflake } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const ALERT_ICONS: Record<string, any> = {
  FLOOD: Droplets,
  DROUGHT: AlertTriangle,
  PEST: Bug,
  FIRE: Flame,
  FROST: Snowflake,
};

const MOCK_ALERTS = [
  {
    id: "f1f1f1f1",
    type: "FLOOD",
    severity: "HIGH",
    parcel: "River Patch",
    parcel_id: "bbbbbbbb",
    farmer: "Ramesh Kumar",
    time: "2h ago",
    district: "Aheri",
  },
  {
    id: "d2d2d2d2",
    type: "DROUGHT",
    severity: "MEDIUM",
    parcel: "East Farm",
    parcel_id: "cccccccc",
    farmer: "Suresh Patil",
    time: "6h ago",
    district: "Aheri",
  },
];

export default function FOAlertsPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold">Pending Alerts</h1>
          <p className="text-muted-foreground text-sm mt-1">Awaiting field verification</p>
        </div>
        <Badge variant="destructive" className="text-sm px-3 py-1">{MOCK_ALERTS.length} pending</Badge>
      </div>

      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead>Type</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Parcel</TableHead>
              <TableHead>Farmer</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ALERTS.map((alert, i) => {
              const Icon = ALERT_ICONS[alert.type] || AlertTriangle;
              return (
                <TableRow key={alert.id} className="border-border/50 hover:bg-muted/20 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-destructive" />
                      <span className="font-semibold">{alert.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={alert.severity === "HIGH" || alert.severity === "CRITICAL" ? "destructive" : "outline"}
                      className={alert.severity === "MEDIUM" ? "border-amber text-amber" : ""}
                    >
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.parcel}</TableCell>
                  <TableCell className="text-muted-foreground">{alert.farmer}</TableCell>
                  <TableCell>{alert.district}</TableCell>
                  <TableCell className="font-jetbrains text-sm text-muted-foreground">{alert.time}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      className="bg-role-field_officer hover:bg-role-field_officer/80 text-white gap-1"
                      onClick={() => router.push(`/dashboard/field-officer/parcels/${alert.parcel_id}/verify`)}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      Verify
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
