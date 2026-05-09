"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, Legend, LineChart, Line,
} from "recharts";
import { motion } from "framer-motion";

const ALERT_TYPE_DATA = [
  { name: "Flood", value: 12, fill: "#2B8FCB" },
  { name: "Drought", value: 8, fill: "#E8A838" },
  { name: "Pest", value: 5, fill: "#4A6741" },
  { name: "Fire", value: 2, fill: "#D95F3B" },
  { name: "Frost", value: 1, fill: "#7C3AED" },
];

const MOISTURE_TREND = [
  { day: "Mar 1", moisture: 60, temperature: 28 },
  { day: "Mar 5", moisture: 55, temperature: 30 },
  { day: "Mar 10", moisture: 75, temperature: 27 },
  { day: "Mar 15", moisture: 80, temperature: 26 },
  { day: "Mar 20", moisture: 65, temperature: 29 },
];

const TOP_PARCELS = [
  { parcel: "River Patch", alerts: 4 },
  { parcel: "East Farm", alerts: 3 },
  { parcel: "North Field", alerts: 2 },
];

export default function GovtAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-sora font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">District-level agricultural intelligence</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Sensor Trends */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-card/50 border-border/50">
            <CardHeader><CardTitle className="text-md font-sora">Sensor Trends (District Avg)</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={MOISTURE_TREND}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                  <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Line type="monotone" dataKey="moisture" stroke="#2B8FCB" strokeWidth={2} dot={false} name="Moisture %" />
                  <Line type="monotone" dataKey="temperature" stroke="#E8A838" strokeWidth={2} dot={false} name="Temp °C" />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Alert Distribution */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-card/50 border-border/50">
            <CardHeader><CardTitle className="text-md font-sora">Alert Type Distribution</CardTitle></CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={ALERT_TYPE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {ALERT_TYPE_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Affected Parcels */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="xl:col-span-2">
          <Card className="bg-card/50 border-border/50">
            <CardHeader><CardTitle className="text-md font-sora">Top Affected Parcels This Season</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={TOP_PARCELS} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} horizontal={false} />
                  <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} />
                  <YAxis dataKey="parcel" type="category" width={90} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Bar dataKey="alerts" fill="#3B3FA8" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
