"use client";

import { useState, useEffect } from "react";
import { Download, Send, BadgeCheck, FileArchive, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";

const CERTIFICATIONS = [
  { id: "AGX-CERT-2045", land: "Green Valley", farmer: "Ramesh Patil", district: "Pune", risk: "Low", health: "Good", date: "09 May 2026", area: "2.5 ha", crop: "Wheat", status: "Verified" },
  { id: "AGX-CERT-2046", land: "Sunrise Acres", farmer: "Suresh Kumar", district: "Nashik", risk: "Moderate", health: "Fair", date: "09 May 2026", area: "3.1 ha", crop: "Rice", status: "Verified" },
];

export default function CertificationCenter() {
  const [selected, setSelected] = useState<any>(CERTIFICATIONS[0]);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      // Generate QR code
      const qrPayload = JSON.stringify({
        id: selected.id,
        land: selected.land,
        farmer: selected.farmer,
        district: selected.district,
        date: selected.date,
        status: selected.status,
      });
      const qrDataUrl = await QRCode.toDataURL(qrPayload, {
        width: 200,
        margin: 1,
        color: { dark: "#0a2d1e", light: "#ffffff" },
      });

      const doc = new jsPDF("landscape", "mm", "a4");
      const W = doc.internal.pageSize.getWidth();
      const H = doc.internal.pageSize.getHeight();

      // ── Deep green background ──
      doc.setFillColor(10, 45, 30);
      doc.rect(0, 0, W, H, "F");

      // ── White main card ──
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(14, 14, W - 28, H - 28, 6, 6, "F");

      // ── Green left accent strip ──
      doc.setFillColor(16, 185, 129);
      doc.roundedRect(14, 14, 8, H - 28, 6, 6, "F");
      doc.rect(18, 14, 4, H - 28, "F");

      // ── Header region background ──
      doc.setFillColor(240, 253, 244);
      doc.rect(22, 14, W - 36, 42, "F");

      // ── AgriTrace X branding ──
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(16, 185, 129);
      doc.text("AgriTrace X", 32, 28);

      // ── Certified badge ──
      doc.setFillColor(16, 185, 129);
      doc.roundedRect(32, 31, 32, 7, 3, 3, "F");
      doc.setFontSize(6.5);
      doc.setTextColor(255, 255, 255);
      doc.text("✓  DIGITALLY CERTIFIED", 48, 36, { align: "center" });

      // ── Main title ──
      doc.setFontSize(22);
      doc.setTextColor(10, 45, 30);
      doc.text("LAND VERIFICATION CERTIFICATE", W / 2 + 8, 30, { align: "center" });

      // ── Subtitle ──
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text("Agricultural Intelligence & GIS Verification Authority", W / 2 + 8, 38, { align: "center" });

      // ── Certificate ID badge ──
      doc.setFillColor(10, 45, 30);
      doc.roundedRect(W / 2 - 24, 42, 64, 10, 2, 2, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(255, 255, 255);
      doc.text(`Certificate ID: ${selected.id}`, W / 2 + 8, 49, { align: "center" });

      // ── Divider ──
      doc.setDrawColor(209, 250, 229);
      doc.setLineWidth(0.8);
      doc.line(22, 57, W - 14, 57);

      // ── Field helper ──
      const field = (label: string, value: string, x: number, yy: number) => {
        doc.setFontSize(6.5);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(16, 185, 129);
        doc.text(label, x, yy);
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(10, 45, 30);
        doc.text(value, x, yy + 7);
      };

      const col1 = 32, col2 = 155;
      let y = 70;
      field("LAND NAME", selected.land, col1, y);
      field("FARMER NAME", selected.farmer, col2, y);
      y += 20;
      field("DISTRICT", selected.district + ", Maharashtra", col1, y);
      field("CROP TYPE", selected.crop, col2, y);
      y += 20;
      field("LAND AREA", selected.area, col1, y);
      field("ISSUED DATE", selected.date, col2, y);
      y += 20;
      field("RISK SCORE", selected.risk, col1, y);
      field("SOIL HEALTH INDEX", selected.health, col2, y);
      y += 20;

      // ── VERIFIED badge ──
      doc.setFillColor(240, 253, 244);
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.roundedRect(col1, y - 2, 62, 10, 3, 3, "FD");
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(16, 185, 129);
      doc.text("✓  LAND STATUS: VERIFIED", col1 + 31, y + 5, { align: "center" });

      // ── Divider ──
      y += 18;
      doc.setDrawColor(209, 250, 229);
      doc.line(22, y, W - 14, y);

      // ── Signature ──
      y += 10;
      doc.setFontSize(6.5);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(16, 185, 129);
      doc.text("AUTHORISED ANALYST SIGNATURE", col1, y);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bolditalic");
      doc.setTextColor(10, 45, 30);
      doc.text("Analyst Team — AgriTrace X", col1, y + 9);
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text("Digitally signed under the AgriTrace X GIS Authority", col1, y + 15);
      doc.setDrawColor(209, 250, 229);
      doc.line(col1, y + 20, col1 + 85, y + 20);

      // ── QR Code ──
      const qrSize = 36;
      const qrX = W - 14 - qrSize - 10;
      const qrY = y - 2;
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.roundedRect(qrX - 3, qrY - 3, qrSize + 6, qrSize + 12, 3, 3, "FD");
      doc.addImage(qrDataUrl, "PNG", qrX, qrY, qrSize, qrSize);
      doc.setFontSize(6);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(10, 45, 30);
      doc.text("Scan to Verify", qrX + qrSize / 2, qrY + qrSize + 6.5, { align: "center" });

      // ── Footer ──
      doc.setFillColor(10, 45, 30);
      doc.rect(22, H - 22, W - 36, 12, "F");
      doc.setFontSize(6.5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(167, 243, 208);
      doc.text(
        `Generated: ${new Date().toLocaleString("en-IN")}   |   agritracex.netlify.app   |   Digitally verified & legally binding under the AgriTrace X framework`,
        W / 2 + 8, H - 14, { align: "center" }
      );

      doc.save(`${selected.id}_AgriTraceX_Certificate.pdf`);
    } catch (err) {
      console.error("PDF error:", err);
      alert(`Generation failed: ${err}`);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-12 max-w-[1600px] mx-auto stagger-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-500">Core Analyst Feature</p>
          </div>
          <h1 className="text-5xl font-manrope font-extrabold tracking-tighter text-foreground">
            Certification <span className="text-emerald-500">Center</span>
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-4 space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-text-soft">Verified Queue</h3>
          <div className="space-y-4">
            {CERTIFICATIONS.map(cert => (
              <div
                key={cert.id}
                onClick={() => setSelected(cert)}
                className={`premium-card p-6 cursor-pointer border-2 transition-all ${selected?.id === cert.id ? 'border-emerald-500 shadow-xl' : 'border-transparent hover:border-border'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <BadgeCheck size={24} className="text-emerald-500" />
                  <span className="text-[10px] font-black bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">{cert.status}</span>
                </div>
                <h4 className="font-manrope font-extrabold text-lg">{cert.land}</h4>
                <p className="text-xs text-text-soft font-bold mb-4">{cert.farmer} • {cert.district}</p>
                <p className="text-[10px] font-jetbrains text-text-soft">{cert.id}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-8">
          {selected && (
            <div className="premium-card p-10 relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-10 p-8 bg-white/50 rounded-3xl">
                <div className="flex justify-between items-start border-b border-border/50 pb-8">
                  <div>
                    <h2 className="text-3xl font-manrope font-extrabold text-foreground mb-2">Digital Verification Seal</h2>
                    <p className="text-text-soft font-medium">Certificate ID: <span className="font-jetbrains font-bold text-foreground">{selected.id}</span></p>
                  </div>
                  <div className="w-24 h-24 rounded-full border-[6px] border-emerald-500 flex flex-col items-center justify-center text-emerald-500 rotate-12 bg-emerald-50/80 backdrop-blur-sm shadow-xl shadow-emerald-500/20">
                    <CheckCircle2 size={24} className="mb-1" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight">Verified<br/>AgriTrace</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div><p className="text-xs font-black uppercase tracking-widest text-text-soft mb-1">Land Name</p><p className="font-bold text-lg">{selected.land}</p></div>
                  <div><p className="text-xs font-black uppercase tracking-widest text-text-soft mb-1">Risk Score</p><p className="font-bold text-lg">{selected.risk}</p></div>
                  <div><p className="text-xs font-black uppercase tracking-widest text-text-soft mb-1">Issued Date</p><p className="font-bold text-lg">{selected.date}</p></div>
                  <div><p className="text-xs font-black uppercase tracking-widest text-text-soft mb-1">Soil Health</p><p className="font-bold text-lg">{selected.health}</p></div>
                  <div><p className="text-xs font-black uppercase tracking-widest text-text-soft mb-1">Farmer</p><p className="font-bold text-lg">{selected.farmer}</p></div>
                  <div><p className="text-xs font-black uppercase tracking-widest text-text-soft mb-1">District</p><p className="font-bold text-lg">{selected.district}</p></div>
                </div>

                <div className="p-6 rounded-2xl bg-surface-soft border border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-text-soft mb-1">Analyst Signature</p>
                    <p className="font-cursive text-2xl text-foreground mt-2">Analyst Team Signature</p>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <LiveQR cert={selected} />
                    <span className="text-[9px] font-bold text-text-soft uppercase tracking-wider">Live QR</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-2 xl:grid-cols-4 gap-4 mt-12">
                <Button
                  onClick={handleGenerate}
                  disabled={generating}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl h-12 flex gap-2 w-full disabled:opacity-70"
                >
                  {generating ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : <Download size={16} />}
                  {generating ? "Generating..." : "PDF Certificate"}
                </Button>
                <Button variant="outline" className="font-bold rounded-xl h-12 flex gap-2 border-border bg-white text-foreground hover:bg-surface-soft w-full">
                  <Send size={16} /> Govt Portal
                </Button>
                <Button variant="outline" className="font-bold rounded-xl h-12 flex gap-2 border-border bg-white text-foreground hover:bg-surface-soft w-full">
                  <Send size={16} /> Bank API
                </Button>
                <Button className="bg-blue-500 text-white font-bold rounded-xl h-12 flex gap-2 w-full hover:bg-blue-600">
                  <FileArchive size={16} /> Subsidy Invoice
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LiveQR({ cert }: { cert: any }) {
  const [qrUrl, setQrUrl] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(
      JSON.stringify({ id: cert.id, land: cert.land, farmer: cert.farmer, district: cert.district }),
      { width: 120, margin: 1, color: { dark: "#0a2d1e", light: "#ffffff" } }
    ).then(setQrUrl).catch(console.error);
  }, [cert.id]);

  if (!qrUrl) return <div className="w-16 h-16 bg-surface-soft rounded-lg animate-pulse" />;
  return <img src={qrUrl} alt="QR Code" className="w-16 h-16 rounded-lg border border-border" />;
}
