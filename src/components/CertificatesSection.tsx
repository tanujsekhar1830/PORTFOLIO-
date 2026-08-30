import React, { useState } from 'react';
import { 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Bot, 
  Code2, 
  Users, 
  Shield, 
  FileCheck,
  Building2,
  UserCheck,
  Clock,
  FolderOpen,
  X
} from 'lucide-react';
import { certificatesData, personalInfo } from '../data/portfolioData';
import { Certificate } from '../types';

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'AI / Emerging Tech', 'Programming', 'Security & AI', 'Hackathon', 'Leadership'];

  const filteredCerts = activeFilter === 'All' 
    ? certificatesData 
    : certificatesData.filter(c => c.type === activeFilter);

  const getCertIcon = (type: string) => {
    switch (type) {
      case 'AI / Emerging Tech': return <Bot className="w-5 h-5 text-amber-400" />;
      case 'Programming': return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'Security & AI': return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'Hackathon': return <Sparkles className="w-5 h-5 text-pink-400" />;
      case 'Leadership': return <Users className="w-5 h-5 text-indigo-400" />;
      default: return <Award className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getCategoryBadgeStyle = (type: string) => {
    switch (type) {
      case 'AI / Emerging Tech':
        return 'bg-amber-950/60 text-amber-300 border-amber-800/80';
      case 'Programming':
        return 'bg-cyan-950/60 text-cyan-300 border-cyan-800/80';
      case 'Security & AI':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-800/80';
      case 'Hackathon':
        return 'bg-pink-950/60 text-pink-300 border-pink-800/80';
      case 'Leadership':
        return 'bg-indigo-950/60 text-indigo-300 border-indigo-800/80';
      default:
        return 'bg-slate-900 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="certificates" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-xs font-semibold text-cyan-400">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials & Accreditations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications & Technical Accreditations
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            8 verified credentials validating specialized competencies across Oracle Agentic AI, Infosys Python Programming suites, Cybersecurity, and Hackathons.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
                activeFilter === cat
                  ? 'bg-slate-900 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="bg-slate-900/90 border border-slate-800/90 rounded-2xl p-6 hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-xl hover:shadow-cyan-500/10 space-y-4"
            >
              <div className="space-y-4">
                {/* Header Row: Icon, Category & Date */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner group-hover:border-cyan-500/40 transition">
                      {getCertIcon(cert.type)}
                    </div>
                    <div>
                      <span className={`inline-block px-2.5 py-0.5 rounded-md border text-[10px] font-bold tracking-wider uppercase ${getCategoryBadgeStyle(cert.type)}`}>
                        {cert.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 shrink-0">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>{cert.date}</span>
                  </div>
                </div>

                {/* Issuer & ID */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                      {cert.issuer}
                    </span>
                    {cert.certificateId && (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 shrink-0">
                        ID: {cert.certificateId}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition leading-snug">
                    {cert.title}
                  </h3>
                </div>

                {/* Signatory / Validity */}
                {(cert.signatory || cert.duration) && (
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1 text-xs text-slate-300">
                    {cert.duration && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{cert.duration}</span>
                      </div>
                    )}
                    {cert.signatory && (
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <UserCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{cert.signatory}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Skills Covered Tags */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Skills & Competencies:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skillsCovered.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800/80 text-[10px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-400 transition">
                <span className="font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  View Verified Credential
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Google Drive Link Under Certifications */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-cyan-500/30 hover:border-cyan-500/60 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-cyan-950/40 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-indigo-500/5 opacity-50 group-hover:opacity-100 transition-opacity" />
          
          <div className="flex items-start sm:items-center gap-4 relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner group-hover:scale-105 transition-transform">
              <FolderOpen className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400" />
            </div>
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-[10px] sm:text-xs font-semibold text-cyan-300">
                <span>Google Drive Document Repository</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                View All Original Certificate PDFs & Documentation
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Access official certificate scans, transcripts, course completion records, and verification documents directly in the Google Drive folder.
              </p>
            </div>
          </div>

          <div className="relative z-10 w-full md:w-auto shrink-0">
            <a
              href={personalInfo.certificatesDriveUrl || "https://drive.google.com/drive/u/0/my-drive"}
              target="_blank"
              rel="noreferrer"
              id="google-drive-certificates-link"
              className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2.5 shadow-lg shadow-cyan-600/30 hover:shadow-cyan-500/40 transition hover:scale-105"
            >
              <FolderOpen className="w-4 h-4" />
              <span>Open Certificates Google Drive</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Certificate Details Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 animate-fadeIn max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" />
                    {selectedCert.issuer}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {selectedCert.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Verification Metadata Box */}
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  Issuing Organization:
                </span>
                <span className="text-white font-semibold text-right">{selectedCert.issuer}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  Issue Date:
                </span>
                <span className="text-cyan-400 font-mono font-semibold">{selectedCert.date}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Award className="w-3.5 h-3.5 text-slate-500" />
                  Domain / Category:
                </span>
                <span className={`px-2 py-0.5 rounded border text-[11px] font-semibold ${getCategoryBadgeStyle(selectedCert.type)}`}>
                  {selectedCert.type}
                </span>
              </div>
              {selectedCert.certificateId && (
                <div className="flex justify-between items-center text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <FileCheck className="w-3.5 h-3.5 text-slate-500" />
                    Certificate ID / Credential Number:
                  </span>
                  <span className="text-amber-400 font-mono font-bold">{selectedCert.certificateId}</span>
                </div>
              )}
              {selectedCert.duration && (
                <div className="flex justify-between items-center text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Duration / Validity:
                  </span>
                  <span className="text-slate-200 font-semibold">{selectedCert.duration}</span>
                </div>
              )}
              {selectedCert.signatory && (
                <div className="flex justify-between items-start text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <UserCheck className="w-3.5 h-3.5 text-slate-500" />
                    Authorized Signatory:
                  </span>
                  <span className="text-slate-200 text-right max-w-xs">{selectedCert.signatory}</span>
                </div>
              )}
              {selectedCert.credentialUrl && (
                <div className="flex justify-between items-center text-slate-400 pt-2 border-t border-slate-800">
                  <span className="font-medium">Verification Portal:</span>
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-mono font-medium"
                  >
                    {selectedCert.credentialUrl.replace('https://', '')}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Competencies & Skills Covered */}
            <div className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Verified Technical Competencies & Covered Modules</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedCert.skillsCovered.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              {selectedCert.credentialUrl ? (
                <a
                  href={selectedCert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl text-center transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  Verify on Portal
                </a>
              ) : null}
              <button
                onClick={() => setSelectedCert(null)}
                className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
