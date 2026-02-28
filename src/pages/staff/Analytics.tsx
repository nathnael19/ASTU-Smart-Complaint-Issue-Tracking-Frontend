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

// Mock Data
const reports = [
  {
    id: 1,
    name: "Monthly_SLA_Performance_Nov23.pdf",
    type: "pdf",
    date: "Nov 28, 2023 10:45 AM",
    category: "Performance",
    status: "Ready",
  },
  {
    id: 2,
    name: "Student_Feedback_Aggregated_Q4.xlsx",
    type: "excel",
    date: "Nov 25, 2023 03:20 PM",
    category: "Feedback",
    status: "Ready",
  },
];

const Analytics = () => {
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
                1,284
              </h3>
              <span className="text-[12px] font-black text-emerald-500 mb-1 flex items-center">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-0.5"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
                +12%
              </span>
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
                4.2h
              </h3>
              <span className="text-[12px] font-black text-emerald-500 mb-1 flex items-center">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-0.5"
                >
                  <polyline points="22 17 13.5 8.5 8.5 13.5 2 7"></polyline>
                  <polyline points="16 17 22 17 22 11"></polyline>
                </svg>
                -15m
              </span>
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
                94%
              </h3>
              <span className="text-[12px] font-bold text-gray-400 mb-1">
                vs 92% LY
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
                42
              </h3>
              <span className="text-[12px] font-black text-red-500 mb-1">
                8 urgent
              </span>
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
                {/* This represents the large green square from the mockup */}
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
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-600 mt-1 shrink-0"></div>
                  <div>
                    <p className="text-[13px] font-black text-gray-900 leading-tight">
                      Network & IT (40%)
                    </p>
                    <p className="text-[11px] font-medium text-gray-400">
                      514 Tickets
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-400 mt-1 shrink-0"></div>
                  <div>
                    <p className="text-[13px] font-black text-gray-900 leading-tight">
                      Facility/Maintenance (25%)
                    </p>
                    <p className="text-[11px] font-medium text-gray-400">
                      321 Tickets
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 mt-1 shrink-0"></div>
                  <div>
                    <p className="text-[13px] font-black text-gray-900 leading-tight">
                      Academic Affairs (10%)
                    </p>
                    <p className="text-[11px] font-medium text-gray-400">
                      128 Tickets
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-slate-200 mt-1 shrink-0"></div>
                  <div>
                    <p className="text-[13px] font-black text-gray-900 leading-tight">
                      Others (25%)
                    </p>
                    <p className="text-[11px] font-medium text-gray-400">
                      321 Tickets
                    </p>
                  </div>
                </div>
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
              {[
                { label: "JUL", received: 50, solved: 40 },
                { label: "AUG", received: 60, solved: 55 },
                { label: "SEP", received: 70, solved: 68 },
                { label: "OCT", received: 65, solved: 62 },
                { label: "NOV", received: 80, solved: 75 },
              ].map((month) => (
                <div
                  key={month.label}
                  className="w-16 flex flex-col items-center gap-3 z-10"
                >
                  <div className="flex items-end justify-center w-full gap-1 h-[200px]">
                    <div
                      className="w-2.5 bg-slate-200 rounded-t-full"
                      style={{ height: `${month.received}%` }}
                    ></div>
                    <div
                      className="w-2.5 bg-blue-600 rounded-t-full"
                      style={{ height: `${month.solved}%` }}
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
                {reports.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 sm:px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${report.type === "pdf" ? "bg-blue-50 text-blue-600" : "bg-amber-50 text-amber-600"}`}
                        >
                          {report.type === "pdf" ? (
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
                        {report.date.split(" 2023 ")[0]},<br />
                        <span className="text-gray-400 text-[12px]">
                          2023 {report.date.split(" 2023 ")[1]}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-[12px] font-bold text-gray-600 bg-gray-100">
                        {report.category}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-1.5 text-[12px] font-black text-emerald-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        Ready
                      </div>
                    </td>
                    <td className="px-6 sm:px-8 py-5">
                      <div className="flex items-center gap-2">
                        <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-[11px] font-black uppercase tracking-wider transition-colors flex items-center gap-1.5">
                          <FileSpreadsheet
                            size={12}
                            className="text-gray-500"
                          />
                          CSV
                        </button>
                        <button className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors">
                          <FileText size={14} className="text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </StaffDashboardLayout>
  );
};

export default Analytics;
