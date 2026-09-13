import React from 'react';
import { X, Bell, Sparkles, CheckCircle2, Globe, Database } from 'lucide-react';

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUpgrade: () => void;
}

export const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  isOpen,
  onClose,
  onOpenUpgrade,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      <div className="absolute left-[245px] top-12 w-80 bg-white border border-gray-200 rounded-2xl shadow-xl p-4 z-40 text-xs animate-in fade-in zoom-in-95 duration-100">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" />
            <h4 className="font-semibold text-gray-900">Notifications</h4>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="py-2 space-y-3">
          <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100/60 space-y-1">
            <div className="flex items-center justify-between font-semibold text-blue-900">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                Browser Agent Released
              </span>
              <span className="text-[10px] text-blue-600 font-normal">New</span>
            </div>
            <p className="text-[11px] text-blue-800 leading-relaxed">
              You can now prompt Julius to perform real-time web research, extract competitor data, and download live files.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-100 space-y-1">
            <div className="flex items-center justify-between font-semibold text-gray-800">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                Connectors & MCPs Catalog
              </span>
              <span className="text-[10px] text-gray-400 font-normal">2d ago</span>
            </div>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Google Drive, Sheets, Microsoft OneDrive, and 10+ relational databases now support live queries.
            </p>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 text-center">
          <button
            onClick={() => {
              onClose();
              onOpenUpgrade();
            }}
            className="text-blue-600 hover:underline font-medium text-[11px]"
          >
            Upgrade to get higher rate limits →
          </button>
        </div>
      </div>
    </>
  );
};
