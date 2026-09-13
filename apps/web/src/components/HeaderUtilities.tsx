import React, { useState } from 'react';
import { Clock, Settings, MoreHorizontal, Sparkles, Download, Keyboard, HelpCircle } from 'lucide-react';
import type { UserProfile } from '@da-agent/shared';

interface HeaderUtilitiesProps {
  currentUser: UserProfile;
  onOpenUpgrade: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  onExportWorkspace?: () => void;
}

export const HeaderUtilities: React.FC<HeaderUtilitiesProps> = ({
  currentUser,
  onOpenUpgrade,
  onOpenSettings,
  onOpenHelp,
  onExportWorkspace,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 right-0 p-4 flex items-center space-x-2.5 z-20">
      {/* Token / Credits Badge */}
      <button
        onClick={onOpenUpgrade}
        className="flex items-center space-x-1.5 px-2.5 py-1 rounded-md border border-gray-200 bg-white shadow-2xs text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition cursor-pointer"
        title="Credits remaining this cycle. Click to upgrade."
      >
        <Clock className="w-3.5 h-3.5 text-gray-600" />
        <span>{currentUser.tokens}</span>
      </button>

      {/* Settings Icon */}
      <button
        onClick={onOpenSettings}
        aria-label="Settings"
        className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100/80 rounded-md transition"
        title="Settings"
      >
        <Settings className="w-4 h-4" />
      </button>

      {/* More Options Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="More options"
          className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100/80 rounded-md transition"
          title="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>

        {isMenuOpen && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setIsMenuOpen(false)} />
            <div className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-40 text-xs text-gray-700">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenUpgrade();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 font-medium"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Upgrade to Pro Plan</span>
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onExportWorkspace?.();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
              >
                <Download className="w-3.5 h-3.5 text-gray-500" />
                <span>Export workspace data</span>
              </button>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenHelp();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50"
              >
                <Keyboard className="w-3.5 h-3.5 text-gray-500" />
                <span>Keyboard shortcuts</span>
              </button>

              <div className="border-t border-gray-100 my-1"></div>

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenHelp();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-50 text-gray-500"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Documentation & FAQs</span>
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
