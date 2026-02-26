import { useState } from "react";
import { ChevronLeft, ChevronRight, Trash2, KeyRound } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "STAFF" | "ADMIN";
  department: string;
  lastLogin: string;
  status: "Active" | "Inactive";
  avatarSeed: string;
}

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Abebe Kebede",
      email: "abebe.k@astu.edu.et",
      role: "STUDENT",
      department: "Software Engineering",
      lastLogin: "2 hours ago",
      status: "Active",
      avatarSeed: "abebe",
    },
    {
      id: "2",
      name: "Martha Tadesse",
      email: "martha.t@astu.edu.et",
      role: "STAFF",
      department: "Civil Engineering",
      lastLogin: "Yesterday, 4:30 PM",
      status: "Active",
      avatarSeed: "martha",
    },
    {
      id: "3",
      name: "Samuel Bekele",
      email: "samuel.b@astu.edu.et",
      role: "ADMIN",
      department: "IT Infrastructure",
      lastLogin: "3 days ago",
      status: "Inactive",
      avatarSeed: "samuel",
    },
    {
      id: "4",
      name: "Yonas Alemu",
      email: "yonas.a@astu.edu.et",
      role: "STUDENT",
      department: "Electrical Engineering",
      lastLogin: "5 mins ago",
      status: "Active",
      avatarSeed: "yonas",
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(["2", "3", "4"]),
  );

  const toggleSelectAll = () => {
    if (selectedIds.size === users.length) {
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

  const toggleStatus = (id: string) => {
    setUsers(
      users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            status: user.status === "Active" ? "Inactive" : "Active",
          };
        }
        return user;
      }),
    );
  };

  const getRoleBadge = (role: User["role"]) => {
    switch (role) {
      case "STUDENT":
        return "bg-blue-100 text-blue-700";
      case "STAFF":
        return "bg-amber-100 text-amber-700";
      case "ADMIN":
        return "bg-indigo-100 text-indigo-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
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
            <button className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-red-600 transition-colors">
              <Trash2 size={16} /> Delete
            </button>
            <button className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors">
              <KeyRound size={16} /> Reset Password
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
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
              <th className="py-5 px-4 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
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
              <th className="py-5 px-4 text-xs font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">
                LAST LOGIN
              </th>
              <th className="py-5 px-8 text-xs font-black text-gray-400 uppercase tracking-widest">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {users.map((user) => (
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
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatarSeed}&backgroundColor=f1f5f9`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full bg-slate-100 border border-gray-200"
                    />
                    <span className="text-sm font-black text-gray-900 leading-tight">
                      {user.name}
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
                  <span className="text-sm font-medium text-gray-500">
                    {user.department}
                  </span>
                </td>
                <td className="py-4 px-4 min-w-[120px]">
                  <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                    {user.lastLogin}
                  </span>
                </td>
                <td className="py-4 px-8">
                  {/* Status Toggle */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleStatus(user.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-offset-2 ${
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
                      className={`text-xs font-bold ${
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
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">
          Showing <span className="font-bold text-gray-900">1</span> to{" "}
          <span className="font-bold text-gray-900">10</span> of{" "}
          <span className="font-bold text-gray-900">3,420</span> users
        </span>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1e3a8a] text-white font-bold text-sm shadow-sm transition-colors">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors font-medium text-sm">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors font-medium text-sm">
            3
          </button>
          <span className="px-1 text-gray-400">...</span>
          <button className="w-10 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors font-medium text-sm">
            342
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
