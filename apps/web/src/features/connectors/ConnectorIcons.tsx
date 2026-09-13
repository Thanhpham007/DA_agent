import React from 'react';

export const ConnectorIcon: React.FC<{ type: string; className?: string }> = ({ type, className = "w-7 h-7" }) => {
  switch (type) {
    case 'postgres':
      return (
        <svg className={`${className} text-[#336791]`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C7.03 2 3 6.03 3 11c0 3.86 2.45 7.15 5.89 8.38-.07-.36-.12-.76-.12-1.18 0-.96.22-1.89.62-2.73-.24-.26-.45-.56-.63-.88-.41-.74-.63-1.6-.63-2.52 0-2.82 2.11-5.12 4.79-5.26C13.2 4.9 14.86 4 16.73 4c3.04 0 5.52 2.47 5.52 5.52 0 1.25-.42 2.4-1.13 3.32.25.68.39 1.42.39 2.2 0 1.94-.96 3.65-2.43 4.72.07.41.11.83.11 1.26 0 1.34-.38 2.59-1.04 3.65C16.5 24.89 14.33 25 12 25c-.34 0-.67-.02-1-.05V22h1c4.41 0 8-3.59 8-8 0-.74-.1-1.46-.29-2.14-.38.41-.84.75-1.35 1-.22.11-.45.2-.69.27-.47.69-1.13 1.25-1.9 1.63.14.4.23.82.23 1.26 0 1.97-1.47 3.59-3.39 3.83-.5.06-1.01-.01-1.47-.19-.48.74-1.2 1.32-2.06 1.64V20.2c.44-.22.82-.54 1.1-.94-.38-.28-.69-.65-.91-1.08-.41.22-.88.34-1.37.34-.69 0-1.32-.24-1.83-.65.25-.66.68-1.22 1.24-1.63-.15-.4-.23-.83-.23-1.28 0-1.44.82-2.69 2.02-3.31.25-.79.76-1.46 1.43-1.92C12.35 9.3 12.87 9 13.46 9c1.66 0 3 1.34 3 3 0 .3-.05.58-.13.85.5.34.91.81 1.18 1.37.49-.63.79-1.42.79-2.28 0-2.07-1.68-3.75-3.75-3.75-.7 0-1.36.19-1.93.53-.47-.79-1.28-1.34-2.22-1.47C9.39 7.11 8.5 7.94 8.5 9c0 .4.13.78.36 1.09-.64.55-1.08 1.34-1.17 2.24-.03.28-.02.56.03.83C7.29 13.56 7 14.25 7 15c0 1.66 1.34 3 3 3 .15 0 .29-.02.43-.05.21.67.64 1.24 1.21 1.63C11.53 19.8 11.5 20.09 11.5 20.4c0 .53.11 1.03.3 1.49C8.38 20.73 6 17.65 6 14c0-3.31 2.69-6 6-6z" />
        </svg>
      );
    case 'bigquery':
      return (
        <div className="w-7 h-8 bg-blue-600 rounded-sm flex items-center justify-center relative overflow-hidden" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
          </svg>
        </div>
      );
    case 'snowflake':
      return (
        <svg className={`${className} text-[#29b5e8]`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a1 1 0 011 1v2.18l1.72-1a1 1 0 111 1.74L14.28 6.66l2.12.57a1 1 0 11-.52 1.93L13.76 8.6l1.37 1.37a1 1 0 01-1.42 1.42L12 9.66l-1.71 1.73a1 1 0 01-1.42-1.42l1.37-1.37-2.12.56a1 1 0 11-.52-1.93l2.12-.57-1.44-.74a1 1 0 111-1.74l1.72 1V3a1 1 0 011-1zm0 14.34l1.71-1.73a1 1 0 111.42 1.42l-1.37 1.37 2.12-.56a1 1 0 11.52 1.93l-2.12.57 1.44.74a1 1 0 11-1 1.74l-1.72-1V21a1 1 0 11-2 0v-2.18l-1.72 1a1 1 0 11-1-1.74l1.44-.74-2.12-.57a1 1 0 11.52-1.93l2.12.56-1.37-1.37a1 1 0 111.42-1.42L12 16.34zm7.5-5.34a1 1 0 011 1c0 .35-.18.66-.45.84l-1.9 1.1.74 1.44a1 1 0 11-1.74 1l-.74-1.44-.57 2.12a1 1 0 11-1.93-.52l.56-2.12-1.37-1.37a1 1 0 011.42-1.42l1.73 1.71 1.1-1.9a1 1 0 011.18-.42zM4.5 11a1 1 0 011.18.42l1.1 1.9 1.73-1.71a1 1 0 111.42 1.42l-1.37 1.37.56 2.12a1 1 0 11-1.93.52l-.57-2.12-.74 1.44a1 1 0 11-1.74-1l.74-1.44-1.9-1.1A1 1 0 014.5 11z" />
        </svg>
      );
    case 'mysql':
      return (
        <svg className={`${className} text-[#00758f]`} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M4 14c2-4 6-7 11-7 2 0 4 .5 5 1.5-1 1-1.5 2-2 3.5 1.5.5 3 2 3 4s-2 3-5 3c-4 0-7-2-9-5z" />
          <path d="M7 11c-.5-1-1.5-2-3-2.5 1.5 2.5 1.5 4 1 5.5" />
        </svg>
      );
    case 'sqlserver':
      return (
        <div className="space-y-1 w-6">
          <div className="w-6 h-2 bg-sky-500 rounded-full shadow-xs"></div>
          <div className="w-6 h-2 bg-blue-600 rounded-full shadow-xs"></div>
          <div className="w-6 h-2 bg-indigo-700 rounded-full shadow-xs"></div>
        </div>
      );
    case 'supabase':
      return (
        <svg className={`${className} text-[#3ecf8e]`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M13.4 2.1c.4-.6 1.4-.4 1.5.4l.7 8.3h6c.8 0 1.2 1 .6 1.5L9.6 22.3c-.4.6-1.4.4-1.5-.4l-.7-8.3h-6c-.8 0-1.2-1-.6-1.5L13.4 2.1z" />
        </svg>
      );
    case 'gdrive':
      return (
        <svg className={className} viewBox="0 0 87.3 78" fill="none">
          <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da" />
          <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47" />
          <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335" />
          <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d" />
          <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc" />
          <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00" />
        </svg>
      );
    case 'gsheets':
      return (
        <div className="w-7 h-7 bg-emerald-600 rounded-sm flex items-center justify-center shadow-xs">
          <div className="grid grid-cols-2 gap-0.5 w-4 h-4 bg-white/20 p-0.5 rounded-xs">
            <div className="bg-white rounded-[1px]"></div>
            <div className="bg-white rounded-[1px]"></div>
            <div className="bg-white rounded-[1px]"></div>
            <div className="bg-white rounded-[1px]"></div>
          </div>
        </div>
      );
    case 'onedrive':
      return (
        <svg className={`${className} text-[#0078d4]`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      );
    case 'sharepoint':
      return (
        <div className="w-7 h-7 bg-[#038387] rounded-md flex items-center justify-center shadow-xs">
          <span className="text-white font-bold text-sm tracking-tighter">S</span>
        </div>
      );
    case 'gads':
      return (
        <div className="relative w-6 h-6">
          <span className="absolute block w-4 h-2 bg-[#fbbc04] rounded-full rotate-45 top-1 left-0"></span>
          <span className="absolute block w-4 h-2 bg-[#4285f4] rounded-full -rotate-45 top-2 left-1"></span>
          <span className="absolute block w-2 h-2 bg-[#34a853] rounded-full bottom-0 left-0"></span>
        </div>
      );
    case 'metaads':
      return (
        <svg className={`${className} text-[#0081fb]`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.99 6c-2.22 0-3.84 1.13-4.99 2.5C10.85 7.13 9.23 6 7.01 6 3.66 6 1 8.86 1 12.5s2.66 6.5 6.01 6.5c2.22 0 3.84-1.13 4.99-2.5 1.15 1.37 2.77 2.5 4.99 2.5 3.35 0 6.01-2.86 6.01-6.5S20.34 6 16.99 6zm-9.98 10.8c-2.18 0-3.8-1.8-3.8-4.3s1.62-4.3 3.8-4.3c1.7 0 2.95 1.18 3.8 2.5-1.12 1.76-2.3 3.8-3.8 6.1zm9.98 0c-1.5-2.3-2.68-4.34-3.8-6.1.85-1.32 2.1-2.5 3.8-2.5 2.18 0 3.8 1.8 3.8 4.3s-1.62 4.3-3.8 4.3z" />
        </svg>
      );
    default:
      return (
        <div className="w-7 h-7 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 font-semibold text-xs">
          API
        </div>
      );
  }
};
