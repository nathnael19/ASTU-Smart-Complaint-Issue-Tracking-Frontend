import { motion } from "framer-motion";
import AuthHeader from "../components/auth/AuthHeader";
import AuthFooter from "../components/auth/AuthFooter";
import NewPasswordForm from "../components/auth/NewPasswordForm";

const NewPassword = () => {
  const handleResetPassword = (password: string) => {
    // Proceed with reset logic...
    console.log("Setting new password:", password);
    alert(
      "Your password has been reset successfully! You can now log in with your new password.",
    );
    window.location.href = "/login";
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
          <NewPasswordForm onSubmit={handleResetPassword} />
        </motion.div>
      </main>

      <AuthFooter />
    </div>
  );
};

export default NewPassword;
