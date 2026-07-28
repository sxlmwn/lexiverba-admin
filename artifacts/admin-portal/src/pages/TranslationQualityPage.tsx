import React from 'react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export const TranslationQualityPage: React.FC = () => {
  const records = Array.from({ length: 15 }).map((_, i) => {
    const bleu = (Math.random() * 5 + 94).toFixed(1);
    const qa = (Math.random() * 5 + 95).toFixed(1);
    return {
      id: `DOC-80${10 + i}`,
      pair: ['EN → DE', 'FR → EN', 'ES → EN'][i % 3],
      translator: `Translator ${i % 5}`,
      qaScore: `${qa}%`,
      bleuScore: `${bleu}%`,
      status: qa > "98" ? 'Optimal' : 'Reviewing',
      date: `2026-07-${20 + (i % 5)}`,
    };
  });

  return (
    <div className="space-y-6 animate-page-enter">
      <h1 className="text-3xl font-bold tracking-tight">Translation Quality Control</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard title="Avg BLEU Score" value="97.8%" icon="model_training" badge="High" />
        <MetricCard title="QA Pass Rate" value="99.1%" icon="fact_check" />
        <MetricCard title="Error Rate" value="0.9%" icon="warning" badge="danger" />
        <MetricCard title="Certified Translators" value="184" icon="verified" />
      </div>

      <Card className="p-0 overflow-hidden" hoverable={false} interactive={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document ID</TableHead>
              <TableHead>Language Pair</TableHead>
              <TableHead>Translator</TableHead>
              <TableHead className="text-right">QA Score</TableHead>
              <TableHead className="text-right">BLEU Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reviewed Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((rec) => (
              <TableRow key={rec.id}>
                <TableCell className="font-mono text-sm font-medium">{rec.id}</TableCell>
                <TableCell>
                  <span className="bg-slate-100 dark:bg-zinc-800 text-xs px-2 py-1 rounded-md font-semibold">{rec.pair}</span>
                </TableCell>
                <TableCell className="font-semibold text-sm">{rec.translator}</TableCell>
                <TableCell className="text-right font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">{rec.qaScore}</TableCell>
                <TableCell className="text-right font-mono text-sm font-bold text-blue-600 dark:text-blue-400">{rec.bleuScore}</TableCell>
                <TableCell><Badge status={rec.status}>{rec.status}</Badge></TableCell>
                <TableCell className="text-sm text-slate-500">{rec.date}</TableCell>
                <TableCell className="text-right">
                  <button className="material-symbols-outlined text-slate-400 hover:text-blue-500 cursor-pointer">troubleshoot</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
