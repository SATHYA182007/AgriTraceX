import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Calendar, Users } from "lucide-react";

export default function AdvisoryPage() {
  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Expert <span className="text-primary">Advisory</span></h1>
        <p className="text-slate-500 font-bold text-sm">Personalized guidance from registered field officers and agronomists.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <AdvisoryLink icon={MessageSquare} title="Direct Consult" desc="Chat with your assigned officer" />
         <AdvisoryLink icon={Calendar} title="Schedule Visit" desc="Book a ground-truth inspection" />
         <AdvisoryLink icon={Users} title="Community Hub" desc="Discuss with regional peer farmers" />
      </div>

      <Card className="rounded-[40px] border-slate-100 shadow-xl bg-white p-12 text-center">
         <div className="max-w-md mx-auto space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
               <MessageSquare className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-black text-slate-900">No Active Consultations</h2>
            <p className="text-slate-500 font-bold text-sm">Your crop health is currently optimal. No advisory interventions are suggested at this time.</p>
         </div>
      </Card>
    </div>
  );
}

function AdvisoryLink({ icon: Icon, title, desc }: any) {
  return (
    <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all cursor-pointer group">
       <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Icon size={24} />
       </div>
       <h3 className="text-lg font-black text-slate-900 mb-1">{title}</h3>
       <p className="text-xs font-bold text-slate-400">{desc}</p>
    </div>
  );
}
