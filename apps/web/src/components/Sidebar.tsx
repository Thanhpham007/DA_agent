import React, { useState } from 'react';
import { 
  FileText, 
  Link2, 
  BarChart2, 
  Search, 
  HelpCircle, 
  Bell, 
  ChevronDown, 
  PenSquare, 
  PanelLeftClose, 
  PanelLeftOpen,
  Sparkles,
  CreditCard,
  Settings,
  LogOut,
  Check
} from 'lucide-react';
import type { UserProfile } from '@da-agent/shared';
import type { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  onNewTask: () => void;
  onOpenSearch: () => void;
  onOpenHelp: () => void;
  onOpenUpgrade: () => void;
  onOpenSettings: () => void;
  onToggleNotifications: () => void;
  hasUnreadNotifications: boolean;
  currentUser: UserProfile;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onSelectView,
  onNewTask,
  onOpenSearch,
  onOpenHelp,
  onOpenUpgrade,
  onOpenSettings,
  onToggleNotifications,
  hasUnreadNotifications,
  currentUser,
  isCollapsed,
  onToggleCollapse,
}) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  return (
    <aside
      className={`${
        isCollapsed ? 'w-16' : 'w-[240px]'
      } shrink-0 flex flex-col justify-between border-r border-[#ececee] bg-white h-full transition-all duration-200 select-none z-20`}
    >
      {/* Top Section */}
      <div className="flex flex-col gap-2 p-3.5">
        {/* Logo & Header Actions */}
        <div className="flex items-center justify-between px-1 pt-1 pb-1">
          {!isCollapsed ? (
            <button 
              onClick={() => onSelectView('workspace')}
              className="text-[23px] font-bold tracking-tight text-[#175cd3] hover:opacity-90 transition leading-none text-left cursor-pointer"
            >
              Julius
            </button>
          ) : (
            <button 
              onClick={() => onSelectView('workspace')}
              className="text-xl font-bold text-[#175cd3] mx-auto cursor-pointer"
            >
              J
            </button>
          )}

          <div className="flex items-center gap-1.5 text-gray-500">
            <button
              onClick={onToggleCollapse}
              className="hover:text-gray-800 hover:bg-gray-100 p-1 rounded transition-colors"
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-[18px] h-[18px]" />
              ) : (
                <PanelLeftClose className="w-[18px] h-[18px]" />
              )}
            </button>

            {!isCollapsed && (
              <button
                onClick={onToggleNotifications}
                className="hover:text-gray-800 hover:bg-gray-100 p-1 rounded transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-[18px] h-[18px]" />
                {hasUnreadNotifications && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white"></span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* User Profile Selector with Dropdown */}
        <div className="relative mt-0.5">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className={`flex items-center justify-between w-full px-2 py-1.5 rounded-lg hover:bg-gray-100/80 transition-colors text-left ${
              isCollapsed ? 'justify-center px-1' : ''
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <img
                src={currentUser.avatarUrl}
                alt="Avatar"
                className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-gray-200"
              />
              {!isCollapsed && (
                <span className="text-xs font-medium text-gray-700 truncate max-w-[140px]">
                  {currentUser.email}
                </span>
              )}
            </div>
            {!isCollapsed && (
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            )}
          </button>

          {/* User Menu Popover */}
          {isUserMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setIsUserMenuOpen(false)} 
              />
              <div className="absolute left-0 top-full mt-1.5 w-60 bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-40 text-xs">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="font-semibold text-gray-900">{currentUser.name}</p>
                  <p className="text-gray-500 truncate">{currentUser.email}</p>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {currentUser.plan.toUpperCase()} PLAN
                    </span>
                    <span className="text-gray-500 text-[11px]">{currentUser.tokens} queries left</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onOpenUpgrade();
                    }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Upgrade to Pro</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onOpenSettings();
                    }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-gray-500" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onOpenUpgrade();
                    }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-gray-500" />
                    <span>Subscription & Billing</span>
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-1">
                  <button
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* New Task Button */}
        <div className="pt-1">
          <button
            onClick={() => {
              onNewTask();
              onSelectView('workspace');
            }}
            className={`flex items-center gap-2 w-full px-3 py-2 text-[13px] font-medium text-gray-700 border border-gray-200/90 rounded-full shadow-xs hover:bg-gray-50 hover:border-gray-300 transition-all bg-white ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
            title="New Task"
          >
            <PenSquare className="w-3.5 h-3.5 text-gray-600 shrink-0" />
            {!isCollapsed && <span>New Task</span>}
          </button>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex flex-col gap-0.5 mt-2 text-[13.5px]">
          {/* Library */}
          <button
            onClick={() => onSelectView('library')}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
              isCollapsed ? 'justify-center px-0' : ''
            } ${
              currentView === 'library'
                ? 'bg-[#f1f1f3] text-gray-900 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 font-normal'
            }`}
            title="Library"
          >
            <BarChart2 className={`w-4 h-4 shrink-0 ${currentView === 'library' ? 'text-gray-700' : 'text-gray-500'}`} />
            {!isCollapsed && <span>Library</span>}
          </button>

          {/* Data Connectors */}
          <button
            onClick={() => onSelectView('connectors')}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
              isCollapsed ? 'justify-center px-0' : ''
            } ${
              currentView === 'connectors'
                ? 'bg-[#f1f1f3] text-gray-900 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 font-normal'
            }`}
            title="Data Connectors"
          >
            <Link2 className={`w-4 h-4 shrink-0 ${currentView === 'connectors' ? 'text-gray-700' : 'text-gray-500'}`} />
            {!isCollapsed && <span>Data Connectors</span>}
          </button>

          {/* Files */}
          <button
            onClick={() => onSelectView('files')}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors text-left ${
              isCollapsed ? 'justify-center px-0' : ''
            } ${
              currentView === 'files'
                ? 'bg-[#f1f1f3] text-gray-900 font-medium'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70 font-normal'
            }`}
            title="Files"
          >
            <FileText className={`w-4 h-4 shrink-0 ${currentView === 'files' ? 'text-gray-700' : 'text-gray-500'}`} />
            {!isCollapsed && <span>Files</span>}
          </button>
        </nav>

        {/* Search Tasks Trigger */}
        <div className="mt-1">
          <button
            onClick={onOpenSearch}
            className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[13px] text-gray-600 hover:text-gray-900 hover:bg-gray-100/60 rounded-lg transition-colors w-full text-left ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
            title="Search tasks (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            {!isCollapsed && (
              <div className="flex items-center justify-between w-full">
                <span>Search tasks</span>
                <kbd className="hidden sm:inline-block text-[10px] text-gray-400 font-mono bg-gray-100 px-1 py-0.5 rounded border border-gray-200">
                  ⌘K
                </kbd>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Section: Help */}
      <div className="p-3 border-t border-transparent">
        <button
          onClick={onOpenHelp}
          className={`text-gray-400 hover:text-gray-700 p-1.5 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 ${
            isCollapsed ? 'mx-auto' : ''
          }`}
          title="Help & Support"
        >
          <HelpCircle className="w-[18px] h-[18px]" />
          {!isCollapsed && <span className="text-xs text-gray-500 font-normal">Help</span>}
        </button>
      </div>
    </aside>
  );
};
