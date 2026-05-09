"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FileText, PlusCircle, Upload, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

const MOCK_NOTES = [
  {
    id: "n1",
    parcel: "River Patch",
    note: "Water level has receded by ~30%. Soil is still waterlogged. Recommended 2 more days before entry.",
    photo_url: null,
    created_at: "2024-03-10 14:30",
  },
  {
    id: "n2",
    parcel: "East Farm",
    note: "Signs of leaf curl virus on top 20% of soybean crop. Advised farmer to apply neem-based pesticide.",
    photo_url: null,
    created_at: "2024-03-09 09:15",
  },
];

export default function FONotesPage() {
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState(MOCK_NOTES);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Field note saved!");
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold">Field Notes</h1>
          <p className="text-muted-foreground text-sm mt-1">Per-parcel observation journal</p>
        </div>
        <Button className="bg-role-field_officer hover:bg-role-field_officer/80 text-white gap-2" onClick={() => setShowForm(true)}>
          <PlusCircle className="w-4 h-4" /> Add Note
        </Button>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id} className="bg-card/50 border-border/50">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-muted shrink-0 mt-1">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1 text-sm font-semibold">
                      <MapPin className="w-3 h-3 text-role-field_officer" />{note.parcel}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground font-jetbrains">
                      <Clock className="w-3 h-3" />{note.created_at}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed">{note.note}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Note Modal */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="font-sora">Add Field Note</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Parcel</Label>
              <Select required>
                <SelectTrigger className="border-border/50">
                  <SelectValue placeholder="Select parcel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bbbbbbbb">River Patch</SelectItem>
                  <SelectItem value="cccccccc">East Farm</SelectItem>
                  <SelectItem value="aaaaaaaa">North Field</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Observation</Label>
              <Textarea
                placeholder="Describe what you observed in the field..."
                rows={5}
                className="border-border/50 resize-none"
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Attach Photo</Label>
              <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-border/50 rounded-xl cursor-pointer hover:border-role-field_officer transition-colors">
                <div className="text-center">
                  <Upload className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
                  <span className="text-xs text-muted-foreground">Upload or capture</span>
                </div>
                <input type="file" accept="image/*" capture="environment" className="hidden" />
              </label>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button type="submit" className="bg-role-field_officer text-white hover:bg-role-field_officer/80">
                Save Note
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
