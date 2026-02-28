import { useState, useEffect } from "react";
import {
  User,
  Bell,
  Lock,
  Settings as SettingsIcon,
  Loader2,
} from "lucide-react";
import DashboardLayout from "../../components/students/DashboardLayout";
import { cn } from "../../lib/utils";
import ProfileTab from "../../components/students/settings/ProfileTab";
import NotificationsTab from "../../components/students/settings/NotificationsTab";
import SecurityTab from "../../components/students/settings/SecurityTab";
import AccountTab from "../../components/students/settings/AccountTab";
import { getCurrentProfile } from "../../api/users";

const tabs = [
  { id: "profile", label: "Profile Information", icon: User },
  { id: "notifications", label: "Notification Preferences", icon: Bell },
  { id: "security", label: "Security & Password", icon: Lock },
  { id: "account", label: "Account Settings", icon: SettingsIcon },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const data = await getCurrentProfile();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || "Failed to load profile settings.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12 pt-8 pb-20">
          {/* Sidebar Navigation - Sticky, stays in place while content scrolls */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] space-y-8">
              <div className="space-y-4 px-2">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight pl-2">
                  Account & <br />
                  <span className="text-[#1e3a8a]">System Settings</span>
                </h1>
              </div>

              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-3">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-4 px-6 py-5 rounded-[1.75rem] transition-all duration-300 group relative",
                        isActive
                          ? "bg-blue-50/80 text-blue-600 border border-blue-100/50 shadow-none"
                          : "text-gray-400 hover:text-gray-900 hover:bg-slate-50",
                      )}
                    >
                      <Icon
                        size={20}
                        className={cn(
                          "transition-transform duration-300",
                          isActive ? "scale-110" : "group-hover:scale-110",
                        )}
                      />
                      <span className="text-sm font-black tracking-tight">
                        {tab.label}
                      </span>
                      {isActive && (
                        <div className="absolute right-6 w-1.5 h-1.5 rounded-full bg-blue-600" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content Area - Scrollable */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                <p className="text-gray-400 font-bold">
                  Loading your settings...
                </p>
              </div>
            ) : error ? (
              <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 text-center">
                <p className="text-red-500 font-bold">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 text-blue-600 font-black text-sm"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {activeTab === "profile" && (
                  <ProfileTab profile={profile} onUpdate={setProfile} />
                )}
                {activeTab === "notifications" && (
                  <NotificationsTab profile={profile} />
                )}
                {activeTab === "security" && <SecurityTab profile={profile} />}
                {activeTab === "account" && <AccountTab profile={profile} />}
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
