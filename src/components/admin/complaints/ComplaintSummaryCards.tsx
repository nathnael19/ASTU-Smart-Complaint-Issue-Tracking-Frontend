import { FileText, ClipboardList, CheckCircle } from "lucide-react";

const ComplaintSummaryCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Complaints */}
      <div className="bg-white p-8 rounded-[1.5rem] border border-gray-100 flex items-center gap-6 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
          <FileText size={28} />
        </div>
        <div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
            Total Complaints
          </p>
          <h3 className="text-4xl font-black text-gray-900 tracking-tight">
            1,284
          </h3>
        </div>
      </div>

      {/* Pending/Active */}
      <div className="bg-white p-8 rounded-[1.5rem] border border-gray-100 flex items-center gap-6 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
          <ClipboardList size={28} />
        </div>
        <div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
            Pending/Active
          </p>
          <h3 className="text-4xl font-black text-gray-900 tracking-tight">
            42
          </h3>
        </div>
      </div>

      {/* Resolved Cases */}
      <div className="bg-white p-8 rounded-[1.5rem] border border-gray-100 flex items-center gap-6 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
          <CheckCircle size={28} />
        </div>
        <div>
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
            Resolved Cases
          </p>
          <h3 className="text-4xl font-black text-gray-900 tracking-tight">
            1,242
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ComplaintSummaryCards;
