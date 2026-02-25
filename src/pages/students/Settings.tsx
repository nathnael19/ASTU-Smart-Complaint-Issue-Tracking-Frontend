import { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Settings as SettingsIcon,
  Search,
} from "lucide-react";
import DashboardLayout from "../../components/students/DashboardLayout";
import { cn } from "../../lib/utils";
import ProfileTab from "../../components/students/settings/ProfileTab";
import NotificationsTab from "../../components/students/settings/NotificationsTab";
import SecurityTab from "../../components/students/settings/SecurityTab";
import AccountTab from "../../components/students/settings/AccountTab";

const tabs = [
  { id: "profile", label: "Profile Information", icon: User },
  { id: "notifications", label: "Notification Preferences", icon: Bell },
  { id: "security", label: "Security & Password", icon: Lock },
  { id: "account", label: "Account Settings", icon: SettingsIcon },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="max-w-[1200px] mx-auto pb-20">
        <div className="flex flex-col lg:flex-row gap-12 pt-8">
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-[320px] space-y-8">
            <div className="space-y-4 px-2">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight pl-2">
                Account & <br />
                <span className="text-[#1e3a8a]">System Settings</span>
              </h1>
              <div className="relative group pt-4">
                <Search
                  size={18}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Search settings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-sm font-bold text-gray-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all"
                />
              </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-3 block lg:sticky lg:top-8">
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

          {/* Main Content Area */}
          <div className="flex-1">
            {activeTab === "profile" && <ProfileTab />}
            {activeTab === "notifications" && <NotificationsTab />}
            {activeTab === "security" && <SecurityTab />}
            {activeTab === "account" && <AccountTab />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
