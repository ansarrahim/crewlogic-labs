"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Bot, Loader2, Send, Sparkles, X } from "lucide-react";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

export const OPEN_NEXUS_CHAT_EVENT = "open-nexus-chat";

type ChatMessage = {
  id: string;
  role: "user" | "model";
  text: string;
  isError?: boolean;
};

const GREETING: ChatMessage = {
  id: "greeting",
  role: "model",
  text: "NEXUS-AI online. I'm the AI & Systems Automation lead at CrewLogic Labs — ask me about our squad, our stack, or your project idea.",
};

function createId() {
  return Math.random().toString(36).slice(2);
}

export default function NexusChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    window.addEventListener(OPEN_NEXUS_CHAT_EVENT, openHandler);
    return () => window.removeEventListener(OPEN_NEXUS_CHAT_EVENT, openHandler);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isLoading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { id: createId(), role: "user", text: trimmed };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setIsLoading(true);

    try {
      const payload = history
        .filter((m) => m.id !== "greeting" && !m.isError)
        .map((m) => ({ role: m.role, text: m.text }));

      const res = await fetch("/api/nexus-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payload }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setMessages((prev) => [
          ...prev,
          {
            id: createId(),
            role: "model",
            text: data.error ?? "NEXUS-AI ran into an unexpected error.",
            isError: true,
          },
        ]);
        return;
      }

      if (!res.body) {
        setMessages((prev) => [
          ...prev,
          { id: createId(), role: "model", text: "NEXUS-AI returned no response — try again." },
        ]);
        return;
      }

      const modelMessageId = createId();
      setMessages((prev) => [...prev, { id: modelMessageId, role: "model", text: "" }]);
      setStreamingId(modelMessageId);
      setIsLoading(false);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const textSoFar = accumulated;
        setMessages((prev) =>
          prev.map((m) => (m.id === modelMessageId ? { ...m, text: textSoFar } : m))
        );
      }

      if (!accumulated) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === modelMessageId
              ? { ...m, text: "NEXUS-AI returned an empty response. Try rephrasing.", isError: true }
              : m
          )
        );
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: createId(),
          role: "model",
          text: "Couldn't reach NEXUS-AI — check your connection and try again.",
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
      setStreamingId(null);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 4 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            style={{ transformOrigin: "bottom right" }}
            className="flex h-[32rem] max-h-[75vh] w-96 max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-[0_0_50px_rgba(16,185,129,0.15)]"
          >
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-mono text-sm font-bold leading-tight text-slate-100">
                    NEXUS-AI
                  </p>
                  <p className="flex items-center gap-1 text-[11px] leading-tight text-emerald-400">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Live — Gemini backend
                  </p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="text-slate-500 transition-colors active:scale-90 hover:text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={msg.id === "greeting" ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: EASE_OUT }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-emerald-500 text-slate-950"
                        : msg.isError
                          ? "flex items-start gap-2 border border-amber-500/30 bg-amber-500/10 text-amber-300"
                          : "border border-slate-800 bg-slate-900 text-slate-200"
                    }`}
                  >
                    {msg.isError && <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />}
                    <span>
                      {msg.text}
                      {msg.id === streamingId && (
                        <span className="animate-cursor-blink ml-0.5 inline-block h-3.5 w-1.5 bg-emerald-400 align-middle" />
                      )}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: EASE_OUT }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2.5 text-sm text-slate-400">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-emerald-400" />
                    NEXUS-AI is thinking...
                  </div>
                </motion.div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-slate-800 p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask NEXUS-AI something..."
                maxLength={2000}
                disabled={isLoading}
                className="flex-1 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-emerald-500/60 disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 transition-[background-color,transform] active:scale-90 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            type="button"
            onClick={() => setIsOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: EASE_OUT }}
            className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.45)]"
          >
            <Sparkles className="h-4 w-4" />
            Chat with NEXUS-AI
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
