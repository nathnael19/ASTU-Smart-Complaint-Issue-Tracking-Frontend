import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import CheckEmailForm from "../../components/auth/CheckEmailForm";
import { requestPasswordReset, verifyOTP } from "../../api/auth";
import { useState } from "react";

const CheckEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email =
    location.state?.email || sessionStorage.getItem("reset_email") || "";
  const type = location.state?.type || "recovery"; // "signup" or "recovery"
  const [resendError, setResendError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async (code: string) => {
    if (code.length !== 6) {
      alert("Please enter the full 6-digit code.");
      return;
    }

    setIsLoading(true);
    setResendError(null);
    try {
      const data = await verifyOTP(email, code, type);

      // Clear persistence
      sessionStorage.removeItem("reset_email");

      if (type === "signup") {
        // For signup, registration is complete, go to login
        navigate("/login", {
          state: {
            message: "Account verified successfully! You can now log in.",
          },
          replace: true,
        });
      } else {
        // For recovery, store tokens for the reset-password request
        if (data.access_token) {
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
          navigate("/new-password");
        }
      }
    } catch (err: any) {
      setResendError(err.message || "Invalid or expired verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setResendError("Email not found. Please try starting the process again.");
      return;
    }

    try {
      await requestPasswordReset(email);
      setResendError(null);
      return true; // Indicate success to child
    } catch (err: any) {
      setResendError(err.message || "Failed to resend code.");
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary/10 selection:text-primary">
      <AuthHeader actionLabel="Support" actionPath="/contact" />

      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <CheckEmailForm
            onVerify={handleVerify}
            onResend={handleResend}
            error={resendError || undefined}
            isLoading={isLoading}
          />
        </motion.div>
      </main>

      <AuthFooter />
    </div>
  );
};

export default CheckEmail;
