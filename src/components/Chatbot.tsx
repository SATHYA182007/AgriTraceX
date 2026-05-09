"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sprout, Bot, ChevronRight, Zap, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import { usePathname } from "next/navigation";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

function getRoleFromPath(pathname: string): string {
  if (pathname.includes("farmer")) return "farmer";
  if (pathname.includes("field-officer")) return "field_officer";
  if (pathname.includes("government")) return "government";
  if (pathname.includes("insurance")) return "insurance";
  if (pathname.includes("admin")) return "super_admin";
  return "farmer";
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "assistant", content: "Tactical assistant initialized. How can I assist your mission today?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages, isLoading]);

  // Hide chatbot on login/root pages if not requested otherwise, 
  // but prompt says "Floating chatbot MUST exist on EVERY dashboard page."
  if (pathname === "/login" || pathname === "/" || !pathname.includes("/dashboard")) return null;

  const role = getRoleFromPath(pathname);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.content || "Sorry, I couldn't process that command.",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "assistant", content: "Signal lost. Please re-establish connection." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] font-inter">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            className="absolute bottom-28 right-0 w-[420px] h-[680px] bg-white rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-[#EEF2EE]"
          >
            {/* Chat Header - AquaSmart Gradient */}
            <div className="p-8 bg-gradient-to-br from-primary to-primary-dark text-white relative">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                    <Zap size={24} className="fill-white" />
                  </div>
                  <div>
                    <h3 className="font-manrope font-extrabold text-xl tracking-tighter leading-none">Intelligence Node</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Autonomous Mode</p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center border border-white/20"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-8 bg-surface-soft/30" ref={scrollRef}>
              <div className="space-y-10">
                {messages.map((msg) => (
                  <motion.div 
                    key={msg.id} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[24px] px-6 py-4 text-[14px] font-medium leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-primary text-white rounded-tr-none"
                          : "bg-white border border-[#EEF2EE] text-foreground rounded-tl-none"
                      }`}
                    >
                      <div className={`prose prose-sm max-w-none ${msg.role === 'user' ? 'prose-invert' : 'prose-p:text-foreground/80'} prose-p:leading-relaxed`}>
                        <ReactMarkdown>{msg.content}</ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-[#EEF2EE] rounded-[24px] rounded-tl-none px-6 py-5 shadow-sm">
                      <div className="flex gap-2 items-center">
                        <Activity size={14} className="text-primary animate-pulse" />
                        <span className="text-[10px] font-black text-text-soft uppercase tracking-widest">Processing Data...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-8 bg-white border-t border-[#EEF2EE]">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative group"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Query intelligence network..."
                  className="w-full h-14 pl-6 pr-16 rounded-2xl bg-surface-soft border border-transparent outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 top-1.5 h-11 w-11 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
                >
                  <ChevronRight size={20} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[20px] flex items-center justify-center shadow-2xl relative transition-all duration-500 ${
          isOpen ? 'bg-foreground rotate-90' : 'bg-primary'
        }`}
      >
         <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-50" />
         <AnimatePresence mode="wait">
            {isOpen ? (
               <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0 }}>
                  <X className="text-white w-7 h-7" />
               </motion.div>
            ) : (
               <motion.div key="open" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="relative flex items-center justify-center">
                  <Zap className="text-white w-8 h-8 fill-white" />
                  <div className="absolute -inset-4 border-2 border-primary/30 rounded-[24px] animate-ping" />
               </motion.div>
            )}
         </AnimatePresence>
      </motion.button>
    </div>
  );
}
