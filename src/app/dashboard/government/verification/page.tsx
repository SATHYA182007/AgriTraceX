"use client";

import { useState } from "react";
import { Check, X, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const VERIFICATIONS = [
  { id: 1, land: "Green Valley", farmer: "Ramesh", district: "Pune", status: "Pending" },
  { id: 2, land: "Sunrise Acres", farmer: "Suresh", district: "Nashik", status: "Pending" },
  { id: 3, land: "Golden Harvest", farmer: "Mahesh", district: "Satara", status: "Pending" },
  { id: 4, land: "RiverSide Farms", farmer: "Kiran", district: "Kolhapur", status: "Pending" },
  { id: 5, land: "EcoField Lands", farmer: "Arjun", district: "Nagpur", status: "Pending" },
  { id: 6, land: "GreenRoots Farm", farmer: "Vijay", district: "Pune", status: "Pending" },
  { id: 7, land: "AgroNova Fields", farmer: "Rajesh", district: "Aurangabad", status: "Pending" },
];

export default function VerificationPage() {
  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-500">Verification Engine</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            Disaster <span className="text-indigo-500">Verifications</span>
          </h1>
        </div>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-soft/50 border-b border-border/50">
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">Land Name</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">Farmer Name</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">District</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">Status</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {VERIFICATIONS.map((v) => (
                <tr key={v.id} className="hover:bg-surface-soft/30 transition-colors">
                  <td className="p-6 font-bold text-foreground">{v.land}</td>
                  <td className="p-6 font-medium text-text-soft">{v.farmer}</td>
                  <td className="p-6 font-medium text-text-soft">{v.district}</td>
                  <td className="p-6">
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-600 font-bold text-xs rounded-full uppercase tracking-widest">
                      {v.status}
                    </span>
                  </td>
                  <td className="p-6 flex justify-end gap-3">
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-indigo-500 bg-indigo-50 hover:bg-indigo-100 rounded-xl">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-emerald-500 bg-emerald-50 hover:bg-emerald-100 rounded-xl">
                      <Check size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-rose-500 bg-rose-50 hover:bg-rose-100 rounded-xl">
                      <X size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
