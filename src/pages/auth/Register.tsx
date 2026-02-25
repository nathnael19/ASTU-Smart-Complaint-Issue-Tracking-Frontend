import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import RegisterForm from "../../components/auth/RegisterForm";

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
      <AuthHeader actionLabel="Login" actionPath="/login" />

      <main className="flex-1 flex items-center justify-center p-4 md:p-10 mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <RegisterForm
            formData={formData}
            setFormData={setFormData}
            error={error}
            passwordStrength={passwordStrength}
            getStrengthText={getStrengthText}
            getStrengthColor={getStrengthColor}
            onSubmit={handleSubmit}
          />
        </motion.div>
      </main>

      <AuthFooter />
    </div>
  );
};

export default Register;
