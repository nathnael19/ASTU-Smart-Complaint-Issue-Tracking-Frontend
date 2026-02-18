import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Clock,
  AlertCircle,
  CheckCircle2,
  FileText,
  Download,
  History,
  Shield,
  ExternalLink,
  Edit2,
  Trash2,
  Save,
  XCircle,
  Paperclip,
  X,
} from "lucide-react";
import DashboardLayout from "../../components/students/DashboardLayout";
import ComplaintThread from "../../components/shared/ComplaintThread";
import { updateComplaint, deleteComplaint } from "../../api/complaints";
import { useComplaintDetail } from "../../hooks/useComplaints";
import { invalidateCache } from "../../lib/cache";
import { cn } from "../../lib/utils";
import { supabase } from "../../lib/supabase";

const ComplaintDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: fetchComplaint,
    loading: isLoading,
    error: fetchError,
  } = useComplaintDetail(id);

  const [complaint, setComplaint] = useState<any>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [editFormData, setEditFormData] = useState<{
    title: string;
    description: string;
    category: string;
    priority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    attachment_url: string | null;
  }>({
    title: "",
    description: "",
    category: "",
    priority: "MEDIUM",
    attachment_url: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // We set local complaint state from the fetch to allow local optimistic updates or easy syncing
  useEffect(() => {
    if (fetchComplaint) {
      setComplaint(fetchComplaint);
      setEditFormData({
        title: fetchComplaint.title,
        description: fetchComplaint.description,
        category: fetchComplaint.category,
        priority: fetchComplaint.priority,
        attachment_url: fetchComplaint.attachment_url || null,
      });
    }
  }, [fetchComplaint]);

  // Handle fetch error passing to local error state on initial load
  useEffect(() => {
    if (fetchError) {
      setError(
        typeof fetchError === "string"
          ? fetchError
          : (fetchError as any).message || "Failed to load complaint details.",
      );
    }
  }, [fetchError]);

  const handleUpdate = async () => {
    if (!id) return;
    try {
      setIsUpdating(true);
      setError(null);
      const updated = await updateComplaint(id, {
        ...editFormData,
        attachment_url: editFormData.attachment_url || undefined,
      });
      setComplaint(updated);
      setIsEditMode(false);
      invalidateCache(`complaints:detail:${id}`, "complaints:list*");
    } catch (err: any) {
      setError(err.message || "Failed to update complaint.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !id) return;

    try {
      setIsUpdating(true);
      setError(null);

      const fileExt = file.name.split(".").pop();
      const fileName = `${id}-${Date.now()}.${fileExt}`;
      const filePath = `complaints/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("complaint-attachments")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("complaint-attachments").getPublicUrl(filePath);

      setEditFormData((prev) => ({ ...prev, attachment_url: publicUrl }));
    } catch (err: any) {
      setError(err.message || "Failed to upload file.");
    } finally {
      setIsUpdating(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      setIsDeleting(true);
      setError(null);
      await deleteComplaint(id);
      invalidateCache(`complaints:detail:${id}`, "complaints:list*");
      navigate("/student/complaints");
    } catch (err: any) {
      setError(err.message || "Failed to delete complaint.");
      setShowDeleteConfirm(false);
    } finally {
      setIsDeleting(false);
    }
  };

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

            {complaint.status === "OPEN" && !isEditMode && (
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => setIsEditMode(true)}
                  className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
                  title="Edit Complaint"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-3 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-100 transition-all shadow-sm"
                  title="Delete Complaint"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {showDeleteConfirm && (
          <div className="bg-red-50 border border-red-100 rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
                <AlertCircle size={24} />
              </div>
              <div>
                <h4 className="text-lg font-black text-red-900">
                  Delete this complaint?
                </h4>
                <p className="text-sm font-medium text-red-700/70">
                  This action cannot be undone. All data will be permanently
                  removed.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:text-gray-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-600 text-white px-8 py-3 rounded-xl font-black shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all flex items-center gap-2"
              >
                {isDeleting ? (
                  <Clock className="animate-spin" size={18} />
                ) : (
                  <Trash2 size={18} />
                )}
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </button>
            </div>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[#1e3a8a]">
                  <FileText size={20} />
                  <h2 className="text-xl font-black">
                    {isEditMode ? "Edit Complaint" : "Complaint Description"}
                  </h2>
                </div>
                {isEditMode && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsEditMode(false)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <XCircle size={20} />
                    </button>
                  </div>
                )}
              </div>

              {isEditMode ? (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editFormData.title}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          title: e.target.value,
                        })
                      }
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-lg font-black text-gray-900 focus:ring-2 focus:ring-blue-600/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                      Description
                    </label>
                    <textarea
                      rows={6}
                      value={editFormData.description}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          description: e.target.value,
                        })
                      }
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-base font-medium text-gray-600 focus:ring-2 focus:ring-blue-600/10 transition-all resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                        Category
                      </label>
                      <select
                        value={editFormData.category}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            category: e.target.value,
                          })
                        }
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-600/10 transition-all appearance-none cursor-pointer"
                      >
                        <option value="IT_AND_NETWORK">IT & Network</option>
                        <option value="FACILITY_AND_MAINTENANCE">
                          Facility & Maintenance
                        </option>
                        <option value="ACADEMIC_AFFAIRS">
                          Academic Affairs
                        </option>
                        <option value="STUDENT_SERVICES">
                          Student Services
                        </option>
                        <option value="REGISTRAR_OFFICE">
                          Registrar Office
                        </option>
                        <option value="ACADEMIC_RESOURCES">
                          Academic Resources
                        </option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                        Priority
                      </label>
                      <select
                        value={editFormData.priority}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            priority: e.target.value as any,
                          })
                        }
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 text-sm font-bold text-gray-900 focus:ring-2 focus:ring-blue-600/10 transition-all appearance-none cursor-pointer"
                      >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                        <option value="CRITICAL">Critical</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                      Attachment
                    </label>
                    {editFormData.attachment_url ? (
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                            <Paperclip size={18} />
                          </div>
                          <span className="text-xs font-bold text-gray-600">
                            Attachment Uploaded
                          </span>
                        </div>
                        <button
                          onClick={() =>
                            setEditFormData((prev) => ({
                              ...prev,
                              attachment_url: null,
                            }))
                          }
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-gray-400 mx-auto mb-3 group-hover:scale-110 transition-transform">
                          <Paperclip size={24} />
                        </div>
                        <p className="text-sm font-black text-gray-900">
                          Click to upload a file
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                          PNG, JPG or PDF up to 5MB
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-6">
                    <button
                      onClick={() => setIsEditMode(false)}
                      className="px-8 py-4 rounded-2xl font-black text-sm text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      Discard Changes
                    </button>
                    <button
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                      {isUpdating ? (
                        <Clock className="animate-spin" size={18} />
                      ) : (
                        <Save size={18} />
                      )}
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 font-medium leading-[1.8] whitespace-pre-wrap text-lg">
                  {complaint.description}
                </p>
              )}

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

            {/* Conversation: student, staff & admin can chat on this complaint */}
            {id && (
              <ComplaintThread
                complaintId={id}
                title="Conversation"
                placeholder="Ask a question or add a message for staff..."
                submitLabel="Send"
              />
            )}
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
