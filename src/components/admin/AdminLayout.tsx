import AdminHeader from "./AdminHeader";
import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const mainRef = useRef<HTMLElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Reset scroll position for dashboard content area on page change
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, left: 0 });
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfdfe] font-sans selection:bg-primary/10 selection:text-primary">
      <AdminHeader />
      <main ref={mainRef} className="flex-1 overflow-y-auto">
        <div className="w-full max-w-[1600px] mx-auto px-6 py-8 lg:px-10 lg:py-10">
          {children}
        </div>
      </main>
      <footer className="shrink-0 border-t border-gray-100 bg-white/70 backdrop-blur">
        <div className="max-w-[1600px] mx-auto px-6 py-4 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-xs font-medium text-gray-400">
            © 2026 ASTU Smart Tracking System. All rights reserved.
          </span>
          <div className="flex gap-6">
            <button className="text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors">
              Help Center
            </button>
            <button className="text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors">
              Privacy Policy
            </button>
            <button className="text-xs font-medium text-gray-400 hover:text-gray-900 transition-colors">
              System Status
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
