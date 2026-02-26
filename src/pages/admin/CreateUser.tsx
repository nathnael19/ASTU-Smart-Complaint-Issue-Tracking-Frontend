import {
  ChevronRight,
  UserPlus,
  X,
  User,
  Mail,
  Briefcase,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import { useState } from "react";

const AdminCreateUser = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"Active" | "Inactive">("Active");

  return (
    <AdminLayout>
      <div className="p-8 lg:p-12 max-w-[1000px] mx-auto min-h-[calc(100vh-5rem)] flex flex-col pb-24">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-8 border-b border-gray-100 pb-6">
          <Link
            to="/admin/dashboard"
            className="hover:text-gray-900 transition-colors"
          >
            Home
          </Link>
          <ChevronRight size={14} />
          <Link
            to="/admin/users"
            className="hover:text-gray-900 transition-colors"
          >
            Users
          </Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-bold">Add New User</span>
        </div>

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
            Add New User
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Create a new account for a student, staff member, or administrator.
          </p>
        </div>

        {/* Create User Form Card */}
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-10">
            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-gray-50">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-[#1e3a8a]">
                <UserPlus size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">
                  User Information
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Complete the details below
                </p>
              </div>
            </div>

            <form className="space-y-8">
              {/* Name Rows */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-900 uppercase tracking-widest block pl-1">
                    First Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Abebe"
                      className="w-full bg-slate-50 border border-transparent rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-900 uppercase tracking-widest block pl-1">
                    Last Name
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. Kebede"
                      className="w-full bg-slate-50 border border-transparent rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900 uppercase tracking-widest block pl-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    placeholder="example@astu.edu.et"
                    className="w-full bg-slate-50 border border-transparent rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Role and Department */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-900 uppercase tracking-widest block pl-1">
                    User Role
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
                      <Briefcase size={18} />
                    </div>
                    <select className="w-full bg-slate-50 border border-transparent rounded-2xl py-3.5 pl-11 pr-10 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold appearance-none cursor-pointer">
                      <option value="STUDENT">Student</option>
                      <option value="STAFF">Staff</option>
                      <option value="ADMIN">Administrator</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-black text-gray-900 uppercase tracking-widest block pl-1">
                    Department
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
                      <Building2 size={18} />
                    </div>
                    <select className="w-full bg-slate-50 border border-transparent rounded-2xl py-3.5 pl-11 pr-10 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold appearance-none cursor-pointer">
                      <option value="Software Engineering">
                        Software Engineering
                      </option>
                      <option value="IT Infrastructure">
                        IT Infrastructure
                      </option>
                      <option value="Civil Engineering">
                        Civil Engineering
                      </option>
                      <option value="Electrical Engineering">
                        Electrical Engineering
                      </option>
                      <option value="Mechanical Engineering">
                        Mechanical Engineering
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Initial Status */}
              <div className="pt-4 pb-6 border-b border-gray-50 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">
                    Initial Status
                  </h4>
                  <p className="text-xs font-medium text-gray-400 mt-1">
                    Automatically activate account upon creation
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setStatus(status === "Active" ? "Inactive" : "Active")
                    }
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-offset-2 ${
                      status === "Active" ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        status === "Active" ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span
                    className={`text-xs font-black uppercase tracking-widest ${
                      status === "Active" ? "text-emerald-600" : "text-gray-400"
                    }`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/admin/users")}
                  className="px-8 py-3.5 rounded-2xl font-black text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-all flex items-center gap-2"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-10 py-3.5 rounded-2xl bg-[#1e3a8a] text-white font-black text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-950 transition-all flex items-center gap-2 group"
                >
                  <CheckCircle2
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                  Create User Account
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-12 flex items-center justify-center">
          <span className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">
            ASTU SMART TRACKING SYSTEM • 2024
          </span>
        </footer>
      </div>
    </AdminLayout>
  );
};

export default AdminCreateUser;
