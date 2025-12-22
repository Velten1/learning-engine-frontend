import React from 'react';

interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
}

export default function SearchInput({
  onSearch,
  className = '',
  ...props
}: SearchInputProps) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-[#94a3b8] dark:text-slate-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="search"
        className={`
          w-full pl-10 pr-4 py-2.5 rounded-lg
          bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm
          border border-[#e2e8f0] dark:border-slate-700
          text-[#0f172a] dark:text-[#f1f5f9]
          placeholder:text-[#94a3b8] dark:placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-[#0369a1] dark:focus:ring-[#7dd3fc] focus:border-transparent
          transition-all duration-200
          ${className}
        `}
        placeholder="Buscar..."
        {...props}
      />
    </div>
  );
}

