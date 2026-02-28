import { ExternalLink, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Complaint {
  id: string;
  ticket_number: string;
  title: string;
  category: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  created_at: string;
  users?: {
    full_name: string;
    email: string;
    role: string;
  };
}

interface ComplaintsDataTableProps {
  complaints: Complaint[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const ComplaintsDataTable = ({
  complaints,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  isLoading,
}: ComplaintsDataTableProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-purple-500 scale-110 shadow-[0_0_8px_rgba(168,85,247,0.5)]";
      case "HIGH":
        return "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.4)]";
      case "MEDIUM":
        return "bg-amber-500";
      case "LOW":
        return "bg-slate-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-slate-50 border border-slate-200 text-slate-700";
      case "IN_PROGRESS":
        return "bg-orange-50 border border-orange-200 text-orange-700";
      case "RESOLVED":
      case "CLOSED":
        return "bg-emerald-50 border border-emerald-200 text-emerald-700";
      default:
        return "bg-gray-100 border-gray-200 text-gray-700";
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  const getShortCategory = (cat: string) => {
    return cat.replace(/_/g, " ").replace("AND", "&");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden mt-8">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap w-[15%]">
                TICKET ID
              </th>
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest min-w-[200px] w-[25%]">
                REPORTER
              </th>
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest min-w-[150px] w-[20%]">
                CATEGORY
              </th>
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest w-[10%]">
                PRIORITY
              </th>
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest w-[10%]">
                STATUS
              </th>
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap w-[10%]">
                DATE
              </th>
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right w-[10%]">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 text-center text-gray-400 font-medium"
                >
                  Loading complaints...
                </td>
              </tr>
            ) : complaints.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Info size={24} />
                    <p>No complaints found matching criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              complaints.map((complaint) => {
                const authorName = complaint.users
                  ? complaint.users.full_name
                  : "Unknown User";
                const initial = complaint.users?.full_name
                  ? complaint.users.full_name[0].toUpperCase()
                  : "?";

                return (
                  <tr
                    key={complaint.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <span className="text-sm font-bold text-[#1e3a8a]">
                        {complaint.ticket_number ||
                          `#${complaint.id.split("-")[0].toUpperCase()}`}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <span className="text-sm font-black text-gray-600 tracking-tighter">
                            {initial}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-gray-900 truncate">
                          {authorName}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-500 truncate block">
                        {getShortCategory(complaint.category)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${getPriorityColor(
                            complaint.priority,
                          )}`}
                        />
                        <span className="text-sm font-medium text-gray-600">
                          {complaint.priority}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap ${getStatusBadge(
                          complaint.status,
                        )}`}
                      >
                        {complaint.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                        {formatDate(complaint.created_at)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        to={`/admin/complaints/${complaint.id}`}
                        className="inline-flex items-center gap-2 text-sm font-black text-[#1e3a8a] py-2 px-3 rounded-xl hover:bg-blue-50 transition-colors"
                      >
                        View
                        <ExternalLink size={16} />
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
        <span className="text-sm font-medium text-gray-400">
          Showing{" "}
          <span className="font-bold text-gray-700">
            {totalCount > 0 ? (currentPage - 1) * pageSize + 1 : 0}
          </span>{" "}
          -{" "}
          <span className="font-bold text-gray-700">
            {Math.min(currentPage * pageSize, totalCount)}
          </span>{" "}
          of <span className="font-bold text-gray-700">{totalCount}</span>{" "}
          entries
        </span>
        <div className="flex gap-2 items-center">
          <button
            disabled={currentPage === 1 || isLoading}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <button
            disabled={
              currentPage === totalPages || totalPages === 0 || isLoading
            }
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsDataTable;
