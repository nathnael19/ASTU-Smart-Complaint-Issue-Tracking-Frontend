import AdminLayout from "../../components/admin/AdminLayout";
import ReportTemplates from "../../components/admin/reports/ReportTemplates";
import CustomReportBuilder from "../../components/admin/reports/CustomReportBuilder";
import RecentDownloads from "../../components/admin/reports/RecentDownloads";

const AdminReports = () => {
  return (
    <AdminLayout>
      <div className="p-8 lg:p-12 max-w-[1600px] mx-auto min-h-[calc(100vh-5rem)] flex flex-col pb-20">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-3">
            System Reports & Document Center
          </h1>
          <p className="text-lg font-medium text-gray-500 max-w-2xl">
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

        {/* Global Footer */}
        <footer className="mt-20 pt-10 border-t border-gray-50 flex flex-col items-center justify-center gap-4">
          <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
            ASTU SMART TRACKING • REPORTING ENGINE V2.4
          </span>
          <span className="text-[10px] font-medium text-gray-300">
            © 2024 Adama Science and Technology University - Smart Tracking
            System. All rights reserved.
          </span>
        </footer>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
