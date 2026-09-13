import React, { useState } from 'react';
import { Search, CheckCircle2, PlusCircle, ArrowRight } from 'lucide-react';
import { Connector, ConnectorCategory } from '@da-agent/shared';
import { ConnectorIcon } from './ConnectorIcons';

interface ConnectorsViewProps {
  connectors: Connector[];
  onSelectConnector: (connector: Connector) => void;
}

export const ConnectorsView: React.FC<ConnectorsViewProps> = ({
  connectors,
  onSelectConnector,
}) => {
  const [activeCategory, setActiveCategory] = useState<ConnectorCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConnectors = connectors.filter((c) => {
    const matchesCategory =
      activeCategory === 'all' || c.category === activeCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="flex-1 overflow-y-auto bg-[#fcfdfd]" data-purpose="connector-catalog">
      {/* Top Title Header */}
      <header className="pt-6 pb-4 px-6 sm:px-10 border-b border-gray-100 bg-white" data-purpose="page-header">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">Connectors &amp; MCPs</h1>
        <p className="text-xs text-gray-500 mt-1">Connect your data directly to run instant analysis</p>
      </header>

      {/* Main Body Container */}
      <div className="px-6 sm:px-10 py-6 max-w-7xl">
        {/* Add Connectors Header & Toolbar */}
        <section className="mb-6" data-purpose="filter-toolbar">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Add Connectors</h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category Filter Tabs */}
            <div className="flex items-center space-x-2 text-xs font-medium overflow-x-auto pb-1">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 rounded-full transition cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-[#2563eb] text-white font-semibold shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory('data-warehouses')}
                className={`px-3.5 py-1.5 rounded-full transition cursor-pointer whitespace-nowrap ${
                  activeCategory === 'data-warehouses'
                    ? 'bg-[#2563eb] text-white font-semibold shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Data Warehouses
              </button>
              <button
                onClick={() => setActiveCategory('databases')}
                className={`px-3.5 py-1.5 rounded-full transition cursor-pointer ${
                  activeCategory === 'databases'
                    ? 'bg-[#2563eb] text-white font-semibold shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Databases
              </button>
              <button
                onClick={() => setActiveCategory('integrations')}
                className={`px-3.5 py-1.5 rounded-full transition cursor-pointer ${
                  activeCategory === 'integrations'
                    ? 'bg-[#2563eb] text-white font-semibold shadow-2xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Integrations
              </button>
            </div>

            {/* Search Connectors Field */}
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search connectors"
                className="w-full pl-9 pr-3 py-1.5 text-xs text-gray-800 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition shadow-none"
              />
            </div>
          </div>
        </section>

        {/* Connector Grid (Exact 3-column layout from Image 7) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-purpose="connector-grid">
          {filteredConnectors.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectConnector(item)}
              className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-sm hover:border-gray-300 transition duration-150 cursor-pointer group relative"
            >
              <div className="flex items-start space-x-3.5">
                {/* Connector Icon */}
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
                  <ConnectorIcon type={item.iconType} />
                </div>

                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    {item.isNew && (
                      <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded leading-tight">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-1 flex items-center justify-between">
                <span className="inline-block px-2.5 py-0.5 text-[11px] font-medium bg-gray-100 text-gray-600 rounded-md">
                  {item.categoryLabel}
                </span>

                {item.connected ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Connected</span>
                  </span>
                ) : (
                  <span className="text-[11px] text-gray-400 group-hover:text-blue-600 font-medium inline-flex items-center gap-0.5 transition-colors">
                    Connect <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </section>

        {filteredConnectors.length === 0 && (
          <div className="py-16 text-center text-gray-500 text-xs">
            No connectors match "{searchQuery}". Try a different search query or category.
          </div>
        )}
      </div>
    </main>
  );
};
