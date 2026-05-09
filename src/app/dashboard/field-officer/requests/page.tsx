"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarCheck, CheckCircle2, User, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

const MOCK_REQUESTS = [
  {
    id: "r1r1r1r1",
    farmer: "Ramesh Kumar",
    parcel: "River Patch",
    requested_date: "2024-03-11",
    alert: "FLOOD – HIGH",
    status: "PENDING",
    created_at: "2h ago",
  },
  {
    id: "r2r2r2r2",
    farmer: "Suresh Patil",
    parcel: "East Farm",
    requested_date: "2024-03-12",
    alert: "DROUGHT – MEDIUM",
    status: "SCHEDULED",
    created_at: "1d ago",
  },
];

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  PENDING: { label: "Pending", className: "bg-amber/10 text-amber border-amber/30" },
  SCHEDULED: { label: "Scheduled", className: "bg-role-field_officer/10 text-role-field_officer border-role-field_officer/30" },
  COMPLETED: { label: "Completed", className: "bg-sage/10 text-sage border-sage/30" },
};

export default function FORequestsPage() {
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const updateStatus = (id: string, newStatus: string) => {
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    toast.success(`Request marked as ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold">Incoming Requests</h1>
          <p className="text-muted-foreground text-sm mt-1">Extension officer visit requests from farmers</p>
        </div>
        <Badge className="bg-amber text-black">{requests.filter((r) => r.status === "PENDING").length} new</Badge>
      </div>

      <div className="space-y-4">
        {requests.map((req) => {
          const sc = STATUS_CONFIG[req.status];
          return (
            <Card key={req.id} className="bg-card/50 border-border/50">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-sora font-semibold">{req.farmer}</span>
                        <Badge variant="outline" className={sc.className}>{sc.label}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{req.parcel}</span>
                        <span className="flex items-center gap-1"><CalendarCheck className="w-3 h-3" />{req.requested_date}</span>
                        <span className="text-xs">{req.alert}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {req.status === "PENDING" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-role-field_officer text-role-field_officer"
                        onClick={() => updateStatus(req.id, "SCHEDULED")}
                      >
                        Schedule Visit
                      </Button>
                    )}
                    {req.status === "SCHEDULED" && (
                      <Button
                        size="sm"
                        className="bg-sage hover:bg-sage-dark text-white"
                        onClick={() => updateStatus(req.id, "COMPLETED")}
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
