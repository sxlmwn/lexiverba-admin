import React from 'react';
import { RecordCard } from '../components/ui/RecordCard';

interface PendingPageProps {
  isDarkMode?: boolean;
  onItemClick?: (item: { title: string; subtitle?: string; icon?: string; badge?: string }) => void;
}

export const PendingPage: React.FC<PendingPageProps> = ({ isDarkMode = false, onItemClick }) => {
  const pendingDeliveries = [
    {
      id: 1,
      title: 'Birth Certificate — Alice Williams',
      category: 'Civil Document',
      status: 'Pending',
      updated: 'Jul 27',
      recipient: 'Alice Williams',
      tags: ['AVAILABLE FOR PICKUP', 'PRIORITY'],
      actionIcon: 'local_shipping',
    },
    {
      id: 2,
      title: 'Legal Document — Smith & Associates',
      category: 'Legal Sworn Package',
      status: 'Pending Notary',
      updated: 'Jul 27',
      recipient: 'Smith & Associates',
      tags: ['ORIGINAL DOWNLOAD', 'NOTARY REQUIRED'],
      actionIcon: 'history_edu',
    },
    {
      id: 3,
      title: 'Medical Records — Health Clinic',
      category: 'Medical Protocol',
      status: 'In Transit',
      updated: 'Jul 26',
      recipient: 'Health Clinic',
      tags: ['RETURN DELIVERY', 'CONFIDENTIAL'],
      actionIcon: 'assignment_return',
    },
    {
      id: 4,
      title: 'Academic Transcript — University XYZ',
      category: 'Certified Transcript',
      status: 'Pending Notary',
      updated: 'Jul 26',
      recipient: 'University Registrar',
      tags: ['REQUESTING NOTARY TIME'],
      actionIcon: 'event',
    },
  ];

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-4xl lg:text-5xl font-semibold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Pending Deliveries
          </h1>
          <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Total: 5 pending items requiring courier action
          </p>
        </div>
      </div>

      {/* Pending Record Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pendingDeliveries.map((delivery) => (
          <RecordCard
            key={delivery.id}
            title={delivery.title}
            category={delivery.category}
            icon="pending_actions"
            iconColor="bg-amber-500/10 text-amber-500"
            topRightIcon="schedule"
            tags={delivery.tags}
            metaLine={`Updated: ${delivery.updated}`}
            subMetaLine={`Recipient: ${delivery.recipient}`}
            status={delivery.status}
            actionIcon={delivery.actionIcon}
            onClick={() => onItemClick && onItemClick({ title: delivery.title, subtitle: `${delivery.category} • Recipient: ${delivery.recipient}`, icon: 'pending_actions', badge: delivery.status })}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
};
