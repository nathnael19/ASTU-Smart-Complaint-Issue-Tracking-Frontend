import { useState } from "react";

import {
  User,
  Bell,
  Shield,
  Settings as SettingsIcon,
  ChevronDown,
} from "lucide-react";
import StaffDashboardLayout from "../../components/staff/StaffDashboardLayout";
import StaffNotificationsTab from "../../components/staff/settings/StaffNotificationsTab";
import StaffSecurityTab from "../../components/staff/settings/StaffSecurityTab";

const StaffSettings = () => {
  const [activeTab, setActiveTab] = useState("Profile Settings");

  // Form State
  const [fullName, setFullName] = useState("Dr. Samuel Kebede");
  const [title, setTitle] = useState("Department Manager & Senior Lecturer");
  const [department, setDepartment] = useState(
    "Electrical & Computer Engineering",
  );
  const [officeLocation, setOfficeLocation] = useState("Block 302, Room 12B");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  const tabs = [
    { name: "Profile Settings", icon: User },
    { name: "Notifications", icon: Bell },
    { name: "Security", icon: Shield },
    { name: "Preferences", icon: SettingsIcon },
  ];

  return (
    <StaffDashboardLayout>
      <div className="p-8 max-w-[1000px] mx-auto min-h-screen bg-slate-50/30">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
          <div>
            <h1 className="text-[28px] font-black text-gray-900 tracking-tight leading-tight">
              Account Settings
            </h1>
            <p className="text-[14px] text-gray-500 font-medium mt-1">
              Manage your professional profile and application preferences.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-6 py-2.5 bg-[#1e3a8a] text-white rounded-xl font-bold text-[13px] shadow-sm hover:bg-blue-900 transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-[24px] border border-gray-200/60 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Tabs Navigation */}
          <div className="flex items-center gap-2 px-6 pt-4 border-b border-gray-100 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.name;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 text-[13px] font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "border-[#1e3a8a] text-[#1e3a8a]"
                      : "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-200"
                  }`}
                >
                  <tab.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                  {tab.name}
                </button>
              );
            })}
          </div>

          {/* Form Areas Content */}
          {activeTab === "Profile Settings" && (
            <div className="p-8 space-y-12">
              {/* Personal Information */}
              <section>
                <h3 className="text-[16px] font-black text-gray-900 flex items-center mb-6">
                  Personal Information
                  <div className="flex-1 h-px bg-gray-100 ml-4"></div>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <label className="block text-[11px] font-black tracking-widest uppercase text-gray-400 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-slate-50/50 text-[#1e3a8a] text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black tracking-widest uppercase text-gray-400 mb-2">
                      Professional Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-slate-50/50 text-[#1e3a8a] text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black tracking-widest uppercase text-gray-400 mb-2">
                      Department
                    </label>
                    <div className="relative">
                      <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-slate-50/50 text-[#1e3a8a] text-[14px] font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                      >
                        <option value="Electrical & Computer Engineering">
                          Electrical & Computer Engineering
                        </option>
                        <option value="Mechanical Engineering">
                          Mechanical Engineering
                        </option>
                        <option value="Civil Engineering">
                          Civil Engineering
                        </option>
                        <option value="Software Engineering">
                          Software Engineering
                        </option>
                      </select>
                      <ChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={16}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-black tracking-widest uppercase text-gray-400 mb-2">
                      Office Location
                    </label>
                    <input
                      type="text"
                      value={officeLocation}
                      onChange={(e) => setOfficeLocation(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-slate-50/50 text-[#1e3a8a] text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                    />
                  </div>
                </div>
              </section>

              {/* Notification Preferences */}
              <section>
                <h3 className="text-[16px] font-black text-gray-900 flex items-center mb-6">
                  Notification Preferences
                  <div className="flex-1 h-px bg-gray-100 ml-4"></div>
                </h3>

                <div className="border border-gray-100 rounded-2xl bg-slate-50/30 overflow-hidden divide-y divide-gray-100">
                  {/* Email Toggle */}
                  <div className="p-6 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900 mb-0.5">
                        Email Notifications
                      </h4>
                      <p className="text-[12px] font-medium text-gray-500">
                        Receive an email alert for every new ticket assigned to
                        your department.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEmailAlerts(!emailAlerts)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        emailAlerts ? "bg-[#1e3a8a]" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          emailAlerts ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* SMS Toggle */}
                  <div className="p-6 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-[14px] font-bold text-gray-900 mb-0.5">
                        SMS Alerts
                      </h4>
                      <p className="text-[12px] font-medium text-gray-500">
                        Receive urgent mobile SMS for high-priority emergency
                        complaints.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSmsAlerts(!smsAlerts)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        smsAlerts ? "bg-[#1e3a8a]" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          smsAlerts ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </section>

              {/* Security */}
              <section>
                <h3 className="text-[16px] font-black text-gray-900 flex items-center mb-6">
                  Security
                  <div className="flex-1 h-px bg-gray-100 ml-4"></div>
                </h3>

                <div className="border border-gray-100 rounded-2xl bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div>
                    <h4 className="text-[14px] font-bold text-gray-900 mb-0.5">
                      Account Password
                    </h4>
                    <p className="text-[12px] font-medium text-gray-500">
                      Last changed 3 months ago. We recommend updating it every
                      6 months for better security.
                    </p>
                  </div>
                  <button className="px-5 py-2 border-2 border-[#1e3a8a] text-[#1e3a8a] rounded-xl font-bold text-[13px] hover:bg-blue-50 transition-colors whitespace-nowrap">
                    Change Password
                  </button>
                </div>
              </section>
            </div>
          )}

          {activeTab === "Notifications" && (
            <div className="p-8">
              <StaffNotificationsTab />
            </div>
          )}

          {activeTab === "Security" && (
            <div className="p-8">
              <StaffSecurityTab />
            </div>
          )}

          {/* Footer Actions */}
          <div className="p-8 border-t border-gray-100 bg-slate-50/50 flex items-center justify-end gap-6">
            <button className="text-[13px] font-bold text-gray-500 hover:text-gray-900 transition-colors">
              Discard
            </button>
            <button className="px-8 py-3 bg-[#1e3a8a] hover:bg-blue-900 text-white rounded-xl font-bold text-[13px] shadow-sm transition-colors">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </StaffDashboardLayout>
  );
};

export default StaffSettings;
