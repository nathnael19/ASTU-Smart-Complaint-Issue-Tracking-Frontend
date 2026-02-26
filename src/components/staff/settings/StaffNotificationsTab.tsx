import { useState } from "react";
import { Mail, BellRing, Smartphone, AlertTriangle } from "lucide-react";
import SettingsToggle from "../../students/settings/SettingsToggle";

const StaffNotificationsTab = () => {
  const [notifs, setNotifs] = useState({
    newTickets: true,
    ticketUpdates: true,
    slaWarnings: true,
    systemAlerts: true,
    directMentions: true,
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-12">
        {/* Email Notifications Section */}
        <section>
          <div className="flex items-center gap-3 text-[#1e3a8a] border-b border-gray-100 pb-4 mb-6">
            <Mail size={18} />
            <h3 className="text-[13px] font-black uppercase tracking-widest text-[#1e3a8a]">
              Email Notifications
            </h3>
          </div>

          <div className="space-y-6">
            {/* New Tickets */}
            <div className="flex items-center justify-between group">
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-gray-900">
                  New Ticket Assignments
                </h4>
                <p className="text-[12px] font-medium text-gray-500 max-w-md">
                  Get notified immediately when a new ticket is assigned to your
                  department.
                </p>
              </div>
              <SettingsToggle
                active={notifs.newTickets}
                onClick={() =>
                  setNotifs((prev) => ({
                    ...prev,
                    newTickets: !prev.newTickets,
                  }))
                }
              />
            </div>

            {/* Ticket Updates */}
            <div className="flex items-center justify-between group">
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-gray-900">
                  Ticket Comments & Updates
                </h4>
                <p className="text-[12px] font-medium text-gray-500 max-w-md">
                  Receive an email when new comments or status changes are made
                  on your tickets.
                </p>
              </div>
              <SettingsToggle
                active={notifs.ticketUpdates}
                onClick={() =>
                  setNotifs((prev) => ({
                    ...prev,
                    ticketUpdates: !prev.ticketUpdates,
                  }))
                }
              />
            </div>

            {/* SLA Warnings */}
            <div className="flex items-center justify-between group">
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-gray-900">
                  SLA Warnings
                </h4>
                <p className="text-[12px] font-medium text-gray-500 max-w-md">
                  Alerts when unassigned tickets or open tasks are approaching
                  the SLA deadline.
                </p>
              </div>
              <SettingsToggle
                active={notifs.slaWarnings}
                onClick={() =>
                  setNotifs((prev) => ({
                    ...prev,
                    slaWarnings: !prev.slaWarnings,
                  }))
                }
              />
            </div>
          </div>
        </section>

        {/* In-App Notifications Section */}
        <section>
          <div className="flex items-center gap-3 text-[#1e3a8a] border-b border-gray-100 pb-4 mb-6">
            <BellRing size={18} />
            <h3 className="text-[13px] font-black uppercase tracking-widest text-[#1e3a8a]">
              In-App / System Notifications
            </h3>
          </div>

          <div className="space-y-6">
            {/* Direct Mentions */}
            <div className="flex items-center justify-between group">
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-gray-900">
                  Direct Mentions
                </h4>
                <p className="text-[12px] font-medium text-gray-500 max-w-md">
                  Get an in-app ping when staff or admins tag you explicitly in
                  a ticket thread.
                </p>
              </div>
              <SettingsToggle
                active={notifs.directMentions}
                onClick={() =>
                  setNotifs((prev) => ({
                    ...prev,
                    directMentions: !prev.directMentions,
                  }))
                }
              />
            </div>

            {/* System Alerts */}
            <div className="flex items-center justify-between group">
              <div className="space-y-1">
                <h4 className="text-[14px] font-bold text-gray-900">
                  Dashboard & System Alerts
                </h4>
                <p className="text-[12px] font-medium text-gray-500 max-w-md">
                  Notifications regarding ASTU system maintenance or broad
                  organizational changes.
                </p>
              </div>
              <SettingsToggle
                active={notifs.systemAlerts}
                onClick={() =>
                  setNotifs((prev) => ({
                    ...prev,
                    systemAlerts: !prev.systemAlerts,
                  }))
                }
              />
            </div>
          </div>
        </section>

        {/* Urgent Alerts (Mobile/SMS) */}
        <section>
          <div className="flex items-center gap-3 text-[#1e3a8a] border-b border-gray-100 pb-4 mb-6">
            <Smartphone size={18} />
            <h3 className="text-[13px] font-black uppercase tracking-widest text-[#1e3a8a]">
              Urgent & Mobile Alerts
            </h3>
          </div>

          <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div className="flex-1">
              <h4 className="text-[14px] font-bold text-gray-900 mb-1">
                Emergency SMS Broadcaster
              </h4>
              <p className="text-[12px] font-medium text-gray-600 max-w-xl mb-4 leading-relaxed">
                Critical issues (e.g., total network outage, server crash) can
                trigger automated SMS overrides. Only enable this if your role
                requires immediate emergency dispatch.
              </p>
              <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 hover:text-[#1e3a8a] hover:border-[#1e3a8a] rounded-xl text-[12px] font-bold transition-colors">
                Configure SMS Setup
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StaffNotificationsTab;
