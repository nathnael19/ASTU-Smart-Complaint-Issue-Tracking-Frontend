import { Plus } from "lucide-react";
import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import ComplaintSummaryCards from "../../components/admin/complaints/ComplaintSummaryCards";
import ComplaintsFilterBar from "../../components/admin/complaints/ComplaintsFilterBar";
import ComplaintsDataTable from "../../components/admin/complaints/ComplaintsDataTable";
import { type ComplaintFilters } from "../../api/complaints";
import { useComplaints } from "../../hooks/useComplaints";
import { useDashboardSummary } from "../../hooks/useAnalytics";

const Complaints = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [filters, setFilters] = useState<ComplaintFilters>({
    status: "",
    priority: "",
    category: "",
    search: "",
  });

  const apiFilters: ComplaintFilters = {
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
  };

  if (filters.status) apiFilters.status = filters.status.toUpperCase();
  if (filters.priority) apiFilters.priority = filters.priority.toUpperCase();
  if (filters.category) apiFilters.category = filters.category;
  if (filters.search) apiFilters.search = filters.search;

  const { data: complaintsData, loading: isLoadingComplaints } =
    useComplaints(apiFilters);
  const { data: summary, loading: isLoadingSummary } = useDashboardSummary();

  const complaints = complaintsData?.data || [];
  const totalCount = complaintsData?.total || 0;
  const isLoading = isLoadingComplaints || isLoadingSummary;

  const handleFilterChange = (key: keyof ComplaintFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  return (
    <AdminLayout>
      <div className="p-8 lg:p-12 space-y-8 max-w-[1600px] mx-auto pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Complaints Management
            </h1>
            <p className="text-gray-500 font-medium text-sm lg:text-base">
              Overview of all student and staff reported issues.
            </p>
          </div>
          <button className="bg-[#1e3a8a] text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20 hover:bg-blue-950 transition-colors text-sm hover:-translate-y-0.5 w-max shrink-0">
            <Plus size={18} />
            New Ticket
          </button>
        </div>

        {/* Summary Cards */}
        <ComplaintSummaryCards
          summary={summary}
          isLoading={isLoading && !summary}
        />

        {/* Filter Bar */}
        <ComplaintsFilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
        />

        {/* Data Table */}
        <div className="pt-2">
          <ComplaintsDataTable
            complaints={complaints}
            totalCount={totalCount}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Footer minimal representation aligned with mockup */}
      <footer className="py-6 px-12 border-t border-gray-100 flex items-center justify-between mt-auto">
        <span className="text-xs font-medium text-gray-400">
          © 2024 ASTU Smart Tracking System. All rights reserved.
        </span>
        <div className="flex gap-6">
          <button className="text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors">
            Help Center
          </button>
          <button className="text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors">
            Privacy Policy
          </button>
          <button className="text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors">
            System Status
          </button>
        </div>
      </footer>
    </AdminLayout>
  );
};

export default Complaints;
