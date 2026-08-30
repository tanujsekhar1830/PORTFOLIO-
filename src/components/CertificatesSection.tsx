import React, { useState, useEffect, useRef } from 'react';
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
  Eye,
  Maximize2,
  Upload,
  Camera,
  RotateCcw,
  X
} from 'lucide-react';
import { certificatesData } from '../data/portfolioData';
import { Certificate } from '../types';

export const CertificatesSection: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetCertId, setUploadTargetCertId] = useState<string | null>(null);

  // Load custom certificate images from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tanuj_portfolio_custom_certs');
      if (saved) {
        setCustomImages(JSON.parse(saved));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const handleFileUpload = (certId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          const updated = { ...customImages, [certId]: result };
          setCustomImages(updated);
          try {
            localStorage.setItem('tanuj_portfolio_custom_certs', JSON.stringify(updated));
          } catch {
            // ignore storage full
          }
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  const handleResetImage = (certId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = { ...customImages };
    delete updated[certId];
    setCustomImages(updated);
    try {
      localStorage.setItem('tanuj_portfolio_custom_certs', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const getCertImage = (cert: Certificate) => {
    return customImages[cert.id] || cert.imageUrl;
  };

  const categories = ['All', 'AI / Emerging Tech', 'Programming', 'Security & AI', 'Hackathon', 'Leadership'];

  const filteredCerts = activeFilter === 'All' 
    ? certificatesData 
    : certificatesData.filter(c => c.type === activeFilter);

  const getCertIcon = (type: string) => {
    switch (type) {
      case 'AI / Emerging Tech': return <Bot className="w-5 h-5 text-amber-400" />;
      case 'Programming': return <Code2 className="w-5 h-5 text-cyan-400" />;
      case 'Security & AI': return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'Hackathon': return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Leadership': return <Users className="w-5 h-5 text-indigo-400" />;
      default: return <Award className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section id="certificates" className="py-20 bg-slate-950 relative border-t border-slate-900">
      {/* Hidden file input for custom certificate photo upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (uploadTargetCertId) {
            handleFileUpload(uploadTargetCertId, e);
          }
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-xs font-semibold text-cyan-400">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Credentials & Awards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications & Technical Accreditations
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            8 verified credentials with official attached certificates. You can view, enlarge, or replace any certificate photo directly with your own files.
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
          {filteredCerts.map((cert) => {
            const currentImg = getCertImage(cert);
            const isCustom = !!customImages[cert.id];

            return (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="bg-slate-900/90 border border-slate-800/90 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:bg-slate-900 transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-xl hover:shadow-cyan-500/10"
              >
                {/* Certificate Image Preview Banner */}
                {currentImg ? (
                  <div className="relative aspect-[16/9] w-full bg-slate-950 border-b border-slate-800 overflow-hidden group/img">
                    <img
                      src={currentImg}
                      alt={cert.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    
                    {/* Badge overlay */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-bold text-cyan-300 shadow-sm">
                      {getCertIcon(cert.type)}
                      <span>{cert.type}</span>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover/img:opacity-100 transition-opacity">
                      <button
                        title="Upload Custom Certificate Image"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadTargetCertId(cert.id);
                          fileInputRef.current?.click();
                        }}
                        className="px-2 py-1 rounded-md bg-slate-950/90 hover:bg-cyan-600 border border-slate-700 text-[10px] font-bold text-white flex items-center gap-1 shadow backdrop-blur transition"
                      >
                        <Camera className="w-3 h-3 text-cyan-300" />
                        <span>{isCustom ? 'Replace' : 'Upload'}</span>
                      </button>

                      {isCustom && (
                        <button
                          title="Reset to Original Image"
                          onClick={(e) => handleResetImage(cert.id, e)}
                          className="p-1 rounded-md bg-slate-950/90 hover:bg-red-600/80 border border-slate-700 text-slate-300 hover:text-white shadow transition"
                        >
                          <RotateCcw className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    <div className="absolute bottom-2.5 right-3 text-[10px] font-mono font-semibold text-slate-300 bg-slate-950/90 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {cert.date}
                    </div>
                  </div>
                ) : (
                  <div className="h-20 bg-gradient-to-br from-slate-950 to-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                      {getCertIcon(cert.type)}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadTargetCertId(cert.id);
                        fileInputRef.current?.click();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800/80 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload Photo
                    </button>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                        {cert.issuer}
                      </span>
                      {cert.certificateId && (
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 shrink-0">
                          ID: {cert.certificateId}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition line-clamp-2 leading-snug">
                      {cert.title}
                    </h3>

                    {/* Covered Skills */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
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

                  <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between text-xs text-slate-400 group-hover:text-cyan-400 transition mt-2">
                    <span className="font-semibold flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-cyan-400" />
                      View Certificate Photo & Credentials
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal with Full Photo View */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    {selectedCert.issuer}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">{selectedCert.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Attached Certificate Photo */}
            {getCertImage(selectedCert) && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-cyan-400" />
                    Attached Certificate Photo
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setUploadTargetCertId(selectedCert.id);
                        fileInputRef.current?.click();
                      }}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px] bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Upload / Replace
                    </button>
                    <button
                      onClick={() => setFullscreenImage(getCertImage(selectedCert) || null)}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px] bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      Expand
                    </button>
                  </div>
                </div>
                <div 
                  onClick={() => setFullscreenImage(getCertImage(selectedCert) || null)}
                  className="rounded-2xl border border-slate-700 overflow-hidden bg-slate-950 cursor-pointer group relative shadow-lg max-h-80 flex items-center justify-center"
                >
                  <img
                    src={getCertImage(selectedCert)}
                    alt={selectedCert.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto max-h-80 object-contain group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 text-cyan-300 border border-slate-700 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                      Click to Enlarge
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Verification Metadata Box */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Issuing Authority:</span>
                <span className="text-white font-semibold text-right">{selectedCert.issuer}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Issue Date:</span>
                <span className="text-cyan-400 font-mono font-semibold">{selectedCert.date}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Domain / Category:</span>
                <span className="text-emerald-400 font-medium">{selectedCert.type}</span>
              </div>
              {selectedCert.certificateId && (
                <div className="flex justify-between text-slate-400">
                  <span>Certificate ID / Number:</span>
                  <span className="text-amber-400 font-mono font-semibold">{selectedCert.certificateId}</span>
                </div>
              )}
              {selectedCert.duration && (
                <div className="flex justify-between text-slate-400">
                  <span>Duration / Validity:</span>
                  <span className="text-slate-300">{selectedCert.duration}</span>
                </div>
              )}
              {selectedCert.signatory && (
                <div className="flex justify-between text-slate-400">
                  <span>Authorized Signatory:</span>
                  <span className="text-slate-300 text-right">{selectedCert.signatory}</span>
                </div>
              )}
              {selectedCert.credentialUrl && (
                <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                  <span>Verification Portal:</span>
                  <a
                    href={selectedCert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    {selectedCert.credentialUrl.replace('https://', '')}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Competencies & Applied Modules Verified
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {selectedCert.skillsCovered.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {getCertImage(selectedCert) && (
                <a
                  href={getCertImage(selectedCert)}
                  target="_blank"
                  rel="noreferrer"
                  download={`${selectedCert.id}-certificate.jpg`}
                  className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-xl text-center transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-4 h-4" />
                  Open Full Certificate Photo
                </a>
              )}
              <button
                onClick={() => setSelectedCert(null)}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Lightbox */}
      {fullscreenImage && (
        <div 
          onClick={() => setFullscreenImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center">
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute -top-12 right-0 p-2 text-slate-300 hover:text-white bg-slate-800 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={fullscreenImage}
              alt="Fullscreen Certificate"
              referrerPolicy="no-referrer"
              className="max-h-[85vh] w-auto object-contain rounded-xl border border-slate-700 shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
