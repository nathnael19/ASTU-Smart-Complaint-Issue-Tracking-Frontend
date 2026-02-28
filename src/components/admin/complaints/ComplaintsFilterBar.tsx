import { Search, ChevronDown, Filter } from "lucide-react";
import type { ComplaintFilters } from "../../../api/complaints";

interface ComplaintsFilterBarProps {
  filters: ComplaintFilters;
  onFilterChange: (key: keyof ComplaintFilters, value: string) => void;
}

const ComplaintsFilterBar = ({
  filters,
  onFilterChange,
}: ComplaintsFilterBarProps) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
      {/* Search Input */}
      <div className="relative flex-1 w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={filters.search || ""}
          onChange={(e) => onFilterChange("search", e.target.value)}
          placeholder="Search by Ticket ID, name or subject..."
          className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all text-sm font-medium"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
        <div className="relative shrink-0">
          <select
            value={filters.category || ""}
            onChange={(e) => onFilterChange("category", e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] cursor-pointer min-w-[140px]"
          >
            <option value="">All Categories</option>
            <option value="IT_AND_NETWORK">IT & Network</option>
            <option value="FACILITY_AND_MAINTENANCE">Facilities</option>
            <option value="ACADEMIC_AFFAIRS">Academic Affairs</option>
            <option value="STUDENT_SERVICES">Student Services</option>
            <option value="REGISTRAR_OFFICE">Registrar Office</option>
            <option value="ACADEMIC_RESOURCES">Academic Resources</option>
            <option value="OTHER">Other</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        <div className="relative shrink-0">
          <select
            value={filters.status || ""}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] cursor-pointer min-w-[130px]"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>

        <div className="relative shrink-0">
          <select
            value={filters.priority || ""}
            onChange={(e) => onFilterChange("priority", e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] cursor-pointer min-w-[130px]"
          >
            <option value="">All Priorities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
            <option value="CRITICAL">Critical</option>
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
