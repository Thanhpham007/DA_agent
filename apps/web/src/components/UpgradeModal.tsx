import React from 'react';
import { X, Check, Sparkles, Zap, ShieldCheck, Database } from 'lucide-react';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: 'pro' | 'team') => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  onSelectPlan,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-[0.5px] z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 pb-4 border-b border-gray-100 flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
              Julius Premium Plans
            </span>
            <h2 className="text-xl font-bold text-gray-900 mt-1">Upgrade to get full powers</h2>
            <p className="text-xs text-gray-500 mt-1">
              Remove the 1-hour file retention limit, unlock unlimited reasoning queries, and connect enterprise warehouses.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pro Plan */}
          <div className="border-2 border-blue-600 rounded-2xl p-5 bg-blue-50/10 flex flex-col justify-between relative shadow-xs">
            <div className="absolute -top-3 right-4 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-blue-600 font-semibold text-xs mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Julius Pro</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1 mb-3">
                <span className="text-3xl font-extrabold text-gray-900">$20</span>
                <span className="text-xs text-gray-500">/ month</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span><strong>Permanent file retention</strong> (no 1-hour deletion)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span><strong>Unlimited</strong> Python data executions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Full access to Claude 3.5 Sonnet & GPT-4o</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Browser Agent & Build Website mode</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                onSelectPlan('pro');
                onClose();
              }}
              className="mt-6 w-full py-2 bg-[#2563eb] hover:bg-blue-700 text-white font-medium text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Start Pro 7-Day Trial
            </button>
          </div>

          {/* Team / Enterprise */}
          <div className="border border-gray-200 rounded-2xl p-5 bg-white flex flex-col justify-between hover:border-gray-300 transition shadow-2xs">
            <div>
              <div className="flex items-center gap-1.5 text-gray-700 font-semibold text-xs mb-1">
                <Database className="w-3.5 h-3.5 text-purple-600" />
                <span>Team & Enterprise</span>
              </div>
              <div className="flex items-baseline gap-1 mt-1 mb-3">
                <span className="text-3xl font-extrabold text-gray-900">$45</span>
                <span className="text-xs text-gray-500">/ user / mo</span>
              </div>
              <ul className="space-y-2 text-xs text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>All Pro capabilities included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>BigQuery & Snowflake enterprise pooling</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Shared Team Workspace & Library</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>SOC2 Type II & HIPAA compliance</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                onSelectPlan('team');
                onClose();
              }}
              className="mt-6 w-full py-2 bg-gray-900 hover:bg-black text-white font-medium text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Contact Sales / Start Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
