import { Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AuthError from "./AuthError";

interface ForgotPasswordFormProps {
  email: string;
  setEmail: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error: string | null;
  isLoading?: boolean;
  isSuccess?: boolean;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  email,
  setEmail,
  onSubmit,
  error,
  isLoading,
  isSuccess,
}) => {
  return (
    <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 w-full max-w-lg overflow-hidden border border-gray-100 flex flex-col">
      <div className="p-10 md:p-12 flex flex-col">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Forgot Password?
          </h2>
          <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
            Enter your registered university email address and we'll send you a
            secure link to reset your account password.
          </p>
        </div>

        <form className="space-y-8" onSubmit={onSubmit}>
          <AuthError message={error} />

          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-green-50 border border-green-100 text-green-600 text-xs font-bold p-4 rounded-xl"
            >
              Reset link sent! Redirecting...
            </motion.div>
          )}

          <div className="space-y-3">
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest pl-1">
              University Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="e.g. student@astu.edu.et"
                className="w-full bg-[#f8fafc] border border-gray-200 text-sm rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-700 placeholder:text-gray-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || isSuccess}
              />
            </div>
          </div>

          <button
            disabled={isLoading || isSuccess}
            className="w-full bg-[#1e3a8a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 hover:bg-blue-950 transition-all hover:translate-y-[-2px] active:translate-y-0 text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Reset Link"}{" "}
            <ArrowRight size={18} />
          </button>
        </form>

        <Link
          to="/login"
          className="mt-8 flex items-center justify-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Login
        </Link>
      </div>

      <div className="bg-slate-50 border-t border-gray-100 py-4 px-6 text-center">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          Secured By ASTU Directorate
        </span>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
