import React, { useState } from "react";
import { motion } from "framer-motion";
import AuthHeader from "../components/auth/AuthHeader";
import AuthFooter from "../components/auth/AuthFooter";
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
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

    // Proceed with reset logic...
    console.log("Requesting password reset for:", email);
    alert("Password reset link has been sent to your email!");
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
          />
        </motion.div>
      </main>

      <AuthFooter />
    </div>
  );
};

export default ForgotPassword;
