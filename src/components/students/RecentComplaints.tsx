import { Eye } from "lucide-react";
import { cn } from "../../lib/utils";

interface Complaint {
  id: string;
  ticket_number: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  created_at: string;
}

interface RecentComplaintsProps {
  complaints: Complaint[];
  loading?: boolean;
}

const RecentComplaints = ({ complaints, loading }: RecentComplaintsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 pb-4 flex items-center justify-between border-b border-gray-50 mb-2">
        <h3 className="text-xl font-black text-gray-900">Recent Complaints</h3>
        <button className="text-sm font-bold text-[#1e3a8a] hover:underline underline-offset-4">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="p-12 text-center text-gray-400 font-medium">
            Loading complaints...
          </div>
        ) : complaints.length === 0 ? (
          <div className="p-12 text-center text-gray-400 font-medium">
            No complaints found.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Ticket ID
                </th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Subject & Category
                </th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Priority
                </th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Date Submitted
                </th>
                <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {complaints.map((complaint) => (
                <tr
                  key={complaint.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-8 py-6 text-sm font-bold text-gray-400">
                    #{complaint.ticket_number}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-900 leading-tight">
                        {complaint.title}
                      </span>
                      <span className="text-xs font-bold text-gray-400">
                        {complaint.category.replace(/_/g, " ")}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span
                      className={cn(
                        "text-[10px] font-black uppercase px-2 py-0.5 rounded-full border",
                        complaint.priority === "HIGH" ||
                          complaint.priority === "CRITICAL"
                          ? "text-red-600 bg-red-50 border-red-100"
                          : complaint.priority === "MEDIUM"
                            ? "text-yellow-600 bg-yellow-50 border-yellow-100"
                            : "text-gray-500 bg-gray-50 border-gray-100",
                      )}
                    >
                      {complaint.priority}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          complaint.status === "RESOLVED"
                            ? "bg-green-500"
                            : complaint.status === "IN_PROGRESS"
                              ? "bg-blue-500"
                              : "bg-yellow-500",
                        )}
                      />
                      <span
                        className={cn(
                          "text-xs font-black",
                          complaint.status === "RESOLVED"
                            ? "text-green-600"
                            : complaint.status === "IN_PROGRESS"
                              ? "text-blue-600"
                              : "text-yellow-600",
                        )}
                      >
                        {complaint.status.replace(/_/g, " ")}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-bold text-gray-500">
                    {formatDate(complaint.created_at)}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-gray-400 hover:text-[#1e3a8a] hover:bg-blue-50 rounded-xl transition-all">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RecentComplaints;
