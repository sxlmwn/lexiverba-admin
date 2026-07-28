import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export const PricingPage: React.FC = () => {
  const tiers = [
    { name: 'Starter', price: '$299', features: ['Up to 10 users', 'Basic QA models', 'Standard support', '10,000 words/mo'] },
    { name: 'Professional', price: '$899', features: ['Up to 50 users', 'Advanced QA models', 'Priority support', '100,000 words/mo', 'Custom glossaries'], popular: true },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited users', 'Custom NMT models', '24/7 dedicated support', 'Unlimited volume', 'On-premise option'] },
  ];

  const overrides = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    agency: `Global Translate ${i}`,
    tier: 'Professional',
    customRate: i % 2 === 0 ? '$799/mo' : '15% discount',
    validUntil: '2026-12-31',
    status: 'Active',
  }));

  return (
    <div className="space-y-8 animate-page-enter">
      <h1 className="text-3xl font-bold tracking-tight">Platform Pricing</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map(tier => (
          <Card key={tier.name} className="relative p-8" hoverable={false} interactive={false}>
            {tier.popular && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                Most Popular
              </span>
            )}
            <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
            <div className="text-3xl font-black mb-6">{tier.price}<span className="text-sm font-normal text-slate-500">/mo</span></div>
            <ul className="space-y-3 mb-8 flex-1">
              {tier.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <span className="material-symbols-outlined text-[18px] text-emerald-500">check_circle</span>
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${tier.popular ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' : 'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700'}`}>
              Edit Tier
            </button>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Custom Agency Overrides</h2>
        <Card className="p-0 overflow-hidden" hoverable={false} interactive={false}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agency Name</TableHead>
                <TableHead>Base Tier</TableHead>
                <TableHead>Custom Rate</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {overrides.map((ov) => (
                <TableRow key={ov.id}>
                  <TableCell className="font-semibold text-sm">{ov.agency}</TableCell>
                  <TableCell className="text-sm">{ov.tier}</TableCell>
                  <TableCell className="font-mono text-sm">{ov.customRate}</TableCell>
                  <TableCell className="text-sm text-slate-500">{ov.validUntil}</TableCell>
                  <TableCell><Badge status={ov.status}>{ov.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    <button className="text-blue-600 hover:underline text-xs font-semibold cursor-pointer">Edit Override</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};
