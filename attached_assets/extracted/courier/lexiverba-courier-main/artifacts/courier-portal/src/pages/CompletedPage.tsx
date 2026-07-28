import React from 'react';
import { RecordCard } from '../components/ui/RecordCard';

interface CompletedPageProps {
  isDarkMode?: boolean;
  onItemClick?: (item: { title: string; subtitle?: string; icon?: string; badge?: string }) => void;
}

export const CompletedPage: React.FC<CompletedPageProps> = ({ isDarkMode = false, onItemClick }) => {
  const completedDeliveries = [
    {
      id: 1,
      title: 'Sworn Statement — Marcus Chen',
      category: 'Legal Sworn Statement',
      status: 'Completed',
      updated: 'Jul 24',
      recipient: 'Marcus Chen',
      tags: ['DELIVERED', 'VERIFIED SIGNATURE'],
      actionIcon: 'task_alt',
    },
    {
      id: 2,
      title: 'Patent Specification — Dr. Tanaka',
      category: 'Technical Patent',
      status: 'Completed',
      updated: 'Jul 25',
      recipient: 'Dr. Tanaka',
      tags: ['ARCHIVED', 'PROOF OF DELIVERY'],
      actionIcon: 'task_alt',
    },
    {
      id: 3,
      title: 'Financial Audit — TechCorp GmbH',
      category: 'Corporate Audit',
      status: 'Completed',
      updated: 'Jul 25',
      recipient: 'TechCorp Finance',
      tags: ['COMPLIANCE PASS', 'DELIVERED'],
      actionIcon: 'task_alt',
    },
    {
      id: 4,
      title: 'Medical Protocol — Dr. Smith Office',
      category: 'Medical Protocol',
      status: 'Completed',
      updated: 'Jul 26',
      recipient: 'Dr. Smith',
      tags: ['PHOTO PROOF', 'DELIVERED'],
      actionIcon: 'task_alt',
    },
  ];

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-4xl lg:text-5xl font-semibold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Completed Deliveries
          </h1>
          <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Total: 142 completed deliveries in history
          </p>
        </div>
      </div>

      {/* Completed Record Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {completedDeliveries.map((delivery) => (
          <RecordCard
            key={delivery.id}
            title={delivery.title}
            category={delivery.category}
            icon="verified"
            iconColor="bg-emerald-500/10 text-emerald-500"
            topRightIcon="check_circle"
            tags={delivery.tags}
            metaLine={`Completed: ${delivery.updated}`}
            subMetaLine={`Recipient: ${delivery.recipient}`}
            status={delivery.status}
            actionIcon={delivery.actionIcon}
            onClick={() => onItemClick && onItemClick({ title: delivery.title, subtitle: `${delivery.category} • Recipient: ${delivery.recipient}`, icon: 'verified', badge: delivery.status })}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
};
