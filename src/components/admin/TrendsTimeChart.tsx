import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { getTrendStats, type TrendStat } from "../../api/analytics";

const TrendsTimeChart = () => {
  const [data, setData] = useState<TrendStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getTrendStats();
        setData(stats);
      } catch (error) {
        console.error("Failed to fetch trend stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Simple path generation for the trend line
  const generatePath = () => {
    if (data.length < 2) return "";
    const maxVal = Math.max(...data.map((d) => d.count), 1);
    const width = 100;
    const height = 40;
    const step = width / (data.length - 1);

    let path = `M 0 ${height - (data[0].count / maxVal) * height}`;

    for (let i = 1; i < data.length; i++) {
      const x = i * step;
      const y = height - (data[i].count / maxVal) * height;
      path += ` L ${x} ${y}`;
    }
    return path;
  };

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

      {/* Area / Line Chart visualization */}
      <div className="flex-1 relative w-full flex flex-col justify-end">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-bold">
            Loading...
          </div>
        ) : (
          <>
            {/* SVG Curve */}
            <div className="absolute inset-0 top-12 left-0 right-0 overflow-hidden pointer-events-none">
              <svg
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
                className="w-full h-full"
                style={{ width: "100%", height: "100%" }}
              >
                <path
                  d={generatePath()}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>

            {/* X Axis Labels */}
            <div className="flex items-center justify-between px-2 pt-4 border-t border-transparent z-10">
              {data.map((item) => (
                <div
                  key={item.month}
                  className="flex flex-col items-center group relative"
                >
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    {item.month}
                  </span>
                  <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] font-black px-2 py-1 rounded whitespace-nowrap pointer-events-none">
                    {item.count} cases
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrendsTimeChart;
