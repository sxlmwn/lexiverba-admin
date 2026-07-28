import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export const CustomerOrdersPage: React.FC = () => {
  const orders = Array.from({ length: 15 }).map((_, i) => ({
    id: `ORD-90${10 + i}`,
    customer: `Enterprise Client ${i % 4}`,
    serviceType: i % 2 === 0 ? 'Sworn Translation' : 'Standard Translation',
    langPair: ['EN → DE', 'FR → EN', 'ES → EN', 'EN → ZH'][i % 4],
    wordCount: `${(Math.random() * 10 + 1).toFixed(1)}k`,
    status: ['In Progress', 'Pending', 'Completed', 'Reviewing'][i % 4],
    submitted: `2026-07-${10 + (i % 5)}`,
    deadline: `2026-08-${1 + (i % 10)}`,
  }));

  return (
    <div className="space-y-6 animate-page-enter">
      <h1 className="text-3xl font-bold tracking-tight">Customer Orders</h1>

      <div className="flex gap-4">
        <input type="text" placeholder="Search orders..." className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-[#18181b] text-sm outline-none flex-1" />
        <select className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-[#18181b] text-sm outline-none w-48">
          <option>All Statuses</option>
          <option>Completed</option>
          <option>In Progress</option>
        </select>
      </div>

      <Card className="p-0 overflow-hidden" hoverable={false} interactive={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order #</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Language Pair</TableHead>
              <TableHead className="text-right">Words</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((ord) => (
              <TableRow key={ord.id}>
                <TableCell className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">{ord.id}</TableCell>
                <TableCell className="font-semibold text-sm">{ord.customer}</TableCell>
                <TableCell className="text-sm">{ord.serviceType}</TableCell>
                <TableCell>
                  <span className="bg-slate-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded-md font-semibold">{ord.langPair}</span>
                </TableCell>
                <TableCell className="text-right font-mono text-sm">{ord.wordCount}</TableCell>
                <TableCell><Badge status={ord.status}>{ord.status}</Badge></TableCell>
                <TableCell className="text-sm text-slate-500">{ord.submitted}</TableCell>
                <TableCell className="text-sm font-semibold">{ord.deadline}</TableCell>
                <TableCell className="text-right">
                  <button className="material-symbols-outlined text-slate-400 hover:text-blue-500 cursor-pointer">visibility</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
