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
      <div className="page pb-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <h1 className="page-title">Admin System Settings</h1>
          <div className="flex items-center gap-4">
            <button className="w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-white rounded-2xl transition-all relative border border-gray-100 shadow-sm bg-white cursor-pointer">
              <Bell size={20} />
              <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button className="btn-primary px-8 py-3.5 rounded-2xl text-sm shadow-xl shadow-blue-900/20 transition-all flex items-center gap-3 group">
              <Save
                size={18}
                className="group-hover:scale-110 transition-transform"
              />
              Save Changes
            </button>
          </div>
        </div>

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
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
