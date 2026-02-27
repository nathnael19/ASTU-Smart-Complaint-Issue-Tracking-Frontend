import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CheckEmailFormProps {
  onVerify: (code: string) => void;
  onResend?: () => Promise<boolean | undefined>;
  error?: string;
  isLoading?: boolean;
}

const CheckEmailForm: React.FC<CheckEmailFormProps> = ({
  onVerify,
  onResend,
  error: parentError,
  isLoading = false,
}) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(120); // 2 minutes
  const [isResending, setIsResending] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const error = parentError || localError;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().slice(0, 6);
    if (!/^\d*$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split("").forEach((char, i) => {
      if (i < 6) newCode[i] = char;
    });
    setCode(newCode);

    // Focus the last filled input or the first empty one
    const nextIndex = Math.min(pastedData.length, 5);
    inputs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify(code.join(""));
  };

  const handleResendClick = async () => {
    if (onResend) {
      setIsResending(true);
      setLocalError(null);
      const success = await onResend();
      if (success) {
        setTimer(120);
      }
      setIsResending(false);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 w-full max-w-lg overflow-hidden border border-gray-100 flex flex-col">
      {/* Top Illustration Area */}
      <div className="bg-blue-50/50 p-12 flex items-center justify-center relative">
        <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
          <Mail size={40} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl" />
      </div>

      <div className="p-10 md:p-12 flex flex-col">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-900 mb-4">
            Check your email
          </h2>
          <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
            We have sent a 6-digit verification code to your university email
            address. Please enter it below to reset your password.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-red-50 border border-red-100 text-red-600 text-xs font-bold p-4 rounded-xl"
            >
              {error}
            </motion.div>
          )}
          <div className="flex justify-between gap-2 md:gap-4">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                onPaste={handlePaste}
                className="w-full h-14 md:h-16 bg-[#f8fafc] border border-gray-200 text-2xl font-black text-center rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-gray-800"
              />
            ))}
          </div>

          <button
            disabled={isLoading}
            className="w-full bg-[#1e3a8a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 hover:bg-blue-950 transition-all hover:translate-y-[-2px] active:translate-y-0 text-base disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0"
          >
            {isLoading ? "Verifying..." : "Verify Code"}{" "}
            <CheckCircle2 size={18} />
          </button>
        </form>

        <div className="mt-8 text-center space-y-2">
          <p className="text-sm font-bold text-gray-400">
            Didn't receive the code?
          </p>
          <button
            className="text-primary font-bold hover:underline underline-offset-4 flex items-center justify-center gap-2 mx-auto disabled:text-gray-300 disabled:no-underline"
            disabled={timer > 0 || isResending}
            onClick={handleResendClick}
          >
            {isResending ? "Resending..." : "Resend Code"}{" "}
            <span className="text-gray-400 font-medium">
              {timer > 0 && `in ${formatTime(timer)}`}
            </span>
          </button>
        </div>

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

      {/* Internal Footer Branding */}
      <div className="bg-slate-50 border-t border-gray-100 py-4 px-6 text-center">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          SECURED BY ASTU ICT DIRECTORATE
        </span>
      </div>
    </div>
  );
};

export default CheckEmailForm;
