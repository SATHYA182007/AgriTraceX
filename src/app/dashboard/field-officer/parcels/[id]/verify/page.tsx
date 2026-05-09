"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, X, AlertTriangle, MapPin, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const ParcelMap = dynamic(() => import("@/components/maps/ParcelMap"), { ssr: false });

const MOCK_PARCEL = {
  id: "bbbbbbbb",
  name: "River Patch",
  area_ha: 1.2,
  crop_type: "Rice",
  health: "alert",
  lat: 19.41,
  lng: 79.99,
  alert: { type: "FLOOD", severity: "HIGH", description: "Severe waterlogging detected." },
};

export default function VerifyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [decision, setDecision] = useState<"ACCEPT" | "REJECT" | null>(null);
  const [correctedCrop, setCorrectedCrop] = useState("");
  const [riskScore, setRiskScore] = useState([50]);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!decision) {
      toast.error("Please select a decision.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Verification submitted! Alert acknowledged.");
    router.push("/dashboard/field-officer/alerts");
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="text-muted-foreground">
          ← Back
        </Button>
        <div>
          <h1 className="text-2xl font-sora font-bold">Verify Parcel: {MOCK_PARCEL.name}</h1>
          <p className="text-muted-foreground text-sm">Review AI prediction and submit ground-truth decision</p>
        </div>
      </div>

      {/* Alert Context */}
      <Card className="border-destructive/30 bg-destructive/5">
        <CardContent className="p-4 flex items-center gap-4">
          <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
          <div>
            <p className="font-semibold">{MOCK_PARCEL.alert.type} — {MOCK_PARCEL.alert.severity}</p>
            <p className="text-sm text-muted-foreground">{MOCK_PARCEL.alert.description}</p>
          </div>
          <Badge variant="destructive" className="ml-auto">{MOCK_PARCEL.alert.severity}</Badge>
        </CardContent>
      </Card>

      {/* Map */}
      <Card className="overflow-hidden border-border/50 bg-card/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-sora flex items-center gap-2">
            <MapPin className="w-4 h-4 text-role-field_officer" />
            Parcel Map with Risk Overlay
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ParcelMap
            parcels={[MOCK_PARCEL]}
            center={[MOCK_PARCEL.lat, MOCK_PARCEL.lng]}
            zoom={14}
            height="320px"
          />
        </CardContent>
      </Card>

      {/* Verification Form */}
      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-md font-sora">Field Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Decision */}
            <div className="space-y-3">
              <Label>Decision</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDecision("ACCEPT")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    decision === "ACCEPT"
                      ? "border-sage bg-sage/10"
                      : "border-border/50 hover:border-sage/40"
                  }`}
                >
                  <CheckCircle className="w-5 h-5 text-sage mb-2" />
                  <p className="font-semibold">Accept AI Prediction</p>
                  <p className="text-xs text-muted-foreground mt-1">Field condition matches satellite data</p>
                </button>
                <button
                  type="button"
                  onClick={() => setDecision("REJECT")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    decision === "REJECT"
                      ? "border-destructive bg-destructive/10"
                      : "border-border/50 hover:border-destructive/40"
                  }`}
                >
                  <X className="w-5 h-5 text-destructive mb-2" />
                  <p className="font-semibold">Reject — Field Differs</p>
                  <p className="text-xs text-muted-foreground mt-1">Ground conditions don't match AI assessment</p>
                </button>
              </div>
            </div>

            {/* If Reject — extra fields */}
            {decision === "REJECT" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 p-4 rounded-xl bg-destructive/5 border border-destructive/20"
              >
                <div className="space-y-2">
                  <Label>Corrected Crop Type</Label>
                  <Select onValueChange={(v: string | null) => setCorrectedCrop(v ?? "")}>
                    <SelectTrigger className="border-border/50">
                      <SelectValue placeholder="Select correct crop" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Cotton", "Rice", "Wheat", "Soybean", "Sugarcane", "Maize"].map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Label>Corrected Risk Score</Label>
                    <span className="font-jetbrains text-sm font-bold text-amber">{riskScore[0]}/100</span>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={riskScore}
                    onValueChange={(v: number[]) => setRiskScore(v)}
                    className="[&_[role=slider]]:bg-amber [&_[role=slider]]:border-amber"
                  />
                </div>
              </motion.div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label>Notes</Label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe field conditions, visible crop damage, water level, etc."
                rows={4}
                className="border-border/50 resize-none"
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <Label>Upload Photo</Label>
              <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-border/50 rounded-xl cursor-pointer hover:border-role-field_officer transition-colors bg-muted/20">
                <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Click to upload or capture photo</span>
                <input type="file" accept="image/*" capture="environment" className="hidden" />
              </label>
            </div>

            <Button
              type="submit"
              disabled={!decision || submitting}
              className="w-full h-12 bg-role-field_officer hover:bg-role-field_officer/80 text-white font-semibold"
            >
              {submitting ? "Submitting..." : "Submit Verification"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
