import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary:
      'bg-[#0369a1] dark:bg-[#0284c7] text-white hover:bg-[#0284c7] dark:hover:bg-[#0ea5e9] focus:ring-[#0369a1] dark:focus:ring-[#7dd3fc] shadow-sm hover:shadow-md',
    secondary:
      'bg-white/70 dark:bg-slate-800/70 text-[#0369a1] dark:text-[#7dd3fc] border border-[#0369a1]/20 dark:border-[#7dd3fc]/30 hover:bg-white/90 dark:hover:bg-slate-800/90 focus:ring-[#0369a1] dark:focus:ring-[#7dd3fc] shadow-sm hover:shadow-md',
    danger:
      'bg-red-500 dark:bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-700 focus:ring-red-500 dark:focus:ring-red-600 shadow-sm hover:shadow-md',
    ghost:
      'bg-transparent text-[#0369a1] dark:text-[#7dd3fc] hover:bg-white/50 dark:hover:bg-slate-800/50 focus:ring-[#0369a1] dark:focus:ring-[#7dd3fc]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

