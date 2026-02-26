import { ChevronDown } from "lucide-react";

const ManagementControls = () => {
  return (
    <div className="bg-[#1e3a8a] rounded-[1.5rem] shadow-sm p-6 text-white mb-6">
      <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-blue-100">
        Management Controls
      </h3>

      <div className="space-y-6">
        {/* Status Dropdown */}
        <div>
          <label className="block text-xs font-bold text-blue-200 mb-2">
            Change Status
          </label>
          <div className="relative">
            <select className="w-full appearance-none bg-[#1e40af] border border-blue-700/50 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
              <option>In Progress</option>
              <option>Open</option>
              <option>Resolved</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 pointer-events-none"
            />
          </div>
        </div>

        {/* Priority Level Toggle */}
        <div>
          <label className="block text-xs font-bold text-blue-200 mb-2">
            Priority Level
          </label>
          <div className="flex bg-[#1e40af] rounded-xl border border-blue-700/50 p-1">
            <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-wider text-blue-200 hover:text-white transition-colors rounded-lg">
              Low
            </button>
            <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white shadow-sm rounded-lg transition-colors">
              Medium
            </button>
            <button className="flex-1 py-2 text-[10px] font-black uppercase tracking-wider text-blue-200 hover:text-white transition-colors rounded-lg">
              High
            </button>
          </div>
        </div>

        {/* Update Button */}
        <button className="w-full bg-white text-[#1e3a8a] py-3.5 rounded-xl font-black text-sm hover:bg-blue-50 transition-colors shadow-lg mt-2">
          Update Ticket Status
        </button>
      </div>
    </div>
  );
};

export default ManagementControls;
