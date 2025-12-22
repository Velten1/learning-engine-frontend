import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#475569] dark:text-[#cbd5e1] mb-2">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2.5 rounded-lg
          bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm
          border border-[#e2e8f0] dark:border-slate-700
          text-[#0f172a] dark:text-[#f1f5f9]
          placeholder:text-[#94a3b8] dark:placeholder:text-slate-500
          focus:outline-none focus:ring-2 focus:ring-[#0369a1] dark:focus:ring-[#7dd3fc] focus:border-transparent
          transition-all duration-200
          ${error ? 'border-red-300 dark:border-red-600 focus:ring-red-500 dark:focus:ring-red-600' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

