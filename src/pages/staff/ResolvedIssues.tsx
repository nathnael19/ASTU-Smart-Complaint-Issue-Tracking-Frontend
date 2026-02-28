import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Star,
  History,
  TrendingUp,
} from "lucide-react";
import StaffDashboardLayout from "../../components/staff/StaffDashboardLayout";

// Mock Data Interfaces
interface ResolvedTicket {
  id: string;
  subject: string;
  requester: string;
  category: string;
  resolvedDate: string;
  resolutionOutcome: string;
}

// Mock Data
const resolvedTickets: ResolvedTicket[] = [
  {
    id: "#ICT-8998",
    subject: "Printer Repair - Registrar Office",
    requester: "Sarah J.",
    category: "Hardware",
    resolvedDate: "Nov 22, 2023",
    resolutionOutcome: "Replaced fuser unit and...",
  },
  {
    id: "#ICT-8982",
    subject: "Portal Password Reset Failure",
    requester: "Ahmed K.",
    category: "Software",
    resolvedDate: "Nov 21, 2023",
    resolutionOutcome: "Manual sync of LDAP...",
  },
  {
    id: "#ICT-8975",
    subject: "Lab 2 Switch Failure",
    requester: "Lab Tech",
    category: "Network",
    resolvedDate: "Nov 20, 2023",
    resolutionOutcome: "Configured redundant uplin...",
  },
  {
    id: "#ICT-8970",
    subject: "Bulk Student Email Update",
    requester: "Admissions",
    category: "Database",
    resolvedDate: "Nov 19, 2023",
    resolutionOutcome: "Batch script executed for...",
  },
  {
    id: "#ICT-8962",
    subject: "Smart Classroom Projector",
    requester: "Prof. Dawit",
    category: "AV Systems",
    resolvedDate: "Nov 18, 2023",
    resolutionOutcome: "Bulb replaced and HDMI po...",
  },
];

const ResolvedIssues = () => {
  return (
    <StaffDashboardLayout>
      <div className="p-8 max-w-[1400px] mx-auto min-h-screen bg-slate-50/30">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
          <div>
            <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-tight">
              Department Resolved Issues
              <br />
              History
            </h1>
            <p className="text-[14px] text-gray-500 font-medium mt-2">
              Archival records of all closed and settled department tickets.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search by Ticket ID or keyword..."
                className="w-72 bg-slate-100/80 border-transparent rounded-[0.85rem] py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:bg-white transition-all text-[13px] font-medium placeholder:text-gray-500"
              />
            </div>

            <button className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-gray-200/80 text-gray-700 rounded-[0.85rem] font-bold text-[13px] shadow-sm hover:bg-gray-50 transition-colors">
              <Filter size={16} className="text-gray-500" />
              <span>Advanced Search</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 px-2">
          {/* Total Resolved */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[14px] font-black text-gray-500 tracking-wide">
                Total Resolved
              </span>
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:scale-110 group-hover:bg-emerald-100 transition-all duration-300">
                <CheckCircle2 size={20} strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-[32px] font-black text-gray-900 leading-none tracking-tight mb-2">
                1,284
              </h3>
              <div className="flex items-center text-[12px] font-black text-emerald-600">
                <span className="mr-1">+12 this week</span>
              </div>
            </div>
          </div>

          {/* Avg Resolution Time */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[14px] font-black text-gray-500 tracking-wide">
                Avg. Resolution Time
              </span>
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:bg-blue-100 transition-all duration-300">
                <Clock size={20} strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-[32px] font-black text-gray-900 leading-none tracking-tight mb-2">
                1.4 Days
              </h3>
              <div className="flex items-center text-[12px] font-bold text-gray-400">
                <span className="mr-1">Within SLA target (2.0)</span>
              </div>
            </div>
          </div>

          {/* Satisfaction Rate */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] relative overflow-hidden group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[14px] font-black text-gray-500 tracking-wide">
                Satisfaction Rate
              </span>
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 group-hover:bg-amber-100 transition-all duration-300">
                <Star size={20} strokeWidth={2.5} />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-[32px] font-black text-gray-900 leading-none tracking-tight mb-2">
                4.8/5.0
              </h3>
              <div className="flex items-center text-[12px] font-black text-emerald-600">
                <TrendingUp size={14} className="mr-1" strokeWidth={3} />
                <span>2% vs last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Table */}
        <div className="bg-white rounded-3xl border border-gray-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-white">
                  <th className="px-8 py-5 text-[11px] uppercase font-black tracking-widest text-gray-500">
                    Ticket ID
                  </th>
                  <th className="px-6 py-5 text-[11px] uppercase font-black tracking-widest text-gray-500">
                    Subject
                  </th>
                  <th className="px-6 py-5 text-[11px] uppercase font-black tracking-widest text-gray-500">
                    Category
                  </th>
                  <th className="px-6 py-5 text-[11px] uppercase font-black tracking-widest text-gray-500">
                    Resolved Date
                  </th>
                  <th className="px-6 py-5 text-[11px] uppercase font-black tracking-widest text-gray-500">
                    Resolution Outcome
                  </th>
                  <th className="px-8 py-5 text-[11px] uppercase font-black tracking-widest text-gray-500 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100/80">
                {resolvedTickets.map((ticket, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6">
                      <span className="text-[14px] font-black text-[#8ca1c2] group-hover:text-blue-600 transition-colors">
                        {ticket.id}
                      </span>
                    </td>
                    <td className="px-6 py-6 min-w-[250px]">
                      <p className="text-[15px] font-black text-gray-900 leading-tight mb-1">
                        {ticket.subject}
                      </p>
                      <p className="text-[13px] font-semibold text-gray-400">
                        Reported by{" "}
                        <span className="text-gray-500">
                          {ticket.requester}
                        </span>
                      </p>
                    </td>
                    <td className="px-6 py-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-[12px] font-bold text-gray-600 bg-gray-100/80">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="text-[14px] font-semibold text-gray-600">
                        {ticket.resolvedDate.split(",")[0]}
                        <br />
                        <span className="text-gray-400 text-[13px]">
                          {ticket.resolvedDate.split(",")[1]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <p className="text-[14px] font-medium text-gray-500 max-w-[250px] truncate">
                        {ticket.resolutionOutcome}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="inline-flex items-center gap-1.5 text-[#1e3a8a] hover:text-blue-800 font-bold text-[13px] transition-colors bg-blue-50/50 hover:bg-blue-100 px-4 py-2 rounded-xl">
                        <History size={14} strokeWidth={2.5} />
                        <span className="text-left leading-tight">
                          Re-open
                          <br />
                          Ticket
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-100 flex items-center justify-between text-[14px]">
            <span className="text-gray-500 font-medium">
              Showing <span className="font-bold text-gray-900">1 to 5</span> of{" "}
              <span className="font-bold text-gray-900">1,284</span> entries
            </span>
            <div className="flex items-center gap-1.5 font-semibold">
              <button className="px-4 py-2 text-gray-500 hover:text-gray-900 border border-gray-200/60 rounded-xl mr-2 hover:bg-gray-50 transition-colors disabled:opacity-50">
                Previous
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#1e3a8a] text-white shadow-sm">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
                3
              </button>
              <button className="px-4 py-2 text-gray-700 hover:text-gray-900 border border-gray-200/60 rounded-xl ml-2 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </StaffDashboardLayout>
  );
};

export default ResolvedIssues;
