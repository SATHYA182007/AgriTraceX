"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Cpu, CheckCircle, RefreshCw, Play, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const MOCK_MODELS = [
  { id: "m1", version_name: "agri-ndvi-v1.2", accuracy: 91.4, deployed_at: "2024-02-01", is_current: false },
  { id: "m2", version_name: "agri-ndvi-v1.5", accuracy: 93.8, deployed_at: "2024-03-01", is_current: true },
  { id: "m3", version_name: "agri-ndvi-v1.6-beta", accuracy: 94.1, deployed_at: "2024-03-10", is_current: false },
];

export default function AdminModelsPage() {
  const [models, setModels] = useState(MOCK_MODELS);
  const [retraining, setRetraining] = useState(false);

  const setCurrent = (id: string) => {
    setModels((prev) => prev.map((m) => ({ ...m, is_current: m.id === id })));
    toast.success("Model version updated!");
  };

  const handleRetrain = async () => {
    setRetraining(true);
    await new Promise((r) => setTimeout(r, 2000));
    const newVer = {
      id: `m${Date.now()}`,
      version_name: `agri-ndvi-v1.7-${Date.now().toString().slice(-4)}`,
      accuracy: 94.2 + Math.random() * 2,
      deployed_at: new Date().toISOString().split("T")[0],
      is_current: false,
    };
    setModels((prev) => [...prev, newVer]);
    toast.success("Retraining complete! New model version logged.");
    setRetraining(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold">Model Versions</h1>
          <p className="text-muted-foreground text-sm mt-1">AgriSense AI — NDVI crop intelligence models</p>
        </div>
        <Button
          className="bg-role-super_admin hover:bg-role-super_admin/80 text-white gap-2"
          onClick={handleRetrain}
          disabled={retraining}
        >
          {retraining ? (
            <><RefreshCw className="w-4 h-4 animate-spin" /> Retraining...</>
          ) : (
            <><Play className="w-4 h-4" /> Trigger Retrain</>
          )}
        </Button>
      </div>

      {retraining && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 rounded-xl border border-role-super_admin/30 bg-role-super_admin/5 flex items-center gap-3"
        >
          <Zap className="w-5 h-5 text-role-super_admin animate-pulse" />
          <div>
            <p className="font-semibold text-sm">Model retrain in progress...</p>
            <p className="text-xs text-muted-foreground">Pulling verifications data and computing new accuracy metrics.</p>
          </div>
        </motion.div>
      )}

      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead>Version Name</TableHead>
              <TableHead className="text-right">Accuracy</TableHead>
              <TableHead>Deployed At</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model) => (
              <TableRow key={model.id} className="border-border/50 hover:bg-muted/20 transition-colors">
                <TableCell className="font-jetbrains text-sm font-medium">{model.version_name}</TableCell>
                <TableCell className="text-right">
                  <span className={`font-jetbrains font-bold ${model.accuracy >= 94 ? "text-sage" : model.accuracy >= 92 ? "text-amber" : "text-muted-foreground"}`}>
                    {model.accuracy.toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell className="font-jetbrains text-xs text-muted-foreground">{model.deployed_at}</TableCell>
                <TableCell className="text-center">
                  {model.is_current ? (
                    <Badge className="bg-sage/10 text-sage border border-sage/30">
                      <CheckCircle className="w-3 h-3 mr-1" /> Current
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">Inactive</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border/50 hover:border-role-super_admin"
                    disabled={model.is_current}
                    onClick={() => setCurrent(model.id)}
                  >
                    Set Current
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
