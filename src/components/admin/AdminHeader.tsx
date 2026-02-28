import { Search, Bell, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentProfile } from "../../api/users";

const AdminHeader = () => {
  const location = useLocation();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCurrentProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch admin profile for header", error);
      }
    };
    fetchProfile();
  }, []);

  const navLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Complaints", path: "/admin/complaints" },
    { name: "Users", path: "/admin/users" },
    { name: "Reports", path: "/admin/reports" },
  ];

  const getAvatarSource = () => {
    if (profile?.avatar_url) return profile.avatar_url;
    if (profile?.first_name) {
      return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        profile.first_name + " " + (profile.last_name || ""),
      )}&backgroundColor=1e3a8a&textColor=ffffff`;
    }
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=admin&backgroundColor=ffdfbf`;
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center px-8 sticky top-0 z-10 w-full">
      {/* Logo Section */}
      <div className="flex items-center gap-3 mr-12 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#1e3a8a] flex items-center justify-center">
          {/* simple icon for ASTU smart tracking */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3L2 8L12 13L22 8L12 3Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 13L12 18L22 13"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-xl font-black text-[#1e3a8a] tracking-tight">
          ASTU Smart Tracking
        </span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-sm mr-auto">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search analytics..."
            className="w-full bg-slate-50 border border-transparent rounded-xl py-2.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex items-center gap-8 mr-12 hidden md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`text-sm font-bold transition-colors relative py-8 ${
              location.pathname === link.path
                ? "text-[#1e3a8a]"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {link.name}
            {location.pathname === link.path && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#1e3a8a] rounded-t-full" />
            )}
          </Link>
        ))}
      </nav>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4 shrink-0">
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all relative border border-gray-100 shadow-sm bg-white cursor-pointer">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
        </button>
        <Link
          to="/admin/settings"
          className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all border border-gray-100 shadow-sm bg-white cursor-pointer"
        >
          <Settings size={18} />
        </Link>

        <div className="w-px h-6 bg-gray-200 mx-2" />

        {/* User Profile Avatar */}
        <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border-2 border-white shadow-sm hover:scale-105 transition-transform overflow-hidden cursor-pointer">
          <img
            src={getAvatarSource()}
            alt="Admin avatar"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
