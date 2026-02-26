import { useState } from "react";
import { ChevronLeft, ChevronRight, Trash2, KeyRound } from "lucide-react";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "STUDENT" | "STAFF" | "ADMIN";
  department_id?: string;
  status: "Active" | "Inactive";
  avatar_url?: string;
  lastLogin?: string;
}

interface UsersTableProps {
  users: User[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  onStatusToggle: (userId: string, currentStatus: string) => void;
}

const UsersTable = ({
  users,
  totalCount,
  currentPage,
  pageSize,
  isLoading,
  onPageChange,
  onStatusToggle,
}: UsersTableProps) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelectAll = () => {
    if (selectedIds.size === users.length && users.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(users.map((u) => u.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const getRoleBadge = (role: User["role"]) => {
    switch (role) {
      case "STUDENT":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "STAFF":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "ADMIN":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  const getAvatarUrl = (user: User) => {
    if (user.avatar_url) return user.avatar_url;
    const name = user.first_name || user.email;
    return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      name,
    )}&backgroundColor=e2e8f0`;
  };

  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm overflow-hidden mb-8">
      {/* Selection Action Bar */}
      {selectedIds.size > 0 && (
        <div className="bg-[#f8fafc] px-8 py-4 border-b border-gray-100 flex items-center gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="text-sm font-bold text-[#1e3a8a]">
            {selectedIds.size} users selected
          </span>
          <div className="w-px h-4 bg-gray-300" />
          <div className="flex items-center gap-4">
            <button
              disabled={isLoading}
              className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-red-600 transition-colors disabled:opacity-50"
            >
              <Trash2 size={16} /> Delete
            </button>
            <button
              disabled={isLoading}
              className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
            >
              <KeyRound size={16} /> Reset Password
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto min-h-[400px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-5 px-8 w-12 text-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#1e3a8a] focus:ring-[#1e3a8a] cursor-pointer"
                  checked={
                    selectedIds.size === users.length && users.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="py-5 px-4 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap min-w-[200px]">
                PROFILE
              </th>
              <th className="py-5 px-4 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                EMAIL
              </th>
              <th className="py-5 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                ROLE
              </th>
              <th className="py-5 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                DEPARTMENT
              </th>
              <th className="py-5 px-8 text-xs font-black text-gray-400 uppercase tracking-widest text-right">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-gray-500 font-medium"
                >
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-gray-500 font-medium"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className={`transition-colors group ${
                    selectedIds.has(user.id)
                      ? "bg-blue-50/30"
                      : "hover:bg-slate-50/50"
                  }`}
                >
                  <td className="py-4 px-8 w-12 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-[#1e3a8a] focus:ring-[#1e3a8a] cursor-pointer"
                      checked={selectedIds.has(user.id)}
                      onChange={() => toggleSelect(user.id)}
                    />
                  </td>
                  <td className="py-4 px-4 min-w-[200px]">
                    <div className="flex items-center gap-4">
                      <img
                        src={getAvatarUrl(user)}
                        alt={user.first_name || user.email}
                        className="w-10 h-10 rounded-full bg-slate-100 border border-gray-200 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          const initial = user.first_name || "?";
                          target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(initial)}&backgroundColor=e2e8f0`;
                        }}
                      />
                      <span className="text-sm font-black text-gray-900 leading-tight">
                        {user.first_name} {user.last_name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                      {user.email}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest ${getRoleBadge(
                        user.role,
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-bold text-gray-600">
                      {user.department_id ? "Linked" : "N/A"}
                    </span>
                  </td>
                  <td className="py-4 px-8 text-right">
                    {/* Status Toggle */}
                    <div className="flex items-center justify-end gap-3">
                      <button
                        disabled={isLoading}
                        onClick={() => onStatusToggle(user.id, user.status)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-offset-2 disabled:opacity-50 ${
                          user.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            user.status === "Active"
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                        />
                      </button>
                      <span
                        className={`text-xs font-bold w-12 text-left ${
                          user.status === "Active"
                            ? "text-emerald-600"
                            : "text-gray-400"
                        }`}
                      >
                        {user.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">
          Showing{" "}
          <span className="font-bold text-gray-900">
            {totalCount > 0 ? (currentPage - 1) * pageSize + 1 : 0}
          </span>{" "}
          to{" "}
          <span className="font-bold text-gray-900">
            {Math.min(currentPage * pageSize, totalCount)}
          </span>{" "}
          of <span className="font-bold text-gray-900">{totalCount}</span> users
        </span>
        <div className="flex items-center gap-1">
          <button
            disabled={currentPage === 1 || isLoading}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            <ChevronLeft size={16} />
          </button>

          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1e3a8a] text-white font-bold text-sm shadow-sm transition-colors">
            {currentPage}
          </button>

          <button
            disabled={
              currentPage === totalPages || totalPages === 0 || isLoading
            }
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
