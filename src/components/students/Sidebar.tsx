import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  BookOpen,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";
import { logoutUser } from "../../api/auth";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved ? JSON.parse(saved) : false;
  });

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);

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
    <aside
      className={cn(
        "relative bg-white border-r border-gray-100 flex flex-col h-screen sticky top-0 shrink-0 transition-all duration-300 ease-in-out z-20",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      {/* Logo Section */}
      <div
        className={cn(
          "p-6 flex items-center transition-all duration-300",
          isCollapsed && "px-4 pt-8 pb-4 justify-center",
        )}
      >
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20 shrink-0">
            <LayoutDashboard size={20} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col whitespace-nowrap">
              <span className="text-sm font-black text-gray-900 uppercase leading-none">
                ASTU
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                Smart Complaint System
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Collapse / Expand Handle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={cn(
          "absolute -right-3 top-16 z-30 flex h-10 w-6 items-center justify-center rounded-full border bg-white text-gray-400 shadow-sm transition-all hover:text-gray-700 hover:border-gray-300 hover:shadow-md",
          isCollapsed && "top-14",
        )}
        title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              title={isCollapsed ? item.label : ""}
              className={cn(
                "flex items-center rounded-xl text-sm font-bold transition-all duration-200 group",
                isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3",
                isActive
                  ? "bg-blue-600/5 text-blue-600"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  "transition-colors shrink-0",
                  isActive
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-600",
                )}
              />
              {!isCollapsed && (
                <span className="whitespace-nowrap transition-opacity duration-200">
                  {item.label}
                </span>
              )}
              {isActive && !isCollapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className={cn("p-4 space-y-4", isCollapsed && "px-2")}>
        {!isCollapsed && (
          <div className="bg-slate-50 rounded-2xl p-4 border border-gray-100">
            <div className="flex items-center gap-3 text-gray-900 font-bold text-xs uppercase tracking-wider mb-2">
              Support Hours
            </div>
            <p className="text-[10px] font-medium text-gray-500">
              Mon - Fri: 8:00 AM - 5:00 PM
            </p>
          </div>
        )}

        <button
          onClick={handleLogout}
          title={isCollapsed ? "Sign Out" : ""}
          className={cn(
            "flex items-center w-full rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors",
            isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3",
          )}
        >
          <LogOut size={20} className="shrink-0" />
          {!isCollapsed && <span className="whitespace-nowrap">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
