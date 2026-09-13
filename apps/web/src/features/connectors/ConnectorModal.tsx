import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Database, Server, Key, AlertCircle } from 'lucide-react';
import { Connector } from '@da-agent/shared';
import { ConnectorIcon } from './ConnectorIcons';

interface ConnectorModalProps {
  connector: Connector | null;
  onClose: () => void;
  onToggleConnect: (connectorId: string, isConnected: boolean) => void;
}

export const ConnectorModal: React.FC<ConnectorModalProps> = ({
  connector,
  onClose,
  onToggleConnect,
}) => {
  if (!connector) return null;

  const [host, setHost] = useState('db.internal.julius.ai');
  const [port, setPort] = useState(connector.id === 'postgres' ? '5432' : '3306');
  const [database, setDatabase] = useState('analytics_prod');
  const [username, setUsername] = useState('julius_reader');
  const [password, setPassword] = useState('••••••••••••');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'none'>('none');

  const isCloudOAuth = 
    connector.id === 'gdrive' || 
    connector.id === 'gsheets' || 
    connector.id === 'onedrive' || 
    connector.id === 'sharepoint' || 
    connector.id === 'gads' || 
    connector.id === 'metaads';

  const handleTestAndConnect = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult('success');
      onToggleConnect(connector.id, true);
    }, 700);
  };

  const handleDisconnect = () => {
    onToggleConnect(connector.id, false);
    setTestResult('none');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/40 backdrop-blur-[0.5px] z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gray-50 border border-gray-100">
              <ConnectorIcon type={connector.iconType} className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-gray-900">{connector.name}</h3>
                {connector.connected && (
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Connected
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500">{connector.categoryLabel}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          <p className="text-gray-600 leading-relaxed">
            {connector.description}. Credentials are encrypted at rest with AES-256 and only queried on-demand.
          </p>

          {isCloudOAuth ? (
            /* Cloud OAuth Flow */
            <div className="bg-gray-50 border border-gray-200/80 rounded-xl p-4 text-center space-y-3">
              <div className="w-10 h-10 mx-auto rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">OAuth Authorization</h4>
                <p className="text-gray-500 text-[11px] mt-1 max-w-sm mx-auto">
                  Julius connects in read-only mode to fetch schema tables, documents, or campaign metrics.
                </p>
              </div>
              {connector.connected ? (
                <div className="pt-2 flex justify-center gap-2">
                  <span className="px-3 py-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 rounded-lg">
                    Authorized & Active
                  </span>
                  <button
                    onClick={handleDisconnect}
                    className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 font-medium rounded-lg border border-red-200 cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleTestAndConnect}
                  disabled={isTesting}
                  className="px-4 py-2 bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg font-medium text-xs shadow-xs transition-colors cursor-pointer"
                >
                  {isTesting ? 'Authorizing...' : `Authorize ${connector.name}`}
                </button>
              )}
            </div>
          ) : (
            /* Database Credential Form */
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 space-y-1">
                  <label className="font-medium text-gray-700">Host / Hostname</label>
                  <input
                    type="text"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="col-span-1 space-y-1">
                  <label className="font-medium text-gray-700">Port</label>
                  <input
                    type="text"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-medium text-gray-700">Database Name</label>
                <input
                  type="text"
                  value={database}
                  onChange={(e) => setDatabase(e.target.value)}
                  className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {testResult === 'success' && (
                <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-2 text-[11px]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Connection successful! Schema & 14 tables verified.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs text-gray-600 hover:text-gray-900 font-medium"
          >
            Cancel
          </button>

          {!isCloudOAuth && (
            <div className="flex items-center gap-2">
              {connector.connected ? (
                <button
                  onClick={handleDisconnect}
                  className="px-3.5 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg border border-red-200 font-medium cursor-pointer"
                >
                  Disconnect
                </button>
              ) : (
                <button
                  onClick={handleTestAndConnect}
                  disabled={isTesting}
                  className="px-4 py-1.5 text-xs bg-[#2563eb] hover:bg-blue-700 text-white rounded-lg font-medium shadow-xs transition-colors cursor-pointer"
                >
                  {isTesting ? 'Testing connection...' : 'Test & Save Connection'}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
