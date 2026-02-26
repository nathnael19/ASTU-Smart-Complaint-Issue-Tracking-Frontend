import {
  FileBarChart,
  ChevronDown,
  FileText,
  FileSpreadsheet,
  Send,
} from "lucide-react";
import { useState } from "react";

const CustomReportBuilder = () => {
  const [format, setFormat] = useState<"PDF" | "EXCEL">("PDF");
  const [metrics, setMetrics] = useState({
    totalVolume: true,
    resolutionRate: true,
    avgResponseTime: false,
    userFeedback: false,
  });

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 h-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1e3a8a]">
          <FileBarChart size={20} />
        </div>
        <h3 className="text-xl font-black text-gray-900">
          Custom Report Builder
        </h3>
      </div>

      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest pl-1">
              Date Range Selection
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="date"
                className="flex-1 bg-slate-50 border border-transparent rounded-xl py-3 px-4 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold"
              />
              <input
                type="date"
                className="flex-1 bg-slate-50 border border-transparent rounded-xl py-3 px-4 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-black text-gray-900 uppercase tracking-widest pl-1">
              Target Category
            </label>
            <div className="relative group">
              <select className="w-full bg-slate-50 border border-transparent rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold appearance-none cursor-pointer">
                <option>All Departments</option>
                <option>Software Engineering</option>
                <option>Civil Engineering</option>
                <option>IT Infrastructure</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-black text-gray-900 uppercase tracking-widest pl-1 block">
            Metrics to Include
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(metrics).map(([key, value]) => (
              <label
                key={key}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 hover:bg-slate-50 transition-colors cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => setMetrics({ ...metrics, [key]: !value })}
                  className="w-5 h-5 rounded border-gray-300 text-[#1e3a8a] focus:ring-[#1e3a8a]/20 cursor-pointer"
                />
                <span className="text-sm font-bold text-gray-700 group-hover:text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-black text-gray-400 uppercase tracking-widest pl-1">
              Export format:
            </span>
            <div className="flex bg-slate-50 p-1 rounded-xl border border-gray-100">
              <button
                type="button"
                onClick={() => setFormat("PDF")}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-black transition-all ${
                  format === "PDF"
                    ? "bg-white text-[#1e3a8a] shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <FileText size={16} />
                PDF
              </button>
              <button
                type="button"
                onClick={() => setFormat("EXCEL")}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-black transition-all ${
                  format === "EXCEL"
                    ? "bg-white text-[#1e3a8a] shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <FileSpreadsheet size={16} />
                EXCEL
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-[#1e3a8a] text-white px-8 py-3.5 rounded-xl font-black text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-950 transition-all flex items-center justify-center gap-3 group"
          >
            <Send
              size={18}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
            />
            Generate Report
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomReportBuilder;
