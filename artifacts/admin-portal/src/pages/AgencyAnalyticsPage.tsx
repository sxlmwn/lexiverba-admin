import React from 'react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export const AgencyAnalyticsPage: React.FC = () => {
  const agencies = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    name: `Agency ${String.fromCharCode(65 + i)} Translations`,
    status: 'Active',
    projects: Math.floor(Math.random() * 50 + 10),
    score: (Math.random() * 5 + 94).toFixed(1) + '%',
    volume: `${Math.floor(Math.random() * 100 + 20)},000`,
    revenue: `$${(Math.random() * 50000 + 10000).toFixed(0)}`,
  }));

  return (
    <div className="space-y-6 animate-page-enter">
      <h1 className="text-3xl font-bold tracking-tight">Agency Analytics</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard title="Total Agencies" value="84" icon="corporate_fare" />
        <MetricCard title="Active Projects" value="312" icon="account_tree" />
        <MetricCard title="Avg Quality Score" value="97.2%" icon="verified" badge="Excellent" />
        <MetricCard title="Monthly Volume" value="48,200" badge="words" icon="description" />
      </div>

      <Card className="p-8" hoverable={false} interactive={false}>
        <h3 className="text-lg font-bold mb-6">Top 5 Agencies by Volume</h3>
        <div className="h-64 flex items-end gap-8 pb-8 border-b-2 border-slate-100 dark:border-zinc-800">
          {[80, 65, 50, 40, 30].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center group cursor-pointer relative">
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-3 py-1 rounded-lg">
                {h * 1000} words
              </div>
              <div 
                className="w-full bg-blue-500 rounded-t-xl transition-all duration-500 group-hover:bg-blue-400" 
                style={{ height: `${h}%` }}
              ></div>
              <span className="text-xs font-semibold mt-4 text-slate-500">Agency {String.fromCharCode(65 + i)}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-0 overflow-hidden" hoverable={false} interactive={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agency Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Active Projects</TableHead>
              <TableHead className="text-right">Quality Score</TableHead>
              <TableHead className="text-right">Volume (Words)</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agencies.map((ag) => (
              <TableRow key={ag.id}>
                <TableCell className="font-semibold text-sm">{ag.name}</TableCell>
                <TableCell><Badge status={ag.status}>{ag.status}</Badge></TableCell>
                <TableCell className="text-right font-mono text-sm">{ag.projects}</TableCell>
                <TableCell className="text-right font-mono text-sm text-emerald-600 dark:text-emerald-400 font-bold">{ag.score}</TableCell>
                <TableCell className="text-right font-mono text-sm">{ag.volume}</TableCell>
                <TableCell className="text-right font-mono text-sm font-semibold">{ag.revenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
