import { Mail } from "lucide-react";

interface AssignedPersonnelProps {
  assignedTo?: string;
  assignedUser?: {
    full_name: string;
    role: string;
  };
}

const AssignedPersonnel = ({
  assignedTo,
  assignedUser,
}: AssignedPersonnelProps) => {
  if (!assignedTo || !assignedUser) {
    return (
      <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-6 mb-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">
          Assigned Personnel
        </h3>
        <p className="text-sm font-bold text-gray-400 italic text-center py-4">
          No personnel assigned yet
        </p>
      </div>
    );
  }

  const initials = assignedUser.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-6 mb-6">
      <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">
        Assigned Personnel
      </h3>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-[1rem] bg-emerald-100 flex items-center justify-center shrink-0">
            <span className="text-sm font-black text-emerald-700 tracking-tighter">
              {initials}
            </span>
          </div>
          <div>
            <h4 className="text-sm font-black text-gray-900 leading-none mb-1.5">
              {assignedUser.full_name}
            </h4>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              {assignedUser.role}
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
