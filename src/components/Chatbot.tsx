"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sprout, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { usePathname } from "next/navigation";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_PROMPTS = [
  "What is NDVI and why does it matter?",
  "Why is my soil moisture low?",
  "How do insurance claims work?",
  "Explain the certification process",
  "When should I irrigate my crops?",
  "How is crop loss calculated?",
  "What causes crop stress?",
  "How do government subsidies work?",
];

function getRoleFromPath(pathname: string): string {
  if (pathname.includes("farmer")) return "farmer";
  if (pathname.includes("field-officer")) return "field_officer";
  if (pathname.includes("government")) return "government";
  if (pathname.includes("insurance")) return "insurance";
  if (pathname.includes("admin")) return "super_admin";
  return "farmer";
}

const WELCOME_MSG: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm **AgriTrace AI** — your agricultural intelligence assistant.\n\nI can help you with farming advice, GIS & NDVI insights, insurance claims, government subsidies, land certification, and platform workflows.\n\nWhat would you like to know?",
};

export function Chatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Lock body scroll when chatbot open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  if (
    pathname === "/login" ||
    pathname === "/" ||
    !pathname.includes("/dashboard")
  ) {
    return null;
  }

  const role = getRoleFromPath(pathname);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    setShowSuggestions(false);

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };
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
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.content || "I couldn't process that. Please try again.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Connection issue. Please check your network and try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([WELCOME_MSG]);
    setShowSuggestions(true);
    setInput("");
  };

  // Prevent wheel events from escaping the chatbot panel
  const stopScroll = (e: React.WheelEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100] font-inter">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 32 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            onWheel={stopScroll}
            onTouchMove={stopScroll}
            className="absolute bottom-28 right-0 w-[440px] h-[680px] bg-white rounded-[28px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-[#EEF2EE]"
          >
            {/* ── Header ── */}
            <div className="flex-shrink-0 p-6 bg-gradient-to-br from-emerald-600 to-emerald-500 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
              <div className="absolute -bottom-6 -left-4 w-24 h-24 bg-white/5 rounded-full" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center">
                    <Sprout size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-manrope font-extrabold text-lg text-white tracking-tight leading-none">
                      AgriTrace AI
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-200 animate-pulse" />
                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-white/80">
                        Agricultural Intelligence Active
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    title="Reset conversation"
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center border border-white/20"
                  >
                    <RotateCcw size={14} className="text-white" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center border border-white/20"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>

            {/* ── Messages ── */}
            <div
              ref={messagesContainerRef}
              className="flex-1 bg-[#F8FAF8] overflow-y-auto"
              style={{ overscrollBehavior: "contain" }}
              onWheel={stopScroll}
              onTouchMove={stopScroll}
            >
              <div className="p-5 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      msg.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    } items-end gap-2`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0 mb-0.5">
                        <Sprout size={12} className="text-emerald-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-emerald-500 text-white rounded-br-sm"
                          : "bg-white border border-[#E8EEE8] text-foreground rounded-bl-sm"
                      }`}
                    >
                      <div
                        className={`prose prose-sm max-w-none ${
                          msg.role === "user" ? "prose-invert" : ""
                        }`}
                      >
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => (
                              <p className="mb-1 last:mb-0">{children}</p>
                            ),
                            strong: ({ children }) => (
                              <strong className="font-bold">{children}</strong>
                            ),
                            ul: ({ children }) => (
                              <ul className="mt-1 mb-1 ml-3 list-disc space-y-0.5">
                                {children}
                              </ul>
                            ),
                            li: ({ children }) => (
                              <li className="text-[13px]">{children}</li>
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0">
                      <Sprout size={12} className="text-emerald-600" />
                    </div>
                    <div className="bg-white border border-[#E8EEE8] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-1">
                          <span
                            className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-text-soft uppercase tracking-widest ml-1">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Suggested prompts */}
                <AnimatePresence>
                  {showSuggestions && !isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="pt-2 space-y-2"
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest text-text-soft px-1">
                        Suggested Questions
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {SUGGESTED_PROMPTS.map((prompt) => (
                          <button
                            key={prompt}
                            onClick={() => sendMessage(prompt)}
                            className="text-[11px] font-bold px-3 py-1.5 bg-white border border-emerald-200 text-emerald-700 rounded-full hover:bg-emerald-50 hover:border-emerald-400 transition-all leading-tight text-left"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* ── Input ── */}
            <div className="flex-shrink-0 p-4 bg-white border-t border-[#EEF2EE]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about crops, soil, claims, GIS..."
                  className="flex-1 h-11 px-4 rounded-xl bg-[#F8FAF8] border border-[#E8EEE8] outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10 transition-all text-[13px] font-medium"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="h-11 w-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center flex-shrink-0 disabled:opacity-50 transition-all"
                >
                  <Send size={15} />
                </Button>
              </form>
              <p className="text-[10px] text-text-soft text-center mt-2 font-medium">
                Powered by AgriTrace RAG Intelligence
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Trigger ── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-[22px] flex items-center justify-center shadow-2xl relative overflow-hidden transition-all duration-500 ${
          isOpen ? "bg-slate-800" : "bg-emerald-500"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0 }}
            >
              <X className="text-white w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex items-center justify-center"
            >
              <Sprout className="text-white w-7 h-7" />
              <div className="absolute -inset-3 border-2 border-emerald-400/40 rounded-[20px] animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
