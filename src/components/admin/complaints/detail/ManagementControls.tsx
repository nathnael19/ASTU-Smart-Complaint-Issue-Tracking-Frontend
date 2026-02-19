import { ChevronDown, Loader2 } from "lucide-react";
import { useState } from "react";
import { updateComplaint } from "../../../../api/complaints";

interface ManagementControlsProps {
  complaintId: string;
  currentStatus: string;
  currentPriority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
}

const ManagementControls = ({
  complaintId,
  currentStatus,
  currentPriority,
}: ManagementControlsProps) => {
  const [status, setStatus] = useState(currentStatus);
  const [priority, setPriority] = useState<
    "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  >(currentPriority);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setError(null);
    try {
      await updateComplaint(complaintId, { status, priority });
      window.location.reload(); // Simple refresh to show new state
    } catch (err: any) {
      setError(err.message || "Failed to update ticket");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-[#1e3a8a] rounded-[1.5rem] shadow-sm p-6 text-white mb-6">
      <h3 className="text-sm font-black uppercase tracking-widest mb-6 text-blue-100">
        Management Controls
      </h3>

      <div className="space-y-6">
        {/* Status Dropdown */}
        <div>
          <label className="block text-xs font-bold text-blue-200 mb-2">
            Change Status
          </label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full appearance-none bg-[#1e40af] border border-blue-700/50 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-300 pointer-events-none"
            />
          </div>
        </div>

        {/* Priority Level Toggle */}
        <div>
          <label className="block text-xs font-bold text-blue-200 mb-2">
            Priority Level
          </label>
          <div className="flex bg-[#1e40af] rounded-xl border border-blue-700/50 p-1">
            {["LOW", "MEDIUM", "HIGH"].map((p) => (
              <button
                key={p}
                onClick={() =>
                  setPriority(p as "LOW" | "MEDIUM" | "HIGH" | "CRITICAL")
                }
                className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider transition-colors rounded-lg ${
                  priority === p
                    ? "bg-amber-500 text-white shadow-sm"
                    : "text-blue-200 hover:text-white"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-xs font-bold text-red-300">{error}</p>}

        {/* Update Button */}
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="w-full bg-white text-[#1e3a8a] py-3.5 rounded-xl font-black text-sm hover:bg-blue-50 transition-colors shadow-lg mt-2 flex items-center justify-center gap-2"
        >
          {isUpdating && <Loader2 size={16} className="animate-spin" />}
          Update Ticket Status
        </button>
      </div>
    </div>
  );
};

export default ManagementControls;
