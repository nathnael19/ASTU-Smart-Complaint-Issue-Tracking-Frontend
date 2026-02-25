import { useState } from "react";
import { ChevronRight, AlertTriangle } from "lucide-react";

const AccountTab = () => {
  const [accountSettings, setAccountSettings] = useState({
    shareData: true,
    publicProfile: false,
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* System Preferences Card */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-10">
        <h2 className="text-xl font-black text-gray-900">System Preferences</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              Language Preference
            </label>
            <div className="relative group">
              <select className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all appearance-none cursor-pointer">
                <option>English (US)</option>
                <option>Amharic</option>
                <option>Oromoo</option>
              </select>
              <ChevronRight
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
              Timezone
            </label>
            <div className="relative group">
              <select className="w-full bg-slate-50 border-none rounded-xl py-4 px-5 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600/10 transition-all appearance-none cursor-pointer text-ellipsis overflow-hidden">
                <option>(GMT+03:00) East Africa Time (Addis Ababa)</option>
                <option>(GMT+00:00) UTC</option>
              </select>
              <ChevronRight
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-wider text-blue-600">
            Data Privacy Options
          </h3>

          <div className="space-y-6">
            {/* Privacy Option 1 */}
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center pt-0.5">
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-200 transition-all checked:bg-blue-600 checked:border-blue-600"
                  checked={accountSettings.shareData}
                  onChange={() =>
                    setAccountSettings((prev) => ({
                      ...prev,
                      shareData: !prev.shareData,
                    }))
                  }
                />
                <svg
                  className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                  Share anonymous usage data
                </span>
                <p className="text-xs font-medium text-gray-400">
                  Help us improve the system by sharing non-personally
                  identifiable data.
                </p>
              </div>
            </label>

            {/* Privacy Option 2 */}
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="relative flex items-center pt-0.5">
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-200 transition-all checked:bg-blue-600 checked:border-blue-600"
                  checked={accountSettings.publicProfile}
                  onChange={() =>
                    setAccountSettings((prev) => ({
                      ...prev,
                      publicProfile: !prev.publicProfile,
                    }))
                  }
                />
                <svg
                  className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors">
                  Public profile visibility
                </span>
                <p className="text-xs font-medium text-gray-400">
                  Allow other students to see your department and enrollment
                  status.
                </p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4">
          <button className="bg-slate-50 hover:bg-slate-100 text-gray-700 px-8 py-4 rounded-2xl font-black text-sm transition-colors border border-gray-100">
            Discard Changes
          </button>
          <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all hover:translate-y-[-2px]">
            Update Preferences
          </button>
        </div>
      </div>

      {/* Danger Zone Card */}
      <div className="bg-red-50/20 rounded-[2.5rem] border border-red-100 p-10 space-y-12">
        <div className="flex items-center gap-3 text-red-600">
          <AlertTriangle size={20} />
          <h2 className="text-xl font-black italic tracking-tight">
            Danger Zone
          </h2>
        </div>

        <div className="space-y-10">
          {/* Archive Account */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-red-100/50">
            <div className="space-y-2 max-w-xl">
              <h4 className="text-base font-black text-gray-900">
                Archive Account
              </h4>
              <p className="text-xs font-medium text-gray-500 leading-relaxed">
                Archiving your account will disable your access to the system
                and hide all your submitted complaints from public view. This
                action can only be reversed by contacting the system
                administrator.
              </p>
            </div>
            <button className="bg-red-600 text-white px-8 py-4 rounded-xl font-black text-sm shadow-xl shadow-red-200 hover:bg-red-700 transition-all shrink-0">
              Archive Account
            </button>
          </div>

          {/* Deactivate Account */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div className="space-y-2 max-w-xl">
              <h4 className="text-base font-black text-gray-900">
                Deactivate Account
              </h4>
              <p className="text-xs font-medium text-gray-500 leading-relaxed">
                Permanently remove your account and all associated data. This
                action is irreversible.
              </p>
            </div>
            <button className="border-2 border-red-600 text-red-600 px-8 py-4 rounded-xl font-black text-sm hover:bg-red-50 transition-all shrink-0">
              Deactivate Permanent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
