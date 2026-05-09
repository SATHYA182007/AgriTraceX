"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, Legend,
} from "recharts";
import { motion } from "framer-motion";

const MONTHLY_CLAIMS = [
  { month: "Oct", claims: 5, payout: 220000 },
  { month: "Nov", claims: 8, payout: 380000 },
  { month: "Dec", claims: 12, payout: 510000 },
  { month: "Jan", claims: 9, payout: 400000 },
  { month: "Feb", claims: 6, payout: 280000 },
  { month: "Mar", claims: 14, payout: 630000 },
];

const TOP_PAYOUTS = [
  { farmer: "Ramesh Kumar", amount: 90000 },
  { farmer: "Suresh Patil", amount: 72000 },
  { farmer: "Vilas Rao", amount: 108000 },
];

export default function InsuranceAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-sora font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Claim volume and payout trends</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-card/50 border-border/50">
            <CardHeader><CardTitle className="text-md font-sora">Monthly Claim Volume</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={MONTHLY_CLAIMS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis yAxisId="left" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Line yAxisId="left" type="monotone" dataKey="claims" stroke="#D95F3B" strokeWidth={2} dot={false} name="Claims" />
                  <Line yAxisId="right" type="monotone" dataKey="payout" stroke="#E8A838" strokeWidth={2} dot={false} name="Payout (₹)" />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card/50 border-border/50">
            <CardHeader><CardTitle className="text-md font-sora">Top 10 Highest Payouts</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={TOP_PAYOUTS} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} horizontal={false} />
                  <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                  <YAxis dataKey="farmer" type="category" width={100} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} formatter={(v: number) => [`₹${v.toLocaleString("en-IN")}`, "Payout"]} />
                  <Bar dataKey="amount" fill="#D95F3B" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
