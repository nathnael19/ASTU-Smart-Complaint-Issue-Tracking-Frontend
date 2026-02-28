import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

interface AuthErrorProps {
  message: string | null;
  className?: string;
}

const AuthError: React.FC<AuthErrorProps> = ({ message, className }) => {
  const [shake, setShake] = useState(false);

  // Trigger shake animation when message changes to a non-null value
  useEffect(() => {
    if (message) {
      setShake(true);
      const timer = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            x: shake ? [0, -4, 4, -4, 4, 0] : 0,
          }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
            x: { duration: 0.4 },
          }}
          className={cn(
            "bg-red-50 border border-red-100 text-red-600 text-xs font-bold p-4 rounded-xl flex items-start gap-3 shadow-sm shadow-red-900/5",
            className,
          )}
        >
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span className="leading-relaxed">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthError;
