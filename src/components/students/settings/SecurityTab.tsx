import { useState } from "react";
import { Info, Monitor, Smartphone } from "lucide-react";
import SettingsToggle from "./SettingsToggle";

const SecurityTab = () => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Change Password Card */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-10">
        <h2 className="text-xl font-black text-gray-900">Change Password</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              Current Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all"
            />
          </div>
        </div>

        {/* Password Strength indicator */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider">
            <span className="text-gray-400">
              Password Strength: <span className="text-green-600">Strong</span>
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
          <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all hover:translate-y-[-2px]">
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
          <SettingsToggle
            active={twoFactor}
            onClick={() => setTwoFactor(!twoFactor)}
          />
        </div>

        <div className="bg-blue-50/50 rounded-2xl p-6 flex items-start gap-4 border border-blue-100/50">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm shrink-0 border border-blue-100/50">
            <Info size={18} />
          </div>
          <p className="text-xs font-medium text-gray-600 leading-relaxed pt-1.5 px-1">
            When enabled, you'll be asked for a verification code sent to your
            university email whenever you log in from a new device.
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
                <span className="text-green-500 font-bold">Active now</span>
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
          <button className="text-blue-600 font-black text-xs hover:underline underline-offset-4 tracking-tight">
            Log out from all other devices
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
