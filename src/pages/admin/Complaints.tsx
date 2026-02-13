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
      <div className="page pb-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="page-title">Complaints Management</h1>
            <p className="page-subtitle">
              Overview of all student and staff reported issues.
            </p>
          </div>
          <button className="btn-primary px-6 py-3.5 rounded-xl text-sm shadow-lg shadow-blue-900/20 hover:-translate-y-0.5 transition-all w-max shrink-0">
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
    </AdminLayout>
  );
};

export default Complaints;
