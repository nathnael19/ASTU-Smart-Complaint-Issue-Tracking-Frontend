import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  BookOpen,
  Settings,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/student/dashboard" },
    {
      icon: ClipboardList,
      label: "My Complaints",
      path: "/student/dashboard/complaints",
    },
    {
      icon: PlusCircle,
      label: "Submit New",
      path: "/student/dashboard/submit",
    },
    { icon: BookOpen, label: "Knowledge Base", path: "/student/dashboard/kb" },
    { icon: Settings, label: "Settings", path: "/student/dashboard/settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shrink-0">
      {/* Logo Section */}
      <div className="p-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1e3a8a] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
            <LayoutDashboard size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-gray-900 uppercase leading-none">
              ASTU
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
              Smart Complaint System
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 group",
                isActive
                  ? "bg-[#1e3a8a]/5 text-[#1e3a8a]"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  "transition-colors",
                  isActive
                    ? "text-[#1e3a8a]"
                    : "text-gray-400 group-hover:text-gray-600",
                )}
              />
              {item.label}
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#1e3a8a]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 space-y-4">
        <div className="bg-slate-50 rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-3 text-gray-900 font-bold text-xs uppercase tracking-wider mb-2">
            Support Hours
          </div>
          <p className="text-[10px] font-medium text-gray-500">
            Mon - Fri: 8:00 AM - 5:00 PM
          </p>
        </div>

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
