import AdminLayout from "../../components/admin/AdminLayout";
import ReportTemplates from "../../components/admin/reports/ReportTemplates";
import CustomReportBuilder from "../../components/admin/reports/CustomReportBuilder";
import RecentDownloads from "../../components/admin/reports/RecentDownloads";

const AdminReports = () => {
  return (
    <AdminLayout>
      <div className="page pb-20">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="page-title mb-3">
            System Reports & Document Center
          </h1>
          <p className="page-subtitle max-w-2xl">
            Generate data-driven insights and export institutional performance
            records.
          </p>
        </div>

        {/* Standard Templates Section */}
        <div className="mb-12">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] mb-6 pl-1">
            Standard Report Templates
          </h2>
          <ReportTemplates />
        </div>

        {/* Builder & History Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
          <div className="lg:col-span-2">
            <CustomReportBuilder />
          </div>
          <div className="lg:col-span-1">
            <RecentDownloads />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
