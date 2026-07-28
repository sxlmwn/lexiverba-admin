import React from 'react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export const FinancePage: React.FC = () => {
  const invoices = Array.from({ length: 15 }).map((_, i) => ({
    id: `INV-2026-${1000 + i}`,
    client: `Client Agency ${i + 1}`,
    amount: `$${(Math.random() * 5000 + 500).toFixed(2)}`,
    status: ['Paid', 'Pending', 'Overdue'][i % 3],
    dueDate: `2026-08-${10 + i}`,
  }));

  return (
    <div className="space-y-6 animate-page-enter">
      <h1 className="text-3xl font-bold tracking-tight">Finance Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard title="Total Revenue" value="$248,430" icon="account_balance" badge="YTD" />
        <MetricCard title="Monthly Revenue" value="$18,240" icon="trending_up" badge="+12%" />
        <MetricCard title="Pending Payouts" value="$4,830" icon="payments" badge="warning" />
        <MetricCard title="Platform Fee" value="$12,421" icon="percent" badge="Generated" />
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">Recent Invoices</h2>
      
      <Card className="p-0 overflow-hidden" hoverable={false} interactive={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Agency/Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell className="font-mono text-sm font-medium">{inv.id}</TableCell>
                <TableCell className="font-semibold text-sm">{inv.client}</TableCell>
                <TableCell className="font-semibold text-sm">{inv.amount}</TableCell>
                <TableCell><Badge status={inv.status}>{inv.status}</Badge></TableCell>
                <TableCell className="text-sm text-slate-500">{inv.dueDate}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="text-blue-600 hover:text-blue-800 text-xs font-semibold bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">View</button>
                    <button className="text-slate-600 hover:text-slate-900 text-xs font-semibold bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">Download</button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
