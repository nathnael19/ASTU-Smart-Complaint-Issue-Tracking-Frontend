import {
  X,
  Check,
  Bell,
  Info,
  AlertTriangle,
  AlertCircle,
  ExternalLink,
  Clock,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { markAsRead, markAllAsRead } from "../../api/notifications";
import type { Notification } from "../../api/notifications";
import { useNavigate } from "react-router-dom";
import { cn } from "../../lib/utils";

interface NotificationModalProps {
  notifications: Notification[];
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
}

const NotificationModal = ({
  notifications,
  isOpen,
  onClose,
  onRefresh,
}: NotificationModalProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleMarkAsRead = async (id: string, link?: string) => {
    try {
      await markAsRead(id);
      onRefresh();
      if (link) {
        navigate(link);
        onClose();
      }
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();
      onRefresh();
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "STATUS_CHANGE":
        return <AlertTriangle className="text-orange-500" size={18} />;
      case "NEW_COMMENT":
        return <Info className="text-blue-500" size={18} />;
      case "SYSTEM":
        return <AlertCircle className="text-purple-500" size={18} />;
      default:
        return <Bell className="text-gray-500" size={18} />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-[60] animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-24 right-8 w-full max-w-[420px] bg-white/90 backdrop-blur-xl border border-white/50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[70] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
              <Bell size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 leading-none">
                Notifications
              </h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                Stay updated
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[480px] overflow-y-auto custom-scrollbar p-4 space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleMarkAsRead(notif.id, notif.link)}
                className={cn(
                  "p-5 rounded-3xl transition-all cursor-pointer group relative flex gap-4",
                  notif.is_read
                    ? "bg-transparent opacity-60 grayscale-[0.5]"
                    : "bg-white hover:bg-blue-50 shadow-sm hover:shadow-md border border-gray-50",
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all",
                    notif.is_read
                      ? "bg-gray-100"
                      : "bg-white shadow-sm border border-gray-100 group-hover:scale-110",
                  )}
                >
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-black text-gray-900">
                      {notif.title}
                    </h4>
                    {!notif.is_read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-gray-500 leading-relaxed line-clamp-2">
                    {notif.message}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <Clock size={12} className="text-gray-400" />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                      {formatDistanceToNow(new Date(notif.created_at), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>

                {notif.link && (
                  <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={14} className="text-blue-600" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-gray-200">
                <Bell size={40} />
              </div>
              <div className="space-y-1">
                <p className="text-base font-black text-gray-900">
                  All caught up!
                </p>
                <p className="text-xs font-medium text-gray-400">
                  No new notifications to show.
                </p>
              </div>
            </div>
          )}
        </div>

        {notifications.some((n) => !n.is_read) && (
          <div className="p-6 border-t border-gray-100 bg-gray-50/50">
            <button
              onClick={handleMarkAllRead}
              className="w-full bg-white border border-gray-200 py-4 rounded-2xl text-xs font-black text-gray-600 hover:text-blue-600 hover:border-blue-100 hover:shadow-lg hover:shadow-blue-600/5 transition-all flex items-center justify-center gap-2"
            >
              <Check size={16} />
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationModal;
