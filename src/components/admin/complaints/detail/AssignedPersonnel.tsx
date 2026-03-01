import { Mail } from "lucide-react";

interface AssignedPersonnelProps {
  assignedTo?: string;
  assignedUser?: {
    full_name?: string;
    first_name?: string;
    last_name?: string;
    role: string;
  };
}

function getAssignedUserName(u: NonNullable<AssignedPersonnelProps["assignedUser"]>): string {
  if (u.full_name?.trim()) return u.full_name.trim();
  const first = (u.first_name ?? "").trim();
  const last = (u.last_name ?? "").trim();
  return `${first} ${last}`.trim() || "Staff";
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

  const displayName = getAssignedUserName(assignedUser);
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

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
              {displayName}
            </h4>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              {assignedUser.role}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-[#1e3a8a] hover:bg-blue-50 transition-colors"
          aria-label="Email assigned staff"
        >
          <Mail size={18} />
        </button>
      </div>
    </div>
  );
};

export default AssignedPersonnel;
