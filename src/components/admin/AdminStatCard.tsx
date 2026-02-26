import type { LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  trendText: string;
  trendColor: string;
}

const AdminStatCard = ({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
  trendText,
  trendColor,
}: AdminStatCardProps) => {
  return (
    <div className="bg-white p-8 rounded-[1.5rem] border border-gray-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group h-44">
      <div className="flex justify-between items-start">
        <p className="text-sm font-bold text-gray-500">{label}</p>
        <div
          className={`${bgColor} ${color} p-2 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
        >
          <Icon size={20} />
        </div>
      </div>
      <div>
        <h3 className="text-4xl font-black text-gray-900 leading-tight mt-2 mb-2 tracking-tight">
          {value}
        </h3>
        <p className="text-sm font-medium text-gray-400">
          <span className={`${trendColor} font-bold mr-1`}>
            {trendText.split(" ")[0]}
          </span>
          {trendText.substring(trendText.indexOf(" ") + 1)}
        </p>
      </div>
    </div>
  );
};

export default AdminStatCard;
