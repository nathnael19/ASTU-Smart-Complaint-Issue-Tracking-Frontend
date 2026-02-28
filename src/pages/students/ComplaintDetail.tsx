import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Clock,
  AlertCircle,
  CheckCircle2,
  FileText,
  Download,
  MessageSquare,
  History,
  Shield,
  ExternalLink,
} from "lucide-react";
import DashboardLayout from "../../components/students/DashboardLayout";
import { getComplaintDetails } from "../../api/complaints";
import { cn } from "../../lib/utils";

const ComplaintDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        setIsLoading(true);
        const data = await getComplaintDetails(id);
        setComplaint(data);
      } catch (err: any) {
        setError(err.message || "Failed to load complaint details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const formatStatus = (s: string) => {
    const map: any = {
      OPEN: {
        label: "Open",
        color: "text-yellow-600 bg-yellow-50 border-yellow-100",
        icon: Clock,
      },
      IN_PROGRESS: {
        label: "In Progress",
        color: "text-blue-600 bg-blue-50 border-blue-100",
        icon: History,
      },
      RESOLVED: {
        label: "Resolved",
        color: "text-green-600 bg-green-50 border-green-100",
        icon: CheckCircle2,
      },
      CLOSED: {
        label: "Closed",
        color: "text-gray-600 bg-gray-50 border-gray-100",
        icon: Shield,
      },
    };
    return (
      map[s] || {
        label: s,
        color: "text-gray-600 bg-gray-50 border-gray-100",
        icon: AlertCircle,
      }
    );
  };

  const formatPriority = (p: string) => {
    const map: any = {
      LOW: "Low",
      MEDIUM: "Medium",
      HIGH: "High",
      CRITICAL: "Critical",
    };
    return map[p] || p;
  };

  const formatCategory = (c: string) => {
    return c?.replace(/_/g, " ") || "Other";
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-8 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
            <p className="text-gray-500 font-bold">Loading ticket details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !complaint) {
    return (
      <DashboardLayout>
        <div className="p-8">
          <div className="bg-red-50 border border-red-100 rounded-[2rem] p-10 text-center space-y-4">
            <AlertCircle className="mx-auto text-red-500" size={48} />
            <h2 className="text-2xl font-black text-red-900">
              Oops! Failed to load
            </h2>
            <p className="text-red-700 font-medium max-w-md mx-auto">
              {error || "We couldn't find the complaint you're looking for."}
            </p>
            <button
              onClick={() => navigate("/student/complaints")}
              className="mt-4 bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
            >
              Back to My Complaints
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const statusInfo = formatStatus(complaint.status);
  const StatusIcon = statusInfo.icon;
  const dateSubmitted = new Date(complaint.created_at).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <DashboardLayout>
      <div className="p-8 space-y-8 max-w-[1200px] mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Back Button & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-4">
            <button
              onClick={() => navigate("/student/complaints")}
              className="flex items-center gap-2 text-gray-400 hover:text-[#1e3a8a] font-bold text-sm transition-colors group"
            >
              <ChevronLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to My Complaints
            </button>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-sm font-black text-[#1e3a8a] bg-blue-50 px-3 py-1 rounded-lg">
                  #{complaint.ticket_number}
                </span>
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-lg border text-xs font-black uppercase tracking-wider",
                    statusInfo.color,
                  )}
                >
                  <StatusIcon size={14} />
                  {statusInfo.label}
                </div>
              </div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
                {complaint.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Submitted On
              </p>
              <p className="text-sm font-bold text-gray-900">{dateSubmitted}</p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-6">
              <div className="flex items-center gap-3 text-[#1e3a8a]">
                <FileText size={20} />
                <h2 className="text-xl font-black">Complaint Description</h2>
              </div>
              <p className="text-gray-600 font-medium leading-[1.8] whitespace-pre-wrap text-lg">
                {complaint.description}
              </p>

              {complaint.attachment_url && (
                <div className="pt-6 border-t border-gray-50">
                  <h3 className="text-sm font-black text-gray-900 mb-4">
                    Attachments
                  </h3>
                  <a
                    href={complaint.attachment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-4 p-4 bg-slate-50 border border-gray-100 rounded-2xl hover:bg-slate-100 transition-all group"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                      <Download size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                        View Attachment
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        Click to open in new tab <ExternalLink size={10} />
                      </p>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Conversation/Notes Placeholder (Can be expanded later) */}
            <div className="bg-slate-50 rounded-[2.5rem] border border-dashed border-gray-200 p-10 text-center space-y-4">
              <MessageSquare className="mx-auto text-gray-300" size={32} />
              <p className="text-gray-400 font-bold">
                No updates or comments from staff yet.
              </p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Once a staff member reviews your complaint, their notes or
                responses will appear here.
              </p>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 space-y-8">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-4">
                Ticket Info
              </h3>

              <div className="space-y-6">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Category
                  </p>
                  <p className="text-sm font-black text-gray-900">
                    {formatCategory(complaint.category)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Priority Level
                  </p>
                  <span
                    className={cn(
                      "inline-flex text-[10px] font-black uppercase px-2 py-0.5 rounded-md border",
                      complaint.priority === "HIGH" ||
                        complaint.priority === "CRITICAL"
                        ? "bg-red-50 text-red-600 border-red-100"
                        : complaint.priority === "MEDIUM"
                          ? "bg-yellow-50 text-yellow-600 border-yellow-100"
                          : "bg-gray-50 text-gray-500 border-gray-100",
                    )}
                  >
                    {formatPriority(complaint.priority)}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Reference ID
                  </p>
                  <code className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {complaint.id}
                  </code>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-[#1e3a8a] rounded-[2rem] p-8 text-white space-y-4 shadow-xl shadow-blue-900/20">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <AlertCircle size={20} />
              </div>
              <h4 className="text-lg font-black leading-tight">
                Need to expedite this?
              </h4>
              <p className="text-blue-100/70 text-xs font-medium leading-relaxed">
                Resolution times vary based on priority. High-priority items are
                addressed within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ComplaintDetail;
