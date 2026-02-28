import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { getCategoryStats, type CategoryStat } from "../../api/analytics";

const ComplaintsCategoryChart = () => {
  const [data, setData] = useState<CategoryStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getCategoryStats();
        setData(stats);
      } catch (error) {
        console.error("Failed to fetch category stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const getShortName = (name: string) => {
    const map: Record<string, string> = {
      IT_AND_NETWORK: "IT",
      FACILITY_AND_MAINTENANCE: "FAC",
      ACADEMIC_AFFAIRS: "ACAD",
      STUDENT_SERVICES: "STUD",
      REGISTRAR_OFFICE: "REG",
      ACADEMIC_RESOURCES: "RES",
      OTHER: "OTH",
    };
    return map[name] || name.substring(0, 4).toUpperCase();
  };

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 flex flex-col h-[360px]">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-gray-900">
            Complaints per Category
          </h3>
          <p className="text-sm font-medium text-gray-400 mt-1">
            Volume by system category
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-900 transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="flex-1 flex items-end justify-between gap-4 px-2 pb-4 pt-8">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center text-gray-300 font-bold">
            Loading...
          </div>
        ) : (
          data.map((item) => (
            <div
              key={item.category}
              className="flex-1 flex flex-col items-center gap-4 h-full group"
            >
              <div className="relative w-full h-full flex items-end justify-center">
                <div
                  className="w-full bg-[#1e3a8a]/10 rounded-t-xl transition-all duration-500 group-hover:bg-[#1e3a8a]/20"
                  style={{ height: `${(item.count / maxCount) * 100}%` }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] font-black px-2 py-1 rounded mb-2 whitespace-nowrap">
                    {item.count} items
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                {getShortName(item.category)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ComplaintsCategoryChart;
