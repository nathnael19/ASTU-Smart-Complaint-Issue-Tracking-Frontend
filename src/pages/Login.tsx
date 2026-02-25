import React, { useState } from "react";
import { Mail, Lock, LogIn, ShieldCheck, Activity, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your university email.");
      return;
    }

    if (!email.toLowerCase().endsWith("@astu.edu.et")) {
      setError("Please use an official ASTU email ending with @astu.edu.et");
      return;
    }

    // Proceed with login logic...
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary/10 selection:text-primary">
      {/* Header */}
      <header className="px-6 py-6 max-w-7xl mx-auto w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="ASTU Logo"
            className="w-10 h-10 object-contain"
          />
          <div className="flex flex-col -gap-1">
            <span className="text-sm font-black text-[#1e3a8a] uppercase leading-tight tracking-tight">
              ASTU Smart Complaint
            </span>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Issue Tracking System
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/login"
            className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
          >
            Help Center
          </Link>
          <Link
            to="/contact"
            className="text-sm font-semibold text-gray-500 hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <div className="h-4 w-[1px] bg-gray-200 mx-2" />
          <button className="bg-[#e2e8f0] text-[#1e3a8a] px-6 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors shadow-sm">
            Register
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 w-full max-w-5xl flex flex-col md:flex-row overflow-hidden border border-gray-100"
        >
          {/* Left Side - Info */}
          <div className="bg-[#1e3a8a] md:w-5/12 p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-center">
            {/* Background pattern */}
            <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white/5 rounded-full" />
            <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white/5 rounded-full" />

            <div className="relative z-10">
              <h1 className="text-4xl font-extrabold mb-8 leading-[1.2]">
                Empowering the ASTU community through transparency.
              </h1>
              <p className="text-blue-100/70 text-base leading-relaxed mb-12">
                Our smart issue tracking system ensures that every voice is
                heard and every technical challenge is addressed promptly by the
                right department.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">
                      Official University Portal
                    </h3>
                    <p className="text-xs text-blue-100/60 leading-relaxed">
                      Secure and verified access for all members.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-1">
                      Real-time Tracking
                    </h3>
                    <p className="text-xs text-blue-100/60 leading-relaxed">
                      Monitor the progress of your requests instantly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-1 p-10 md:p-16 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                Welcome Back
              </h2>
              <p className="text-gray-400 text-sm font-medium mb-10">
                Please enter your university credentials to access the portal.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-red-50 border border-red-100 text-red-600 text-xs font-bold p-4 rounded-xl"
                  >
                    {error}
                  </motion.div>
                )}
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">
                    University Email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      placeholder="e.g. student.name@astu.edu.et"
                      className={cn(
                        "w-full bg-[#f8fafc] border text-sm rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 transition-all text-gray-700 placeholder:text-gray-400",
                        error && error.includes("email")
                          ? "border-red-200 focus:ring-red-500/10 focus:border-red-500"
                          : "border-gray-200 focus:ring-primary/20 focus:border-primary",
                      )}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-3">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                      <Lock size={18} />
                    </div>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#f8fafc] border border-gray-200 text-sm rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 placeholder:text-gray-400"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      <div className="w-5 h-5 bg-[#f1f5f9] border border-gray-200 rounded-md peer-checked:bg-primary peer-checked:border-primary transition-all" />
                      <svg
                        className="absolute top-1 left-1 w-3 h-3 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="4"
                      >
                        <path
                          d="M5 13l4 4L19 7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-500 group-hover:text-gray-700 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-sm font-bold text-primary hover:underline underline-offset-4"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button className="w-full bg-[#1e3a8a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 hover:bg-blue-950 transition-all hover:translate-y-[-2px] active:translate-y-0">
                  Sign In <LogIn size={18} />
                </button>
              </form>

              <div className="mt-12 pt-10 border-t border-gray-50 text-center">
                <p className="text-sm font-semibold text-gray-500">
                  Don't have an account yet?{" "}
                  <button className="text-primary font-bold hover:underline underline-offset-4">
                    Create an account
                  </button>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-10 text-center text-xs font-bold text-gray-400/80 uppercase tracking-widest leading-loose">
        <p className="mb-4">
          © 2026 Adama Science and Technology University. All rights reserved.
        </p>
        <div className="flex items-center justify-center gap-6">
          <a href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <span className="w-1 h-1 bg-gray-200 rounded-full" />
          <a href="#" className="hover:text-primary transition-colors">
            Terms of Service
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Login;
