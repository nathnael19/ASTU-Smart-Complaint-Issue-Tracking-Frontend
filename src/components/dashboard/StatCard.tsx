import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

const StatCard = ({
  label,
  value,
  icon: Icon,
  color,
  bgColor,
}: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-[1.5rem] border border-gray-100 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow group">
      <div className="space-y-1">
        <p className="text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-gray-500 transition-colors">
          {label}
        </p>
        <h3 className="text-3xl font-black text-gray-900 leading-tight">
          {value}
        </h3>
      </div>
      <div
        className={`${bgColor} ${color} p-3 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300`}
      >
        <Icon size={24} />
      </div>
    </div>
  );
};

export default StatCard;
