import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Search, 
  Download, 
  Trash2, 
  MessageSquare, 
  FileText, 
  ChevronUp, 
  ChevronDown, 
  FileSpreadsheet, 
  FileCode, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { UploadedFile } from '@da-agent/shared';
import type { ViewMode } from '../../types';

interface FilesViewProps {
  files: UploadedFile[];
  onUploadFile: (file: File) => void;
  onDeleteFiles: (ids: string[]) => void;
  onSelectView: (view: ViewMode) => void;
  onOpenUpgrade: () => void;
  onChatWithFiles: (fileIds: string[]) => void;
  onLoadSampleFiles: () => void;
}

export const FilesView: React.FC<FilesViewProps> = ({
  files,
  onUploadFile,
  onDeleteFiles,
  onSelectView,
  onOpenUpgrade,
  onChatWithFiles,
  onLoadSampleFiles,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = files
    .filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      return sortOrder === 'desc' 
        ? b.size - a.size 
        : a.size - b.size;
    });

  const handleToggleSelectAll = () => {
    if (selectedFileIds.length === filteredFiles.length && filteredFiles.length > 0) {
      setSelectedFileIds([]);
    } else {
      setSelectedFileIds(filteredFiles.map((f) => f.id));
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedFileIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedFileIds.length === 0) return;
    onDeleteFiles(selectedFileIds);
    setSelectedFileIds([]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      Array.from(e.dataTransfer.files).forEach((file) => onUploadFile(file));
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes('csv') || type.includes('xls')) {
      return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
    }
    if (type.includes('json') || type.includes('parquet')) {
      return <FileCode className="w-4 h-4 text-amber-600" />;
    }
    return <FileText className="w-4 h-4 text-blue-600" />;
  };

  return (
    <main className="flex-1 flex flex-col h-full bg-[#fbfbfb] px-6 sm:px-10 pt-6 overflow-y-auto" data-purpose="main-files-view">
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            Array.from(e.target.files).forEach((file) => onUploadFile(file));
          }
        }}
        multiple
        className="hidden"
      />

      {/* Top Bar: Title and Tab Switchers */}
      <header className="flex items-center justify-between mb-7">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Files</h1>
        <div className="flex items-center gap-7 text-[14px]">
          <button
            onClick={() => onSelectView('library')}
            className="text-gray-500 hover:text-gray-800 pb-1 font-medium transition-colors cursor-pointer"
          >
            Library
          </button>
          <button
            onClick={() => onSelectView('files')}
            className="text-gray-900 font-semibold border-b-2 border-gray-900 pb-1 -mb-[1px] cursor-pointer"
          >
            Files
          </button>
        </div>
      </header>

      {/* Upload Container Card (Exact visual from Image 1 & 5) */}
      <section 
        className="bg-white border border-gray-200/80 rounded-2xl p-4 sm:p-5 mb-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]" 
        data-purpose="upload-card"
      >
        {/* Dashed Drop Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border border-dashed rounded-xl py-12 flex flex-col items-center justify-center transition-colors cursor-pointer group ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50/40' 
              : 'border-gray-200 bg-gray-50/20 hover:border-gray-300'
          }`}
        >
          <div className="mb-2 text-slate-500 group-hover:text-slate-700 transition-colors">
            <svg className="w-8 h-8 stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="text-xs font-medium text-slate-600">Drag files to upload</span>
          <span className="text-[11px] text-gray-400 mt-1">Supports CSV, Excel, Parquet, JSON, PDF</span>
        </div>

        {/* Footer inside upload container */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 px-1">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5 text-gray-500" />
              <span>Upload file</span>
            </button>

            {files.length === 0 && (
              <button
                type="button"
                onClick={onLoadSampleFiles}
                className="px-3 py-1.5 rounded-lg border border-blue-200 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
              >
                + Load sample datasets
              </button>
            )}
          </div>

          <div className="text-xs text-gray-500 flex items-center gap-1.5 flex-wrap">
            <span>All files are deleted after <strong className="font-semibold text-gray-700">1 hour</strong> of inactivity.</span>
            <button
              onClick={onOpenUpgrade}
              className="text-[#175cd3] hover:underline font-medium inline-flex items-center gap-0.5 cursor-pointer"
            >
              Upgrade to increase this →
            </button>
          </div>
        </div>
      </section>

      {/* Files Table Container */}
      <section 
        className="bg-white border border-gray-200/80 rounded-2xl flex-1 flex flex-col mb-6 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.02)]" 
        data-purpose="file-management-table"
      >
        {/* Action Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3 border-b border-gray-100 gap-3">
          <div className="flex items-center gap-2 text-gray-400 w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search files..."
              className="w-full text-xs text-gray-800 placeholder-gray-400 bg-transparent border-none focus:outline-none focus:ring-0 p-0"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Download */}
            <button
              type="button"
              disabled={selectedFileIds.length === 0}
              className={`text-xs font-medium px-2.5 py-1 rounded-md border border-gray-200 flex items-center gap-1.5 transition-colors ${
                selectedFileIds.length > 0 
                  ? 'bg-white text-gray-700 hover:bg-gray-50 cursor-pointer shadow-2xs' 
                  : 'bg-gray-50/50 text-gray-400 cursor-not-allowed opacity-70'
              }`}
              title="Download selected"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download ({selectedFileIds.length})</span>
            </button>

            {/* Delete */}
            <button
              type="button"
              onClick={handleDeleteSelected}
              disabled={selectedFileIds.length === 0}
              className={`text-xs font-medium px-2.5 py-1 rounded-md border border-gray-200 flex items-center gap-1.5 transition-colors ${
                selectedFileIds.length > 0 
                  ? 'bg-white text-red-600 hover:bg-red-50 cursor-pointer shadow-2xs' 
                  : 'bg-gray-50/50 text-gray-400 cursor-not-allowed opacity-70'
              }`}
              title="Delete selected"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete ({selectedFileIds.length})</span>
            </button>

            {/* Chat with files */}
            <button
              type="button"
              onClick={() => onChatWithFiles(selectedFileIds)}
              disabled={selectedFileIds.length === 0}
              className={`text-xs font-medium px-2.5 py-1 rounded-md border border-gray-200 flex items-center gap-1.5 transition-colors ${
                selectedFileIds.length > 0 
                  ? 'bg-[#175cd3] text-white hover:bg-blue-700 cursor-pointer shadow-2xs' 
                  : 'bg-gray-50/50 text-gray-400 cursor-not-allowed opacity-70'
              }`}
              title="Open chat with selected files"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat with files ({selectedFileIds.length})</span>
            </button>
          </div>
        </div>

        {/* Table Column Bar */}
        <div className="grid grid-cols-12 px-5 py-2.5 border-b border-gray-100 text-xs text-gray-500 font-medium items-center bg-gray-50/40">
          <div className="col-span-1 flex items-center">
            <input
              type="checkbox"
              checked={selectedFileIds.length > 0 && selectedFileIds.length === filteredFiles.length}
              onChange={handleToggleSelectAll}
              disabled={filteredFiles.length === 0}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
            />
          </div>
          <div className="col-span-6 sm:col-span-5 font-medium text-gray-700">Name</div>
          <div className="col-span-2 hidden sm:block font-medium text-gray-700">Size</div>
          <div className="col-span-4 sm:col-span-3 font-medium text-gray-700">Upload Date</div>
          <div className="col-span-1 flex justify-end">
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
              title="Sort size"
            >
              {sortOrder === 'asc' ? (
                <ChevronUp className="w-3.5 h-3.5 text-gray-600" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* File Rows or Empty State */}
        {filteredFiles.length > 0 ? (
          <div className="divide-y divide-gray-100 overflow-y-auto max-h-[420px]">
            {filteredFiles.map((file) => {
              const isSelected = selectedFileIds.includes(file.id);
              return (
                <div
                  key={file.id}
                  className={`grid grid-cols-12 px-5 py-3 text-xs items-center transition-colors ${
                    isSelected ? 'bg-blue-50/50' : 'hover:bg-gray-50/70'
                  }`}
                >
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleSelect(file.id)}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-0 cursor-pointer"
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-5 flex items-center gap-2.5 min-w-0 pr-2">
                    {getFileIcon(file.type)}
                    <span className="font-medium text-gray-800 truncate" title={file.name}>
                      {file.name}
                    </span>
                    {file.dataRowCount && (
                      <span className="hidden lg:inline-block text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        {file.dataRowCount.toLocaleString()} rows
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 hidden sm:block text-gray-500">
                    {file.sizeFormatted}
                  </div>
                  <div className="col-span-4 sm:col-span-3 text-gray-500 truncate">
                    {file.uploadDate}
                  </div>
                  <div className="col-span-1 flex justify-end gap-1">
                    <button
                      onClick={() => onChatWithFiles([file.id])}
                      className="p-1 text-gray-400 hover:text-blue-600 rounded transition-colors"
                      title="Chat with file"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State Container (Exact copy of Screenshot empty state) */
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center" data-purpose="empty-state">
            <div className="mb-3 text-slate-400">
              <svg className="w-9 h-9 stroke-[1.25]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">
              Hey, it looks like you haven't uploaded any files yet.
            </h3>
            <p className="text-xs text-slate-500">
              Upload some files to start chatting with them!
            </p>
          </div>
        )}
      </section>
    </main>
  );
};
