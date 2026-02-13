import {
  Download,
  MessageSquare,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminStatCard from "../../components/admin/AdminStatCard";
import ComplaintsCategoryChart from "../../components/admin/ComplaintsCategoryChart";
import TrendsTimeChart from "../../components/admin/TrendsTimeChart";
import UserManagementTable from "../../components/admin/UserManagementTable";
import { useDashboardSummary } from "../../hooks/useAnalytics";
import { useCurrentProfile } from "../../hooks/useUsers";

const Dashboard = () => {
  const { data: stats } = useDashboardSummary();
  const { data: currentProfile } = useCurrentProfile();

  return (
    <AdminLayout>
      <div className="page pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="page-title">Admin Analytics Dashboard</h1>
            <p className="page-subtitle">
              Real-time overview of Adama Science and Technology University
              issue tracking performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="btn-secondary">
              <Clock size={16} />
              Last 30 Days
            </button>
            <button className="btn-primary shadow-lg shadow-blue-900/20 hover:-translate-y-0.5 transition-all">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatCard
            label="Total Complaints"
            value={stats?.total_complaints.toLocaleString() || "..."}
            icon={MessageSquare}
            color="text-primary"
            bgColor="bg-blue-100"
            trendText="Live from system"
            trendColor="text-emerald-500"
          />
          <AdminStatCard
            label="Resolution Rate"
            value={stats?.resolution_rate || "..."}
            icon={CheckCircle}
            color="text-primary"
            bgColor="bg-blue-100"
            trendText="Target: 95%+"
            trendColor="text-emerald-500"
          />
          <AdminStatCard
            label="Avg. Resolution Time"
            value={stats?.avg_resolution_time || "..."}
            icon={Clock}
            color="text-primary"
            bgColor="bg-blue-100"
            trendText="System performance"
            trendColor="text-emerald-500"
          />
          <AdminStatCard
            label="Active Users"
            value={stats?.active_users.toLocaleString() || "..."}
            icon={Users}
            color="text-gray-600"
            bgColor="bg-slate-100"
            trendText="Total verified profiles"
            trendColor="text-emerald-500"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComplaintsCategoryChart />
          <TrendsTimeChart />
        </div>

        {/* User Management Section */}
        <UserManagementTable currentUserId={currentProfile?.id} />
      </div>

    </AdminLayout>
  );
};

export default Dashboard;
