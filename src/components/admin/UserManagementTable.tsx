import { Edit3, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { getUsers } from "../../api/users";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "STUDENT" | "STAFF" | "ADMIN";
  department_id?: string;
  status: "Active" | "Inactive";
  departments?: { name: string };
}

const UserManagementTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await getUsers({
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
      });
      setUsers(response.data || []);
      setTotalCount(response.total || 0);
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

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

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden mt-8">
      {/* Table Header Section */}
      <div className="p-8 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-xl font-black text-gray-900">User Management</h3>
        <button className="text-sm font-bold text-[#1e3a8a] py-2 px-4 rounded-xl hover:bg-blue-50 transition-colors">
          View All Users
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-5 px-8 text-xs font-black text-gray-400 uppercase tracking-wider w-[35%]">
                User Name
              </th>
              <th className="py-5 px-8 text-xs font-black text-gray-400 uppercase tracking-wider w-[15%]">
                Role
              </th>
              <th className="py-5 px-8 text-xs font-black text-gray-400 uppercase tracking-wider w-[25%]">
                Department
              </th>
              <th className="py-5 px-8 text-xs font-black text-gray-400 uppercase tracking-wider w-[15%]">
                Status
              </th>
              <th className="py-5 px-8 text-xs font-black text-gray-400 uppercase tracking-wider text-right w-[10%]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-gray-400 font-medium"
                >
                  Loading users...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-red-500 font-medium"
                >
                  {error}
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2 text-gray-400">
                    <Info size={24} />
                    <p>No users found</p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="py-4 px-8">
                    <div className="flex items-center gap-4">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.first_name}&backgroundColor=f1f5f9`}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="w-10 h-10 rounded-full bg-slate-100"
                      />
                      <div>
                        <p className="text-sm font-black text-gray-900">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-xs font-medium text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-8">
                    <span
                      className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${getRoleBadge(
                        user.role,
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-8">
                    <span className="text-sm font-medium text-gray-500">
                      {user.departments?.name || "N/A"}
                    </span>
                  </td>
                  <td className="py-4 px-8">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          user.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <span className="text-sm font-medium text-gray-500">
                        {user.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-8 text-right">
                    <button className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-xl hover:bg-gray-100">
                      <Edit3 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 border-t border-gray-100 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-400">
          Showing {totalCount > 0 ? (currentPage - 1) * pageSize + 1 : 0} to{" "}
          {Math.min(currentPage * pageSize, totalCount)} of {totalCount} users
        </span>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1 || isLoading}
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            <ChevronLeft size={16} />
            Previous
          </button>
          <button
            disabled={
              currentPage === totalPages || totalPages === 0 || isLoading
            }
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;
