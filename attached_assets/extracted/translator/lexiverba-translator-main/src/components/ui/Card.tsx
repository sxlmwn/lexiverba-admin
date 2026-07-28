import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverable = true,
  interactive = true,
  ...props
}) => {
  return (
    <div
      className={cn(
        'p-6 rounded-[2.5rem] border-2 smooth-card transition-all duration-300 relative flex flex-col justify-between',
        'bg-white dark:bg-[#18181b] text-slate-900 dark:text-white border-slate-200/80 dark:border-[#27272a] shadow-sm',
        hoverable && 'float-hover',
        interactive && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
