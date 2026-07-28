import React from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'default' | 'neutral';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  status?: string;
  interactive?: boolean;
}

const statusVariantMap: Record<string, BadgeVariant> = {
  // Success
  completed: 'success',
  verified: 'success',
  active: 'success',
  certified: 'success',
  optimal: 'success',
  unlocked: 'success',
  approved: 'success',
  paid: 'success',
  healthy: 'success',
  positive: 'success',

  // Info
  in_progress: 'info',
  'in progress': 'info',
  qa: 'info',
  reviewing: 'info',
  translating: 'info',
  post_editing: 'info',
  neutral: 'info',
  running: 'info',

  // Warning
  pending: 'warning',
  scheduled: 'warning',
  validation_pending: 'warning',
  'validation pending': 'warning',
  'test required': 'warning',
  beta: 'warning',
  queued: 'warning',

  // Danger
  overdue: 'danger',
  urgent: 'danger',
  breached: 'danger',
  high: 'danger',
  suspended: 'danger',
  failed: 'danger',
  negative: 'danger',

  // Neutral
  offline: 'neutral',
  archived: 'neutral',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  status,
  interactive = true,
  className,
  ...props
}) => {
  let resolvedVariant: BadgeVariant = variant || 'default';

  if (!variant && status) {
    const normalized = status.toLowerCase().trim();
    resolvedVariant = statusVariantMap[normalized] || 'default';
  }

  const variantStyles: Record<BadgeVariant, string> = {
    success: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50',
    warning: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/50',
    danger: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/50',
    info: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/50',
    neutral: 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-zinc-700',
    default: 'bg-slate-50 dark:bg-zinc-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-zinc-700',
  };

  return (
    <span
      data-badge-interactive={interactive ? 'true' : 'false'}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full border shadow-2xs transition-all',
        variantStyles[resolvedVariant],
        interactive && 'clickable-badge',
        className
      )}
      {...props}
    >
      {children || status}
    </span>
  );
};
