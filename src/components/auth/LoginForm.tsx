import { Mail, Lock, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

interface LoginFormProps {
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  rememberMe: boolean;
  setRememberMe: (val: boolean) => void;
  error: string | null;
  setError: (val: string | null) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  error,
  setError,
  onSubmit,
}) => {
  return (
    <div className="flex-1 p-10 md:p-16 flex flex-col justify-center bg-white">
      <div className="max-w-md mx-auto w-full">
        <h2 className="text-3xl font-black text-gray-900 mb-4">Welcome Back</h2>
        <p className="text-gray-400 text-sm font-medium mb-10">
          Please enter your university credentials to access the portal.
        </p>

        <form className="space-y-6" onSubmit={onSubmit}>
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
            <Link
              to="/register"
              className="text-primary font-bold hover:underline underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
