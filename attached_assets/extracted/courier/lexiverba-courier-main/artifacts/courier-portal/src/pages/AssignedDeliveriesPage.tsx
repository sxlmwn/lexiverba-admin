import React from 'react';
import { RecordCard } from '../components/ui/RecordCard';

interface AssignedDeliveriesPageProps {
  isDarkMode?: boolean;
  onItemClick?: (item: { title: string; subtitle?: string; icon?: string; badge?: string }) => void;
}

export const AssignedDeliveriesPage: React.FC<AssignedDeliveriesPageProps> = ({ isDarkMode = false, onItemClick }) => {
  const deliveries = [
    {
      id: 1,
      title: 'Academic Transcript — University of Berlin',
      category: 'Certified Transcript',
      status: 'Assigned',
      student: 'Hans Weber',
      updated: 'Jul 27',
      tags: ['EXPRESS', 'NOTARY SEAL', 'ISO-17100'],
      actionIcon: 'local_shipping',
    },
    {
      id: 2,
      title: 'Medical Certificate — Charité Hospital',
      category: 'Medical Protocol',
      status: 'In Transit',
      student: 'Dr. Mueller',
      updated: 'Jul 27',
      tags: ['SAME-DAY', 'CONFIDENTIAL', 'PRIORITY'],
      actionIcon: 'navigation',
    },
    {
      id: 3,
      title: 'Legal Contract — TechCorp GmbH',
      category: 'Legal Sworn Document',
      status: 'Pending',
      student: 'TechCorp Legal',
      updated: 'Jul 26',
      tags: ['APOSTILLE', 'NOTARY REQUIRED'],
      actionIcon: 'draw',
    },
    {
      id: 4,
      title: 'Birth Certificate — Registry Office',
      category: 'Civil Document',
      status: 'Completed',
      student: 'Elena Schmidt',
      updated: 'Jul 25',
      tags: ['DELIVERED', 'VERIFIED'],
      actionIcon: 'check_circle',
    },
  ];

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-4xl lg:text-5xl font-semibold tracking-tight leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Assigned Deliveries
          </h1>
          <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Total: 11 active courier assignments
          </p>
        </div>
      </div>

      {/* Deliveries Record Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deliveries.map((delivery) => (
          <RecordCard
            key={delivery.id}
            title={delivery.title}
            category={delivery.category}
            icon="local_shipping"
            iconColor="bg-blue-600/10 text-blue-500"
            topRightIcon="verified"
            tags={delivery.tags}
            metaLine={`Updated: ${delivery.updated}`}
            subMetaLine={`Recipient: ${delivery.student}`}
            status={delivery.status}
            actionIcon={delivery.actionIcon}
            onClick={() => onItemClick && onItemClick({ title: delivery.title, subtitle: `${delivery.category} • Recipient: ${delivery.student}`, icon: 'local_shipping', badge: delivery.status })}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
};
