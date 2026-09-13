import React, { useState, useEffect } from 'react';
import type { ArtifactItem, Connector, TaskItem, UploadedFile, UserProfile } from '@da-agent/shared';
import type { ViewMode } from './types';
import {
  currentUser as initialUser,
  initialFiles,
  initialTasks,
  connectorsList,
  initialArtifacts,
} from './stores/mockData';

import { Sidebar } from './components/Sidebar';
import { HeaderUtilities } from './components/HeaderUtilities';
import { WorkspaceView } from './features/workspace/WorkspaceView';
import { FilesView } from './features/files/FilesView';
import { ConnectorsView } from './features/connectors/ConnectorsView';
import { LibraryView } from './features/library/LibraryView';
import { SearchTasksModal } from './features/workspace/SearchTasksModal';
import { ConnectorModal } from './features/connectors/ConnectorModal';
import { UpgradeModal } from './components/UpgradeModal';
import { SettingsModal } from './components/SettingsModal';
import { HelpModal } from './components/HelpModal';
import { NotificationPopover } from './components/NotificationPopover';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('workspace');
  const [currentUser, setCurrentUser] = useState<UserProfile>(initialUser);
  const [files, setFiles] = useState<UploadedFile[]>(initialFiles);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [connectors, setConnectors] = useState<Connector[]>(connectorsList);
  const [artifacts, setArtifacts] = useState<ArtifactItem[]>(initialArtifacts);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUploadFile = (file: File) => {
    const formatBytes = (bytes: number): string => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const newUploadedFile: UploadedFile = {
      id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: file.name,
      size: file.size,
      sizeFormatted: formatBytes(file.size),
      uploadDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      type: file.name.split('.').pop() || 'txt',
      status: 'ready',
      dataRowCount: Math.floor(Math.random() * 50000) + 1200,
    };

    setFiles((prev) => [newUploadedFile, ...prev]);
  };

  const handleDeleteFiles = (ids: string[]) => {
    setFiles((prev) => prev.filter((f) => !ids.includes(f.id)));
  };

  const handleChatWithFiles = (_fileIds: string[]) => {
    setCurrentView('workspace');
  };

  const handleToggleConnector = (connectorId: string, isConnected: boolean) => {
    setConnectors((prev) =>
      prev.map((c) => (c.id === connectorId ? { ...c, connected: isConnected } : c))
    );
    if (selectedConnector && selectedConnector.id === connectorId) {
      setSelectedConnector({ ...selectedConnector, connected: isConnected });
    }
  };

  const handleSaveToLibrary = (newArtifact: ArtifactItem) => {
    setArtifacts((prev) => [newArtifact, ...prev]);
    setCurrentView('library');
  };

  const handleDeleteArtifact = (id: string) => {
    setArtifacts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleLoadSampleFiles = () => {
    setFiles(initialFiles);
  };

  const handleLoadSampleArtifacts = () => {
    setArtifacts(initialArtifacts);
  };

  const handleSelectTask = (_task: TaskItem) => {
    setCurrentView('workspace');
  };

  const handleNewTask = () => {
    setCurrentView('workspace');
  };

  const handleExportWorkspace = () => {
    const dataToExport = {
      user: currentUser,
      filesCount: files.length,
      tasksCount: tasks.length,
      artifactsCount: artifacts.length,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `julius_workspace_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#fbfbfb] text-[#1e293b] select-none font-sans relative">
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        onNewTask={handleNewTask}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenUpgrade={() => setIsUpgradeOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onToggleNotifications={() => setIsNotificationsOpen(!isNotificationsOpen)}
        hasUnreadNotifications={true}
        currentUser={currentUser}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <NotificationPopover
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onOpenUpgrade={() => setIsUpgradeOpen(true)}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <HeaderUtilities
          currentUser={currentUser}
          onOpenUpgrade={() => setIsUpgradeOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenHelp={() => setIsHelpOpen(true)}
          onExportWorkspace={handleExportWorkspace}
        />

        {currentView === 'workspace' && (
          <WorkspaceView
            onOpenUpgrade={() => setIsUpgradeOpen(true)}
            onSaveToLibrary={handleSaveToLibrary}
            files={files}
            onUploadFile={handleUploadFile}
          />
        )}

        {currentView === 'files' && (
          <FilesView
            files={files}
            onUploadFile={handleUploadFile}
            onDeleteFiles={handleDeleteFiles}
            onSelectView={setCurrentView}
            onOpenUpgrade={() => setIsUpgradeOpen(true)}
            onChatWithFiles={handleChatWithFiles}
            onLoadSampleFiles={handleLoadSampleFiles}
          />
        )}

        {currentView === 'connectors' && (
          <ConnectorsView
            connectors={connectors}
            onSelectConnector={(connector) => setSelectedConnector(connector)}
          />
        )}

        {currentView === 'library' && (
          <LibraryView
            artifacts={artifacts}
            onDeleteArtifact={handleDeleteArtifact}
            onLoadSampleArtifacts={handleLoadSampleArtifacts}
          />
        )}
      </div>

      <SearchTasksModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tasks={tasks}
        onSelectTask={handleSelectTask}
        onNewTask={handleNewTask}
      />

      <ConnectorModal
        connector={selectedConnector}
        onClose={() => setSelectedConnector(null)}
        onToggleConnect={handleToggleConnector}
      />

      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onSelectPlan={(plan) => {
          setCurrentUser((prev) => ({ ...prev, plan, tokens: 500 }));
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        currentUser={currentUser}
        onUpdateUser={(updated) => setCurrentUser((prev) => ({ ...prev, ...updated }))}
      />

      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
