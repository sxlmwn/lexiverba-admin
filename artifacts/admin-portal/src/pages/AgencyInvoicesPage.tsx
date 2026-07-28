import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export const AgencyInvoicesPage: React.FC = () => {
  const invoices = Array.from({ length: 15 }).map((_, i) => {
    const amt = Math.random() * 8000 + 1000;
    return {
      id: `INV-AG-${8000 + i}`,
      agency: `Agency ${String.fromCharCode(65 + (i % 5))}`,
      amount: `$${amt.toFixed(2)}`,
      tax: `$${(amt * 0.1).toFixed(2)}`,
      total: `$${(amt * 1.1).toFixed(2)}`,
      status: ['Paid', 'Pending', 'Overdue'][i % 3],
      issueDate: `2026-07-0${1 + (i % 9)}`,
      dueDate: `2026-08-0${1 + (i % 9)}`,
    };
  });

  return (
    <div className="space-y-6 animate-page-enter">
      <h1 className="text-3xl font-bold tracking-tight">Agency Invoices</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <input type="date" className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-[#18181b] text-sm outline-none" />
        <select className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-[#18181b] text-sm outline-none">
          <option>All Statuses</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Overdue</option>
        </select>
        <select className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-[#18181b] text-sm outline-none">
          <option>All Agencies</option>
          <option>Agency A</option>
          <option>Agency B</option>
        </select>
      </div>

      <Card className="p-0 overflow-hidden" hoverable={false} interactive={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Agency</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
              <TableHead className="text-right">Tax</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-mono text-sm font-medium">{inv.id}</TableCell>
                <TableCell className="font-semibold text-sm">{inv.agency}</TableCell>
                <TableCell className="text-right font-mono text-sm">{inv.amount}</TableCell>
                <TableCell className="text-right font-mono text-sm text-slate-500">{inv.tax}</TableCell>
                <TableCell className="text-right font-mono text-sm font-bold">{inv.total}</TableCell>
                <TableCell><Badge status={inv.status}>{inv.status}</Badge></TableCell>
                <TableCell className="text-sm text-slate-500">{inv.issueDate}</TableCell>
                <TableCell className="text-sm text-slate-500">{inv.dueDate}</TableCell>
                <TableCell className="text-right">
                  <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold px-3 py-1 bg-blue-50 rounded-lg cursor-pointer transition-colors">Details</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
