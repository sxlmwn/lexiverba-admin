import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

interface CertificationPageProps {
  onItemClick: (item: { title: string; subtitle: string; icon?: string; badge?: string }) => void;
}

export const CertificationPage: React.FC<CertificationPageProps> = ({ onItemClick }) => {
  const certs = [
    {
      id: 'cert-1',
      title: 'Court Sworn Legal Translator License',
      issuer: 'Ministry of Justice & Legal Registry',
      number: 'ST-99124-DE',
      status: 'verified',
      expires: 'Dec 2028',
      icon: 'verified_user',
      swornStamp: true,
      desc: 'Authorized to issue sworn legal translations and notarized deeds.',
    },
    {
      id: 'cert-2',
      title: 'ISO 17100:2015 Translation Services Standard',
      issuer: 'European Association of Translation Companies',
      number: 'ISO-EU-88410',
      status: 'verified',
      expires: 'Oct 2027',
      icon: 'workspace_premium',
      swornStamp: false,
      desc: 'Compliant with international translation quality standards.',
    },
    {
      id: 'cert-3',
      title: 'ISO 18587 Neural Machine Post-Editing',
      issuer: 'LexiVerba AI Quality Assurance Board',
      number: 'NMT-PE-2026',
      status: 'verified',
      expires: 'Permanent',
      icon: 'psychology',
      swornStamp: false,
      desc: 'Certified for high-speed NMT post-editing and MTQE validation.',
    },
    {
      id: 'cert-4',
      title: 'Sworn Digital Signature Certificate (eIDAS)',
      issuer: 'Global Digital Trust Authority',
      number: 'EID-992-SIG',
      status: 'pending_renewal',
      expires: 'Aug 2026',
      icon: 'key',
      swornStamp: true,
      desc: 'Cryptographic digital seal for sworn PDF document delivery.',
    },
  ];

  return (
    <div className="space-y-8 animate-page-enter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Certification &amp; Licenses</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Court sworn translator licenses, ISO credentials, and digital seals.
          </p>
        </div>

        <button
          onClick={() =>
            onItemClick({
              title: 'Upload Certification Document',
              subtitle: 'Upload PDF copy of court license or ISO certificate',
              badge: 'Upload',
            })
          }
          className="px-4 py-2.5 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded-2xl text-xs shadow-md shadow-blue-400/20 transition-all flex items-center gap-2 cursor-pointer self-start md:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">upload_file</span>
          <span>Upload New Credential</span>
        </button>
      </div>

      {/* Credentials Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certs.map((c) => (
          <Card
            key={c.id}
            onClick={() =>
              onItemClick({
                title: c.title,
                subtitle: `${c.issuer} • Reg #: ${c.number} • Valid thru: ${c.expires}`,
                badge: c.status === 'verified' ? 'Verified License' : 'Renewal Due',
              })
            }
            className="p-6 cursor-pointer float-hover hover-rise flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                      c.swornStamp
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'bg-blue-400/10 text-blue-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{c.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{c.title}</h3>
                    <div className="text-[10px] text-slate-400 font-semibold">{c.issuer}</div>
                  </div>
                </div>

                <Badge status={c.status === 'verified' ? 'verified' : 'pending'}>
                  {c.status === 'verified' ? 'Verified' : 'Renewal Due'}
                </Badge>
              </div>

              <p className="text-xs text-slate-400 font-medium mb-4 leading-relaxed">{c.desc}</p>

              <div className="space-y-2 py-3 border-y border-slate-100 dark:border-zinc-800/80 mb-4 text-xs font-semibold">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Registration Number:</span>
                  <span className="font-mono text-blue-400">{c.number}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Expiration / Renewal:</span>
                  <span className="text-amber-600 dark:text-amber-400">{c.expires}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Sworn Stamp Authorization:</span>
                  <span className={c.swornStamp ? 'text-emerald-500' : 'text-slate-400'}>
                    {c.swornStamp ? 'Active & Approved' : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onItemClick({
                    title: `Download Credential PDF: ${c.title}`,
                    subtitle: `Registration #${c.number}`,
                    badge: 'PDF',
                  });
                }}
                className="px-3.5 py-1.5 bg-slate-100 dark:bg-zinc-800 hover:bg-blue-400 hover:text-white text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                <span>View Certificate</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
