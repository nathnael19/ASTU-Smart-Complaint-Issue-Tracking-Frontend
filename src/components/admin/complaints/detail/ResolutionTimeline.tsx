import { Activity, Check, RefreshCcw, CheckCircle2 } from "lucide-react";

const ResolutionTimeline = () => {
  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-8 mb-6">
      <div className="flex items-center gap-3 mb-8">
        <Activity size={20} className="text-[#1e3a8a]" />
        <h3 className="text-xl font-black text-gray-900">
          Resolution Timeline
        </h3>
      </div>

      <div className="relative pl-4 space-y-8">
        {/* Vertical Line */}
        <div className="absolute left-7 top-2 bottom-4 w-0.5 bg-gray-100" />

        {/* Step: Resolved (Pending future) */}
        <div className="relative flex gap-6 opacity-40">
          <div className="w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shrink-0 z-10 mt-0.5">
            <Check size={12} className="text-gray-300" />
          </div>
          <div>
            <h4 className="text-sm font-black text-gray-500">Resolved</h4>
            <p className="text-xs font-bold text-gray-400 mt-0.5">Pending</p>
          </div>
        </div>

        {/* Step: In Progress (Current) */}
        <div className="relative flex gap-6">
          <div className="absolute w-0.5 bg-amber-500 h-[calc(100%+2rem)] left-[11px] top-6" />
          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center shrink-0 z-10 mt-0.5 ring-4 ring-amber-50">
            <RefreshCcw size={12} className="text-white" />
          </div>
          <div>
            <h4 className="text-sm font-black text-gray-900">In Progress</h4>
            <p className="text-xs font-medium text-gray-500 mt-1">
              Feb 24, 11:30 AM
            </p>
            <p className="text-xs font-bold text-[#1e3a8a] mt-1">
              Assigned to: Maintenance
            </p>
          </div>
        </div>

        {/* Step: Complaint Opened (Past) */}
        <div className="relative flex gap-6">
          <div className="w-6 h-6 rounded-full bg-[#1e3a8a] flex items-center justify-center shrink-0 z-10 mt-0.5 ring-4 ring-blue-50">
            <CheckCircle2 size={12} className="text-white" />
          </div>
          <div>
            <h4 className="text-sm font-black text-gray-900">
              Complaint Opened
            </h4>
            <p className="text-xs font-medium text-gray-500 mt-1">
              Feb 24, 10:45 AM
            </p>
            <p className="text-xs font-medium text-gray-400 mt-1 italic">
              "System generated entry"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResolutionTimeline;
