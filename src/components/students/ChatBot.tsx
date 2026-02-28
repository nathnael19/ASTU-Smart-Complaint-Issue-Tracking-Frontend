import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { sendChatMessage, type ChatMessage } from "../../api/chat";
import { cn } from "../../lib/utils";

const WELCOME = "Hi! I'm your ASTU complaint assistant. Ask me how to submit a complaint, track status, attach files, or about categories and campus issues.";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setError(null);
    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const res = await sendChatMessage(text, history);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.reply },
      ]);
    } catch (err: any) {
      setError(err.message || "Failed to get a response.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I couldn't process that. Please try again or check the Knowledge Base.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open AI assistant"}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all",
          "bg-[#1e3a8a] text-white hover:bg-blue-950 hover:scale-105",
          "focus:outline-none focus:ring-4 focus:ring-[#1e3a8a]/30"
        )}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Panel */}
      {open && (
        <div
          className={cn(
            "fixed bottom-24 right-6 z-50 flex w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl"
          )}
        >
          <div className="border-b border-gray-100 bg-[#1e3a8a] px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              <MessageCircle size={20} />
              <span className="font-bold text-sm">ASTU Assistant</span>
            </div>
            <p className="mt-0.5 text-[10px] font-medium text-blue-200">
              Ask about complaints, status, or campus issues
            </p>
          </div>

          <div
            ref={listRef}
            className="flex min-h-[280px] max-h-[360px] flex-1 flex-col gap-3 overflow-y-auto p-4"
          >
            {messages.length === 0 && (
              <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-gray-600">
                {WELCOME}
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[90%] rounded-2xl px-4 py-2.5 text-sm",
                  m.role === "user"
                    ? "ml-auto bg-[#1e3a8a] text-white"
                    : "bg-slate-50 text-gray-800"
                )}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-2.5 text-sm text-gray-500">
                <Loader2 size={16} className="animate-spin" />
                Thinking...
              </div>
            )}
            {error && (
              <p className="text-xs font-medium text-red-600">{error}</p>
            )}
          </div>

          <div className="border-t border-gray-100 p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your question..."
                disabled={loading}
                className="flex-1 rounded-xl border border-gray-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-[#1e3a8a]/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1e3a8a] text-white transition-colors hover:bg-blue-950 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
