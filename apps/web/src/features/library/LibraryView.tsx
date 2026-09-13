import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  BarChart2, 
  Presentation, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  ExternalLink, 
  Trash2, 
  Bookmark, 
  FileText,
  Calendar,
  Layers
} from 'lucide-react';
import { ArtifactItem } from '@da-agent/shared';

interface LibraryViewProps {
  artifacts: ArtifactItem[];
  onDeleteArtifact: (id: string) => void;
  onLoadSampleArtifacts: () => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({
  artifacts,
  onDeleteArtifact,
  onLoadSampleArtifacts,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'chart' | 'slide' | 'dataset' | 'report'>('all');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredArtifacts = artifacts.filter((item) => {
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceTaskTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getArtifactIcon = (type: string) => {
    switch (type) {
      case 'chart':
        return <BarChart2 className="w-4 h-4 text-blue-600" />;
      case 'slide':
        return <Presentation className="w-4 h-4 text-purple-600" />;
      case 'dataset':
        return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
      default:
        return <FileText className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <main className="flex-1 flex flex-col h-full bg-white overflow-y-auto" data-purpose="library-content-area">
      {/* Workspace Header & Filters */}
      <div className="pt-8 px-6 sm:px-10">
        {/* Title */}
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mb-6">Library</h1>

        {/* Toolbar: Search, Filter, Sort (Matching Image 9) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-500 pb-4 border-b border-gray-100 gap-3" data-purpose="library-toolbar">
          {/* Left Group: Search Bar & Filter Button */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search input box */}
            <div className="relative flex items-center">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search library..."
                className="w-56 sm:w-72 pl-9 pr-3 py-1.5 text-xs bg-white border border-neutral-200/90 rounded-md placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:border-neutral-300 transition-colors"
              />
            </div>

            {/* Filter Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className={`flex items-center space-x-1 px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
                  typeFilter !== 'all' ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-neutral-100 text-neutral-600'
                }`}
              >
                <Filter className="w-3.5 h-3.5 mr-1" />
                <span className="capitalize">{typeFilter === 'all' ? 'Filter' : typeFilter}</span>
                <svg className="w-3 h-3 text-neutral-400 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </button>

              {isFilterDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsFilterDropdownOpen(false)} />
                  <div className="absolute left-0 top-full mt-1.5 w-36 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-40 text-xs">
                    {(['all', 'chart', 'slide', 'dataset', 'report'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setTypeFilter(t);
                          setIsFilterDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 capitalize hover:bg-gray-50 flex items-center justify-between ${
                          typeFilter === t ? 'font-semibold text-blue-600 bg-blue-50/50' : 'text-gray-700'
                        }`}
                      >
                        <span>{t === 'all' ? 'All Types' : t}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Group: Sort Criteria */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
              className="flex items-center space-x-1.5 px-2 py-1.5 hover:text-neutral-800 transition-colors text-neutral-500 cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <span>{sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Artifacts Grid or Empty State */}
      {filteredArtifacts.length > 0 ? (
        <div className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredArtifacts.map((art) => (
            <div
              key={art.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-2xs hover:shadow-sm hover:border-gray-300 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-gray-50 border border-gray-100">
                      {getArtifactIcon(art.type)}
                    </div>
                    <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      {art.type}
                    </span>
                  </div>
                  <button
                    onClick={() => onDeleteArtifact(art.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 rounded transition-opacity"
                    title="Delete artifact"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="text-sm font-semibold text-gray-900 mb-1 leading-snug group-hover:text-blue-600 transition-colors">
                  {art.title}
                </h3>
                {art.dataSummary && (
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                    {art.dataSummary}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span className="truncate max-w-[160px] text-gray-500" title={art.sourceTaskTitle}>
                  {art.sourceTaskTitle}
                </span>
                <span>{art.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State View Container (Exact match from Image 9) */
        <section className="flex-1 flex flex-col items-center justify-center -mt-16 px-4" data-purpose="empty-state-view">
          <h2 className="text-base font-semibold text-neutral-900 tracking-tight text-center">
            Your library is empty
          </h2>
          <p className="text-xs text-neutral-500 mt-2 text-center max-w-sm leading-relaxed">
            Charts, images, slides, and artifacts you create will appear here.
          </p>

          <button
            type="button"
            onClick={onLoadSampleArtifacts}
            className="mt-4 px-3.5 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
          >
            + Load sample charts & artifacts
          </button>
        </section>
      )}
    </main>
  );
};
