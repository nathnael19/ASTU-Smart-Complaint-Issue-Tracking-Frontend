import { useParams } from "react-router-dom";
import { useState } from "react";
import StaffDashboardLayout from "../../components/staff/StaffDashboardLayout";
import TicketDetailHeader from "../../components/staff/TicketDetailHeader";
import ComplaintDescriptionCard from "../../components/staff/ComplaintDescriptionCard";
import ComplaintThread from "../../components/shared/ComplaintThread";
import CommunicationLogCard from "../../components/staff/CommunicationLogCard";
import TicketActionsCard from "../../components/staff/TicketActionsCard";
import RequesterInfoCard from "../../components/staff/RequesterInfoCard";
import { useComplaintDetail } from "../../hooks/useComplaints";
import { updateComplaint } from "../../api/complaints";
import { invalidateCache } from "../../lib/cache";
import { Loader2, AlertCircle } from "lucide-react";

function getRequesterName(users: any): string {
  if (!users) return "Unknown";
  if (users.full_name?.trim()) return users.full_name.trim();
  const first = (users.first_name ?? "").trim();
  const last = (users.last_name ?? "").trim();
  return `${first} ${last}`.trim() || "Unknown";
}

function getAssignedStaffName(assignedUser: any): string {
  if (!assignedUser) return "Unassigned";
  if (assignedUser.full_name?.trim()) return assignedUser.full_name.trim();
  const first = (assignedUser.first_name ?? "").trim();
  const last = (assignedUser.last_name ?? "").trim();
  return `${first} ${last}`.trim() || "Staff";
}

function toDisplayStatus(backendStatus: string): string {
  const s = (backendStatus || "").toUpperCase();
  if (s === "IN_PROGRESS") return "In Progress";
  if (s === "OPEN") return "Open";
  if (s === "RESOLVED") return "Resolved";
  if (s === "CLOSED") return "Closed";
  return (backendStatus || "Open").replace(/_/g, " ");
}

const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: complaint, loading, error, refetch } = useComplaintDetail(id);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (status: string) => {
    if (!id) return;
    try {
      setIsUpdating(true);
      const backendStatus = status.replace(/\s+/g, "_").toUpperCase();
      await updateComplaint(id, { status: backendStatus });
      invalidateCache(`complaints:detail:${id}`, "complaints:list*");
      await refetch();
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePriorityChange = async (priority: string) => {
    if (!id) return;
    try {
      setIsUpdating(true);
      await updateComplaint(id, { priority: priority as any });
      invalidateCache(`complaints:detail:${id}`, "complaints:list*");
      await refetch();
    } catch (err) {
      console.error("Failed to update priority:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <StaffDashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          <p className="text-lg font-bold text-gray-600">Loading ticket...</p>
        </div>
      </StaffDashboardLayout>
    );
  }

  if (error || !complaint) {
    return (
      <StaffDashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h2 className="text-xl font-black text-gray-900">Ticket not found</h2>
          <p className="text-gray-600 text-center max-w-md">
            {typeof error === "string"
              ? error
              : (error as any)?.message ||
                "You may not have access to this ticket or it does not exist."}
          </p>
        </div>
      </StaffDashboardLayout>
    );
  }

  const ticketId = complaint.ticket_number || `#${id?.slice(0, 8)}`;
  const requesterName = getRequesterName(complaint.users);
  const requesterId =
    complaint.users?.student_id_number ??
    complaint.users?.id_number ??
    complaint.submitted_by?.slice(0, 8) ??
    "—";
  const assignedStaffName = complaint.assigned_to
    ? getAssignedStaffName(complaint.assigned_user)
    : "Unassigned";

  return (
    <StaffDashboardLayout>
      <div className="p-8 max-w-[1600px] mx-auto">
        <TicketDetailHeader
          ticketId={ticketId}
          status={complaint.status}
          title={complaint.title}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <ComplaintDescriptionCard
              description={complaint.description || "—"}
              location={null}
              reportedVia="Student Portal"
            />
            {id && (
              <ComplaintThread
                complaintId={id}
                title="Conversation"
                placeholder="Add an update or reply for the student..."
                submitLabel="Post"
              />
            )}
            <CommunicationLogCard entries={[]} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <TicketActionsCard
              status={toDisplayStatus(complaint.status)}
              assignedStaff={
                complaint.assigned_to ? { name: assignedStaffName } : null
              }
              priority={
                (complaint.priority || "MEDIUM") as
                  | "CRITICAL"
                  | "HIGH"
                  | "MEDIUM"
                  | "LOW"
              }
              onStatusChange={handleStatusChange}
              onPriorityChange={handlePriorityChange}
              slaDeadline={complaint.sla_deadline ?? null}
              isUpdating={isUpdating}
            />
            <RequesterInfoCard
              name={requesterName}
              program={complaint.users?.program ?? null}
              id={requesterId}
              email={complaint.users?.email ?? "—"}
              phone={complaint.users?.phone ?? null}
            />
          </div>
        </div>
      </div>
    </StaffDashboardLayout>
  );
};

export default TicketDetail;
