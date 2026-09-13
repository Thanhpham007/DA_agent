import React, { useState, useEffect } from 'react';
import { Search, X, PenSquare, Clock, ArrowRight, Tag } from 'lucide-react';
import { TaskItem } from '@da-agent/shared';

interface SearchTasksModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: TaskItem[];
  onSelectTask: (task: TaskItem) => void;
  onNewTask: () => void;
}

export const SearchTasksModal: React.FC<SearchTasksModalProps> = ({
  isOpen,
  onClose,
  tasks,
  onSelectTask,
  onNewTask,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.preview?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-[0.5px] z-50 flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-150"
      data-purpose="search-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Card (Centered, rounded with smooth shadow, exact layout from Image 1) */}
      <div
        className="bg-white w-full max-w-[580px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2),0_1px_3px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        data-purpose="search-modal-dialog"
      >
        {/* Modal Header / Search Input */}
        <div className="flex items-center justify-between px-4 pt-3.5 pb-2 border-b border-gray-100/80">
          <div className="flex items-center flex-1 gap-2">
            <Search className="w-4 h-4 text-gray-400 shrink-0" />
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 p-0 text-[14px] text-gray-800 placeholder-gray-500 focus:ring-0 focus:outline-none"
              placeholder="Search tasks..."
            />
          </div>
          {/* Close button (x) */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1 cursor-pointer rounded-lg hover:bg-gray-100"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Action / New Task Item (Matching screenshot) */}
        <div className="px-2.5 pt-2 pb-1">
          <div
            onClick={() => {
              onNewTask();
              onClose();
            }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl border border-gray-200/70 hover:bg-gray-50 transition-colors cursor-pointer text-gray-800 group"
          >
            <PenSquare className="w-4 h-4 text-gray-600 shrink-0 group-hover:text-blue-600 transition-colors" />
            <span className="text-[13.5px] font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
              New task
            </span>
          </div>
        </div>

        {/* Task Search Results or Recent Workspace */}
        <div className="max-h-[380px] min-h-[160px] overflow-y-auto px-2.5 py-1">
          {filteredTasks.length > 0 ? (
            <div className="space-y-1">
              <div className="px-2 py-1 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                {searchQuery ? 'Search Results' : 'Recent Tasks'}
              </div>
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => {
                    onSelectTask(task);
                    onClose();
                  }}
                  className="flex items-start justify-between p-2.5 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="space-y-0.5 min-w-0 pr-2">
                    <h4 className="text-xs font-semibold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
                      {task.title}
                    </h4>
                    {task.preview && (
                      <p className="text-[11px] text-gray-500 truncate max-w-md">
                        {task.preview}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {task.updatedAt}
                      </span>
                      <span>•</span>
                      <span>{task.messageCount} messages</span>
                      {task.tags && task.tags.length > 0 && (
                        <>
                          <span>•</span>
                          <div className="flex gap-1">
                            {task.tags.map((tag, i) => (
                              <span key={i} className="bg-gray-100 text-gray-600 px-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 opacity-0 group-hover:opacity-100 shrink-0 mt-1 transition-opacity" />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-[240px] flex flex-col items-center justify-center text-xs text-gray-400">
              No tasks found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
