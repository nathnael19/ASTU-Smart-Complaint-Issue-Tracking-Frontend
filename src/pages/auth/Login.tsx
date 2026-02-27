import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import AuthInfoSide from "../../components/auth/AuthInfoSide";
import LoginForm from "../../components/auth/LoginForm";
import { loginUser } from "../../api/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Clean up state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    /* 
    if (!email.toLowerCase().endsWith("@astu.edu.et")) {
      setError("Please use an official ASTU email ending with @astu.edu.et");
      return;
    }
    */

    setIsLoading(true);

    try {
      const response = await loginUser({ email: email.trim(), password });

      // Store token and user data
      localStorage.setItem("access_token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));

      // Role-based redirection
      const role = response.user.role;
      if (role === "STUDENT") {
        navigate("/student/dashboard");
      } else if (role === "STAFF") {
        navigate("/staff/dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        // Default fallback
        navigate("/student/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </motion.div>
      </main>

      <AuthFooter />
    </div>
  );
};

export default Login;
