import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";
import ChatBot from "./ChatBot";
import { useEffect, useRef, type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
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
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <div className="w-full max-w-[1600px] mx-auto px-6 py-8 lg:px-10 lg:py-10">
            {children}
          </div>
        </main>
      </div>
      <ChatBot />
    </div>
  );
};

export default DashboardLayout;
