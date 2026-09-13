import React, { useState } from 'react';
import { X, User, Sliders, Shield, Key, Bell, Check } from 'lucide-react';
import type { UserProfile } from '@da-agent/shared';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'model' | 'security'>('profile');
  const [name, setName] = useState(currentUser.name);
  const [defaultReasoning, setDefaultReasoning] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateUser({ name });
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-[0.5px] z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h3 className="text-base font-bold text-gray-900">Workspace Settings</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs & Content */}
        <div className="flex border-b border-gray-100 px-5 text-xs font-medium text-gray-600 gap-6">
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'profile' ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent hover:text-gray-900'
            }`}
          >
            Profile & Account
          </button>
          <button
            onClick={() => setActiveTab('model')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'model' ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent hover:text-gray-900'
            }`}
          >
            AI & Execution Defaults
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'security' ? 'border-blue-600 text-blue-600 font-semibold' : 'border-transparent hover:text-gray-900'
            }`}
          >
            Data Privacy & Security
          </button>
        </div>

        <div className="p-6 text-xs space-y-4">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={currentUser.avatarUrl}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{currentUser.name}</h4>
                  <p className="text-gray-500 text-xs">{currentUser.email}</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-gray-700">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-medium text-gray-700">Current Plan</label>
                <div className="p-3 rounded-lg border border-gray-200 bg-gray-50 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-gray-800">Free Tier</span>
                    <p className="text-[11px] text-gray-500">50 daily queries, 1-hour file retention.</p>
                  </div>
                  <span className="text-blue-600 font-semibold">Active</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'model' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-xl">
                <div>
                  <h4 className="font-semibold text-gray-800">Always Enable Step-by-Step Reasoning</h4>
                  <p className="text-gray-500 text-[11px]">Displays chain-of-thought analysis logs and Python traces by default.</p>
                </div>
                <input
                  type="checkbox"
                  checked={defaultReasoning}
                  onChange={(e) => setDefaultReasoning(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
              </div>

              <div className="p-3 border border-gray-200 rounded-xl bg-gray-50/50">
                <h4 className="font-semibold text-gray-800 mb-1">Code Sandbox Engine</h4>
                <p className="text-gray-500 text-[11px]">Running Python 3.11 with Pandas, NumPy, Scikit-learn, Matplotlib, and Seaborn preloaded.</p>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-3">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                <h4 className="font-semibold text-xs flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  Zero-Training Guarantee
                </h4>
                <p className="text-[11px] text-emerald-800 mt-1">
                  Your uploaded datasets, queries, and connectors are never used to train foundation models.
                </p>
              </div>
              <p className="text-gray-500 text-[11px]">
                File uploads in Free tier are wiped clean after 60 minutes of inactivity. Pro tier retains files in encrypted persistent storage.
              </p>
            </div>
          )}

          {savedNotice && (
            <div className="p-2 bg-blue-50 text-blue-700 rounded-lg flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              <span>Settings updated successfully!</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-900 font-medium cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-xs transition-colors cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
