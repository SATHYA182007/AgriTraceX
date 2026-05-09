"use client";

import { useState } from "react";
import { UserCog, Eye, Ban, Edit, MapPin, RefreshCw, Key, X, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

const USERS = [
  { id: 1, name: "Ramesh Patil", role: "Farmer", district: "Pune", status: "Active", lastActive: "2 min ago", color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: 2, name: "Suresh Kumar", role: "Field Officer", district: "Nashik", status: "Active", lastActive: "5 min ago", color: "text-blue-500", bg: "bg-blue-50" },
  { id: 3, name: "Priya Sharma", role: "Analyst", district: "Nagpur", status: "Active", lastActive: "1 min ago", color: "text-amber-500", bg: "bg-amber-50" },
  { id: 4, name: "Kiran Joshi", role: "Insurance Manager", district: "Satara", status: "Active", lastActive: "8 min ago", color: "text-rose-500", bg: "bg-rose-50" },
  { id: 5, name: "Vijay Rao", role: "Government Officer", district: "Kolhapur", status: "Active", lastActive: "3 min ago", color: "text-indigo-500", bg: "bg-indigo-50" },
  { id: 6, name: "Anand Patel", role: "Farmer", district: "Aurangabad", status: "Inactive", lastActive: "1 hr ago", color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: 7, name: "Rajesh Mehta", role: "Analyst", district: "Pune", status: "Active", lastActive: "7 min ago", color: "text-amber-500", bg: "bg-amber-50" },
];

export default function UserManagementPage() {
  const [selectedUser, setSelectedUser] = useState<any>(null);

  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-purple-500">Access Control</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            User <span className="text-purple-500">Management</span>
          </h1>
        </div>
      </div>

      <div className="premium-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-soft/50 border-b border-border/50">
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">User Name</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">Role</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">District</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">Status</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft">Last Active</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-text-soft text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {USERS.map((user) => (
                <tr key={user.id} className="hover:bg-surface-soft/30 transition-colors">
                  <td className="p-6 font-bold text-foreground">{user.name}</td>
                  <td className="p-6">
                     <span className={`px-3 py-1 ${user.bg} ${user.color} font-bold text-xs rounded-full uppercase tracking-widest`}>
                        {user.role}
                     </span>
                  </td>
                  <td className="p-6 font-medium text-text-soft">{user.district}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'} font-bold text-xs rounded-full uppercase tracking-widest`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-6 font-jetbrains text-sm font-medium text-text-soft">{user.lastActive}</td>
                  <td className="p-6 flex justify-end gap-3">
                    <Button variant="ghost" size="icon" onClick={() => setSelectedUser(user)} className="h-10 w-10 text-purple-500 bg-purple-50 hover:bg-purple-100 rounded-xl" title="Manage User">
                      <UserCog size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedUser(null)}>
            <div className="bg-white rounded-[32px] w-full max-w-4xl p-10 relative overflow-hidden" onClick={e => e.stopPropagation()}>
               <div className="absolute top-0 left-0 w-full h-2 bg-purple-500" />
               <button onClick={() => setSelectedUser(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-soft">
                  <X size={20} />
               </button>
               
               <div className="flex items-center gap-6 mb-8">
                  <div className={`w-20 h-20 rounded-full ${selectedUser.bg} border-4 border-white shadow-xl flex items-center justify-center ${selectedUser.color}`}>
                     <UserCog size={32} />
                  </div>
                  <div>
                     <h2 className="text-3xl font-manrope font-extrabold">{selectedUser.name}</h2>
                     <p className={`font-bold uppercase tracking-widest text-xs mt-1 ${selectedUser.color}`}>{selectedUser.role} • {selectedUser.district}</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-6">
                     <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-text-soft mb-2">Session Integrity</h4>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 rounded-xl bg-surface-soft"><span className="text-[10px] uppercase font-bold text-text-soft">Status</span><p className={`font-jetbrains font-bold text-lg ${selectedUser.status === 'Active' ? 'text-emerald-500' : 'text-rose-500'}`}>{selectedUser.status}</p></div>
                           <div className="p-4 rounded-xl bg-surface-soft"><span className="text-[10px] uppercase font-bold text-text-soft">GPS Sync</span><p className="font-jetbrains font-bold text-lg">Stable</p></div>
                        </div>
                     </div>
                     <div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-text-soft mb-2">Activity History</h4>
                        <div className="space-y-3">
                           <div className="flex items-center gap-3 text-sm font-medium"><Activity size={14} className="text-primary"/> Session start detected via mobile edge</div>
                           <div className="flex items-center gap-3 text-sm font-medium"><MapPin size={14} className="text-blue-500"/> GIS Ping received from {selectedUser.district} node</div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="space-y-4 pt-6">
                     <Button className="w-full justify-start gap-4 h-12 rounded-xl border border-border bg-white text-foreground hover:bg-surface-soft font-bold shadow-sm">
                        <Eye size={18} className="text-blue-500" /> View Profile & Details
                     </Button>
                     <Button className="w-full justify-start gap-4 h-12 rounded-xl border border-border bg-white text-foreground hover:bg-surface-soft font-bold shadow-sm">
                        <Edit size={18} className="text-amber-500" /> Edit Permissions & Access
                     </Button>
                     <Button className="w-full justify-start gap-4 h-12 rounded-xl border border-border bg-white text-foreground hover:bg-surface-soft font-bold shadow-sm">
                        <MapPin size={18} className="text-indigo-500" /> Re-assign GIS District
                     </Button>
                     <Button className="w-full justify-start gap-4 h-12 rounded-xl border border-border bg-white text-foreground hover:bg-surface-soft font-bold shadow-sm">
                        <Key size={18} className="text-emerald-500" /> Reset Password / Access Token
                     </Button>
                     <Button className="w-full justify-start gap-4 h-12 rounded-xl border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold shadow-sm">
                        <Ban size={18} /> Suspend User Account
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
