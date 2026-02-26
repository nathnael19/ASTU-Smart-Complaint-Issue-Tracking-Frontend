import { Search, Bell } from "lucide-react";

const StaffDashboardHeader = () => {
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
            placeholder="Search complaints..."
            className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all text-sm font-medium"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>

        {/* Staff Profile Pill */}
        <button className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 rounded-2xl px-4 py-2 border border-gray-100 shadow-sm transition-colors">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-2 border-white shadow-sm">
            <span className="text-blue-600 font-black text-sm">SK</span>
          </div>
          <div className="flex flex-col items-start leading-tight">
            <span className="text-sm font-black text-gray-900 max-w-[120px] truncate">
              Dr. Samuel Kebede
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
              Dept. Manager
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default StaffDashboardHeader;
