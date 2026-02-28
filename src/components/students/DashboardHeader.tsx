import { useState, useEffect } from "react";
import { Search, Bell, HelpCircle, ChevronDown } from "lucide-react";
import { getCurrentProfile } from "../../api/users";

const DashboardHeader = () => {
  const [user, setUser] = useState<any>(() =>
    JSON.parse(localStorage.getItem("user") || "{}"),
  );

  const fullName = user.full_name || "Student User";
  const studentId = user.student_id || "ID Pending";

  useEffect(() => {
    const refreshProfile = async () => {
      if (!user.student_id || user.student_id === "ID Pending") {
        try {
          const profile = await getCurrentProfile();
          if (profile) {
            const updatedUser = {
              ...user,
              full_name: `${profile.first_name} ${profile.last_name}`.trim(),
              student_id: profile.student_id_number,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setUser(updatedUser);
          }
        } catch (err) {
          console.error("Header profile refresh failed:", err);
        }
      }
    };

    refreshProfile();
  }, [user.student_id]);

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-10">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search tickets, FAQs..."
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
            <HelpCircle size={20} />
          </button>
        </div>

        <div className="h-8 w-[1px] bg-gray-100 mx-2" />

        {/* User Profile */}
        <button className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-2xl transition-all group border border-transparent hover:border-gray-100">
          <div className="flex flex-col text-right">
            <span className="text-sm font-black text-gray-900 group-hover:text-[#1e3a8a] transition-colors">
              {fullName}
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
              {studentId}
            </span>
          </div>
          <div className="relative">
            <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=1e3a8a&color=fff`}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <ChevronDown
            size={14}
            className="text-gray-400 group-hover:text-gray-900 transition-colors"
          />
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
