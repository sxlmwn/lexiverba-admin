import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

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
  barColor = 'bg-blue-500',
  trackColor = 'bg-slate-100 dark:bg-slate-800',
  className,
  showLabel = false,
  label,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const normalizedProgress = Math.min(100, Math.max(0, progress));
    // Small delay to allow the DOM to render before starting animation
    const timer = setTimeout(() => {
      setAnimatedProgress(normalizedProgress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs font-semibold mb-1">
          <span>{label || 'Progress'}</span>
          <span className="text-blue-500 font-semibold">{animatedProgress}%</span>
        </div>
      )}
      <div className={cn('w-full rounded-full overflow-hidden', trackColor, height)}>
        <div
          className={cn('h-full rounded-full transition-all duration-1000 ease-out', barColor)}
          style={{ width: `${animatedProgress}%` }}
        />
      </div>
    </div>
  );
};
