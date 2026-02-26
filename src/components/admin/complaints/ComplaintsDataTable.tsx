import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface Complaint {
  id: string;
  ticketId: string;
  studentInitials: string;
  studentName: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  status: "IN PROGRESS" | "OPEN" | "RESOLVED";
  dateSubmitted: string;
}

const ComplaintsDataTable = () => {
  const complaints: Complaint[] = [
    {
      id: "1",
      ticketId: "#ASTU-8821",
      studentInitials: "JD",
      studentName: "John Doe",
      category: "ICT Infrastructure",
      priority: "Medium",
      status: "IN PROGRESS",
      dateSubmitted: "Feb 24, 2024",
    },
    {
      id: "2",
      ticketId: "#ASTU-8819",
      studentInitials: "AS",
      studentName: "Abebe Samuel",
      category: "Facilities",
      priority: "High",
      status: "OPEN",
      dateSubmitted: "Feb 23, 2024",
    },
    {
      id: "3",
      ticketId: "#ASTU-8790",
      studentInitials: "MW",
      studentName: "Martha W.",
      category: "Academic",
      priority: "Low",
      status: "RESOLVED",
      dateSubmitted: "Feb 20, 2024",
    },
    {
      id: "4",
      ticketId: "#ASTU-8788",
      studentInitials: "TK",
      studentName: "Tsegaye K.",
      category: "ICT Infrastructure",
      priority: "Medium",
      status: "RESOLVED",
      dateSubmitted: "Feb 19, 2024",
    },
  ];

  const getPriorityColor = (priority: Complaint["priority"]) => {
    switch (priority) {
      case "High":
        return "bg-red-500";
      case "Medium":
        return "bg-amber-500";
      case "Low":
        return "bg-slate-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusBadge = (status: Complaint["status"]) => {
    switch (status) {
      case "IN PROGRESS":
        return "bg-orange-50 border border-orange-200 text-orange-700";
      case "OPEN":
        return "bg-red-50 border border-red-200 text-red-700";
      case "RESOLVED":
        return "bg-emerald-50 border border-emerald-200 text-emerald-700";
      default:
        return "bg-gray-100 border-gray-200 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden mt-8">
      {/* Search and Filter row can live outside, this is just the table container */}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                TICKET ID
              </th>
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest min-w-[200px]">
                STUDENT NAME
              </th>
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest min-w-[150px]">
                CATEGORY
              </th>
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                PRIORITY
              </th>
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest">
                STATUS
              </th>
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                DATE SUBMITTED
              </th>
              <th className="py-6 px-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {complaints.map((complaint) => (
              <tr
                key={complaint.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="py-4 px-6">
                  <span className="text-sm font-bold text-[#1e3a8a]">
                    {complaint.ticketId}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <span className="text-sm font-black text-gray-600 tracking-tighter">
                        {complaint.studentInitials}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {complaint.studentName}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm font-medium text-gray-500">
                    {complaint.category}
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
                    className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider ${getStatusBadge(
                      complaint.status,
                    )}`}
                  >
                    {complaint.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                    {complaint.dateSubmitted}
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
        <span className="text-sm font-medium text-gray-400">
          Showing <span className="font-bold text-gray-700">1 - 10</span> of{" "}
          <span className="font-bold text-gray-700">1,284</span> entries
        </span>
        <div className="flex gap-2 items-center">
          <button className="px-5 py-2.5 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors pointer-events-none opacity-50">
            Previous
          </button>
          <div className="flex gap-1.5 flex-wrap">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1e3a8a] text-white font-bold text-sm shadow-md">
              1
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-600 border border-gray-200 font-bold text-sm hover:bg-gray-50 hover:text-gray-900 transition-colors">
              2
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-gray-600 border border-gray-200 font-bold text-sm hover:bg-gray-50 hover:text-gray-900 transition-colors">
              3
            </button>
          </div>
          <button className="px-5 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsDataTable;
