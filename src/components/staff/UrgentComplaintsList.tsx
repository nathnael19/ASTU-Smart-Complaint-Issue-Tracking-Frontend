import { AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

interface UrgentComplaint {
  id: string;
  title: string;
  description: string;
  priority: "HIGH" | "URGENT" | "CRITICAL";
  timeAgo: string;
}

const UrgentComplaintsList = () => {
  const urgentComplaints: UrgentComplaint[] = [
    {
      id: "1",
      title: "Dormitory Water Leakage",
      description: "Major leakage reported in Block B...",
      priority: "HIGH",
      timeAgo: "2h ago",
    },
    {
      id: "2",
      title: "LMS Access Denied",
      description: "3rd year students unable to access...",
      priority: "URGENT",
      timeAgo: "5h ago",
    },
    {
      id: "3",
      title: "Security System Outage",
      description: "Main gate RFID sensors non-...",
      priority: "CRITICAL",
      timeAgo: "Yesterday",
    },
  ];

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-50 border-red-200 text-red-700";
      case "URGENT":
        return "bg-orange-50 border-orange-200 text-orange-700";
      case "HIGH":
        return "bg-yellow-50 border-yellow-200 text-yellow-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-black text-gray-900">Urgent Complaints</h3>
          <span className="bg-red-500 text-white text-xs font-black px-2.5 py-1 rounded-full">
            {urgentComplaints.length}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {urgentComplaints.map((complaint) => (
          <div
            key={complaint.id}
            className="p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                <AlertCircle
                  size={16}
                  className={cn(
                    "shrink-0",
                    complaint.priority === "CRITICAL"
                      ? "text-red-600"
                      : complaint.priority === "URGENT"
                        ? "text-orange-600"
                        : "text-yellow-600",
                  )}
                />
                <span
                  className={cn(
                    "text-[10px] font-black uppercase px-2 py-0.5 rounded border",
                    getPriorityStyles(complaint.priority),
                  )}
                >
                  {complaint.priority}
                </span>
              </div>
              <span className="text-xs font-bold text-gray-400 whitespace-nowrap">
                {complaint.timeAgo}
              </span>
            </div>
            <h4 className="text-sm font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {complaint.title}
            </h4>
            <p className="text-xs font-medium text-gray-500 line-clamp-2">
              {complaint.description}
            </p>
          </div>
        ))}
      </div>

      {urgentComplaints.some((c) => c.priority === "CRITICAL") && (
        <button className="mt-6 text-sm font-bold text-blue-600 hover:underline underline-offset-4">
          View All Critical
        </button>
      )}
    </div>
  );
};

export default UrgentComplaintsList;
