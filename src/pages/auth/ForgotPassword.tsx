import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import ForgotPasswordForm from "../../components/auth/ForgotPasswordForm";
import { requestPasswordReset } from "../../api/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your university email.");
      return;
    }

    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      setIsSuccess(true);
      sessionStorage.setItem("reset_email", email);
      setTimeout(() => {
        navigate("/check-email", { state: { email } });
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
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
          <ForgotPasswordForm
            email={email}
            setEmail={setEmail}
            onSubmit={handleSubmit}
            error={error}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        </motion.div>
      </main>

      <AuthFooter />
    </div>
  );
};

export default ForgotPassword;
