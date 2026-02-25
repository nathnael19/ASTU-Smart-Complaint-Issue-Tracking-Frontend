import { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Settings as SettingsIcon,
  Camera,
  ChevronRight,
  ShieldCheck,
  HelpCircle,
  Search,
  Mail,
  Smartphone,
  Moon,
  BellRing,
  Monitor,
  Info,
} from "lucide-react";
import DashboardLayout from "../../components/students/DashboardLayout";
import { cn } from "../../lib/utils";

const tabs = [
  { id: "profile", label: "Profile Information", icon: User },
  { id: "notifications", label: "Notification Preferences", icon: Bell },
  { id: "security", label: "Security & Password", icon: Lock },
  { id: "account", label: "Account Settings", icon: SettingsIcon },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [searchQuery, setSearchQuery] = useState("");

  const [notifs, setNotifs] = useState({
    statusUpdates: true,
    newComments: true,
    weeklySummary: false,
    systemAlerts: true,
    ticketMentions: true,
  });

  const [twoFactor, setTwoFactor] = useState(false);

  const Toggle = ({
    active,
    onClick,
  }: {
    active: boolean;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
        active ? "bg-[#1e3a8a]" : "bg-gray-200",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
          active ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] mx-auto px-8 py-8 pb-20 space-y-8">
        {/* Header Section with Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Account & System Settings
            </h1>
            <p className="text-gray-400 font-medium text-sm">
              Manage your profile, preferences, and account security.
            </p>
          </div>

          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-gray-100 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Side Navigation Tabs */}
          <div className="lg:w-72 shrink-0 space-y-2">
            {tabs.map((tab) => {
              const IsActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-200 group",
                    IsActive
                      ? "bg-white text-[#1e3a8a] shadow-sm border border-gray-100"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-50",
                  )}
                >
                  <tab.icon
                    size={18}
                    className={cn(
                      "transition-colors",
                      IsActive
                        ? "text-[#1e3a8a]"
                        : "text-gray-400 group-hover:text-gray-500",
                    )}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-8">
            {activeTab === "profile" && (
              <>
                {/* Profile Information Card */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-10">
                  <h2 className="text-xl font-black text-gray-900">
                    Profile Information
                  </h2>

                  {/* Profile Photo Section */}
                  <div className="flex flex-col sm:flex-row items-center gap-8 pb-4">
                    <div className="relative group">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner">
                        <img
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button className="absolute bottom-0 right-0 bg-[#1e3a8a] text-white p-2.5 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform">
                        <Camera size={16} />
                      </button>
                    </div>
                    <div className="space-y-4 text-center sm:text-left">
                      <div>
                        <h3 className="text-base font-black text-gray-900 mb-1">
                          Profile Photo
                        </h3>
                        <p className="text-xs font-medium text-gray-400">
                          JPG, GIF or PNG. Max size of 800K
                        </p>
                      </div>
                      <div className="flex items-center gap-3 justify-center sm:justify-start">
                        <button className="bg-slate-50 hover:bg-slate-100 text-gray-700 px-6 py-2.5 rounded-xl font-bold text-xs transition-colors border border-gray-100">
                          Upload New
                        </button>
                        <button className="text-gray-400 hover:text-red-500 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue="Abebe Kebede"
                        className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                        ID Number
                      </label>
                      <input
                        type="text"
                        defaultValue="UG/2021/4582"
                        disabled
                        className="w-full bg-slate-50/50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-400 cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                        University Email
                      </label>
                      <input
                        type="email"
                        defaultValue="abebe.kebede@astu.edu.et"
                        disabled
                        className="w-full bg-slate-50/50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-400 cursor-not-allowed"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                        Department
                      </label>
                      <select className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all appearance-none cursor-pointer">
                        <option>Software Engineering</option>
                        <option>Computer Science</option>
                        <option>Electrical Engineering</option>
                        <option>Mechanical Engineering</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                        Bio (Optional)
                      </label>
                      <textarea
                        rows={4}
                        placeholder="A short description about yourself..."
                        className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all resize-none"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-4 pt-10">
                    <button className="text-gray-500 hover:text-gray-900 px-8 py-4 rounded-2xl font-black text-sm transition-colors border border-gray-100">
                      Cancel
                    </button>
                    <button className="bg-[#1e3a8a] text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-950 transition-all hover:translate-y-[-2px]">
                      Save Changes
                    </button>
                  </div>
                </div>

                {/* Bottom Cards Info Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Account Status */}
                  <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex items-start gap-5">
                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
                      <ShieldCheck size={24} />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-base font-black text-gray-900">
                        Account Status
                      </h4>
                      <p className="text-xs font-medium text-gray-400 leading-relaxed">
                        Your account is currently active and verified as a
                        student of ASTU.
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-600 border border-green-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] font-black uppercase tracking-wider">
                          Verified Member
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Need Help */}
                  <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex items-start gap-5">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#1e3a8a] shrink-0">
                      <HelpCircle size={24} />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-base font-black text-gray-900">
                        Need Help?
                      </h4>
                      <p className="text-xs font-medium text-gray-400 leading-relaxed">
                        Contact the registrar office for data correction if your
                        ID or department is incorrect.
                      </p>
                      <button className="text-[#1e3a8a] font-black text-xs flex items-center gap-1 hover:gap-2 transition-all">
                        Contact Registrar Office <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "notifications" && (
              <>
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-12">
                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-gray-900">
                      Notification Preferences
                    </h2>
                    <p className="text-gray-400 font-medium text-sm">
                      Choose how you want to be notified about updates and
                      activity.
                    </p>
                  </div>

                  {/* Email Notifications Section */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3 text-[#1e3a8a] border-b border-gray-50 pb-4">
                      <Mail size={18} />
                      <h3 className="text-xs font-black uppercase tracking-wider">
                        Email Notifications
                      </h3>
                    </div>

                    <div className="space-y-8">
                      {/* Complaint Status Updates */}
                      <div className="flex items-center justify-between group">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-gray-900">
                            Complaint Status Updates
                          </h4>
                          <p className="text-xs font-medium text-gray-400 max-w-md">
                            Get notified immediately when your ticket is
                            assigned, updated, or resolved.
                          </p>
                        </div>
                        <Toggle
                          active={notifs.statusUpdates}
                          onClick={() =>
                            setNotifs((prev) => ({
                              ...prev,
                              statusUpdates: !prev.statusUpdates,
                            }))
                          }
                        />
                      </div>

                      {/* New Comments */}
                      <div className="flex items-center justify-between group">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-gray-900">
                            New Comments
                          </h4>
                          <p className="text-xs font-medium text-gray-400 max-w-md">
                            Receive an email when staff or admins post a message
                            on your complaint.
                          </p>
                        </div>
                        <Toggle
                          active={notifs.newComments}
                          onClick={() =>
                            setNotifs((prev) => ({
                              ...prev,
                              newComments: !prev.newComments,
                            }))
                          }
                        />
                      </div>

                      {/* Weekly Summary */}
                      <div className="flex items-center justify-between group">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-gray-900">
                            Weekly Summary
                          </h4>
                          <p className="text-xs font-medium text-gray-400 max-w-md">
                            A recap of your active complaints and resolution
                            metrics sent every Monday.
                          </p>
                        </div>
                        <Toggle
                          active={notifs.weeklySummary}
                          onClick={() =>
                            setNotifs((prev) => ({
                              ...prev,
                              weeklySummary: !prev.weeklySummary,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* In-App Notifications Section */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-3 text-[#1e3a8a] border-b border-gray-50 pb-4">
                      <BellRing size={18} />
                      <h3 className="text-xs font-black uppercase tracking-wider">
                        In-App Notifications
                      </h3>
                    </div>

                    <div className="space-y-8">
                      {/* System Alerts */}
                      <div className="flex items-center justify-between group">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-gray-900">
                            System Alerts
                          </h4>
                          <p className="text-xs font-medium text-gray-400 max-w-md">
                            Notifications about maintenance windows, policy
                            changes, and system news.
                          </p>
                        </div>
                        <Toggle
                          active={notifs.systemAlerts}
                          onClick={() =>
                            setNotifs((prev) => ({
                              ...prev,
                              systemAlerts: !prev.systemAlerts,
                            }))
                          }
                        />
                      </div>

                      {/* Ticket Mentions */}
                      <div className="flex items-center justify-between group">
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-gray-900">
                            Ticket Mentions
                          </h4>
                          <p className="text-xs font-medium text-gray-400 max-w-md">
                            Get notified when someone tags you in a
                            collaborative complaint discussion.
                          </p>
                        </div>
                        <Toggle
                          active={notifs.ticketMentions}
                          onClick={() =>
                            setNotifs((prev) => ({
                              ...prev,
                              ticketMentions: !prev.ticketMentions,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="flex items-center justify-end gap-4 pt-10 border-t border-gray-50 mt-4">
                    <button className="text-gray-500 hover:text-gray-900 px-8 py-4 rounded-2xl font-black text-sm transition-colors border border-gray-100">
                      Restore Defaults
                    </button>
                    <button className="bg-[#1e3a8a] text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-950 transition-all hover:translate-y-[-2px]">
                      Save Preferences
                    </button>
                  </div>
                </div>

                {/* Bottom Cards Area for Notifications */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Mobile Push */}
                  <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex items-start gap-5">
                    <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
                      <Smartphone size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-gray-900">
                        Mobile Push
                      </h4>
                      <p className="text-xs font-medium text-gray-400 leading-relaxed">
                        You can also enable push notifications on the ASTU
                        mobile app for real-time tracking.
                      </p>
                    </div>
                  </div>

                  {/* Quiet Hours */}
                  <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex items-start gap-5">
                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
                      <Moon size={24} />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-black text-gray-900">
                        Quiet Hours
                      </h4>
                      <p className="text-xs font-medium text-gray-400 leading-relaxed">
                        Set times when you don't want to receive any
                        non-critical system notifications.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "security" && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Change Password Card */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-10">
                  <h2 className="text-xl font-black text-gray-900">
                    Change Password
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/10 transition-all"
                      />
                    </div>
                  </div>

                  {/* Password Strength indicator */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
                      <span className="text-gray-400">
                        Password Strength:{" "}
                        <span className="text-green-600">Strong</span>
                      </span>
                      <span className="text-gray-400">10/16 characters</span>
                    </div>
                    <div className="flex gap-2 h-2">
                      <div className="flex-1 bg-green-500 rounded-full" />
                      <div className="flex-1 bg-green-500 rounded-full" />
                      <div className="flex-1 bg-green-500 rounded-full" />
                      <div className="flex-1 bg-slate-100 rounded-full" />
                    </div>
                  </div>

                  {/* Security Tips */}
                  <div className="bg-slate-50/50 rounded-2xl p-6 border border-gray-100 space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-900">
                      Security Tips:
                    </h4>
                    <ul className="text-xs font-medium text-gray-500 space-y-2 list-none">
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-400" />
                        Use at least 8 characters (12+ recommended)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-400" />
                        Include upper and lowercase letters
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-400" />
                        Mix in numbers and special symbols (!@#$%^*)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-gray-400" />
                        Avoid using personal information like your ID number
                      </li>
                    </ul>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button className="bg-[#1e3a8a] text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-950 transition-all hover:translate-y-[-2px]">
                      Update Password
                    </button>
                  </div>
                </div>

                {/* Two-Factor Authentication Card */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-gray-900">
                        Two-Factor Authentication
                      </h2>
                      <p className="text-gray-400 font-medium text-sm">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <Toggle
                      active={twoFactor}
                      onClick={() => setTwoFactor(!twoFactor)}
                    />
                  </div>

                  <div className="bg-blue-50/50 rounded-2xl p-6 flex items-start gap-4 border border-blue-100/50">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1e3a8a] shadow-sm shrink-0 border border-blue-100/50">
                      <Info size={18} />
                    </div>
                    <p className="text-xs font-medium text-gray-600 leading-relaxed pt-1.5 px-1">
                      When enabled, you'll be asked for a verification code sent
                      to your university email whenever you log in from a new
                      device.
                    </p>
                  </div>
                </div>

                {/* Recent Login Activity */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-10">
                  <div className="space-y-1">
                    <h2 className="text-xl font-black text-gray-900">
                      Recent Login Activity
                    </h2>
                    <p className="text-gray-400 font-medium text-sm">
                      Review your recent account access points.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Device 1 */}
                    <div className="flex items-center gap-6 p-5 rounded-[2rem] bg-slate-50/50 border border-transparent hover:border-gray-100 transition-all">
                      <div className="w-16 h-16 bg-white rounded-[1.25rem] flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 shrink-0">
                        <Monitor size={32} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-black text-gray-900">
                            Chrome on MacBook Pro
                          </h4>
                          <span className="px-3 py-1 bg-green-50 text-green-600 text-[9px] font-black uppercase rounded-full tracking-wider border border-green-100">
                            Current Session
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-medium text-gray-400">
                          <span>Adama, Ethiopia • 192.168.1.45</span>
                          <span className="text-green-500 font-bold">
                            Active now
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Device 2 */}
                    <div className="flex items-center gap-6 p-5 rounded-[2rem] bg-slate-50/50 border border-transparent hover:border-gray-100 transition-all opacity-80">
                      <div className="w-16 h-16 bg-white rounded-[1.25rem] flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 shrink-0">
                        <Smartphone size={32} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-black text-gray-900">
                            Safari on iPhone 13
                          </h4>
                          <button className="text-[9px] font-black uppercase text-gray-400 hover:text-red-500 tracking-wider">
                            Log Out
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-medium text-gray-400">
                          <span>Addis Ababa, Ethiopia • 197.156.65.12</span>
                          <span>2 hours ago</span>
                        </div>
                      </div>
                    </div>

                    {/* Device 3 */}
                    <div className="flex items-center gap-6 p-5 rounded-[2rem] bg-slate-50/50 border border-transparent hover:border-gray-100 transition-all opacity-80">
                      <div className="w-16 h-16 bg-white rounded-[1.25rem] flex items-center justify-center text-gray-400 shadow-sm border border-gray-100 shrink-0">
                        <Monitor size={32} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-black text-gray-900">
                            Firefox on Windows Desktop
                          </h4>
                          <button className="text-[9px] font-black uppercase text-gray-400 hover:text-red-500 tracking-wider">
                            Log Out
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-medium text-gray-400">
                          <span>Adama, Ethiopia • 192.168.1.22</span>
                          <span>Yesterday at 14:32</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-6">
                    <button className="text-[#1e3a8a] font-black text-xs hover:underline underline-offset-4 tracking-tight">
                      Log out from all other devices
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
