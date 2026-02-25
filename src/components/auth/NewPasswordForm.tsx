import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Circle,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

interface NewPasswordFormProps {
  onSubmit: (password: string) => void;
}

const NewPasswordForm: React.FC<NewPasswordFormProps> = ({ onSubmit }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requirements = [
    { label: "Min. 8 characters", met: password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(password) },
    { label: "One number", met: /[0-9]/.test(password) },
    { label: "Special character", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const strength = requirements.filter((r) => r.met).length;

  const getStrengthColor = (index: number) => {
    if (index >= strength) return "bg-gray-100";
    if (strength <= 1) return "bg-red-500";
    if (strength <= 3) return "bg-blue-500";
    return "bg-green-500";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (strength < 4) {
      setError("Please meet all password requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    onSubmit(password);
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 w-full max-w-lg overflow-hidden border border-gray-100 flex flex-col">
      {/* Top Illustration Area */}
      <div className="bg-blue-50/50 p-12 flex items-center justify-center relative">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shadow-inner">
          <ShieldCheck size={40} className="animate-pulse" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl" />
      </div>

      <div className="p-10 md:p-12 flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Create New Password
          </h2>
          <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
            Your identity has been verified. Please choose a strong password
            that you haven't used before.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-100 text-red-600 text-xs font-bold p-4 rounded-xl flex items-center gap-2"
              >
                <div className="w-1 h-1 bg-red-600 rounded-full" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
            {/* New Password */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest pl-1">
                New Password
              </label>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="w-full bg-[#f8fafc] border border-gray-200 text-sm rounded-xl py-4 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 placeholder:text-gray-400 font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Strength Bars */}
              <div className="flex gap-2 pt-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-all duration-500",
                      getStrengthColor(i),
                    )}
                  />
                ))}
              </div>

              {/* Requirements Checklist */}
              <div className="grid grid-cols-2 gap-y-2 gap-x-4 pt-4">
                {requirements.map((req, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center gap-2 text-[11px] font-bold transition-colors",
                      req.met ? "text-green-500" : "text-gray-400",
                    )}
                  >
                    {req.met ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <Circle size={14} />
                    )}
                    {req.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest pl-1">
                Confirm New Password
              </label>
              <div className="relative group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full bg-[#f8fafc] border border-gray-200 text-sm rounded-xl py-4 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 placeholder:text-gray-400 font-medium"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button className="w-full bg-[#1e3a8a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 hover:bg-blue-950 transition-all hover:translate-y-[-2px] active:translate-y-0 text-base mt-4">
            Reset Password <Lock size={18} />
          </button>
        </form>

        <Link
          to="/login"
          className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors group"
        >
          <motion.span
            whileHover={{ x: -4 }}
            className="flex items-center gap-2"
          >
            ← Back to Login
          </motion.span>
        </Link>
      </div>

      {/* Internal Footer Branding */}
      <div className="bg-slate-50 border-t border-gray-100 py-4 px-6 text-center">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          SECURED BY ASTU ICT DIRECTORATE
        </span>
      </div>
    </div>
  );
};

export default NewPasswordForm;
