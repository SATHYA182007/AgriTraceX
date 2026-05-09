"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Droplets, Zap, IndianRupee, Bug, PlusCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const MOCK_ACTIONS = [
  {
    id: "g1g1g1g1",
    action: "WATER_RELEASE",
    district: "Aheri",
    notes: "Emergency water release authorized due to heatwave.",
    created_at: "2024-03-08",
  },
];

const ACTION_CONFIG: Record<string, { icon: any; label: string; color: string }> = {
  WATER_RELEASE: { icon: Droplets, label: "Water Release", color: "text-role-field_officer" },
  SUBSIDY_DISBURSE: { icon: IndianRupee, label: "Subsidy Disbursement", color: "text-sage" },
  PEST_SPRAY: { icon: Bug, label: "Pest Spray", color: "text-amber" },
  RELIEF_FUND: { icon: Zap, label: "Relief Fund", color: "text-role-insurance" },
};

export default function GovtActionsPage() {
  const [actions, setActions] = useState(MOCK_ACTIONS);
  const [showForm, setShowForm] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Action initiated! Farmers will be notified.");
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold">Government Actions</h1>
          <p className="text-muted-foreground text-sm mt-1">District-level intervention log</p>
        </div>
        <Button className="bg-role-government hover:bg-role-government/80 text-white gap-2" onClick={() => setShowForm(true)}>
          <PlusCircle className="w-4 h-4" /> New Action
        </Button>
      </div>

      <div className="space-y-4">
        {actions.map((action, i) => {
          const cfg = ACTION_CONFIG[action.action];
          const Icon = cfg?.icon || Zap;
          return (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-background">
                    <Icon className={`w-5 h-5 ${cfg?.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-sora font-semibold">{cfg?.label || action.action}</span>
                      <Badge variant="outline" className="border-border/50">{action.district}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{action.notes}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-jetbrains">
                    <Calendar className="w-3 h-3" />
                    {action.created_at}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="font-sora">Initiate Government Action</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Action Type</Label>
              <Select onValueChange={(v: string | null) => setSelectedAction(v ?? "")} required>
                <SelectTrigger className="border-border/50">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WATER_RELEASE">Water Release</SelectItem>
                  <SelectItem value="SUBSIDY_DISBURSE">Subsidy Disbursement</SelectItem>
                  <SelectItem value="PEST_SPRAY">Pest Spray</SelectItem>
                  <SelectItem value="RELIEF_FUND">Relief Fund</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target District</Label>
              <Select required>
                <SelectTrigger className="border-border/50">
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aheri">Aheri</SelectItem>
                  <SelectItem value="Gadchiroli">Gadchiroli</SelectItem>
                  <SelectItem value="Chamorshi">Chamorshi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Notes / Authorization</Label>
              <Textarea
                placeholder="Describe the action being taken and authorization..."
                rows={4}
                className="border-border/50 resize-none"
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" className="bg-role-government text-white hover:bg-role-government/80">
                Confirm Action
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
