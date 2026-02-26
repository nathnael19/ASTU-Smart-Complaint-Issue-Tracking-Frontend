import {
  KeySquare,
  ShieldCheck,
  Smartphone,
  History,
  LogOut,
} from "lucide-react";
import SettingsToggle from "../../students/settings/SettingsToggle";
import { useState } from "react";

const StaffSecurityTab = () => {
  const [twoFactor, setTwoFactor] = useState(true);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-12">
        {/* Password Section */}
        <section>
          <div className="flex items-center gap-3 text-[#1e3a8a] border-b border-gray-100 pb-4 mb-6">
            <KeySquare size={18} />
            <h3 className="text-[13px] font-black uppercase tracking-widest text-[#1e3a8a]">
              Password Management
            </h3>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="md:col-span-2">
                <label className="block text-[11px] font-black tracking-widest uppercase text-gray-400 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-200 bg-slate-50/50 text-gray-900 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-black tracking-widest uppercase text-gray-400 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-slate-50/50 text-gray-900 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                />
                <p className="text-[11px] font-medium text-gray-400 mt-2">
                  Must be at least 8 characters long and include a number and
                  symbol.
                </p>
              </div>
              <div>
                <label className="block text-[11px] font-black tracking-widest uppercase text-gray-400 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-slate-50/50 text-gray-900 text-[14px] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Two-Factor Authentication */}
        <section>
          <div className="flex items-center gap-3 text-[#1e3a8a] border-b border-gray-100 pb-4 mb-6">
            <ShieldCheck size={18} />
            <h3 className="text-[13px] font-black uppercase tracking-widest text-[#1e3a8a]">
              Two-Factor Authentication
            </h3>
          </div>

          <div className="border border-gray-100 rounded-2xl bg-slate-50/30 overflow-hidden">
            <div className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-gray-900 mb-1">
                    SMS & Authenticator App
                  </h4>
                  <p className="text-[12px] font-medium text-gray-500 max-w-xl leading-relaxed">
                    Protect your staff account with an extra layer of security.
                    Require a code from your mobile device when logging in.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span
                  className={`text-[12px] font-bold ${twoFactor ? "text-emerald-500" : "text-gray-400"}`}
                >
                  {twoFactor ? "Enabled" : "Disabled"}
                </span>
                <SettingsToggle
                  active={twoFactor}
                  onClick={() => setTwoFactor(!twoFactor)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Active Sessions */}
        <section>
          <div className="flex items-center gap-3 text-[#1e3a8a] border-b border-gray-100 pb-4 mb-6">
            <History size={18} />
            <h3 className="text-[13px] font-black uppercase tracking-widest text-[#1e3a8a]">
              Active Sessions
            </h3>
          </div>

          <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-100">
            {/* Current Session */}
            <div className="p-6 flex items-center justify-between gap-4 bg-emerald-50/30">
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 flex items-center gap-2">
                  Staff Desktop Portal (Windows)
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-wider rounded-md">
                    Active Now
                  </span>
                </h4>
                <p className="text-[12px] font-medium text-gray-500 mt-1">
                  Chrome on Windows 11 • Addis Ababa, ET • IP: 196.189.22.45
                </p>
              </div>
            </div>

            {/* Mobile Session */}
            <div className="p-6 flex items-center justify-between gap-4 bg-white hover:bg-slate-50/50 transition-colors">
              <div>
                <h4 className="text-[14px] font-bold text-gray-900 gap-2">
                  Staff Mobile App (iOS)
                </h4>
                <p className="text-[12px] font-medium text-gray-500 mt-1">
                  iPhone 13 Pro • Adama, ET • Last active: 2 hours ago
                </p>
              </div>
              <button className="text-[12px] font-bold text-red-500 hover:text-white border border-red-200 hover:bg-red-500 px-4 py-2 rounded-xl transition-colors whitespace-nowrap">
                Revoke Access
              </button>
            </div>

            <div className="p-4 bg-slate-50 border-t border-gray-100 flex justify-center">
              <button className="flex items-center gap-2 text-[12px] font-bold text-[#1e3a8a] hover:text-blue-800 transition-colors">
                <LogOut size={14} />
                Sign out of all other sessions
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StaffSecurityTab;
