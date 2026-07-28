import React from 'react';
import { cn } from '../../lib/utils';

export interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: string;
  barColor?: string;
  trackColor?: string;
  className?: string;
  showLabel?: boolean;
  label?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = 'h-2',
  barColor = 'bg-blue-600',
  trackColor = 'bg-slate-100 dark:bg-slate-800',
  className,
  showLabel = false,
  label,
}) => {
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs font-semibold mb-1">
          <span>{label || 'Progress'}</span>
          <span className="text-blue-600 font-semibold">{normalizedProgress}%</span>
        </div>
      )}
      <div className={cn('w-full rounded-full overflow-hidden', trackColor, height)}>
        <div
          className={cn('h-full rounded-full transition-all duration-500 ease-out', barColor)}
          style={{ width: `${normalizedProgress}%` }}
        />
      </div>
    </div>
  );
};
