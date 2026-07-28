import React from 'react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export const CustomerFeedbackPage: React.FC = () => {
  const feedbacks = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    customer: `Client ${i}`,
    agency: `Agency ${i % 3}`,
    rating: Math.floor(Math.random() * 2) + 4, // 4 or 5
    comment: i % 2 === 0 ? "Excellent translation, very fast turnaround." : "Good quality but slightly delayed.",
    date: `2026-07-${15 + i}`,
    sentiment: i % 2 === 0 ? "Positive" : "Neutral",
  }));

  return (
    <div className="space-y-6 animate-page-enter">
      <h1 className="text-3xl font-bold tracking-tight">Customer Feedback & NPS</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard title="Overall NPS" value="72" icon="sentiment_very_satisfied" badge="Excellent" />
        <MetricCard title="5-Star Reviews" value="1,204" icon="star" />
        <MetricCard title="Avg Rating" value="4.7/5" icon="grade" />
        <MetricCard title="Responses This Month" value="248" icon="forum" />
      </div>

      <Card className="p-0 overflow-hidden" hoverable={false} interactive={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Agency</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Comment Preview</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Sentiment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks.map((fb) => (
              <TableRow key={fb.id}>
                <TableCell className="font-semibold text-sm">{fb.customer}</TableCell>
                <TableCell className="text-sm">{fb.agency}</TableCell>
                <TableCell>
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <span key={idx} className="material-symbols-outlined text-[16px]">
                        {idx < fb.rating ? 'star' : 'star_border'}
                      </span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-sm italic text-slate-500 max-w-[200px] truncate">"{fb.comment}"</TableCell>
                <TableCell className="text-sm text-slate-500">{fb.date}</TableCell>
                <TableCell><Badge status={fb.sentiment}>{fb.sentiment}</Badge></TableCell>
                <TableCell className="text-right">
                  <button className="text-blue-600 hover:underline text-xs font-semibold cursor-pointer">Reply</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
