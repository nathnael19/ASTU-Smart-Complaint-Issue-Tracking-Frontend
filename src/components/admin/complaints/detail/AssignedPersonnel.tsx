import { Mail } from "lucide-react";

const AssignedPersonnel = () => {
  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-6 mb-6">
      <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">
        Assigned Personnel
      </h3>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[1rem] bg-emerald-100 flex items-center justify-center shrink-0">
            {/* Using initials as avatar for this one like in mockup "KC" or similar */}
            <span className="text-sm font-black text-emerald-700 tracking-tighter">
              KC
            </span>
          </div>
          <div>
            <h4 className="text-sm font-black text-gray-900 leading-none mb-1.5">
              Kevin Chen
            </h4>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Lead ICT Infrastructure
            </p>
          </div>
        </div>

        <button className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-[#1e3a8a] hover:bg-blue-50 transition-colors">
          <Mail size={18} />
        </button>
      </div>
    </div>
  );
};

export default AssignedPersonnel;
