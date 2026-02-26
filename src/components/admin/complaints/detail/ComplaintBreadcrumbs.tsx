import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ComplaintBreadcrumbsProps {
  ticketId: string;
}

const ComplaintBreadcrumbs = ({ ticketId }: ComplaintBreadcrumbsProps) => {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-8 border-b border-gray-100 pb-6">
      <Link
        to="/admin/dashboard"
        className="hover:text-gray-900 transition-colors"
      >
        Home
      </Link>
      <ChevronRight size={14} />
      <Link
        to="/admin/complaints"
        className="hover:text-gray-900 transition-colors"
      >
        Complaints
      </Link>
      <ChevronRight size={14} />
      <span className="text-gray-900 font-bold">Ticket {ticketId}</span>
    </div>
  );
};

export default ComplaintBreadcrumbs;
