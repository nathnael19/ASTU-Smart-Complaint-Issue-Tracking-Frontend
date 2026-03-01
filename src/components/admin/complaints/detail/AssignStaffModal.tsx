import { useState, useEffect } from "react";
import { X, UserPlus, Loader2 } from "lucide-react";
import { getUsers } from "../../../../api/users";
import { updateComplaint } from "../../../../api/complaints";

interface StaffUser {
  id: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  email?: string;
  role?: string;
  department_id?: string;
}

interface AssignStaffModalProps {
  complaintId: string;
  ticketNumber: string;
  departmentId?: string | null;
  currentAssignedTo?: string | null;
  onClose: () => void;
  onAssigned: () => void;
}

function getDisplayName(u: StaffUser): string {
  const first = (u.first_name ?? "").trim();
  const last = (u.last_name ?? "").trim();
  if (first || last) return `${first} ${last}`.trim();
  return (u.full_name ?? u.email ?? "Unknown").trim() || "Unknown";
}

const AssignStaffModal = ({
  complaintId,
  ticketNumber,
  departmentId,
  currentAssignedTo,
  onClose,
  onAssigned,
}: AssignStaffModalProps) => {
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    setLoading(true);
    getUsers({
      role: "STAFF",
      status: "Active",
      department_id: departmentId || undefined,
      limit: 100,
    })
      .then((res) => {
        if (!cancelled) {
          const list = (res.data ?? []).filter((u) => u.role === "STAFF");
          setStaff(list);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e?.message ?? "Failed to load staff.");
          setStaff([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [departmentId]);

  const handleAssign = async (staffId: string) => {
    setAssigning(staffId);
    setError(null);
    try {
      await updateComplaint(complaintId, { assigned_to: staffId });
      onAssigned();
      onClose();
    } catch (e: any) {
      setError(e?.message ?? "Failed to assign staff.");
    } finally {
      setAssigning(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-[#1e3a8a]" />
            </div>
            <div>
              <h2 className="text-lg font-black text-gray-900">Assign Staff</h2>
              <p className="text-xs text-gray-500">
                Ticket {ticketNumber}
                {departmentId
                  ? " · Showing staff in same department/category"
                  : " · Showing all staff"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-700">
              {error}
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-12 gap-2 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm font-medium">Loading staff...</span>
            </div>
          ) : staff.length === 0 ? (
            <p className="text-sm text-gray-500 py-8 text-center">
              No staff found
              {departmentId
                ? " in this department. Try assigning without a department filter or add staff to this department."
                : "."}
            </p>
          ) : (
            <ul className="space-y-2">
              {staff.map((user) => {
                const isCurrent = user.id === currentAssignedTo;
                const isAssigning = assigning === user.id;
                return (
                  <li
                    key={user.id}
                    className="flex items-center justify-between gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-900 truncate">
                        {getDisplayName(user)}
                      </p>
                      {user.email && (
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      )}
                      {isCurrent && (
                        <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600 uppercase">
                          Currently assigned
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      disabled={isCurrent || !!assigning}
                      onClick={() => handleAssign(user.id)}
                      className="shrink-0 px-4 py-2 rounded-xl bg-[#1e3a8a] text-white text-sm font-bold hover:bg-blue-950 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isAssigning ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : null}
                      {isCurrent ? "Assigned" : "Assign"}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignStaffModal;
