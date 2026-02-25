import { motion } from "framer-motion";
import AuthHeader from "../components/auth/AuthHeader";
import AuthFooter from "../components/auth/AuthFooter";
import CheckEmailForm from "../components/auth/CheckEmailForm";

const CheckEmail = () => {
  const handleVerify = (code: string) => {
    // Proceed with verification logic...
    console.log("Verifying code:", code);
    if (code.length === 6) {
      alert(`Verification code ${code} submitted!`);
    } else {
      alert("Please enter the full 6-digit code.");
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
          <CheckEmailForm onVerify={handleVerify} />
        </motion.div>
      </main>

      <AuthFooter />
    </div>
  );
};

export default CheckEmail;
