"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { IndianRupee, CheckCircle, XCircle, Info, FileText, User, MapPin, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const MOCK_CLAIMS = [
  {
    id: "c1c1c1c1",
    farmer: "Ramesh Kumar",
    parcel: "River Patch",
    alert_type: "FLOOD",
    claimed: 100000,
    status: "PENDING",
    date: "2024-03-10",
    fo_decision: "REJECT",
    fo_notes: "Water receded, soil saturated but crop is fine.",
    ai_payout_suggested: 60000, // 60% since FO rejected
  },
];

const STATUS_COLORS: Record<string, string> = {
  PENDING: "border-amber text-amber",
  UNDER_REVIEW: "border-role-field_officer text-role-field_officer",
  APPROVED: "border-sage text-sage",
  REJECTED: "border-destructive text-destructive",
};

export default function InsuranceClaimsPage() {
  const [claims, setClaims] = useState(MOCK_CLAIMS);
  const [selected, setSelected] = useState<typeof MOCK_CLAIMS[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleApprove = async (claim: typeof MOCK_CLAIMS[0]) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setClaims((prev) =>
      prev.map((c) => (c.id === claim.id ? { ...c, status: "APPROVED" } : c))
    );
    toast.success(`Claim ${claim.id} approved. PDF report being generated.`);
    setSelected(null);
    setLoading(false);
  };

  const handleReject = async (claim: typeof MOCK_CLAIMS[0]) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setClaims((prev) =>
      prev.map((c) => (c.id === claim.id ? { ...c, status: "REJECTED" } : c))
    );
    toast.error("Claim rejected.");
    setSelected(null);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-sora font-bold">Claims Review</h1>
        <p className="text-muted-foreground text-sm mt-1">Review and adjudicate farmer crop loss claims</p>
      </div>

      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead>Claim ID</TableHead>
              <TableHead>Farmer</TableHead>
              <TableHead>Parcel</TableHead>
              <TableHead>Alert</TableHead>
              <TableHead className="text-right">Claimed (₹)</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map((claim, i) => (
              <TableRow key={claim.id} className="border-border/50 hover:bg-muted/20 transition-colors">
                <TableCell className="font-jetbrains text-xs text-muted-foreground">{claim.id.slice(0, 8)}</TableCell>
                <TableCell className="font-medium">{claim.farmer}</TableCell>
                <TableCell>{claim.parcel}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-[10px]">{claim.alert_type}</Badge>
                </TableCell>
                <TableCell className="text-right font-jetbrains font-semibold">
                  {claim.claimed.toLocaleString("en-IN")}
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className={STATUS_COLORS[claim.status]}>
                    {claim.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-role-insurance hover:bg-role-insurance/10"
                    onClick={() => setSelected(claim)}
                    disabled={claim.status !== "PENDING"}
                  >
                    <Info className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Claim Detail Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="font-sora">Claim Detail: {selected?.id.slice(0, 8)}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
              {/* Left: Claim Info */}
              <div className="space-y-4">
                <h3 className="font-sora font-semibold text-sm text-muted-foreground uppercase tracking-wider">Claim Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" /><span className="font-medium">{selected.farmer}</span></div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground" /><span>{selected.parcel}</span></div>
                  <div className="flex items-center gap-2"><IndianRupee className="w-4 h-4 text-muted-foreground" /><span className="font-jetbrains font-bold text-lg">₹{selected.claimed.toLocaleString("en-IN")}</span></div>
                  <div className="flex items-center gap-2"><FileText className="w-4 h-4 text-muted-foreground" /><span>Alert: {selected.alert_type}</span></div>
                </div>
              </div>

              {/* Right: FO Verification */}
              <div className="space-y-4">
                <h3 className="font-sora font-semibold text-sm text-muted-foreground uppercase tracking-wider">FO Verification</h3>
                <div className={`p-4 rounded-xl border ${selected.fo_decision === "REJECT" ? "border-destructive/30 bg-destructive/5" : "border-sage/30 bg-sage/5"}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck className={`w-4 h-4 ${selected.fo_decision === "ACCEPT" ? "text-sage" : "text-destructive"}`} />
                    <span className="font-semibold">{selected.fo_decision === "ACCEPT" ? "Accepted" : "Rejected by FO"}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selected.fo_notes}</p>
                </div>

                <div className="p-4 rounded-xl bg-amber/10 border border-amber/20">
                  <p className="text-xs text-muted-foreground mb-1">AI Suggested Payout</p>
                  <p className="font-jetbrains text-2xl font-bold text-amber">₹{selected.ai_payout_suggested.toLocaleString("en-IN")}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {selected.fo_decision === "REJECT" ? "60% of claimed (FO rejected)" : "90% of claimed (FO accepted)"}
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10" onClick={() => selected && handleReject(selected)} disabled={loading}>
              <XCircle className="w-4 h-4 mr-1" /> Reject
            </Button>
            <Button variant="outline" onClick={() => toast.info("More info requested.")} disabled={loading}>
              Request Info
            </Button>
            <Button className="bg-sage hover:bg-sage-dark text-white" onClick={() => selected && handleApprove(selected)} disabled={loading}>
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve ₹{selected?.ai_payout_suggested.toLocaleString("en-IN")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
