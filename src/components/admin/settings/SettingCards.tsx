import {
  Monitor,
  Shield,
  Zap,
  Database,
  Mail,
  Lock,
  AlertTriangle,
  Download,
  History,
} from "lucide-react";
import { useState } from "react";

export const SystemConfiguration = () => (
  <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-8">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#1e3a8a]">
        <Monitor size={20} />
      </div>
      <h3 className="text-xl font-black text-gray-900">System Configuration</h3>
    </div>
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-black text-gray-900 uppercase tracking-widest pl-1">
          Application Name
        </label>
        <input
          type="text"
          defaultValue="ASTU Smart Complaint & Issue Tracking System"
          className="w-full bg-slate-50 border border-transparent rounded-xl py-3.5 px-4 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-black text-gray-900 uppercase tracking-widest pl-1">
          University Email Domain
        </label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <span className="text-sm font-bold">@</span>
          </div>
          <input
            type="text"
            defaultValue="astu.edu.et"
            className="w-full bg-slate-50 border border-transparent rounded-xl py-3.5 pl-10 pr-4 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold"
          />
        </div>
      </div>
    </div>
  </div>
);

export const MaintenanceMode = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
          <AlertTriangle size={20} />
        </div>
        <h3 className="text-xl font-black text-gray-900">Maintenance Mode</h3>
      </div>

      <div className="flex items-start justify-between mb-6">
        <div className="max-w-[70%]">
          <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-1">
            Enable Maintenance Mode
          </h4>
          <p className="text-xs font-medium text-gray-400">
            Only administrators will be able to access the system.
          </p>
        </div>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:ring-offset-2 ${
            enabled ? "bg-[#1e3a8a]" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <div className="bg-orange-50/50 border border-orange-100/50 rounded-2xl p-5">
        <p className="text-xs font-bold text-orange-700 leading-relaxed">
          <span className="font-black underline mr-1">Note:</span>
          Activating maintenance mode will immediately terminate all active
          student and staff sessions.
        </p>
      </div>
    </div>
  );
};

export const SecuritySettings = () => (
  <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-8">
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
        <Shield size={20} />
      </div>
      <h3 className="text-xl font-black text-gray-900">Security Settings</h3>
    </div>
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-black text-gray-900 uppercase tracking-widest pl-1">
          Session Timeout (Minutes)
        </label>
        <input
          type="number"
          defaultValue="30"
          className="w-full bg-slate-50 border border-transparent rounded-xl py-3.5 px-4 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-black text-gray-900 uppercase tracking-widest pl-1">
          IP Whitelisting (Admin Only)
        </label>
        <textarea
          placeholder="Enter IP addresses separated by commas..."
          className="w-full h-32 bg-slate-50 border border-transparent rounded-xl py-3.5 px-4 focus:outline-none focus:bg-white focus:border-[#1e3a8a]/20 focus:ring-4 focus:ring-[#1e3a8a]/5 transition-all text-sm font-bold resize-none"
        />
        <p className="text-[10px] font-medium text-gray-400 pl-1 uppercase tracking-widest">
          Leave blank to allow admin access from any IP.
        </p>
      </div>
    </div>
  </div>
);

export const ApiIntegrations = () => {
  const integrations = [
    {
      name: "SMTP Server",
      status: "Connected",
      icon: Mail,
      actionLabel: "CONFIGURE",
    },
    {
      name: "SSO / Active Directory",
      status: "Not configured",
      icon: Lock,
      actionLabel: "SET UP",
    },
    {
      name: "SIS Database",
      status: "Connected",
      icon: Database,
      actionLabel: "SYNC NOW",
    },
  ];

  return (
    <div className="bg-white rounded-[1.5rem] border border-gray-100 shadow-sm p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
          <Zap size={20} />
        </div>
        <h3 className="text-xl font-black text-gray-900">API Integrations</h3>
      </div>
      <div className="space-y-3">
        {integrations.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-4 rounded-2xl border border-gray-50 hover:border-gray-100 hover:bg-slate-50/50 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-gray-400 group-hover:text-[#1e3a8a] transition-colors">
                <item.icon size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-900">
                  {item.name}
                </h4>
                <p
                  className={`text-[10px] font-bold uppercase tracking-widest ${
                    item.status === "Connected"
                      ? "text-emerald-500"
                      : "text-gray-400"
                  }`}
                >
                  {item.status}
                </p>
              </div>
            </div>
            <button className="text-[10px] font-black text-[#1e3a8a] tracking-[0.1em] hover:underline">
              {item.actionLabel}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SystemBackup = () => (
  <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 flex flex-col md:flex-row md:items-center justify-between gap-8 mt-8">
    <div>
      <h3 className="text-xl font-black text-gray-900 mb-1">System Backup</h3>
      <p className="text-sm font-medium text-gray-500">
        Manage and schedule automated database backups.
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-4">
      <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-black text-sm hover:bg-gray-50 transition-all shadow-sm">
        <History size={18} />
        View Backup History
      </button>
      <button className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gray-900 text-white font-black text-sm hover:bg-black transition-all shadow-xl shadow-gray-900/10">
        <Download size={18} />
        Download Instant Backup
      </button>
    </div>
  </div>
);
