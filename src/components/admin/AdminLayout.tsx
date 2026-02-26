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
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
