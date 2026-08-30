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
  Terminal,
  X
} from 'lucide-react';
import { certificatesData } from '../data/portfolioData';
import { Certificate } from '../types';

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  const getCertIcon = (type: string) => {
    switch (type) {
      case 'AI / Emerging Tech': return <Bot className="w-5 h-5 text-amber-400" />;
      case 'Programming': return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'Hackathon': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Leadership': return <Users className="w-5 h-5 text-indigo-400" />;
      default: return <Award className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="certificates" className="py-20 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-xs font-semibold text-cyan-400">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications & Hackathons
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Industry and institutional certifications validating competencies in AI agents, Python, C/C++, and leadership.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificatesData.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setSelectedCert(cert)}
              className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-6 hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-4 shadow-lg hover:shadow-cyan-500/5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center group-hover:scale-105 transition">
                    {getCertIcon(cert.type)}
                  </div>
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {cert.date}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    {cert.issuer}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition mt-0.5">
                    {cert.title}
                  </h3>
                </div>

                {/* Covered Skills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
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

              <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-400 transition">
                <span className="font-semibold">View Verification Details</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-fadeIn">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="text-lg font-bold text-white">{selectedCert.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Issuing Body:</span>
                <span className="text-white font-semibold">{selectedCert.issuer}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Issue Date:</span>
                <span className="text-cyan-400 font-mono font-semibold">{selectedCert.date}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Category:</span>
                <span className="text-emerald-400 font-medium">{selectedCert.type}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Competencies Verified
              </div>
              <div className="space-y-1.5">
                {selectedCert.skillsCovered.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedCert(null)}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition"
            >
              Close Credential Preview
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
