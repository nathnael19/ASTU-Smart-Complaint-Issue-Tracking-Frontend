import {
  ClipboardList,
  MessageSquare,
  CheckCircle,
  Clock,
  Plus,
  Info,
  HelpCircle,
  Phone,
} from "lucide-react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import RecentComplaints from "../components/dashboard/RecentComplaints";

const StudentDashboard = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-10 max-w-[1600px] mx-auto">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Student Dashboard
            </h1>
            <p className="text-gray-400 font-medium">
              Welcome back, track your academic and campus issues.
            </p>
          </div>
          <button className="bg-[#1e3a8a] text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-blue-900/20 hover:bg-blue-950 transition-all hover:translate-y-[-2px] active:translate-y-0">
            <Plus size={20} />
            Submit New Complaint
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Complaints"
            value="12"
            icon={ClipboardList}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />
          <StatCard
            label="Open Tickets"
            value="03"
            icon={MessageSquare}
            color="text-yellow-600"
            bgColor="bg-yellow-50"
          />
          <StatCard
            label="In Progress"
            value="02"
            icon={Clock}
            color="text-[#1e3a8a]"
            bgColor="bg-blue-50"
          />
          <StatCard
            label="Resolved"
            value="07"
            icon={CheckCircle}
            color="text-green-600"
            bgColor="bg-green-50"
          />
        </div>

        {/* Recent Complaints Table */}
        <RecentComplaints />

        {/* Help & FAQ Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
          {/* Urgent Help */}
          <div className="bg-blue-50/50 rounded-[2.5rem] p-8 border border-blue-100 flex gap-6 group">
            <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 group-hover:scale-110 transition-transform">
              <Info size={28} />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-black text-blue-900">
                Need Immediate Help?
              </h3>
              <p className="text-blue-700/70 font-medium leading-relaxed">
                For urgent security matters or emergencies, please contact the
                campus security hotline directly instead of submitting a ticket.
              </p>
              <div className="flex items-center gap-3 text-blue-900 font-black text-lg">
                <Phone size={20} />
                Campus Security: 9811
              </div>
            </div>
          </div>

          {/* Quick FAQ */}
          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-gray-400">
                <HelpCircle size={24} />
              </div>
              <h3 className="text-xl font-black text-gray-900">Quick FAQ</h3>
            </div>
            <ul className="space-y-4">
              {[
                "How long does a resolution take?",
                "How can I appeal a resolved ticket?",
                "Can I attach documents to my complaint?",
              ].map((q, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 group cursor-pointer hover:translate-x-1 transition-transform"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#1e3a8a] transition-colors" />
                  <span className="text-sm font-bold text-gray-500 group-hover:text-gray-900 transition-colors">
                    {q}
                  </span>
                </li>
              ))}
            </ul>
            <button className="text-[#1e3a8a] font-black text-sm hover:underline underline-offset-4 pt-2 block w-full text-center">
              Visit Knowledge Base
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
