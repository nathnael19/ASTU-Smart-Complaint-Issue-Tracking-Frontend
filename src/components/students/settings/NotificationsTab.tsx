import { useState } from "react";
import { Mail, BellRing, Smartphone, Moon } from "lucide-react";
import SettingsToggle from "./SettingsToggle";

interface NotificationsTabProps {
  profile: any;
}

const NotificationsTab = ({ profile: _profile }: NotificationsTabProps) => {
  const [notifs, setNotifs] = useState({
    statusUpdates: true,
    newComments: true,
    weeklySummary: false,
    systemAlerts: true,
    ticketMentions: true,
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-10 space-y-12">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-gray-900">
            Notification Preferences
          </h2>
          <p className="text-gray-400 font-medium text-sm">
            Choose how you want to be notified about updates and activity.
          </p>
        </div>

        {/* Email Notifications Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 text-blue-600 border-b border-gray-50 pb-4">
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
                  Get notified immediately when your ticket is assigned,
                  updated, or resolved.
                </p>
              </div>
              <SettingsToggle
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
                  Receive an email when staff or admins post a message on your
                  complaint.
                </p>
              </div>
              <SettingsToggle
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
                  A recap of your active complaints and resolution metrics sent
                  every Monday.
                </p>
              </div>
              <SettingsToggle
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
          <div className="flex items-center gap-3 text-blue-600 border-b border-gray-50 pb-4">
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
                  Notifications about maintenance windows, policy changes, and
                  system news.
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

            {/* Ticket Mentions */}
            <div className="flex items-center justify-between group">
              <div className="space-y-1">
                <h4 className="text-sm font-black text-gray-900">
                  Ticket Mentions
                </h4>
                <p className="text-xs font-medium text-gray-400 max-w-md">
                  Get notified when someone tags you in a collaborative
                  complaint discussion.
                </p>
              </div>
              <SettingsToggle
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
          <button className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-600/20 hover:bg-blue-700 transition-all hover:translate-y-[-2px]">
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
            <h4 className="text-base font-black text-gray-900">Mobile Push</h4>
            <p className="text-xs font-medium text-gray-400 leading-relaxed">
              You can also enable push notifications on the ASTU mobile app for
              real-time tracking.
            </p>
          </div>
        </div>

        {/* Quiet Hours */}
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm flex items-start gap-5">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 shrink-0">
            <Moon size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-black text-gray-900">Quiet Hours</h4>
            <p className="text-xs font-medium text-gray-400 leading-relaxed">
              Set times when you don't want to receive any non-critical system
              notifications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;
