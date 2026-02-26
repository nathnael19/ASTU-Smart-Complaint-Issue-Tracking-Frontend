import { ChevronDown } from "lucide-react";

const WeeklyTicketVolumeChart = () => {
  // Sample data for the chart
  const chartData = [
    { day: "MON", value: 8 },
    { day: "TUE", value: 12 },
    { day: "WED", value: 15 },
    { day: "THU", value: 18 },
    { day: "FRI", value: 22 },
    { day: "SAT", value: 20 },
    { day: "SUN", value: 10 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-gray-900">Weekly Ticket Volume</h3>
        <div className="flex items-center gap-2">
          <select className="text-sm font-bold text-gray-600 bg-transparent border-none focus:outline-none cursor-pointer appearance-none pr-6">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
          </select>
          <ChevronDown size={16} className="text-gray-400 -ml-4 pointer-events-none" />
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 flex items-end justify-between gap-2">
        {chartData.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="relative w-full h-full flex items-end">
              <div
                className="w-full bg-blue-600 rounded-t-lg transition-all hover:bg-blue-700 group cursor-pointer"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                  minHeight: "8px",
                }}
                title={`${item.value} tickets`}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                  {item.value}
                </div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-gray-400 uppercase mt-2">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyTicketVolumeChart;
