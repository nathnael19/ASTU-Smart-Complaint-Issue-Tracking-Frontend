import { Download, UserPlus } from "lucide-react";

interface ComplaintDetailHeaderProps {
  ticketId: string;
  status: string;
  studentName: string;
  studentId: string;
  dateSubmitted: string;
  onAssignStaff?: () => void;
}

const ComplaintDetailHeader = ({
  ticketId,
  status,
  studentName,
  studentId,
  dateSubmitted,
  onAssignStaff,
}: ComplaintDetailHeaderProps) => {
  const getStatusBadge = (status: string) => {
    const s = status?.toUpperCase();
    switch (s) {
      case "IN PROGRESS":
      case "IN_PROGRESS":
        return "bg-amber-100 text-amber-700";
      case "OPEN":
        return "bg-red-100 text-red-700";
      case "RESOLVED":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
      <div>
        <div className="flex items-center gap-4 mb-3">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Ticket {ticketId}
          </h1>
          <span
            className={`text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider ${getStatusBadge(
              status,
            )}`}
          >
            {status}
          </span>
        </div>
        <p className="text-sm font-medium text-gray-500">
          Submitted by:{" "}
          <span className="font-bold text-gray-900">{studentName}</span>{" "}
          (Student ID: {studentId}) | {dateSubmitted}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button className="bg-white text-gray-700 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-sm">
          <Download size={16} />
          Export PDF
        </button>
        <button
          type="button"
          onClick={onAssignStaff}
          className="bg-[#1e3a8a] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20 hover:bg-blue-950 transition-colors text-sm"
        >
          <UserPlus size={16} />
          Assign Staff
        </button>
      </div>
    </div>
  );
};

export default ComplaintDetailHeader;
