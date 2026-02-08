import AdminLayout from "../../components/admin/AdminLayout";
import {
  SystemConfiguration,
  MaintenanceMode,
  SecuritySettings,
  ApiIntegrations,
  SystemBackup,
} from "../../components/admin/settings/SettingCards";
import { Bell, Save } from "lucide-react";

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div className="p-8 lg:p-12 max-w-[1400px] mx-auto min-h-[calc(100vh-5rem)] pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Admin System Settings
          </h1>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-2xl transition-all relative border border-gray-100 shadow-sm bg-white cursor-pointer bg-[#fcfdfe]">
              <Bell size={20} />
              <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button className="bg-[#1e3a8a] text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-blue-900/20 hover:bg-blue-950 transition-all flex items-center gap-3 group">
              <Save
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              Save Changes
            </button>
          </div>
        </div>
        {/* CHecking my changes */}

        {/* Settings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-8">
            <SystemConfiguration />
            <SecuritySettings />
          </div>
          <div className="flex flex-col gap-8">
            <MaintenanceMode />
            <ApiIntegrations />
          </div>
        </div>

        {/* Full Width Section */}
        <SystemBackup />

        {/* Footer Footer */}
        <div className="mt-20 pt-10 border-t border-gray-50 flex flex-col items-center justify-center gap-3">
          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
            © 2024 Adama Science and Technology University - Admin Control
            Panel. All rights reserved.
          </span>
          <div className="flex items-center gap-6 text-[10px] font-black text-gray-300 uppercase tracking-widest">
            <span className="cursor-pointer hover:text-gray-900 transition-colors">
              Documentation
            </span>
            <span className="cursor-pointer hover:text-gray-900 transition-colors">
              System Status
            </span>
            <span className="cursor-pointer hover:text-gray-900 transition-colors">
              Support
            </span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
