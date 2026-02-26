import StaffSidebar from "./StaffSidebar";
import StaffDashboardHeader from "./StaffDashboardHeader";
import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface StaffDashboardLayoutProps {
  children: ReactNode;
}

const StaffDashboardLayout = ({ children }: StaffDashboardLayoutProps) => {
  const mainRef = useRef<HTMLElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Reset scroll position for dashboard content area on page change
    if (mainRef.current) {
      mainRef.current.scrollTo({ top: 0, left: 0 });
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-[#fcfdfe] font-sans selection:bg-primary/10 selection:text-primary">
      <StaffSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <StaffDashboardHeader />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StaffDashboardLayout;
