"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { IndianRupee, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

const MONTHLY_DATA = [
  { month: "Oct", payout: 120000 },
  { month: "Nov", payout: 85000 },
  { month: "Dec", payout: 200000 },
  { month: "Jan", payout: 160000 },
  { month: "Feb", payout: 95000 },
  { month: "Mar", payout: 310000 },
];

const MOCK_CLAIMS = [
  { id: "c1c1c1c1", farmer: "Ramesh Kumar", parcel: "River Patch", crop: "Rice", status: "PENDING", amount: 100000 },
];

export default function GovtReliefPage() {
  const totalDisbursed = 452000;
  const pendingAmount = 100000;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-sora font-bold">Relief Fund</h1>
        <p className="text-muted-foreground text-sm mt-1">District-wide claim payouts and disbursements</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Disbursed", value: `₹${totalDisbursed.toLocaleString("en-IN")}`, icon: IndianRupee, color: "text-sage" },
          { label: "Pending Amount", value: `₹${pendingAmount.toLocaleString("en-IN")}`, icon: Clock, color: "text-amber" },
          { label: "Approved Claims", value: "8", icon: CheckCircle, color: "text-role-government" },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-background ${kpi.color}`}>
                  <kpi.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <h3 className="text-xl font-jetbrains font-bold">{kpi.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardHeader>
          <CardTitle className="text-md font-sora">Monthly Payout Trend (₹)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={MONTHLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontFamily: "var(--font-jetbrains-mono)" }} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12, fontFamily: "var(--font-jetbrains-mono)" }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Payout"]}
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }}
              />
              <Bar dataKey="payout" fill="#3B3FA8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
