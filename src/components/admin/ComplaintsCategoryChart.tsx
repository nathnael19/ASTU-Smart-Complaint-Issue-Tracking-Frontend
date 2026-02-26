import { MoreVertical } from "lucide-react";

const ComplaintsCategoryChart = () => {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 flex flex-col h-[360px]">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-gray-900">
            Complaints per Category
          </h3>
          <p className="text-sm font-medium text-gray-400 mt-1">
            Volume by academic department
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-900 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Chart Visualization Placeholder - Emulating a minimalist bar chart from the mockup */}
      <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-4 pt-8">
        {/* We won't render visible bars since the mockup shows an empty chart area or we can render subtle gray bars if needed. The mockup shows no bars actually, just labels at the bottom, but we'll add subtle bars for demonstration. */}
        {["CSE", "MECH", "CIVIL", "ELEC", "ARCH", "BUSI"].map((dept) => {
          return (
            <div
              key={dept}
              className="flex-1 flex flex-col items-center gap-4 h-full"
            >
              <div className="relative w-full h-full flex items-end justify-center">
                {/* In the mockup, there are no bars visible, just empty space. Sticking to mockup closely. */}
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                {dept}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComplaintsCategoryChart;
