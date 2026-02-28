import {
  ChevronRight,
  UserPlus,
  X,
  User,
  Mail,
  Building2,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { adminCreateUser } from "../../api/users";
import { useDepartments } from "../../hooks/useDepartments";

const AdminCreateUser = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [departments, setDepartments] = useState<any[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: departmentsData, loading: isDepartmentsLoading } =
    useDepartments();

  useEffect(() => {
    if (departmentsData && departmentsData.length > 0) {
      setDepartments(departmentsData);
      if (!departmentId) {
        setDepartmentId(departmentsData[0].id);
      }
    }
  }, [departmentsData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await adminCreateUser({
        email,
        full_name: `${firstName} ${lastName}`,
        role: "STAFF",
        department_id: departmentId,
      });
      navigate("/admin/users");
    } catch (err: any) {
      setError(err.message || "Failed to invite staff member.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Invite Staff Member
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Invite a new staff member to the system. They will receive an email
            to set their password.
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
                  Staff Information
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                  Complete the details below
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit}>
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
                      required
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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
                      required
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="e.g. Kebede"
                      className="w-full bg-slate-50 border border-transparent rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Email Address*/}
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900 uppercase tracking-widest block pl-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@astu.edu.et"
                    className="w-full bg-slate-50 border border-transparent rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Department */}
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-900 uppercase tracking-widest block pl-1">
                  Department
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1e3a8a] transition-colors">
                    <Building2 size={18} />
                  </div>
                  <select
                    value={departmentId}
                    onChange={(e) => setDepartmentId(e.target.value)}
                    disabled={isDepartmentsLoading}
                    className="w-full bg-slate-50 border border-transparent rounded-2xl py-3.5 pl-11 pr-10 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold appearance-none cursor-pointer disabled:opacity-50"
                  >
                    {isDepartmentsLoading ? (
                      <option>Loading departments...</option>
                    ) : departments.length > 0 ? (
                      departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))
                    ) : (
                      <option value="">No departments available</option>
                    )}
                  </select>
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
                  disabled={isSubmitting}
                  className="px-10 py-3.5 rounded-2xl bg-[#1e3a8a] text-white font-black text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-950 transition-all flex items-center gap-2 group disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <CheckCircle2
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                  )}
                  {isSubmitting ? "Inviting..." : "Invite Staff Member"}
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
