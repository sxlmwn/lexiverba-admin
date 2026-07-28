import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { MetricCard } from '../components/ui/MetricCard';
import { Badge } from '../components/ui/Badge';
import { ProgressBar } from '../components/ui/ProgressBar';

export const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('System Health');

  const tabs = ['System Health', 'AI Overview', 'User Stats', 'Activity Log'];

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <span className="inline-block bg-blue-500/10 text-blue-500 text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              LIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Welcome back, demo-admin@lexiverba.com
          </p>
        </div>
      </div>

      {/* Hero banner card */}
      <div className="p-8 rounded-[2.5rem] smooth-card float-shadow bg-white dark:bg-[#18181b] border-2 border-slate-200/80 dark:border-[#27272a] relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="absolute -right-10 -top-10 opacity-5 text-blue-500 pointer-events-none">
          <span className="material-symbols-outlined text-[200px]">shield_person</span>
        </div>
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[32px]">shield_person</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Super Admin Control Center</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Complete system oversight and management</p>
          </div>
        </div>
        <button className="relative z-10 px-5 py-2.5 rounded-xl border-2 border-slate-200 dark:border-zinc-700 bg-transparent font-semibold text-xs text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-500 transition-all cursor-pointer flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">refresh</span>
          Refresh Data
        </button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard title="Total Users" value="2,847" badge="+14 today" icon="group" />
        <MetricCard title="Documents" value="14,203" badge="Processed" icon="description" />
        <MetricCard title="AI Models" value="56" badge="Active" icon="smart_toy" />
        <MetricCard title="Success Rate" value="98.4%" badge="Optimal" icon="trending_up" />
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-[#121215] border border-slate-200/60 dark:border-zinc-800/80 w-max">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-white dark:bg-[#18181b] text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/50 dark:border-zinc-700'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-zinc-800/50 border border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'System Health' && (
          <div className="space-y-8 animate-page-enter">
            {/* Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { name: 'Database', icon: 'database' },
                { name: 'Edge Functions', icon: 'bolt' },
                { name: 'Storage', icon: 'cloud' },
                { name: 'Authentication', icon: 'lock' },
              ].map((sys) => (
                <div key={sys.name} className="p-5 rounded-2xl border-2 border-slate-200/80 dark:border-[#27272a] bg-white dark:bg-[#18181b] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-slate-400">{sys.icon}</span>
                    <span className="font-semibold text-sm">{sys.name}</span>
                  </div>
                  <Badge variant="success">Healthy</Badge>
                </div>
              ))}
            </div>

            {/* Performance Card */}
            <Card hoverable={false} interactive={false} className="p-8">
              <div className="mb-6">
                <h3 className="text-lg font-bold">System Performance</h3>
                <p className="text-xs text-slate-500 mt-1">Resource utilization across primary infrastructure</p>
              </div>
              <div className="space-y-6">
                <ProgressBar progress={85} label="Database Connections" showLabel barColor="bg-blue-500" />
                <ProgressBar progress={42} label="Storage Usage" showLabel barColor="bg-blue-500" />
                <ProgressBar progress={95} label="API Response Time" showLabel barColor="bg-blue-500" />
              </div>
            </Card>

            {/* Quick Actions */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Create Agency', icon: 'add_business' },
                  { label: 'View Users', icon: 'group' },
                  { label: 'AI Control', icon: 'smart_toy' },
                  { label: 'Settings', icon: 'settings' },
                ].map((action) => (
                  <button key={action.label} className="p-5 rounded-2xl border-2 border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#121215] hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-3 cursor-pointer group float-hover">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-500 transition-colors">{action.icon}</span>
                    <span className="font-semibold text-sm">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'AI Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 animate-page-enter">
            {[
              { name: 'LexiCore NMT v4.2', status: 'active', usage: 78, desc: 'Primary Neural Machine Translation engine.' },
              { name: 'LexiQA Validator v2.1', status: 'active', usage: 45, desc: 'Automated terminology and formatting checks.' },
              { name: 'LexiOCR Pro v1.8', status: 'active', usage: 91, desc: 'Optical Character Recognition for PDFs.' },
              { name: 'LexiNER Entity v3.0', status: 'beta', usage: 23, desc: 'Named Entity Recognition model.' },
            ].map((model) => (
              <Card key={model.name} hoverable={false} interactive={false}>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-base">{model.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{model.desc}</p>
                  </div>
                  <Badge status={model.status}>{model.status}</Badge>
                </div>
                <ProgressBar progress={model.usage} label={`Usage Volume (${model.usage}%)`} showLabel />
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'User Stats' && (
          <div className="space-y-6 animate-page-enter">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <MetricCard title="Total Active" value="2,401" icon="person" />
              <MetricCard title="New This Month" value="187" icon="person_add" />
              <MetricCard title="Suspended" value="23" icon="block" badge="danger" />
              <MetricCard title="Pending Verification" value="43" icon="pending_actions" badge="warning" />
            </div>
            <Card hoverable={false} interactive={false} className="h-64 flex flex-col justify-end p-6 border-dashed border-4 border-slate-200 dark:border-zinc-800 bg-transparent">
              <div className="text-center text-slate-400 font-semibold mb-8">User Growth Bar Chart Visualization Placeholer</div>
              <div className="flex items-end justify-around h-32 w-full gap-2">
                {[30, 45, 20, 60, 80, 50, 95, 70, 40, 85, 60, 100].map((h, i) => (
                  <div key={i} className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'Activity Log' && (
          <Card hoverable={false} interactive={false} className="p-0 overflow-hidden animate-page-enter">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 dark:bg-zinc-800/50 text-xs uppercase text-slate-500 dark:text-slate-400 border-b dark:border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Timestamp</th>
                    <th className="px-6 py-4 font-semibold">Event Type</th>
                    <th className="px-6 py-4 font-semibold">Actor</th>
                    <th className="px-6 py-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-zinc-800">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="px-6 py-4 text-xs font-mono text-slate-500">2026-07-25 14:{30 - i}:00</td>
                      <td className="px-6 py-4"><Badge variant={i % 3 === 0 ? 'success' : 'default'}>{i % 3 === 0 ? 'User Created' : 'Model Deployed'}</Badge></td>
                      <td className="px-6 py-4 font-semibold">System API</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">Generated invoice INV-2026-88{i} for agency XYZ</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
