import { Eye } from "lucide-react";
import { cn } from "../../lib/utils";

interface Ticket {
  id: string;
  requester: {
    name: string;
    avatar?: string;
  };
  category: string;
  subject: string;
  status: "New" | "In Progress" | "Resolved";
}

const RecentDepartmentTicketsTable = () => {
  const tickets: Ticket[] = [
    {
      id: "#TIC-8421",
      requester: { name: "Abebe Bikila" },
      category: "Academic Affairs",
      subject: "Grade correction request for CEE321",
      status: "In Progress",
    },
    {
      id: "#TIC-8420",
      requester: { name: "Selam Tesfaye" },
      category: "Facilities",
      subject: "Lab equipment malfunction (B-402)",
      status: "New",
    },
    {
      id: "#TIC-8419",
      requester: { name: "Kebede G/Mariam" },
      category: "Registrar",
      subject: "ID Card replacement Delayed",
      status: "Resolved",
    },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Resolved":
        return "bg-green-50 text-green-700 border-green-200";
      case "In Progress":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "New":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 pb-4 flex items-center justify-between border-b border-gray-50 mb-2">
        <h3 className="text-xl font-black text-gray-900">Recent Department Tickets</h3>
        <button className="text-sm font-bold text-[#1e3a8a] hover:underline underline-offset-4">
          View History
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                ID
              </th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Requester
              </th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Category
              </th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Subject
              </th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Status
              </th>
              <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="hover:bg-gray-50 transition-colors group"
              >
                <td className="px-8 py-6 text-sm font-bold text-gray-400">
                  {ticket.id}
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow-sm">
                      <span className="text-blue-600 text-xs font-black">
                        {getInitials(ticket.requester.name)}
                      </span>
                    </div>
                    <span className="text-sm font-black text-gray-900">
                      {ticket.requester.name}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-gray-600">
                    {ticket.category}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span className="text-sm font-black text-gray-900">
                    {ticket.subject}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <span
                    className={cn(
                      "text-[10px] font-black uppercase px-2.5 py-1 rounded-full border",
                      getStatusStyles(ticket.status),
                    )}
                  >
                    {ticket.status}
                  </span>
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
      </div>
    </div>
  );
};

export default RecentDepartmentTicketsTable;
