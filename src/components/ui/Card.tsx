import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass';
}

export default function Card({
  children,
  className = '',
  variant = 'glass',
}: CardProps) {
  const baseStyles = 'rounded-xl p-6 transition-all duration-200';
  
  const variants = {
    default: 'bg-white dark:bg-slate-800 shadow-md dark:shadow-slate-900/50',
    glass: 'glass dark:glass',
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}

