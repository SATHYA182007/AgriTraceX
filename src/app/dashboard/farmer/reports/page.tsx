"use client";

import { motion } from "framer-motion";
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  Search, 
  BarChart3, 
  Database, 
  Globe, 
  ChevronRight,
  Cpu,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const MOCK_REPORTS = [
  { id: '1', date: '09 May 2026', parcel: 'Sector 04-A1', node: 'ESP32-TX-01', risk: '12%', status: 'verified', type: 'IoT Telemetry' },
  { id: '2', date: '05 May 2026', parcel: 'Sector 04-A1', node: 'ESP32-TX-01', risk: '45%', status: 'pending', type: 'NPK Analysis' },
  { id: '3', date: '01 May 2026', parcel: 'Sector 04-A1', node: 'ESP32-TX-01', risk: '08%', status: 'verified', type: 'Predictive Sync' },
];

export default function FarmerReportsPage() {
  return (
    <div className="space-y-12 max-w-[1400px] mx-auto stagger-in">
      
      {/* Strategic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-primary rounded-full shadow-[0_0_15px_rgba(22,163,74,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">Archive Node: LOG-TELEMETRY</p>
          </div>
          <h1 className="text-6xl font-manrope font-extrabold tracking-tighter text-foreground leading-tight">
            Intelligence <span className="text-primary">Archive</span>
          </h1>
          <p className="text-lg text-text-soft font-medium max-w-xl">
             Processed field telemetry logs and NPK intelligence summaries.
          </p>
        </div>

        <div className="flex gap-4">
           <Button variant="outline" className="h-16 px-10 bg-white border-border rounded-2xl font-black uppercase tracking-widest text-[11px] text-text-soft hover:bg-surface-soft hover:text-primary transition-all flex items-center gap-4 shadow-soft">
              <Search size={20} /> Search Archive
           </Button>
           <Button className="h-16 px-10 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-4">
              <FileText size={20} /> Generate Log
           </Button>
        </div>
      </div>

      <div className="premium-card overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-surface-soft/50 border-b border-border">
                     <th className="py-8 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-text-soft opacity-60">Sync Date</th>
                     <th className="py-8 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-text-soft opacity-60">Field Node</th>
                     <th className="py-8 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-text-soft opacity-60">Data Type</th>
                     <th className="py-8 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-text-soft opacity-60">Risk Vector</th>
                     <th className="py-8 px-10 text-[10px] font-black uppercase tracking-[0.3em] text-text-soft opacity-60 text-right">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-border/50">
                  {MOCK_REPORTS.map((report) => (
                     <tr key={report.id} className="hover:bg-surface-soft/30 transition-colors group">
                        <td className="py-8 px-10">
                           <p className="font-jetbrains font-bold text-sm text-foreground uppercase tracking-tight">{report.date}</p>
                        </td>
                        <td className="py-8 px-10">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-xl bg-white shadow-soft flex items-center justify-center text-primary border border-border group-hover:rotate-6 transition-transform">
                                 <Cpu size={20} />
                              </div>
                              <div>
                                 <p className="font-manrope font-extrabold text-foreground tracking-tight">{report.parcel}</p>
                                 <p className="text-[9px] font-black text-text-soft uppercase tracking-widest opacity-60">{report.node}</p>
                              </div>
                           </div>
                        </td>
                        <td className="py-8 px-10">
                           <Badge variant="outline" className="border-primary/10 text-primary font-black text-[9px] px-4 py-1.5 uppercase tracking-widest rounded-full">{report.type}</Badge>
                        </td>
                        <td className="py-8 px-10">
                           <div className="flex items-center gap-4">
                              <div className="w-24 h-1.5 bg-surface-soft rounded-full overflow-hidden border border-border/50">
                                 <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: report.risk }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className={`h-full ${parseInt(report.risk) > 30 ? 'bg-amber-500' : 'bg-primary'} shadow-lg`} 
                                 />
                              </div>
                              <span className="font-jetbrains font-bold text-xs text-foreground">{report.risk}</span>
                           </div>
                        </td>
                        <td className="py-8 px-10 text-right">
                           <div className="flex items-center justify-end gap-6">
                              <div className="flex items-center gap-2">
                                 {report.status === 'verified' ? (
                                    <CheckCircle2 size={16} className="text-primary" />
                                 ) : (
                                    <Clock size={16} className="text-amber-500" />
                                 )}
                                 <span className={`text-[10px] font-black uppercase tracking-widest ${report.status === 'verified' ? 'text-primary' : 'text-amber-500'}`}>
                                    {report.status}
                                 </span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl bg-white border border-border text-primary shadow-sm hover:bg-primary hover:text-white transition-all group">
                                 <Download size={20} className="group-hover:translate-y-1 transition-transform" />
                              </Button>
                           </div>
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
