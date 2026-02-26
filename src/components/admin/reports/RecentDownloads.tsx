import { Download, FileText, FileSpreadsheet, Trash2 } from "lucide-react";

const downloads = [
  {
    name: "Q2_Efficiency_Summary.pdf",
    date: "Oct 24, 2024",
    size: "1.2 MB",
    type: "pdf",
  },
  {
    name: "Student_Complaints_Log_Oct.xlsx",
    date: "Oct 22, 2024",
    size: "456 KB",
    type: "excel",
  },
  {
    name: "Annual_System_Audit_2023.pdf",
    date: "Oct 15, 2024",
    size: "4.8 MB",
    type: "pdf",
  },
  {
    name: "Maintenance_Dept_Trends.pdf",
    date: "Oct 12, 2024",
    size: "890 KB",
    type: "pdf",
  },
];

const RecentDownloads = () => {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="p-8 pb-4 border-b border-gray-50 flex items-center justify-between">
        <h3 className="text-xl font-black text-gray-900">Recent Downloads</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {downloads.map((file, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                file.type === "pdf"
                  ? "bg-red-50 text-red-600"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {file.type === "pdf" ? (
                <FileText size={20} />
              ) : (
                <FileSpreadsheet size={20} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-gray-900 truncate">
                {file.name}
              </p>
              <p className="text-xs font-medium text-gray-400 mt-0.5">
                {file.date} • {file.size}
              </p>
            </div>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 border border-gray-100 hover:text-[#1e3a8a] hover:bg-white transition-all shadow-sm">
              <Download size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-gray-50 flex justify-center">
        <button className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-red-600 transition-colors">
          <Trash2 size={14} />
          Clear History
        </button>
      </div>
    </div>
  );
};

export default RecentDownloads;
