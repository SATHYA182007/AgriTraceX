import { Card } from "@/components/ui/card";
import { ShoppingCart, Tag, Truck } from "lucide-react";

export default function MarketplacePage() {
  return (
    <div className="space-y-8 max-w-[1200px] mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tighter text-slate-900">Agri <span className="text-primary">Market</span></h1>
        <p className="text-slate-500 font-bold text-sm">Direct access to certified seeds, fertilizers, and equipment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <MarketCard icon={Tag} title="Certified Inputs" count="128 Items" />
         <MarketCard icon={ShoppingCart} title="My Cart" count="0 Items" />
         <MarketCard icon={Truck} title="Order Tracking" count="Active" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="rounded-[32px] border-slate-100 shadow-sm bg-white overflow-hidden group">
               <div className="h-48 bg-slate-100" />
               <div className="p-6 space-y-4">
                  <div>
                     <p className="text-[10px] font-black uppercase text-slate-400">Nutrients</p>
                     <h4 className="text-sm font-black text-slate-900">Premium Bio-Fertilizer</h4>
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-lg font-black text-primary">₹1,250</span>
                     <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-colors">Add</button>
                  </div>
               </div>
            </Card>
         ))}
      </div>
    </div>
  );
}

function MarketCard({ icon: Icon, title, count }: any) {
  return (
    <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm flex items-center gap-6">
       <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center">
          <Icon size={24} />
       </div>
       <div>
          <h3 className="text-lg font-black text-slate-900">{title}</h3>
          <p className="text-xs font-bold text-primary uppercase tracking-widest">{count}</p>
       </div>
    </div>
  );
}
