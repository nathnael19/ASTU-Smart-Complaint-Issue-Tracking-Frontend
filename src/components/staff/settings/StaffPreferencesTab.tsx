import { useState } from "react";
import { Palette, Globe, Layout, ChevronDown } from "lucide-react";

const StaffPreferencesTab = () => {
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const [density, setDensity] = useState("comfortable");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-12">
        {/* Appearance Section */}
        <section>
          <div className="flex items-center gap-3 text-[#1e3a8a] border-b border-gray-100 pb-4 mb-6">
            <Palette size={18} />
            <h3 className="text-[13px] font-black uppercase tracking-widest text-[#1e3a8a]">
              Appearance & Theme
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[14px] font-bold text-gray-900 mb-1">
                Dashboard Theme
              </label>
              <p className="text-[12px] font-medium text-gray-500 mb-4">
                Select your preferred color scheme for the ASTU Staff Portal.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Light Theme Option */}
                <button
                  onClick={() => setTheme("light")}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    theme === "light"
                      ? "border-[#1e3a8a] bg-blue-50/30"
                      : "border-gray-100 hover:border-gray-200 bg-white"
                  }`}
                >
                  <div className="w-full h-16 rounded-lg bg-slate-50 border border-gray-200 flex flex-col gap-1.5 p-2">
                    <div className="w-full h-2 bg-white rounded-sm"></div>
                    <div className="w-2/3 h-2 bg-white rounded-sm"></div>
                    <div className="w-1/2 h-2 bg-[#1e3a8a]/20 rounded-sm mt-auto"></div>
                  </div>
                  <span
                    className={`text-[12px] font-bold ${theme === "light" ? "text-[#1e3a8a]" : "text-gray-600"}`}
                  >
                    Light Mode
                  </span>
                </button>

                {/* Dark Theme Option */}
                <button
                  onClick={() => setTheme("dark")}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    theme === "dark"
                      ? "border-[#1e3a8a] bg-blue-50/30"
                      : "border-gray-100 hover:border-gray-200 bg-white"
                  }`}
                >
                  <div className="w-full h-16 rounded-lg bg-slate-900 border border-slate-700 flex flex-col gap-1.5 p-2">
                    <div className="w-full h-2 bg-slate-800 rounded-sm"></div>
                    <div className="w-2/3 h-2 bg-slate-800 rounded-sm"></div>
                    <div className="w-1/2 h-2 bg-blue-500/40 rounded-sm mt-auto"></div>
                  </div>
                  <span
                    className={`text-[12px] font-bold ${theme === "dark" ? "text-[#1e3a8a]" : "text-gray-600"}`}
                  >
                    Dark Mode
                  </span>
                </button>

                {/* System Theme Option */}
                <button
                  onClick={() => setTheme("system")}
                  className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    theme === "system"
                      ? "border-[#1e3a8a] bg-blue-50/30"
                      : "border-gray-100 hover:border-gray-200 bg-white"
                  }`}
                >
                  <div className="w-full h-16 rounded-lg flex overflow-hidden border border-gray-200">
                    <div className="flex-1 bg-slate-50 p-2 flex flex-col gap-1.5 border-r border-gray-200/50">
                      <div className="w-full h-2 bg-white rounded-sm"></div>
                      <div className="w-2/3 h-2 bg-white rounded-sm"></div>
                    </div>
                    <div className="flex-1 bg-slate-900 p-2 flex flex-col gap-1.5">
                      <div className="w-full h-2 bg-slate-800 rounded-sm"></div>
                      <div className="w-2/3 h-2 bg-slate-800 rounded-sm"></div>
                    </div>
                  </div>
                  <span
                    className={`text-[12px] font-bold ${theme === "system" ? "text-[#1e3a8a]" : "text-gray-600"}`}
                  >
                    System Sync
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Regional & Language */}
        <section>
          <div className="flex items-center gap-3 text-[#1e3a8a] border-b border-gray-100 pb-4 mb-6">
            <Globe size={18} />
            <h3 className="text-[13px] font-black uppercase tracking-widest text-[#1e3a8a]">
              Localization Options
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block text-[11px] font-black tracking-widest uppercase text-gray-400 mb-2">
                Interface Language
              </label>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-slate-50/50 text-[#1e3a8a] text-[14px] font-semibold appearance-none focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]/20 focus:border-[#1e3a8a] transition-all"
                >
                  <option value="en">English (US)</option>
                  <option value="am">Amharic (አማርኛ)</option>
                  <option value="or">Oromo (Afaan Oromoo)</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black tracking-widest uppercase text-gray-400 mb-2">
                Timezone
              </label>
              <div className="relative">
                <select
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-100/50 text-gray-500 text-[14px] font-semibold appearance-none cursor-not-allowed"
                >
                  <option>East Africa Time (EAT)</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
                  size={16}
                />
              </div>
              <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-wide">
                Locked to institution default
              </p>
            </div>
          </div>
        </section>

        {/* Table/List View Density */}
        <section>
          <div className="flex items-center gap-3 text-[#1e3a8a] border-b border-gray-100 pb-4 mb-6">
            <Layout size={18} />
            <h3 className="text-[13px] font-black uppercase tracking-widest text-[#1e3a8a]">
              Workspace Layout
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[14px] font-bold text-gray-900 mb-1">
                Data Density
              </label>
              <p className="text-[12px] font-medium text-gray-500 mb-4">
                Control how much information is shown at once on tables like
                Department Tasks and Resolved Issues.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <label
                  className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${density === "compact" ? "border-[#1e3a8a] bg-blue-50/30" : "border-gray-100 hover:border-gray-200 bg-white"}`}
                >
                  <input
                    type="radio"
                    name="density"
                    value="compact"
                    checked={density === "compact"}
                    onChange={() => setDensity("compact")}
                    className="w-4 h-4 text-[#1e3a8a] focus:ring-[#1e3a8a] border-gray-300"
                  />
                  <div>
                    <span className="block text-[13px] font-bold text-gray-900">
                      Compact
                    </span>
                    <span className="block text-[11px] font-medium text-gray-500">
                      More rows, less whitespace
                    </span>
                  </div>
                </label>

                <label
                  className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${density === "comfortable" ? "border-[#1e3a8a] bg-blue-50/30" : "border-gray-100 hover:border-gray-200 bg-white"}`}
                >
                  <input
                    type="radio"
                    name="density"
                    value="comfortable"
                    checked={density === "comfortable"}
                    onChange={() => setDensity("comfortable")}
                    className="w-4 h-4 text-[#1e3a8a] focus:ring-[#1e3a8a] border-gray-300"
                  />
                  <div>
                    <span className="block text-[13px] font-bold text-gray-900">
                      Comfortable
                    </span>
                    <span className="block text-[11px] font-medium text-gray-500">
                      Standard padding, easy to read
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StaffPreferencesTab;
