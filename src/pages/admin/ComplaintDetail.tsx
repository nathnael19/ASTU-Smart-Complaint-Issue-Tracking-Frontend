import { useParams } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import ComplaintBreadcrumbs from "../../components/admin/complaints/detail/ComplaintBreadcrumbs";
import ComplaintDetailHeader from "../../components/admin/complaints/detail/ComplaintDetailHeader";
import ComplaintDescription from "../../components/admin/complaints/detail/ComplaintDescription";
import InternalRemarks from "../../components/admin/complaints/detail/InternalRemarks";
import ManagementControls from "../../components/admin/complaints/detail/ManagementControls";
import ResolutionTimeline from "../../components/admin/complaints/detail/ResolutionTimeline";
import AssignedPersonnel from "../../components/admin/complaints/detail/AssignedPersonnel";

const ComplaintDetail = () => {
  const { id } = useParams();

  // In a real app we would fetch the detail using `id`.
  // For UI implementation, we mock the ticket data.
  const ticketId = id ? `#ASTU-${id}` : "#ASTU-8821";

  return (
    <AdminLayout>
      <div className="p-8 lg:p-12 space-y-8 max-w-[1600px] mx-auto pb-24">
        {/* Breadcrumbs */}
        <ComplaintBreadcrumbs ticketId={ticketId} />

        {/* Header */}
        <ComplaintDetailHeader
          ticketId={ticketId}
          status="IN PROGRESS"
          studentName="John Doe"
          studentId="12044"
          dateSubmitted="Feb 24, 2024, 10:45 AM"
        />

        {/* Two Column Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-6">
            <ComplaintDescription />
            <InternalRemarks />
          </div>

          {/* Right Column (Controls & Meta) */}
          <div className="lg:col-span-1 space-y-6">
            <ManagementControls />
            <ResolutionTimeline />
            <AssignedPersonnel />
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
