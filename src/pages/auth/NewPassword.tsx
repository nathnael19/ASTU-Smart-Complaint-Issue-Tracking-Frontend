import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuthHeader from "../../components/auth/AuthHeader";
import AuthFooter from "../../components/auth/AuthFooter";
import NewPasswordForm from "../../components/auth/NewPasswordForm";
import { resetPassword } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const NewPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Extract tokens from URL hash or query (Supabase redirect after invite or password reset)
    const hash = window.location.hash;
    const search = window.location.search;
    const hashParams = hash ? new URLSearchParams(hash.substring(1)) : null;
    const queryParams = search ? new URLSearchParams(search) : null;

    const getParam = (name: string) =>
      hashParams?.get(name) ?? queryParams?.get(name) ?? null;

    const accessToken = getParam("access_token");
    const refreshToken = getParam("refresh_token");

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refresh_token", refreshToken);
    }

    if (hash || (accessToken && search)) {
      // Clean URL without reload (remove hash and token query params)
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // 2. If no access token (from URL or already in storage), redirect away
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/forgot-password", { replace: true });
    }
  }, [navigate]);

  const handleResetPassword = async (password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await resetPassword(password);

      // Successfully updated! Clear the session tokens so they can't be used again
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");

      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    } catch (err: any) {
      setError(
        err.message ||
          "Failed to reset password. The link or session may have expired.",
      );
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
          {isSuccess ? (
            <div className="bg-white rounded-[2rem] shadow-2xl p-12 text-center border border-gray-100">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                <ShieldCheck size={40} />
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-4">
                Password Reset!
              </h2>
              <p className="text-gray-500 mb-8 font-medium">
                Your password has been successfully updated. Redirecting you to
                login...
              </p>
            </div>
          ) : (
            <NewPasswordForm
              onSubmit={handleResetPassword}
              isLoading={isLoading}
              error={error || undefined}
            />
          )}
        </motion.div>
      </main>

      <AuthFooter />
    </div>
  );
};

export default NewPassword;
