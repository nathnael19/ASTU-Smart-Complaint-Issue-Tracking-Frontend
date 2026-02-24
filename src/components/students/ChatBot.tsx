import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Trash2 } from "lucide-react";
import { sendChatMessage, type ChatMessage } from "../../api/chat";
import { useCurrentProfile } from "../../hooks/useUsers";
import { cn } from "../../lib/utils";

export default function ChatBot() {
  const { data: profile } = useCurrentProfile();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const firstName = profile?.first_name || "Student";
  const WELCOME = `Hi ${firstName}! I'm your ASTU assistant. Ask me how to submit a complaint, track status, or about campus services like the Library and ICT.`;

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
          content:
            "Sorry, I couldn't process that. Please try again or check the Knowledge Base.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
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
          "bg-primary text-white hover:bg-primary/90 hover:scale-105",
          "focus:outline-none focus:ring-4 focus:ring-primary/30",
        )}
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Panel */}
      {open && (
        <div
          className={cn(
            "fixed bottom-24 right-6 z-50 flex w-[380px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl",
          )}
        >
          <div className="border-b border-gray-100 bg-primary px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <MessageCircle size={20} />
              <div>
                <span className="font-bold text-sm block leading-none">
                  ASTU Assistant
                </span>
                <span className="text-[10px] font-medium text-blue-200">
                  Online & Ready to Help
                </span>
              </div>
            </div>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="p-1.5 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Clear Chat"
              >
                <Trash2 size={16} />
              </button>
            )}
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
                    ? "ml-auto bg-primary text-white"
                    : "bg-slate-50 text-gray-800",
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
                className="flex-1 rounded-xl border border-gray-200 bg-slate-50 px-4 py-2.5 text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:border-primary/40 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
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
