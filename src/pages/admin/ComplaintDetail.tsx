import { useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import ComplaintBreadcrumbs from "../../components/admin/complaints/detail/ComplaintBreadcrumbs";
import ComplaintDetailHeader from "../../components/admin/complaints/detail/ComplaintDetailHeader";
import ComplaintDescription from "../../components/admin/complaints/detail/ComplaintDescription";
import InternalRemarks from "../../components/admin/complaints/detail/InternalRemarks";
import ManagementControls from "../../components/admin/complaints/detail/ManagementControls";
import ResolutionTimeline from "../../components/admin/complaints/detail/ResolutionTimeline";
import AssignedPersonnel from "../../components/admin/complaints/detail/AssignedPersonnel";
import { useComplaintDetail } from "../../hooks/useComplaints";
import { Loader2, AlertCircle } from "lucide-react";

const ComplaintDetail = () => {
  const { id } = useParams();
  const { data: complaint, loading, error } = useComplaintDetail(id);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-lg font-bold text-gray-600">
            Loading ticket details...
          </p>
        </div>
      </AdminLayout>
    );
  }

  if (!!error || !complaint) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h2 className="text-2xl font-black text-gray-900">
            Failed to load ticket
          </h2>
          <p className="text-gray-600 font-medium">
            {error ||
              "The ticket you are looking for does not exist or you don't have permission to view it."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#1e3a8a] text-white px-6 py-2 rounded-xl font-bold"
          >
            Try Again
          </button>
        </div>
      </AdminLayout>
    );
  }

  const ticketId = complaint.ticket_number || `#ASTU-${id?.slice(0, 4)}`;

  return (
    <AdminLayout>
      <div className="p-8 lg:p-12 space-y-8 max-w-[1600px] mx-auto pb-24">
        {/* Breadcrumbs */}
        <ComplaintBreadcrumbs ticketId={ticketId} />

        {/* Header */}
        <ComplaintDetailHeader
          ticketId={ticketId}
          status={complaint.status}
          studentName={complaint.users?.full_name || "Unknown Student"}
          studentId={
            complaint.users?.id_number ||
            complaint.submitted_by?.slice(0, 8) ||
            "N/A"
          }
          dateSubmitted={new Date(complaint.created_at).toLocaleString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            },
          )}
        />

        {/* Two Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-6">
            <ComplaintDescription
              description={complaint.description}
              attachments={complaint.attachments || []}
            />
            <InternalRemarks complaintId={complaint.id} />
          </div>

          {/* Right Column (Controls & Meta) */}
          <div className="lg:col-span-1 space-y-6">
            <ManagementControls
              complaintId={complaint.id}
              currentStatus={complaint.status}
              currentPriority={complaint.priority}
            />
            <ResolutionTimeline
              status={complaint.status}
              createdAt={complaint.created_at}
              resolvedAt={complaint.resolved_at}
            />
            <AssignedPersonnel
              assignedTo={complaint.assigned_to}
              assignedUser={complaint.assigned_user}
            />
          </div>
        </div>
      </div>

      {/* Footer minimal representation */}
      <footer className="py-6 px-12 border-t border-gray-100 flex items-center justify-between mt-auto">
        <span className="text-xs font-medium text-gray-400">
          © 2024 ASTU Smart Tracking System. All rights reserved.
        </span>
        <div className="flex gap-6">
          <button className="text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors">
            Help Center
          </button>
          <button className="text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors">
            Privacy Policy
          </button>
          <button className="text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors">
            System Status
          </button>
        </div>
      </footer>
    </AdminLayout>
  );
};

export default ComplaintDetail;
