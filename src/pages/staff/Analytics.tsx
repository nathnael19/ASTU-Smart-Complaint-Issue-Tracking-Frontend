import { useEffect, useState } from "react";
import {
  Calendar,
  Download,
  BarChart4,
  Timer,
  Heart,
  Briefcase,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import StaffDashboardLayout from "../../components/staff/StaffDashboardLayout";
import {
  getDepartmentSummary,
  getDepartmentCategoryDistribution,
  getDepartmentMonthlyTrends,
  type DepartmentSummary,
  type CategoryStat,
  type DepartmentMonthlyTrendStat,
} from "../../api/analytics";
import { getDepartmentReports, type Report } from "../../api/reports";

const Analytics = () => {
  const [summary, setSummary] = useState<DepartmentSummary | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [categories, setCategories] = useState<CategoryStat[]>([]);
  const [trends, setTrends] = useState<DepartmentMonthlyTrendStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [summaryData, reportsData, categoriesData, trendsData] =
          await Promise.all([
            getDepartmentSummary(),
            getDepartmentReports(),
            getDepartmentCategoryDistribution(),
            getDepartmentMonthlyTrends(),
          ]);
        setSummary(summaryData);
        setReports(reportsData);
        setCategories(categoriesData);
        setTrends(trendsData);
      } catch (error) {
        console.error("Failed to load analytics data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const totalComplaintsInCategories = categories.reduce(
    (sum, cat) => sum + cat.count,
    0,
  );

  return (
    <StaffDashboardLayout>
      <div className="p-8 max-w-[1400px] mx-auto min-h-screen bg-slate-50/30">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
          <div>
            <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-tight">
              Staff Analytics & Reports Hub
            </h1>
            <p className="text-[14px] text-gray-500 font-medium mt-1">
              Performance tracking and department data insights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200/80 text-gray-700 rounded-xl font-bold text-[13px] shadow-sm hover:bg-gray-50 transition-colors">
              <Calendar size={16} className="text-gray-400" />
              <span>Last 30 Days</span>
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1e3a8a] text-white rounded-xl font-bold text-[13px] shadow-sm hover:bg-blue-900 transition-colors">
              <Download size={16} />
              <span>Export All</span>
            </button>
          </div>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-2">
          {/* Total Reports */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[13px] font-black text-gray-400 tracking-widest uppercase">
                Total Reports
              </span>
              <BarChart4
                size={20}
                className="text-[#1e3a8a]"
                strokeWidth={2.5}
              />
            </div>
            <div className="flex items-end gap-3">
              <h3 className="text-[32px] font-black text-gray-900 leading-none">
                {loading ? "..." : reports.length}
              </h3>
            </div>
          </div>

          {/* Avg. Resolution */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[13px] font-black text-gray-400 tracking-widest uppercase">
                Avg. Resolution
              </span>
              <Timer size={20} className="text-amber-500" strokeWidth={2.5} />
            </div>
            <div className="flex items-end gap-3">
              <h3 className="text-[32px] font-black text-gray-900 leading-none">
                {loading ? "..." : summary?.avg_response_time || "N/A"}
              </h3>
            </div>
          </div>

          {/* Satisfaction */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[13px] font-black text-gray-400 tracking-widest uppercase">
                Satisfaction
              </span>
              <Heart size={20} className="text-red-500" strokeWidth={2.5} />
            </div>
            <div className="flex items-end gap-3">
              <h3 className="text-[32px] font-black text-gray-900 leading-none">
                {loading
                  ? "..."
                  : summary?.avg_satisfaction_rating
                    ? `${summary.avg_satisfaction_rating.toFixed(1)}/5.0`
                    : "N/A"}
              </h3>
              <span className="text-[12px] font-bold text-gray-400 mb-1">
                Out of 5.0
              </span>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)]">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[13px] font-black text-gray-400 tracking-widest uppercase">
                Pending Tasks
              </span>
              <Briefcase
                size={20}
                className="text-blue-500"
                strokeWidth={2.5}
              />
            </div>
            <div className="flex items-end gap-3">
              <h3 className="text-[32px] font-black text-gray-900 leading-none">
                {loading ? "..." : summary?.pending_dept_tasks || "0"}
              </h3>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 px-2">
          {/* Complaint Distribution Chart (Mock) */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] h-[380px] flex flex-col">
            <h3 className="text-[18px] font-black text-gray-900 mb-8">
              Complaint Distribution by Category
            </h3>
            <div className="flex-1 flex items-center justify-center gap-12">
              <div className="relative w-48 h-48 bg-emerald-400 rounded-sm">
                <div className="absolute inset-0 m-auto w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
                  <span className="text-[22px] font-black text-gray-900 leading-none">
                    100%
                  </span>
                  <span className="text-[10px] font-black text-gray-400 tracking-widest mt-1">
                    TOTAL
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                {categories.length === 0 && !loading && (
                  <p className="text-gray-500 text-sm">No complaints found</p>
                )}
                {categories.map((cat, idx) => {
                  const colors = [
                    "bg-blue-600",
                    "bg-amber-400",
                    "bg-emerald-400",
                    "bg-purple-500",
                    "bg-pink-500",
                    "bg-slate-200",
                  ];
                  const color = colors[idx % colors.length];
                  const percentage =
                    totalComplaintsInCategories > 0
                      ? Math.round(
                          (cat.count / totalComplaintsInCategories) * 100,
                        )
                      : 0;

                  return (
                    <div key={cat.category} className="flex items-start gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${color} mt-1 shrink-0`}
                      ></div>
                      <div>
                        <p className="text-[13px] font-black text-gray-900 leading-tight">
                          {cat.category.replace(/_/g, " ")} ({percentage}%)
                        </p>
                        <p className="text-[11px] font-medium text-gray-400">
                          {cat.count} Tickets
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Monthly Resolution Performance Chart (Mock) */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] h-[380px] flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <h3 className="text-[18px] font-black text-gray-900 leading-tight w-1/2">
                Monthly Resolution
                <br />
                Performance
              </h3>
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>SOLVED
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  RECEIVED
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-end justify-between px-4 pb-2 relative">
              {/* Chart lines/grid */}
              <div className="absolute left-0 right-0 bottom-8 border-b border-gray-100 w-full z-0"></div>

              {/* Bars */}
              {trends.length === 0 && !loading && (
                <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400 z-20">
                  No data available for the last 5 months
                </div>
              )}
              {trends.map((month) => (
                <div
                  key={month.label}
                  className="w-16 flex flex-col items-center gap-3 z-10"
                >
                  <div className="flex items-end justify-center w-full gap-1 h-[200px]">
                    <div
                      className="w-2.5 bg-slate-200 rounded-t-full transition-all duration-1000"
                      style={{
                        height: `${month.received}px`,
                        minHeight: month.received > 0 ? "4px" : "0",
                      }}
                      title={`Received: ${month.received / 5}`} // Unscale for hover roughly
                    ></div>
                    <div
                      className="w-2.5 bg-blue-600 rounded-t-full transition-all duration-1000"
                      style={{
                        height: `${month.solved}px`,
                        minHeight: month.solved > 0 ? "4px" : "0",
                      }}
                      title={`Solved: ${month.solved / 5}`} // Unscale for hover roughly
                    ></div>
                  </div>
                  <span className="text-[10px] font-black tracking-widest uppercase text-gray-400">
                    {month.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Reports Table */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] overflow-hidden mx-2">
          <div className="p-6 sm:px-8 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-[18px] font-black text-gray-900">
              Recent Department Reports
            </h3>
            <button className="text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
              View History
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-6 sm:px-8 py-4 text-[11px] uppercase font-black tracking-widest text-gray-400">
                    Report Name
                  </th>
                  <th className="px-6 py-4 text-[11px] uppercase font-black tracking-widest text-gray-400">
                    Generated Date
                  </th>
                  <th className="px-6 py-4 text-[11px] uppercase font-black tracking-widest text-gray-400">
                    Category
                  </th>
                  <th className="px-6 py-4 text-[11px] uppercase font-black tracking-widest text-gray-400">
                    Status
                  </th>
                  <th className="px-6 sm:px-8 py-4 text-[11px] uppercase font-black tracking-widest text-gray-400">
                    Download
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-sm text-gray-500"
                    >
                      Loading reports...
                    </td>
                  </tr>
                ) : reports.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-8 text-center text-sm text-gray-500"
                    >
                      No reports generated recently.
                    </td>
                  </tr>
                ) : (
                  reports.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="px-6 sm:px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${report.file_type === "PDF" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}
                          >
                            {report.file_type === "PDF" ? (
                              <FileText size={18} />
                            ) : (
                              <FileSpreadsheet size={18} />
                            )}
                          </div>
                          <span className="text-[14px] font-black text-gray-900 hover:text-[#1e3a8a] cursor-pointer transition-colors max-w-[250px] truncate">
                            {report.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-[13px] font-semibold text-gray-500">
                          {new Date(report.created_at).toLocaleDateString()}
                          <br />
                          <span className="text-gray-400 text-[12px]">
                            {new Date(report.created_at).toLocaleTimeString(
                              [],
                              { hour: "2-digit", minute: "2-digit" },
                            )}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg text-[12px] font-bold text-gray-600 bg-gray-100 uppercase tracking-widest">
                          {report.category}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <div
                          className={`flex items-center gap-1.5 text-[12px] font-black ${report.status === "READY" ? "text-emerald-600" : report.status === "FAILED" ? "text-red-600" : "text-amber-600"}`}
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full ${report.status === "READY" ? "bg-emerald-500" : report.status === "FAILED" ? "bg-red-500" : "bg-amber-500"}`}
                          ></div>
                          {report.status}
                        </div>
                      </td>
                      <td className="px-6 sm:px-8 py-5">
                        <div className="flex items-center gap-2">
                          <button
                            disabled={report.status !== "READY"}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-[11px] font-black uppercase tracking-wider transition-colors flex items-center gap-1.5 disabled:opacity-50"
                          >
                            <Download size={12} className="text-gray-500" />
                            File
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StaffDashboardLayout>
  );
};

export default Analytics;
