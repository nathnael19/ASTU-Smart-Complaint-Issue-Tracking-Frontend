import {
  Search,
  X,
  Plus,
  Eye,
  ChevronLeft,
  ChevronRight,
  Info,
  Clock,
  RotateCcw,
} from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import { cn } from "../lib/utils";

const complaints = [
  {
    id: "#CMP-82194",
    subject: "Wi-Fi Disconnection in Library",
    category: "ICT & Infrastructure",
    priority: "High",
    status: "In Progress",
    statusDate: "Oct 24, 2023",
  },
  {
    id: "#CMP-82156",
    subject: "Missing Grade - CS302",
    category: "Registrar Office",
    priority: "Medium",
    status: "Open",
    statusDate: "Oct 22, 2023",
  },
  {
    id: "#CMP-82088",
    subject: "Dormitory Maintenance Required",
    category: "Facility Management",
    priority: "Low",
    status: "Resolved",
    statusDate: "Oct 18, 2023",
  },
  {
    id: "#CMP-81921",
    subject: "Library Books Availability",
    category: "Academic Resources",
    priority: "Low",
    status: "Resolved",
    statusDate: "Oct 12, 2023",
  },
];

const MyComplaints = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8 max-w-[1600px] mx-auto pb-20">
        {/* Header section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              My Complaints
            </h1>
            <p className="text-gray-400 font-medium font-sans">
              Manage and track the status of all your submitted issues.
            </p>
          </div>
          <button className="bg-[#1e3a8a] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-blue-900/20 hover:bg-blue-950 transition-all hover:translate-y-[-2px] active:translate-y-0">
            <Plus size={20} />
            Submit New Complaint
          </button>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search Filter */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                Search
              </label>
              <div className="relative group">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors"
                />
                <input
                  type="text"
                  placeholder="Filter by Ticket ID or Subject"
                  className="w-full bg-slate-50 border-none rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                Status
              </label>
              <select className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all appearance-none cursor-pointer">
                <option>All Statuses</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>

            {/* Date Range */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                Date Submitted
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="date"
                  className="flex-1 bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all uppercase"
                />
                <span className="text-gray-400 font-bold">to</span>
                <input
                  type="date"
                  className="flex-1 bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all uppercase"
                />
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 text-xs font-black text-gray-500 hover:text-[#1e3a8a] transition-colors bg-gray-50 px-4 py-2 rounded-lg group">
            <X
              size={14}
              className="group-hover:rotate-90 transition-transform duration-300"
            />
            Clear Filters
          </button>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Ticket ID
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Subject & Category
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Priority
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Date Submitted
                  </th>
                  <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {complaints.map((complaint) => (
                  <tr
                    key={complaint.id}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-8 py-6 text-sm font-bold text-gray-400">
                      {complaint.id}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-gray-900 group-hover:text-[#1e3a8a] transition-colors">
                          {complaint.subject}
                        </span>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">
                          {complaint.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={cn(
                          "text-[10px] font-black uppercase px-2.5 py-1 rounded-md border",
                          complaint.priority === "High"
                            ? "bg-red-50 text-red-600 border-red-100"
                            : complaint.priority === "Medium"
                              ? "bg-yellow-50 text-yellow-600 border-yellow-100"
                              : "bg-gray-50 text-gray-500 border-gray-100",
                        )}
                      >
                        {complaint.priority}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div
                        className={cn(
                          "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
                          complaint.status === "In Progress"
                            ? "bg-blue-50 text-blue-600"
                            : complaint.status === "Open"
                              ? "bg-yellow-50 text-yellow-600"
                              : "bg-green-50 text-green-600",
                        )}
                      >
                        <div
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            complaint.status === "In Progress"
                              ? "bg-blue-500"
                              : complaint.status === "Open"
                                ? "bg-yellow-500"
                                : "bg-green-500",
                          )}
                        />
                        <span className="text-[10px] font-black uppercase tracking-wide">
                          {complaint.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm font-bold text-gray-500">
                      {complaint.statusDate}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="bg-slate-50 hover:bg-[#1e3a8a] text-gray-400 hover:text-white p-2.5 rounded-xl transition-all flex items-center gap-2 ml-auto group/btn shadow-sm">
                        <Eye size={16} />
                        <span className="text-xs font-black uppercase hidden lg:block px-1">
                          View Details
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-8 py-6 border-t border-gray-50 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-400">
              Showing <span className="text-gray-900">1 to 4</span> of{" "}
              <span className="text-gray-900">12</span> results
            </span>
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50"
                disabled
              >
                <ChevronLeft size={16} />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1e3a8a] text-white text-xs font-black">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-900 text-xs font-black hover:bg-gray-50">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-900 text-xs font-black hover:bg-gray-50">
                3
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50/30 rounded-3xl p-6 border border-blue-100/50 flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
              <Info size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-blue-900">Tracking Tip</h4>
              <p className="text-blue-700/70 text-xs font-medium leading-relaxed">
                Check your email for automated updates on ticket status changes.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
              <Clock size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-gray-900">
                Response Time
              </h4>
              <p className="text-gray-400 text-xs font-medium leading-relaxed">
                Average resolution: 3-5 business days.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-start gap-4">
            <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-gray-400 shrink-0">
              <RotateCcw size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-gray-900">
                Reopening Tickets
              </h4>
              <p className="text-gray-400 text-xs font-medium leading-relaxed">
                Resolved tickets can be reopened within 48h.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MyComplaints;
