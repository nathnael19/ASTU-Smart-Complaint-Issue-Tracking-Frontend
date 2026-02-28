import { Search, Filter, Download, UserPlus } from "lucide-react";
import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import UsersTable from "../../components/admin/users/UsersTable";
import { Link } from "react-router-dom";
import { deleteUser } from "../../api/users";
import { useUsers } from "../../hooks/useUsers";
import { invalidateCache } from "../../lib/cache";

const AdminUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 10;

  const {
    data: usersData,
    loading: isLoading,
    error,
    refetch,
  } = useUsers({
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
    search: searchQuery || undefined,
  });

  const users = usersData?.data || [];
  const totalCount = usersData?.total || 0;

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      invalidateCache("users:list*");
      if (users.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        refetch();
      }
    } catch (error: any) {
      alert(error.message || "Failed to delete user.");
      console.error("Failed to delete user:", error);
    }
  };

  return (
    <AdminLayout>
      <div className="p-8 lg:p-12 max-w-[1600px] mx-auto min-h-[calc(100vh-5rem)] flex flex-col">
        {/* Page Top Actions (mimicking Top-Nav contextual actions) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1); // Reset to page 1 on search
                }}
                placeholder="Search users by name or email..."
                className="w-full bg-white border border-gray-200 shadow-sm rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-[#1e3a8a]/30 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-medium"
              />
            </div>
          </div>

          <Link
            to="/admin/users/create"
            className="bg-[#1e3a8a] text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-900/20 hover:bg-blue-950 transition-colors text-sm shrink-0"
          >
            <UserPlus size={18} />
            Add New User
          </Link>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 mt-2">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
              User Management
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Manage all university staff, students, and system administrators.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="bg-white text-gray-700 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-sm">
              <Filter size={16} />
              Filters
            </button>
            <button className="bg-white text-gray-700 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-sm">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>

        {/* Error message when API fails */}
        {error && (
          <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-6 py-4 text-amber-800">
            <p className="font-semibold">{error}</p>
            <p className="mt-1 text-sm text-amber-700">
              If you are an admin, try logging out and back in, or check that
              the backend is running at the API URL.
            </p>
          </div>
        )}

        {/* Data Table */}
        <UsersTable
          users={users}
          totalCount={totalCount}
          currentPage={currentPage}
          pageSize={pageSize}
          isLoading={isLoading}
          onPageChange={setCurrentPage}
          onDeleteUser={handleDeleteUser}
        />

        {/* Footer */}
        <footer className="mt-auto pt-8 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-400">
            © 2024 Adama Science and Technology University - Admin User
            Management Portal. All rights reserved.
          </span>
        </footer>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
