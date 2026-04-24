"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  onCodeGenerated: (code: string) => void;
  currentCode: string;
}

export default function ChatPanel({ onCodeGenerated, currentCode }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hey! I'm Vibe ⚡ Tell me what you want to build and I'll generate it live. Try something like 'landing page', 'dashboard', or 'todo app'." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMsg, existingCode: currentCode })
      });
      const data = await res.json();
      if (data.code) {
        onCodeGenerated(data.code);
        setMessages(prev => [...prev, { role: "assistant", content: "Done! ✨ Your app is now live in the preview. Want me to tweak anything?" }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Something went wrong. Try again?" }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Network error. Check your connection." }]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
              m.role === "user"
                ? "bg-violet-600 text-white"
                : "bg-[#1a1a1a] text-gray-200 border border-[#262626]"
            }`}>
              {m.role === "assistant" && <span className="mr-1">⚡</span>}
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#1a1a1a] border border-[#262626] px-3 py-2 rounded-xl text-sm text-gray-400">
              ⚡ Generating...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="p-3 border-t border-[#262626]">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Describe what you want..."
            className="flex-1 bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500"
            disabled={loading}
          />
          <button
            onClick={send}
            disabled={loading}
            className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
