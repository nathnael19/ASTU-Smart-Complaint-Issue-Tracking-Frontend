import { Ticket, FolderOpen, Clock, CheckCircle2 } from "lucide-react";
import StaffDashboardLayout from "../../components/staff/StaffDashboardLayout";
import StatCard from "../../components/students/StatCard";
import WeeklyTicketVolumeChart from "../../components/staff/WeeklyTicketVolumeChart";
import UrgentComplaintsList from "../../components/staff/UrgentComplaintsList";
import RecentDepartmentTicketsTable from "../../components/staff/RecentDepartmentTicketsTable";

import React from "react";
import { useCurrentProfile } from "../../hooks/useUsers";
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

  const loading =
    summaryLoading || trendsLoading || urgentLoading || recentLoading;

  const urgentComplaints = urgentData?.data || [];
  const recentTickets = recentData?.data || [];

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
