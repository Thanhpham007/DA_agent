import React from 'react';
import { X, Keyboard, HelpCircle, BookOpen, MessageSquare, ExternalLink } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '⌘ + K / Ctrl + K', description: 'Open quick task search' },
    { key: 'Enter', description: 'Send prompt or execute query' },
    { key: 'Shift + Enter', description: 'New line in chat textarea' },
    { key: 'Esc', description: 'Close any active modal or drawer' },
  ];

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-[0.5px] z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-gray-900">Help & Shortcuts</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 text-xs space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-1.5">
              <Keyboard className="w-4 h-4 text-gray-500" />
              <span>Keyboard Shortcuts</span>
            </h4>
            <div className="space-y-1.5">
              {shortcuts.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
                  <span className="text-gray-600">{s.description}</span>
                  <kbd className="font-mono text-[10px] bg-white border border-gray-200 px-1.5 py-0.5 rounded shadow-2xs font-semibold text-gray-700">
                    {s.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-gray-500" />
              <span>Getting Started with Julius</span>
            </h4>
            <ul className="space-y-2 text-gray-600">
              <li>• <strong>Upload files</strong>: Drag CSV, Excel, or JSON files into the "Files" tab or directly into chat.</li>
              <li>• <strong>Connect Databases</strong>: Use "Data Connectors" to link Postgres, MySQL, BigQuery, or Google Drive.</li>
              <li>• <strong>Reasoning Mode</strong>: Enable Reasoning to see the internal Python traces and step-by-step logic.</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-gray-900 hover:bg-black text-white rounded-lg text-xs font-medium cursor-pointer"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
