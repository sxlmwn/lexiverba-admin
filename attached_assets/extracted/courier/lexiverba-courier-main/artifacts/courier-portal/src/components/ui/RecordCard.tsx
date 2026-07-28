import React from 'react';
import { cn } from '../../lib/utils';
import { Badge } from './Badge';

export interface RecordCardProps {
  id?: string | number;
  title: string;
  category: string;
  icon?: string;
  iconColor?: string;
  topRightIcon?: string;
  tags?: string[];
  metaLine?: string;
  subMetaLine?: string;
  status?: string;
  actionIcon?: string;
  onActionClick?: (e: React.MouseEvent) => void;
  onClick?: () => void;
  isDarkMode?: boolean;
  className?: string;
}

export const RecordCard: React.FC<RecordCardProps> = ({
  title,
  category,
  icon = 'description',
  iconColor = 'bg-blue-600/10 text-blue-500',
  topRightIcon = 'verified',
  tags = [],
  metaLine,
  subMetaLine,
  status = 'Active',
  actionIcon = 'arrow_forward',
  onActionClick,
  onClick,
  isDarkMode = false,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'p-6 rounded-[2.5rem] border-2 float-shadow float-hover smooth-card transition-all duration-300 relative flex flex-col justify-between cursor-pointer animate-card-pop',
        isDarkMode ? 'bg-[#18181b] border-[#27272a] text-white' : 'bg-white border-slate-200/80 text-slate-900',
        className
      )}
    >
      <div>
        {/* Top Row: Icon Square + Right Status Icon */}
        <div className="flex justify-between items-start mb-4">
          <div className={cn('w-14 h-14 rounded-2xl flex items-center justify-center shadow-md', iconColor)}>
            <span className="material-symbols-outlined text-[28px]">{icon}</span>
          </div>
          {topRightIcon && (
            <span className="material-symbols-outlined text-blue-600 text-[24px]">
              {topRightIcon}
            </span>
          )}
        </div>

        {/* Title + Category */}
        <h4 className="text-lg font-semibold tracking-tight leading-snug">{title}</h4>
        <p className="text-xs text-blue-500 font-semibold mt-1 mb-3">{category}</p>

        {/* Tags Row */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-semibold tracking-wide text-slate-500 dark:text-slate-400 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Divider & Metadata */}
      <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-zinc-800">
        <div>
          {metaLine && (
            <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
              {metaLine}
            </div>
          )}
          {subMetaLine && (
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200 mt-0.5">
              {subMetaLine}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          {status && <Badge status={status} />}
          {actionIcon && (
            <button
              onClick={(e) => {
                if (onActionClick) {
                  e.stopPropagation();
                  onActionClick(e);
                }
              }}
              className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors shadow-2xs cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">{actionIcon}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
