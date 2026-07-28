import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

export interface ArcGaugeProps {
  title?: string;
  badgeText?: string;
  percentage?: number;
  secondaryPercentage?: number;
  centerSubtitle?: string;
  labels?: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
  isDarkMode?: boolean;
  className?: string;
}

export const ArcGauge: React.FC<ArcGaugeProps> = ({
  title = 'Delivery Performance SLA',
  badgeText = 'LIVE SLA',
  percentage = 91,
  secondaryPercentage = 96,
  centerSubtitle = 'On-Time Rate',
  labels = {
    primary: 'On-Time',
    secondary: 'In Transit',
    tertiary: 'Pending',
  },
  isDarkMode = false,
  className,
}) => {
  const [gaugePercent, setGaugePercent] = useState<number>(0);

  const totalArcLength = 251.32;
  const completedDashOffset = totalArcLength - (totalArcLength * (gaugePercent / 100));
  const clearingDashOffset = totalArcLength - (totalArcLength * ((gaugePercent / Math.max(1, percentage)) * (secondaryPercentage / 100)));

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= percentage) {
        current = percentage;
        clearInterval(interval);
      }
      setGaugePercent(current);
    }, 15);
    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <div
      className={cn(
        'p-8 rounded-[2.5rem] border-2 float-shadow float-hover smooth-card flex flex-col justify-between transition-colors',
        isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-900',
        className
      )}
    >
      {/* SVG Definitions for Hatched Pattern */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <pattern id="hatchedPatternGauge" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="8" stroke={isDarkMode ? '#3f3f46' : '#cbd5e1'} strokeWidth="3" />
          </pattern>
        </defs>
      </svg>

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/40 px-3 py-1 rounded-full">{badgeText}</span>
      </div>

      <div className="relative w-64 h-40 mx-auto flex flex-col items-center justify-end my-4 cursor-pointer group">
        <svg className="w-64 h-40" viewBox="0 0 200 110">
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#hatchedPatternGauge)"
            strokeWidth="28"
            strokeLinecap="round"
          />
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="28"
            strokeDasharray="251.32"
            strokeDashoffset={clearingDashOffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#004ac6"
            strokeWidth="28"
            strokeDasharray="251.32"
            strokeDashoffset={completedDashOffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div className="absolute bottom-2 flex flex-col items-center justify-center group-hover:scale-110 transition-transform">
          <span className={`text-5xl font-semibold tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {gaugePercent}%
          </span>
          <span className="text-xs font-semibold text-zinc-400 mt-1">{centerSubtitle}</span>
        </div>
      </div>

      <div className={`flex justify-between items-center text-xs font-semibold border-t pt-4 mt-2 ${
        isDarkMode ? 'border-zinc-800 text-zinc-300' : 'border-slate-100 text-slate-600'
      }`}>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#004ac6]"></span>
          <span>{labels.primary}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#38bdf8]"></span>
          <span>{labels.secondary}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 border-2 border-dashed border-zinc-400 rounded-sm bg-slate-100 dark:bg-zinc-800"></span>
          <span>{labels.tertiary}</span>
        </div>
      </div>
    </div>
  );
};
