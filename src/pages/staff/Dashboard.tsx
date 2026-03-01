import { Ticket, FolderOpen, Clock, CheckCircle2, Star } from "lucide-react";
import StaffDashboardLayout from "../../components/staff/StaffDashboardLayout";
import StatCard from "../../components/students/StatCard";
import WeeklyTicketVolumeChart from "../../components/staff/WeeklyTicketVolumeChart";
import UrgentComplaintsList from "../../components/staff/UrgentComplaintsList";
import RecentDepartmentTicketsTable from "../../components/staff/RecentDepartmentTicketsTable";

import React from "react";
import { useCurrentProfile } from "../../hooks/useUsers";
import { cn } from "../../lib/utils";
import {
  useDepartmentSummary,
  useDepartmentTrends,
} from "../../hooks/useAnalytics";
import { useComplaints } from "../../hooks/useComplaints";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Dashboard caught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-red-600 bg-red-50">
          <h1>Dashboard Render Error</h1>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

const StaffDashboard = () => {
  const { data: user } = useCurrentProfile();
  const { data: summary, loading: summaryLoading } = useDepartmentSummary();
  const { data: trends, loading: trendsLoading } = useDepartmentTrends();
  const { data: urgentData, loading: urgentLoading } = useComplaints({
    limit: 5,
    priority: "CRITICAL",
  });
  const { data: recentData, loading: recentLoading } = useComplaints({
    limit: 5,
  });
  const { data: resolvedData, loading: resolvedLoading } = useComplaints({
    status: "RESOLVED",
    limit: 3,
  });

  const loading =
    summaryLoading ||
    trendsLoading ||
    urgentLoading ||
    recentLoading ||
    resolvedLoading;

  const urgentComplaints = urgentData?.data || [];
  const recentTickets = recentData?.data || [];
  const resolvedTickets = resolvedData?.data || [];

  return (
    <ErrorBoundary>
      <StaffDashboardLayout>
        <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
          {/* Welcome Section */}
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Staff Dashboard
            </h1>
            <p className="text-gray-500 font-medium">
              Welcome back, {user?.first_name || "Staff"}. Here&apos;s your
              department overview.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative">
              <StatCard
                label="My Assigned Tickets"
                value={
                  loading ? "..." : summary?.assigned_tickets.toString() || "0"
                }
                icon={Ticket}
                color="text-blue-600"
                bgColor="bg-blue-50"
              />
            </div>
            <StatCard
              label="Pending Dept Tasks"
              value={
                loading ? "..." : summary?.pending_dept_tasks.toString() || "0"
              }
              icon={FolderOpen}
              color="text-orange-600"
              bgColor="bg-orange-50"
            />
            <StatCard
              label="Avg. Response Time"
              value={loading ? "..." : summary?.avg_response_time || "0 hrs"}
              icon={Clock}
              color="text-purple-600"
              bgColor="bg-purple-50"
            />
            <StatCard
              label="Resolved this week"
              value={
                loading ? "..." : summary?.resolved_this_week.toString() || "0"
              }
              icon={CheckCircle2}
              color="text-green-600"
              bgColor="bg-green-50"
            />
          </div>

          {/* Chart and Urgent Complaints Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WeeklyTicketVolumeChart chartData={trends || []} />
            </div>
            <div>
              <UrgentComplaintsList complaints={urgentComplaints} />

              {/* Recent Feedback Section */}
              <div className="mt-6 bg-white rounded-3xl border border-gray-200/60 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="text-amber-500 fill-amber-500" size={18} />
                    <h2 className="text-[16px] font-black text-gray-900">
                      Recent Reviews
                    </h2>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  {loading ? (
                    <div className="text-center py-4 text-gray-400 text-sm">
                      Loading feedback...
                    </div>
                  ) : resolvedTickets.filter((t: any) => t.satisfaction_rating)
                      .length === 0 ? (
                    <div className="text-center py-4 text-gray-400 text-sm italic">
                      No recent reviews
                    </div>
                  ) : (
                    resolvedTickets
                      .filter((t: any) => t.satisfaction_rating)
                      .map((ticket: any) => (
                        <div
                          key={ticket.id}
                          className="space-y-2 pb-4 border-b border-gray-50 last:border-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] font-black tracking-widest text-[#8ca1c2] uppercase">
                              {ticket.ticket_number ||
                                ticket.id.substring(0, 8)}
                            </span>
                            <div className="flex gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  size={10}
                                  className={cn(
                                    s <= ticket.satisfaction_rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-200 fill-transparent",
                                  )}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-[13px] font-bold text-gray-800 leading-tight line-clamp-1">
                            {ticket.title}
                          </p>
                          {ticket.satisfaction_message && (
                            <p className="text-[11px] font-medium text-gray-500 italic line-clamp-2 bg-slate-50 p-2 rounded-lg">
                              "{ticket.satisfaction_message}"
                            </p>
                          )}
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Department Tickets Table */}
          <RecentDepartmentTicketsTable tickets={recentTickets} />
        </div>
      </StaffDashboardLayout>
    </ErrorBoundary>
  );
};

export default StaffDashboard;
