import { ArrowLeft, Printer, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

interface TicketDetailHeaderProps {
  ticketId: string;
  status: string;
  title: string;
}

const TicketDetailHeader = ({
  ticketId,
  status,
  title,
}: TicketDetailHeaderProps) => {
  const navigate = useNavigate();

  const getStatusStyles = (status: string) => {
    const s = (status || "").toUpperCase().replace(/\s+/g, "_");
    switch (s) {
      case "IN_PROGRESS":
      case "IN PROGRESS":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "RESOLVED":
        return "bg-green-100 text-green-700 border-green-200";
      case "CLOSED":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const displayStatus = status === "IN_PROGRESS" ? "In Progress" : (status || "Open").replace(/_/g, " ");

  return (
    <div className="flex items-center justify-between pb-6 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/staff/tickets")}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <span className="text-lg font-black text-gray-900">{ticketId}</span>
          <span
            className={cn(
              "text-[10px] font-black uppercase px-2.5 py-1 rounded-full border",
              getStatusStyles(status),
            )}
          >
            {displayStatus.toUpperCase()}
          </span>
          <span className="text-lg font-black text-gray-900">{title}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">
          <Printer size={16} />
          Print PDF
        </button>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#1e3a8a] hover:bg-blue-900 transition-colors shadow-sm">
          <CheckCircle2 size={16} />
          Mark as Resolved
        </button>
      </div>
    </div>
  );
};

export default TicketDetailHeader;
