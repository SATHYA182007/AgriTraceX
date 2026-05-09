"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, UserPlus, Pencil, Shield } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const MOCK_USERS = [
  { id: "11111111", name: "Ramesh Kumar", email: "farmer1@agrisense.com", role: "farmer", district: "Aheri", last_login: "2024-03-10" },
  { id: "22222222", name: "Suresh Patil", email: "farmer2@agrisense.com", role: "farmer", district: "Aheri", last_login: "2024-03-09" },
  { id: "33333333", name: "Vilas Rao", email: "farmer3@agrisense.com", role: "farmer", district: "Aheri", last_login: "2024-03-08" },
  { id: "44444444", name: "Amit Sharma", email: "fo1@agrisense.com", role: "field_officer", district: "Aheri", last_login: "2024-03-10" },
  { id: "55555555", name: "Priya Singh", email: "fo2@agrisense.com", role: "field_officer", district: "Aheri", last_login: "2024-03-09" },
  { id: "66666666", name: "Collector Aheri", email: "govt@agrisense.com", role: "government", district: "Aheri", last_login: "2024-03-10" },
  { id: "77777777", name: "LIC Agent", email: "insurance@agrisense.com", role: "insurance", district: "Maharashtra", last_login: "2024-03-08" },
  { id: "88888888", name: "Super Admin", email: "admin@agrisense.com", role: "super_admin", district: "All", last_login: "2024-03-10" },
];

const ROLE_COLORS: Record<string, string> = {
  farmer: "bg-amber/10 text-amber border-amber/30",
  field_officer: "bg-role-field_officer/10 text-role-field_officer border-role-field_officer/30",
  government: "bg-role-government/10 text-role-government border-role-government/30",
  insurance: "bg-role-insurance/10 text-role-insurance border-role-insurance/30",
  super_admin: "bg-role-super_admin/10 text-role-super_admin border-role-super_admin/30",
};

export default function AdminUsersPage() {
  const [showInvite, setShowInvite] = useState(false);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Invite email sent with magic link!");
    setShowInvite(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold">Users</h1>
          <p className="text-muted-foreground text-sm mt-1">{MOCK_USERS.length} registered users</p>
        </div>
        <Button className="bg-role-super_admin hover:bg-role-super_admin/80 text-white gap-2" onClick={() => setShowInvite(true)}>
          <UserPlus className="w-4 h-4" /> Invite User
        </Button>
      </div>

      <Card className="bg-card/50 border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>District</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_USERS.map((user, i) => (
              <motion.tr
                key={user.id}
                className="border-border/50 hover:bg-muted/20 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="font-jetbrains text-xs text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={ROLE_COLORS[user.role]}>
                    {user.role.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>{user.district}</TableCell>
                <TableCell className="font-jetbrains text-xs">{user.last_login}</TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" className="text-muted-foreground hover:text-role-super_admin">
                    <Pencil className="w-3 h-3" />
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Invite Modal */}
      <Dialog open={showInvite} onOpenChange={setShowInvite}>
        <DialogContent className="max-w-md bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="font-sora flex items-center gap-2">
              <Shield className="w-5 h-5 text-role-super_admin" />
              Invite New User
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input placeholder="John Doe" className="border-border/50" required />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input type="email" placeholder="user@agrisense.gov.in" className="border-border/50" required />
            </div>
            <div className="space-y-2">
              <Label>Assign Role</Label>
              <Select required>
                <SelectTrigger className="border-border/50"><SelectValue placeholder="Select role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">Farmer</SelectItem>
                  <SelectItem value="field_officer">Field Officer</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>
                  <SelectItem value="super_admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>District</Label>
              <Input placeholder="Aheri" className="border-border/50" />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowInvite(false)}>Cancel</Button>
              <Button type="submit" className="bg-role-super_admin text-white hover:bg-role-super_admin/80">Send Invite</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
