import { Clock, Edit2, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface TicketActionsCardProps {
  status: string;
  assignedStaff: {
    name: string;
    avatar?: string;
  };
  priority: "HIGH" | "MEDIUM" | "LOW";
  onStatusChange?: (status: string) => void;
  onPriorityChange?: (priority: "HIGH" | "MEDIUM" | "LOW") => void;
  slaDeadline?: string;
}

const TicketActionsCard = ({
  status,
  assignedStaff,
  priority,
  onStatusChange,
  onPriorityChange,
  slaDeadline,
}: TicketActionsCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getPriorityStyles = (priority: string, isSelected: boolean) => {
    if (!isSelected) {
      return "bg-white text-gray-600 border-gray-200 hover:border-gray-300";
    }
    switch (priority) {
      case "HIGH":
        return "bg-red-50 text-red-700 border-red-200";
      case "MEDIUM":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "LOW":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 space-y-6">
      <h3 className="text-xl font-black text-gray-900">Ticket Actions</h3>

      {/* Current Status */}
      <div>
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
          Current Status
        </label>
        <div className="relative">
          <select
            value={status}
            onChange={(e) => onStatusChange?.(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 focus:border-blue-200 appearance-none cursor-pointer"
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Resolved</option>
            <option>Closed</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Assigned Staff */}
      <div>
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
          Assigned Staff
        </label>
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-gray-200">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center border-2 border-white shadow-sm">
            <span className="text-orange-600 font-black text-sm">
              {getInitials(assignedStaff.name)}
            </span>
          </div>
          <span className="flex-1 text-sm font-black text-gray-900">
            {assignedStaff.name}
          </span>
          <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Edit2 size={16} />
          </button>
        </div>
      </div>

      {/* Priority Level */}
      <div>
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
          Priority Level
        </label>
        <div className="flex gap-2">
          {(["HIGH", "MEDIUM", "LOW"] as const).map((level) => (
            <button
              key={level}
              onClick={() => onPriorityChange?.(level)}
              className={cn(
                "flex-1 py-2.5 px-3 rounded-xl text-xs font-black uppercase border transition-all",
                getPriorityStyles(level, priority === level),
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* SLA Deadline */}
      {slaDeadline && (
        <div>
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
            SLA Deadline
          </label>
          <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-200">
            <Clock size={16} className="text-red-600 shrink-0" />
            <span className="text-sm font-black text-red-700">{slaDeadline}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketActionsCard;
