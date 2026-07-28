import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export const BatchOperationsPage: React.FC = () => {
  const batches = [
    { id: 'B-801', type: 'Mass Invoice Gen', progress: 85, status: 'Running', items: '450/500', started: '10 mins ago' },
    { id: 'B-802', type: 'TMX Export Build', progress: 42, status: 'Running', items: '42%', started: '15 mins ago' },
    { id: 'B-803', type: 'QA Re-validation', progress: 12, status: 'Running', items: '120/1000', started: '2 mins ago' },
    { id: 'B-804', type: 'User Sync Sync', progress: 95, status: 'Running', items: '95%', started: '1 min ago' },
  ];

  const history = Array.from({ length: 8 }).map((_, i) => ({
    id: `B-70${i}`,
    type: i % 2 === 0 ? 'Document Archival' : 'Data Cleanup',
    status: i === 3 ? 'Failed' : 'Completed',
    items: '100%',
    time: `2026-07-25 10:0${i}:00`,
  }));

  return (
    <div className="space-y-8 animate-page-enter">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Batch Operations</h1>
        <button className="px-5 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold shadow-md hover:bg-blue-700 transition-colors cursor-pointer">
          New Batch Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {batches.map(b => (
          <Card key={b.id} className="p-6" hoverable={false} interactive={false}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-sm">{b.id}</h3>
                <p className="text-xs text-slate-500 mt-1">{b.type}</p>
              </div>
              <Badge status={b.status}>{b.status}</Badge>
            </div>
            <ProgressBar progress={b.progress} barColor="bg-blue-500" />
            <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-3 uppercase tracking-wider">
              <span>{b.items}</span>
              <span>{b.started}</span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-0 overflow-hidden" hoverable={false} interactive={false}>
        <div className="p-5 border-b border-[var(--c-border)] dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-800/30">
          <h3 className="font-bold">Recent History</h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch ID</TableHead>
              <TableHead>Job Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead className="text-right">Logs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((h) => (
              <TableRow key={h.id}>
                <TableCell className="font-mono text-sm font-bold">{h.id}</TableCell>
                <TableCell className="font-semibold text-sm">{h.type}</TableCell>
                <TableCell><Badge status={h.status}>{h.status}</Badge></TableCell>
                <TableCell className="text-sm font-mono">{h.items}</TableCell>
                <TableCell className="text-sm text-slate-500">{h.time}</TableCell>
                <TableCell className="text-right">
                  <button className="material-symbols-outlined text-slate-400 hover:text-blue-500 cursor-pointer">receipt_long</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
