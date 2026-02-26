import { MoreVertical } from "lucide-react";

const TrendsTimeChart = () => {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 flex flex-col h-[360px]">
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-black text-gray-900">Trends over Time</h3>
          <p className="text-sm font-medium text-gray-400 mt-1">
            Monthly issue volume progression
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-900 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Area / Line Chart visualization matching the wavy mockup */}
      <div className="flex-1 relative w-full flex flex-col justify-end">
        {/* SVG Curve */}
        <div className="absolute inset-0 top-12 left-0 right-0 overflow-hidden pointer-events-none">
          <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="w-full h-full"
            style={{ width: "100%", height: "100%" }}
          >
            <path
              d="M0 35 C 10 30, 20 10, 30 15 C 40 20, 50 40, 60 35 C 70 30, 80 0, 90 20 C 95 30, 98 40, 100 15"
              fill="none"
              stroke="#3b82f6" /* Tailwind blue-500 */
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {/* X Axis Labels */}
        <div className="flex items-center justify-between px-2 pt-4 border-t border-transparent z-10">
          {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"].map((month) => (
            <span
              key={month}
              className="text-xs font-bold text-gray-500 uppercase tracking-wider"
            >
              {month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendsTimeChart;
