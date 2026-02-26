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

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="p-8 lg:p-12 space-y-8 max-w-[1600px] mx-auto pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Admin Analytics Dashboard
            </h1>
            <p className="text-gray-400 font-medium text-sm lg:text-base">
              Real-time overview of Adama Science and Technology University
              issue tracking performance
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="bg-white text-gray-700 px-5 py-3 rounded-2xl font-bold flex items-center gap-2 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-sm">
              <Clock size={16} />
              Last 30 Days
            </button>
            <button className="bg-[#1e3a8a] text-white px-5 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20 hover:bg-blue-950 transition-colors text-sm hover:-translate-y-0.5 mt-0">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminStatCard
            label="Total Complaints"
            value="1,284"
            icon={MessageSquare}
            color="text-[#1e3a8a]"
            bgColor="bg-blue-100"
            trendText="~+12% vs last month"
            trendColor="text-emerald-500"
          />
          <AdminStatCard
            label="Resolution Rate"
            value="89.2%"
            icon={CheckCircle}
            color="text-[#1e3a8a]"
            bgColor="bg-blue-100"
            trendText="~+5.4% system efficiency"
            trendColor="text-emerald-500"
          />
          <AdminStatCard
            label="Avg. Resolution Time"
            value="4.5 days"
            icon={Clock}
            color="text-[#1e3a8a]"
            bgColor="bg-blue-100"
            trendText="~-1.2 days faster response"
            trendColor="text-red-500"
          />
          <AdminStatCard
            label="Active Users"
            value="3,420"
            icon={Users}
            color="text-gray-600"
            bgColor="bg-slate-100"
            trendText="~+8% student adoption"
            trendColor="text-emerald-500"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          <ComplaintsCategoryChart />
          <TrendsTimeChart />
        </div>

        {/* User Management */}
        <UserManagementTable />
      </div>

      {/* Footer minimal representation */}
      <footer className="text-center py-6 text-xs font-medium text-gray-400">
        © 2024 Adama Science and Technology University - Smart Tracking System.
        All rights reserved.
      </footer>
    </AdminLayout>
  );
};

export default Dashboard;
