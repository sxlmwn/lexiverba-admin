import React, { useEffect, useState } from 'react';
import { cn } from '../utils/cn';

interface InteractiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isDarkMode?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const InteractiveModal: React.FC<InteractiveModalProps> = ({
  isOpen,
  onClose,
  title,
  isDarkMode,
  children,
  className,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsAnimating(true);
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-300',
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative w-full max-w-lg rounded-[2.5rem] border-2 p-6 sm:p-8 shadow-2xl transition-all duration-300 transform',
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4',
          isDarkMode
            ? 'bg-[#18181b] border-[#27272a] text-white'
            : 'bg-white border-slate-200/80 text-slate-900',
          className
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            className={cn(
              'w-8 h-8 rounded-full border flex items-center justify-center transition-colors shadow-sm cursor-pointer hover:scale-105 active:scale-95',
              isDarkMode
                ? 'bg-[#27272a] border-zinc-700 text-slate-300 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900'
            )}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
