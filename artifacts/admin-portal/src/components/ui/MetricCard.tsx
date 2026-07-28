import React, { useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Badge } from './Badge';

export interface MetricCardProps {
  title: string;
  value: string;
  badge?: string;
  icon: string;
  color?: string;
  onClick?: () => void;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  badge,
  icon,
  onClick,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Parse numeric portion and prefix/suffix
    const match = value.match(/^([^\d]*)([\d,.]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || '';
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3] || '';
    const targetNum = parseFloat(numStr);

    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    const hasComma = match[2].includes(',');
    const decimalPlaces = match[2].includes('.') ? match[2].split('.')[1].length : 0;

    let start = 0;
    const steps = 30;
    const duration = 800;
    const stepTime = duration / steps;
    const increment = targetNum / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        current = targetNum;
        clearInterval(timer);
      }

      let formattedNum = current.toFixed(decimalPlaces);
      if (hasComma) {
        const parts = formattedNum.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formattedNum = parts.join('.');
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={cn(
        'p-6 rounded-[2.5rem] smooth-card float-hover transition-all duration-300 relative overflow-hidden flex flex-col justify-between',
        isHovered
          ? 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 text-white shadow-2xl border-2 border-blue-400 cursor-pointer'
          : 'bg-white dark:bg-[#18181b] border-2 border-slate-200/80 dark:border-[#27272a] text-slate-900 dark:text-white shadow-sm',
        className
      )}
    >
      {isHovered && (
        <div className="absolute -right-6 -top-6 opacity-10 text-white pointer-events-none transition-all duration-500">
          <span className="material-symbols-outlined text-[160px]">{icon}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-4 relative z-10">
        <span
          className={cn(
            'text-[10px] font-semibold uppercase tracking-widest',
            isHovered ? 'text-blue-100' : 'text-slate-400'
          )}
        >
          {title}
        </span>
        <div
          className={cn(
            'w-9 h-9 rounded-2xl flex items-center justify-center shadow-sm transition-all',
            isHovered
              ? 'bg-white/10 text-white'
              : 'bg-blue-50 dark:bg-blue-950/40 text-blue-500 dark:text-blue-400'
          )}
        >
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
        </div>
      </div>

      <div className="relative z-10">
        <div className="text-3xl lg:text-4xl font-semibold tracking-tight mb-2">{displayValue}</div>
        {badge && (
          <div className="flex items-center gap-1.5">
            {isHovered ? (
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-white/20 text-white">
                {badge}
              </span>
            ) : (
              <Badge status={badge}>{badge}</Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
