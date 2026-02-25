import React, { useState, useEffect } from "react";
import { User, Mail, Lock, ChevronDown, Check, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "Student",
    department: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0-4

  useEffect(() => {
    // Basic password strength logic
    let strength = 0;
    if (formData.password.length >= 8) strength++;
    if (/[A-Z]/.test(formData.password)) strength++;
    if (/[0-9]/.test(formData.password)) strength++;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength++;
    setPasswordStrength(strength);
  }, [formData.password]);

  const getStrengthText = () => {
    if (passwordStrength === 0) return "TOO WEAK";
    if (passwordStrength === 1) return "WEAK";
    if (passwordStrength === 2) return "MEDIUM";
    if (passwordStrength === 3) return "STRONG";
    return "VERY STRONG";
  };

  const getStrengthColor = (index: number) => {
    if (index >= passwordStrength) return "bg-gray-200";
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength >= 3) return "bg-green-500";
    return "bg-gray-200";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.toLowerCase().endsWith("@astu.edu.et")) {
      setError("Please use an official ASTU email ending with @astu.edu.et");
      return;
    }

    if (!formData.department) {
      setError("Please select your department.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.agreedToTerms) {
      setError("You must agree to the Terms of Service.");
      return;
    }

    // Proceed with registration logic...
    console.log("Registering with:", formData);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary/10 selection:text-primary">
      {/* Header */}
      <header className="px-6 py-4 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg">
            <Globe size={20} className="md:hidden" />
            <img
              src="/logo.png"
              alt="Logo"
              className="hidden md:block w-8 h-8"
            />
          </div>
          <span className="text-lg md:text-xl font-bold text-primary tracking-tight">
            ASTU <span className="text-accent">SmartComp</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            Home
          </Link>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            Help
          </a>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-primary transition-colors"
          >
            FAQ
          </a>
          <Link
            to="/login"
            className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5"
          >
            Login
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-10 mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 w-full max-w-2xl overflow-hidden border border-gray-100 p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Create Your Account
            </h1>
            <p className="text-gray-400 font-medium text-sm">
              Join the ASTU Smart Complaint & Issue Tracking System
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
        </motion.div>
      </main>

      {/* Copyright */}
      <footer className="pb-10 text-center text-[10px] font-black text-gray-300 uppercase tracking-widest">
        © 2026 Adama Science and Technology University. All rights reserved.
      </footer>
    </div>
  );
};

export default Register;
