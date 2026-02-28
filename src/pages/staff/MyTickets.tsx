import { useEffect, useState } from "react";
import {
  Ticket as TicketIcon,
  MessageSquare,
  CheckCircle2,
  Search,
  ChevronDown,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import StaffDashboardLayout from "../../components/staff/StaffDashboardLayout";
import StatCard from "../../components/students/StatCard";
import {
  getDepartmentSummary,
  type DepartmentSummary,
} from "../../api/analytics";
import { getMyComplaints } from "../../api/complaints";

interface BackendTicket {
  id: string;
  ticket_number?: string;
  title: string;
  priority: string;
  status: string;
  created_at?: string;
  users?: {
    full_name?: string;
  };
}

const getPriorityClasses = (priority: string) => {
  switch (priority) {
    case "CRITICAL":
      return "bg-red-50 text-red-700 border-red-200";
    case "HIGH":
      return "bg-orange-50 text-orange-700 border-orange-200";
    case "MEDIUM":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";
    case "LOW":
      return "bg-gray-50 text-gray-700 border-gray-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const MyTickets = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<DepartmentSummary | null>(null);
  const [tickets, setTickets] = useState<BackendTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryData, ticketsData] = await Promise.all([
          getDepartmentSummary(),
          getMyComplaints({ limit: 50 }),
        ]);
        setSummary(summaryData);
        setTickets(ticketsData.data || []);
      } catch (error) {
        console.error("Failed to fetch tickets page data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleProcess = (ticketId: string) => {
    const id = ticketId.replace("#", "");
    navigate(`/staff/tickets/${id}`);
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticket_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <StaffDashboardLayout>
      <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
        {/* Page Header */}
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
            My Tickets
          </h1>
          <p className="text-gray-500 font-medium max-w-xl">
            Review and manage your assigned student complaints.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            label="My Assigned Tickets"
            value={
              loading ? "..." : summary?.assigned_tickets.toString() || "0"
            }
            icon={TicketIcon}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            label="Pending Dept Tasks"
            value={
              loading ? "..." : summary?.pending_dept_tasks.toString() || "0"
            }
            icon={MessageSquare}
            color="text-amber-600"
            bgColor="bg-amber-50"
          />
          <StatCard
            label="Resolved this week"
            value={
              loading ? "..." : summary?.resolved_this_week.toString() || "0"
            }
            icon={CheckCircle2}
            color="text-emerald-600"
            bgColor="bg-emerald-50"
          />
        </div>

        {/* Tickets Table Card */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          {/* Search + Filters */}
          <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-gray-50 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex-1">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
                    <Search size={18} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by Ticket ID or Subject..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 focus:border-[#1e3a8a]/20 transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 justify-between lg:justify-end">
                {/* Sort dropdown (UI only) */}
                <button className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-600 shadow-sm hover:bg-gray-50">
                  <span className="text-gray-400">Sort by</span>
                  <span className="text-gray-800">Newest First</span>
                  <ChevronDown size={14} className="text-gray-400" />
                </button>

                {/* Filter button (UI only) */}
                <button className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50">
                  <Filter size={14} />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tickets Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/60">
                  <th className="px-6 sm:px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Ticket ID
                  </th>
                  <th className="px-6 sm:px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Priority
                  </th>
                  <th className="px-6 sm:px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Subject
                  </th>
                  <th className="px-6 sm:px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Student Name
                  </th>
                  <th className="px-6 sm:px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Last Activity
                  </th>
                  <th className="px-6 sm:px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-sm text-gray-500"
                    >
                      Loading tickets...
                    </td>
                  </tr>
                ) : filteredTickets.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-sm text-gray-500"
                    >
                      No tickets found.
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 sm:px-8 py-5 text-xs font-black text-[#1e3a8a]">
                        {ticket.ticket_number || ticket.id.substring(0, 8)}
                      </td>
                      <td className="px-6 sm:px-8 py-5">
                        <span
                          className={`inline-flex items-center text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${getPriorityClasses(ticket.priority)}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="px-6 sm:px-8 py-5">
                        <p className="text-sm font-black text-gray-900">
                          {ticket.title}
                        </p>
                      </td>
                      <td className="px-6 sm:px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow-sm">
                            <span className="text-blue-600 text-xs font-black">
                              {(ticket.users?.full_name || "Unknown")
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                            </span>
                          </div>
                          <span className="text-sm font-black text-gray-900">
                            {ticket.users?.full_name || "Unknown"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 sm:px-8 py-5 text-sm font-medium text-gray-500 whitespace-nowrap">
                        {ticket.created_at
                          ? new Date(ticket.created_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-6 sm:px-8 py-5 text-right">
                        <button
                          onClick={() => handleProcess(ticket.id)}
                          className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs font-bold bg-[#1e3a8a] text-white shadow-sm hover:bg-blue-900 transition-colors"
                        >
                          Process
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Footer / Pagination */}
          <div className="px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-50">
            <p className="text-xs font-medium text-gray-400">
              Showing {filteredTickets.length > 0 ? 1 : 0}–
              {filteredTickets.length} of {tickets.length} assigned tickets
            </p>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button className="w-8 h-8 rounded-full border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50">
                {"<"}
              </button>
              <button className="w-8 h-8 rounded-full bg-[#1e3a8a] text-white text-xs font-semibold">
                1
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50">
                2
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50">
                3
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50">
                {">"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </StaffDashboardLayout>
  );
};

export default MyTickets;
