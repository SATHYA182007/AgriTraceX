import type { Metadata } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Chatbot } from "@/components/Chatbot";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: "AgriTrace X | AI-Powered Agricultural Intelligence",
  description: "Fuse satellite imagery, drone analytics, and IoT sensor networks into one predictive agricultural intelligence platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${manrope.variable} ${inter.variable} ${jetbrains.variable} antialiased`}>
        {children}
        <Chatbot />
        <Toaster />
      </body>
    </html>
  );
}
