import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import AuthInfoSide from "../../components/auth/AuthInfoSide";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
    navigate("/student/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-primary/10 selection:text-primary">
      <AuthHeader />

      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-2xl shadow-blue-900/10 w-full max-w-5xl flex flex-col md:flex-row overflow-hidden border border-gray-100"
        >
          <AuthInfoSide />
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
            error={error}
            setError={setError}
            onSubmit={handleSubmit}
          />
        </motion.div>
      </main>

      <AuthFooter />
    </div>
  );
};

export default Login;
