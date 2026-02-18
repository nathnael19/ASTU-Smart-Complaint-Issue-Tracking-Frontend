import { useState, useEffect, useRef } from "react";
import { MessageSquare, Loader2, Send } from "lucide-react";
import {
  getComplaintRemarks,
  postComplaintRemark,
  type ComplaintRemark,
} from "../../api/complaints";

function getAuthorDisplay(remark: ComplaintRemark): string {
  const u = remark.users;
  if (!u) return "Unknown";
  if (u.full_name?.trim()) return u.full_name.trim();
  const first = (u.first_name ?? "").trim();
  const last = (u.last_name ?? "").trim();
  return `${first} ${last}`.trim() || "Unknown";
}

function getRoleBadge(role?: string): string {
  if (!role) return "User";
  const r = role.toUpperCase();
  if (r === "ADMIN") return "Admin";
  if (r === "STAFF") return "Staff";
  if (r === "STUDENT") return "Student";
  return role;
}

function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (isToday) {
    return d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: d.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

interface ComplaintThreadProps {
  complaintId: string;
  title?: string;
  placeholder?: string;
  submitLabel?: string;
  /** Optional class for the container */
  className?: string;
}

const ComplaintThread = ({
  complaintId,
  title = "Conversation",
  placeholder = "Type a message...",
  submitLabel = "Send",
  className = "",
}: ComplaintThreadProps) => {
  const [remarks, setRemarks] = useState<ComplaintRemark[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newContent, setNewContent] = useState("");
  const listEndRef = useRef<HTMLDivElement>(null);

  const fetchRemarks = async () => {
    if (!complaintId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getComplaintRemarks(complaintId);
      setRemarks(res.data || []);
    } catch (e: any) {
      setError(e?.message || "Failed to load messages.");
      setRemarks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRemarks();
  }, [complaintId]);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [remarks]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = newContent.trim();
    if (!content || !complaintId || posting) return;
    setPosting(true);
    setError(null);
    try {
      const created = await postComplaintRemark(complaintId, content);
      setRemarks((prev) => [...prev, created]);
      setNewContent("");
    } catch (e: any) {
      setError(e?.message || "Failed to send message.");
    } finally {
      setPosting(false);
    }
  };

  return (
    <div
      className={`bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-8 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageSquare size={20} className="text-[#1e3a8a]" />
          <h3 className="text-xl font-black text-gray-900">{title}</h3>
        </div>
        <span className="text-xs font-bold text-gray-400">
          Students, staff & admin can reply here
        </span>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12 gap-2 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-medium">Loading messages...</span>
        </div>
      ) : (
        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
          {remarks.length === 0 ? (
            <p className="text-sm text-gray-500 py-6 text-center">
              No messages yet. Be the first to add a comment.
            </p>
          ) : (
            remarks.map((remark) => (
              <div key={remark.id} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-1 border border-gray-200 overflow-hidden">
                  <span className="text-sm font-black text-[#1e3a8a]">
                    {getAuthorDisplay(remark).charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="bg-[#f8fafc] rounded-2xl rounded-tl-none p-5 border border-slate-100 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-sm font-black text-[#1e3a8a]">
                      {getAuthorDisplay(remark)}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">
                      {getRoleBadge(remark.users?.role)}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase ml-auto">
                      {formatTime(remark.created_at)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {remark.content}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={listEndRef} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 pt-8 border-t border-gray-100">
        <p className="text-xs font-black text-gray-500 uppercase mb-3 tracking-widest">
          Add a message
        </p>
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[100px] bg-white border border-gray-200 rounded-xl p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none mb-4"
          disabled={posting}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={posting || !newContent.trim()}
            className="bg-[#1e3a8a] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-950 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {posting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send size={16} />
            )}
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintThread;
