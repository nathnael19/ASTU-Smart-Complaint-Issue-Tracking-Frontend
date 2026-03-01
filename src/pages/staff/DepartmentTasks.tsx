import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Plus, Filter, List, Info, UserPlus } from "lucide-react";
import StaffDashboardLayout from "../../components/staff/StaffDashboardLayout";
import { useDepartmentUsers } from "../../hooks/useUsers";
import { useComplaints } from "../../hooks/useComplaints";
import { useDepartmentSummary } from "../../hooks/useAnalytics";

// Interfaces
interface Task {
  id: string;
  title: string;
  priority: "LOW" | "NORMAL" | "HIGH" | "CRITICAL";
  status: string;
  assigned_to?: string;
  users?: {
    full_name?: string;
  };
  assigned_user?: {
    full_name?: string;
    avatar_url?: string;
  };
  ticket_number?: string;
}

// Helper functions for styling
const getPriorityStyles = (priority: Task["priority"]) => {
  switch (priority) {
    case "CRITICAL":
      return { bg: "bg-red-50", text: "text-red-600", dot: "bg-red-600" };
    case "HIGH":
      return { bg: "bg-amber-50", text: "text-amber-600", dot: "bg-amber-500" };
    case "NORMAL":
      return { bg: "bg-blue-50", text: "text-blue-600", dot: "bg-blue-500" };
    case "LOW":
      return { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-500" };
    default:
      return { bg: "bg-gray-50", text: "text-gray-500", dot: "bg-gray-400" };
  }
};

const getStatusStyles = (status: string) => {
  switch (status) {
    case "New":
      return "bg-blue-50 text-blue-600 font-bold border-blue-100";
    case "In Progress":
      return "bg-amber-50 text-amber-600 font-bold border-amber-100";
    case "Completed":
      return "bg-emerald-50 text-emerald-600 font-bold border-emerald-100";
    default:
      return "bg-gray-50 text-gray-600 font-bold border-gray-100";
  }
};

const DepartmentTasks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Tasks");

  const { data: teamMembers, loading: teamLoading } = useDepartmentUsers();
  const { data: complaintsData, loading: complaintsLoading } = useComplaints({
    limit: 50,
  });
  const { data: summary, loading: summaryLoading } = useDepartmentSummary();

  const loading = teamLoading || complaintsLoading || summaryLoading;

  // Map backend users to TeamMember interface
  const teamData = (teamMembers || [])
    .filter((m: any) => m.role === "STAFF" || m.role === "ADMIN")
    .map((m: any) => ({
      name: m.full_name || `${m.first_name} ${m.last_name}`,
      role: m.role,
      activeCount: m.active_tickets_count || 0,
      capacityLevel: Math.min(
        Math.round(((m.active_tickets_count || 0) / 10) * 100),
        100,
      ),
      avatar: m.avatar_url,
    }));

  const allComplaints = complaintsData?.data || [];

  // Filter tasks based on activeTab
  const filteredTasks = allComplaints.filter((task: any) => {
    if (activeTab === "All Tasks") return true;
    if (activeTab === "Unassigned") return !task.assigned_to;
    if (activeTab === "In Progress") return task.status === "IN_PROGRESS";
    if (activeTab === "Completed")
      return task.status === "RESOLVED" || task.status === "CLOSED";
    return true;
  });

  return (
    <StaffDashboardLayout>
      <div className="p-8 max-w-[1600px] mx-auto min-h-screen">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1 mb-8">
          <div>
            <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-tight">
              Department Tasks Overview
            </h1>
            <p className="text-[14px] text-gray-500 font-medium mt-1">
              Managing all ICT Department tickets and staff allocation.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Search department tasks..."
                className="w-64 bg-slate-50/80 border border-gray-200/60 rounded-[0.85rem] py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 focus:border-[#1e3a8a]/20 transition-all text-[13px] font-medium placeholder:text-gray-400"
              />
            </div>

            <button
              onClick={() => navigate("/staff/tasks/create")}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-[0.85rem] font-bold text-[13px] shadow-sm transition-colors transform active:scale-95"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Create Ticket</span>
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Main Table Content - Left Column */}
          <div className="flex-1 bg-white rounded-3xl border border-gray-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col">
            {/* Tabs & Controls */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-1 text-[13px] font-bold">
                {["All Tasks", "Unassigned", "In Progress", "Completed"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2 rounded-xl transition-all ${
                        activeTab === tab
                          ? "text-blue-600 bg-blue-50/50"
                          : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {tab}
                    </button>
                  ),
                )}
              </div>

              <div className="flex items-center gap-2">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50/80 hover:bg-slate-100 border border-gray-200/60 rounded-xl text-[13px] font-bold text-gray-700 transition-colors">
                  <Filter size={14} />
                  <span>Advanced Filters</span>
                </button>
                <div className="w-px h-6 bg-gray-200/60 mx-1"></div>
                <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-gray-400 whitespace-nowrap">
                      Ticket ID
                    </th>
                    <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-gray-400">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-gray-400">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-gray-400">
                      Assignee
                    </th>
                    <th className="px-6 py-4 text-[10px] uppercase font-black tracking-widest text-gray-400 text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/60">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-8 text-center text-gray-400 text-sm"
                      >
                        Loading department tasks...
                      </td>
                    </tr>
                  ) : filteredTasks.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-8 text-center text-gray-400 text-sm italic"
                      >
                        No tasks found in this category.
                      </td>
                    </tr>
                  ) : (
                    filteredTasks.map((task: any) => {
                      const priorityStyles = getPriorityStyles(
                        task.priority as any,
                      );
                      const statusMap: any = {
                        OPEN: "New",
                        IN_PROGRESS: "In Progress",
                        RESOLVED: "Completed",
                        CLOSED: "Completed",
                      };
                      const status = statusMap[task.status] || task.status;

                      return (
                        <tr
                          key={task.id}
                          className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                          onClick={() => navigate(`/staff/tickets/${task.id}`)}
                        >
                          <td className="px-6 py-5">
                            <span className="text-[13px] font-black text-slate-400 group-hover:text-blue-600 transition-colors">
                              {task.ticket_number || task.id.substring(0, 8)}
                            </span>
                          </td>
                          <td className="px-6 py-5 min-w-[200px]">
                            <p className="text-[14px] font-black text-gray-900 leading-tight mb-1">
                              {task.title}
                            </p>
                            <p className="text-[12px] font-semibold text-gray-400">
                              Requested by{" "}
                              <span className="text-gray-500">
                                {task.users?.full_name || "Student"}
                              </span>
                            </p>
                          </td>
                          <td className="px-6 py-5">
                            <div
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black tracking-wide uppercase ${priorityStyles.bg} ${priorityStyles.text}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${priorityStyles.dot}`}
                              ></span>
                              {task.priority}
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            {!task.assigned_to ? (
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-400">
                                  <Plus size={14} />
                                </div>
                                <span className="text-[13px] font-bold text-gray-400">
                                  Unassigned
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2.5">
                                {task.assigned_user?.avatar_url ? (
                                  <img
                                    src={task.assigned_user.avatar_url}
                                    alt={task.assigned_user.full_name}
                                    className="w-8 h-8 rounded-full shadow-sm object-cover"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black text-xs">
                                    {(
                                      task.assigned_user?.full_name || "S"
                                    ).charAt(0)}
                                  </div>
                                )}
                                <span className="text-[13px] font-bold text-gray-800">
                                  {task.assigned_user?.full_name || "Staff"}
                                </span>
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex justify-end">
                              <span
                                className={`inline-flex px-3 py-1.5 rounded-full text-[11px] border text-center leading-none ${getStatusStyles(status as any)}`}
                              >
                                {status}
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-gray-100 flex items-center justify-between text-[13px]">
              <span className="text-gray-500 font-medium">
                Showing {filteredTasks.length} of {allComplaints.length} tasks
              </span>
              <div className="flex items-center gap-1 text-sm font-semibold">
                <button className="px-3 py-1.5 text-gray-500 hover:text-gray-900 border border-gray-200/60 rounded-lg mr-1 disabled:opacity-50">
                  Previous
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1e3a8a] text-white">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100">
                  2
                </button>
                <button className="px-3 py-1.5 text-gray-600 hover:text-gray-900 border border-gray-200/60 rounded-lg ml-1">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar Area - Right Column */}
          <div className="w-[300px] shrink-0 space-y-4">
            <h2 className="text-[18px] font-black text-gray-900 mb-2 px-1">
              Team Workload
            </h2>

            {/* Staff Workload Cards */}
            {teamLoading ? (
              <div className="text-gray-400 text-sm italic px-2">
                Loading team...
              </div>
            ) : teamData.length === 0 ? (
              <div className="text-gray-400 text-sm italic px-2">
                No team members found
              </div>
            ) : (
              teamData.map((member: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-gray-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] p-5"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-[42px] h-[42px] rounded-full shadow-sm object-cover"
                        />
                      ) : (
                        <div className="w-[42px] h-[42px] rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-black">
                          {member.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="text-[14px] font-black text-gray-900 line-clamp-1">
                          {member.name}
                        </h4>
                        <p className="text-[10px] font-black tracking-widest uppercase text-gray-400 mt-0.5">
                          {member.role}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-[13px] font-black text-[#1e3a8a] bg-blue-50/50 px-2 py-0.5 rounded-md">
                        {member.activeCount} active
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${member.capacityLevel > 85 ? "bg-red-500" : "bg-[#1e3a8a]"}`}
                        style={{ width: `${member.capacityLevel}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-bold">
                      <span className="text-gray-400">Capacity</span>
                      <span
                        className={
                          member.capacityLevel > 85
                            ? "text-red-500"
                            : "text-gray-900"
                        }
                      >
                        {member.capacityLevel > 85
                          ? `High (${member.capacityLevel}%)`
                          : `${member.capacityLevel}%`}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Dept Summary Card */}
            <div className="bg-blue-50/50 rounded-3xl border border-blue-100/50 p-5 mt-4">
              <div className="flex items-center gap-2 mb-4 text-[#1e3a8a]">
                <Info size={16} />
                <h3 className="text-[14px] font-black">Dept Summary</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-500 font-semibold">
                    Open Tickets:
                  </span>
                  <span className="font-black text-gray-900">
                    {summaryLoading ? "..." : summary?.pending_dept_tasks || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-500 font-semibold">
                    My Assigned:
                  </span>
                  <span className="font-black text-gray-900">
                    {summaryLoading ? "..." : summary?.assigned_tickets || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[13px]">
                  <span className="text-gray-500 font-semibold">
                    Avg. Resolution:
                  </span>
                  <span className="font-black text-gray-900">
                    {summaryLoading
                      ? "..."
                      : summary?.avg_response_time || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StaffDashboardLayout>
  );
};

export default DepartmentTasks;
