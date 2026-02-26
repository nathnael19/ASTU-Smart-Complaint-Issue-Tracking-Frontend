import { Search, ChevronDown, Filter } from "lucide-react";

const ComplaintsFilterBar = () => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search by Ticket ID, name or subject..."
          className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <div className="relative shrink-0">
          <select className="appearance-none bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer min-w-[140px]">
            <option>Category</option>
            <option>ICT Infrastructure</option>
            <option>Facilities</option>
            <option>Academic</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        <div className="relative shrink-0">
          <select className="appearance-none bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer min-w-[130px]">
            <option>Status</option>
            <option>In Progress</option>
            <option>Open</option>
            <option>Resolved</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        <div className="relative shrink-0">
          <select className="appearance-none bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer min-w-[130px]">
            <option>Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        <button className="shrink-0 flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors text-sm">
          <Filter size={16} className="text-gray-400" />
          More Filters
        </button>
      </div>
    </div>
  );
};

export default ComplaintsFilterBar;
