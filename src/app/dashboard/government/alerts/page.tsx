"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, CheckCircle2, Droplets, Bug, Flame, Snowflake } from "lucide-react";
import { toast } from "sonner";

const ALERT_ICONS: Record<string, React.ElementType> = {
  FLOOD: Droplets,
  DROUGHT: AlertTriangle,
  PEST: Bug,
  FIRE: Flame,
  FROST: Snowflake,
};

const MOCK_ALERTS = [
  { id: "f1f1f1f1", type: "FLOOD", severity: "HIGH", parcel: "River Patch", district: "Aheri", acknowledged: false, fo_status: "Verified – REJECT", time: "2h ago" },
  { id: "d2d2d2d2", type: "DROUGHT", severity: "MEDIUM", parcel: "East Farm", district: "Aheri", acknowledged: false, fo_status: "Pending", time: "6h ago" },
  { id: "p3p3p3p3", type: "PEST", severity: "LOW", parcel: "North Field", district: "Gadchiroli", acknowledged: true, fo_status: "Verified – ACCEPT", time: "1d ago" },
];

export default function GovtAlertsPage() {
  const [alerts, setAlerts] = useState(MOCK_ALERTS);

  const acknowledge = (id: string) => {
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
    toast.success("Alert acknowledged");
  };

  const bulkAcknowledge = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, acknowledged: true })));
    toast.success("All verified alerts acknowledged");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold">District Alerts</h1>
          <p className="text-muted-foreground text-sm mt-1">All alerts across your jurisdiction</p>
        </div>
        <Button variant="outline" className="border-border/50" onClick={bulkAcknowledge}>
          <CheckCircle2 className="w-4 h-4 mr-2" /> Bulk Acknowledge
        </Button>
      </div>

      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead>Type</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Parcel</TableHead>
              <TableHead>District</TableHead>
              <TableHead>FO Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-center">Acknowledged</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => {
              const Icon = ALERT_ICONS[alert.type] || AlertTriangle;
              return (
                <TableRow key={alert.id} className={`border-border/50 hover:bg-muted/20 transition-colors ${alert.acknowledged ? "opacity-50" : ""}`}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-destructive" />
                      <span className="font-semibold text-sm">{alert.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={alert.severity === "HIGH" ? "destructive" : "outline"}
                      className={alert.severity === "MEDIUM" ? "border-amber text-amber" : ""}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.parcel}</TableCell>
                  <TableCell>{alert.district}</TableCell>
                  <TableCell>
                    <span className={`text-xs ${alert.fo_status.includes("ACCEPT") ? "text-sage" : alert.fo_status.includes("REJECT") ? "text-amber" : "text-muted-foreground"}`}>
                      {alert.fo_status}
                    </span>
                  </TableCell>
                  <TableCell className="font-jetbrains text-xs text-muted-foreground">{alert.time}</TableCell>
                  <TableCell className="text-center">
                    {alert.acknowledged ? (
                      <CheckCircle2 className="w-4 h-4 text-sage mx-auto" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-amber animate-pulse block mx-auto" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" disabled={alert.acknowledged} onClick={() => acknowledge(alert.id)}
                      className="text-role-government hover:bg-role-government/10">
                      Ack
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
