import { Search, Bell, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { getCurrentProfile } from "../../api/users";
import { getNotifications, type Notification } from "../../api/notifications";
import NotificationModal from "../notifications/NotificationModal";

const StaffDashboardHeader = () => {
  const [profile, setProfile] = useState<any>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(
        "StaffDashboardHeader: Failed to fetch notifications:",
        err,
      );
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCurrentProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch staff profile for header", error);
      }
    };
    fetchProfile();
    fetchNotifications();

    // Refresh notifications every minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const fullName = profile
    ? `${profile.first_name} ${profile.last_name}`
    : "Staff Member";
  const initials = profile
    ? `${profile.first_name?.[0] || ""}${profile.last_name?.[0] || ""}`
    : "ST";
  const roleDisplay =
    profile?.role === "ADMIN"
      ? "Administrator"
      : profile?.department?.name || "Dept. Staff";

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search complaints..."
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsNotificationOpen(true)}
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all relative"
        >
          <Bell size={20} />
          {notifications.some((n) => !n.is_read) && (
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          )}
        </button>

        <NotificationModal
          isOpen={isNotificationOpen}
          notifications={notifications}
          onClose={() => setIsNotificationOpen(false)}
          onRefresh={fetchNotifications}
        />

        {/* Staff Profile Pill */}
        <button className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 rounded-2xl px-4 py-2 border border-gray-100 shadow-sm transition-colors group">
          <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={fullName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-primary font-black text-sm">
                {initials}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-black text-gray-900 max-w-[120px] truncate group-hover:text-primary transition-colors">
              {fullName}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
              {roleDisplay}
            </span>
          </div>
          <ChevronDown size={14} className="text-gray-400 ml-1" />
        </button>
      </div>
    </header>
  );
};

export default StaffDashboardHeader;
