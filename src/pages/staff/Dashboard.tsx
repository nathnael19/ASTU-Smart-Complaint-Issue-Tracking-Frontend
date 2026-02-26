import {
  Ticket,
  FolderOpen,
  Clock,
  CheckCircle2,
} from "lucide-react";
import StaffDashboardLayout from "../../components/staff/StaffDashboardLayout";
import StatCard from "../../components/students/StatCard";
import WeeklyTicketVolumeChart from "../../components/staff/WeeklyTicketVolumeChart";
import UrgentComplaintsList from "../../components/staff/UrgentComplaintsList";
import RecentDepartmentTicketsTable from "../../components/staff/RecentDepartmentTicketsTable";

const StaffDashboard = () => {
  return (
    <StaffDashboardLayout>
      <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
        {/* Welcome Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Staff Dashboard
          </h1>
          <p className="text-gray-500 font-medium">
            Welcome back, Samuel. Here&apos;s your department overview.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="relative">
            <StatCard
              label="My Assigned Tickets"
              value="12"
              icon={Ticket}
              color="text-blue-600"
              bgColor="bg-blue-50"
            />
            <span className="absolute top-4 right-4 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              +3 new
            </span>
          </div>
          <StatCard
            label="Pending Dept Tasks"
            value="28"
            icon={FolderOpen}
            color="text-orange-600"
            bgColor="bg-orange-50"
          />
          <StatCard
            label="Avg. Response Time"
            value="4.2 hrs"
            icon={Clock}
            color="text-purple-600"
            bgColor="bg-purple-50"
          />
          <StatCard
            label="Resolved this week"
            value="15"
            icon={CheckCircle2}
            color="text-green-600"
            bgColor="bg-green-50"
          />
        </div>


        {/* Chart and Urgent Complaints Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeeklyTicketVolumeChart />
          </div>
          <div>
            <UrgentComplaintsList />
          </div>
        </div>

        {/* Recent Department Tickets Table */}
        <RecentDepartmentTicketsTable />
      </div>
    </StaffDashboardLayout>
  );
};

export default StaffDashboard;
