import { User, Mail, Lock, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

interface RegisterFormData {
  fullName: string;
  email: string;
  role: string;
  department: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}

interface RegisterFormProps {
  formData: RegisterFormData;
  setFormData: (data: RegisterFormData) => void;
  error: string | null;
  passwordStrength: number;
  getStrengthText: () => string;
  getStrengthColor: (index: number) => string;
  onSubmit: (e: React.FormEvent) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  setFormData,
  error,
  passwordStrength,
  getStrengthText,
  getStrengthColor,
  onSubmit,
}) => {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 w-full max-w-2xl overflow-hidden border border-gray-100 p-8 md:p-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
          Create Your Account
        </h1>
        <p className="text-gray-400 font-medium text-sm">
          Join the ASTU Smart Complaint & Issue Tracking System
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-100 text-red-600 text-xs font-bold p-4 rounded-2xl flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid md:grid-cols-1 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-slate-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">
              University Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="e.g. name@astu.edu.et"
                className="w-full bg-slate-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          {/* Role & Department */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">
                Role
              </label>
              <div className="relative">
                <select
                  className="w-full bg-slate-50/50 border border-gray-100 rounded-2xl py-4 px-4 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                >
                  <option>Student</option>
                  <option>Staff</option>
                  <option>Admin</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">
                Department
              </label>
              <div className="relative">
                <select
                  className="w-full bg-slate-50/50 border border-gray-100 rounded-2xl py-4 px-4 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                >
                  <option value="">Select Department</option>
                  <option>School of Electrical-Engineering</option>
                  <option>School of Civil Engineering</option>
                  <option>School of Mechanical Engineering</option>
                  <option>School of Applied Natural Sciences</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Create a strong password"
                className="w-full bg-slate-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            {/* Strength Indicator */}
            <div className="pt-2">
              <div className="flex gap-1.5 mb-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors duration-500",
                      getStrengthColor(i),
                    )}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase items-center flex gap-1.5">
                  Strength:{" "}
                  <span
                    className={cn(
                      passwordStrength <= 1
                        ? "text-red-500"
                        : passwordStrength === 2
                          ? "text-yellow-500"
                          : "text-green-500",
                    )}
                  >
                    {getStrengthText()}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest pl-1">
              Confirm Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                <Check size={18} />
              </div>
              <input
                type="password"
                placeholder="Repeat your password"
                className="w-full bg-slate-50/50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all text-sm font-medium"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Terms */}
          <div className="pt-2 flex items-center gap-3">
            <label className="relative flex items-center cursor-pointer group">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={formData.agreedToTerms}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    agreedToTerms: e.target.checked,
                  })
                }
              />
              <div className="w-6 h-6 bg-slate-100 border border-gray-200 rounded-lg transition-all peer-checked:bg-primary peer-checked:border-primary" />
              <Check
                size={14}
                className="absolute left-1 top-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity"
              />
            </label>
            <span className="text-xs font-semibold text-gray-400">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>{" "}
              of ASTU.
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-1 active:translate-y-0 mt-4"
        >
          Create Account
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-gray-50 text-center">
        <p className="text-sm font-bold text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline underline-offset-4"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
