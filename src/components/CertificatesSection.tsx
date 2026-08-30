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
  Trash2,
  Plus,
  Download,
  Info,
  X
} from 'lucide-react';
import { certificatesData as defaultCertificatesData } from '../data/portfolioData';
import { Certificate } from '../types';

export const CertificatesSection: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [dragOverCertId, setDragOverCertId] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addModalFileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetCertId, setUploadTargetCertId] = useState<string | null>(null);

  // New certificate form state
  const [newCert, setNewCert] = useState<{
    title: string;
    issuer: string;
    date: string;
    certificateId: string;
    signatory: string;
    duration: string;
    credentialUrl: string;
    type: 'AI / Emerging Tech' | 'Programming' | 'Hackathon' | 'Leadership' | 'Security & AI';
    skillsInput: string;
    image: string;
  }>({
    title: '',
    issuer: '',
    date: '',
    certificateId: '',
    signatory: '',
    duration: '',
    credentialUrl: '',
    type: 'AI / Emerging Tech',
    skillsInput: '',
    image: '',
  });

  // Load custom certificates and images from localStorage
  useEffect(() => {
    try {
      const savedImgs = localStorage.getItem('tanuj_portfolio_custom_certs');
      if (savedImgs) {
        setCustomImages(JSON.parse(savedImgs));
      }

      const savedCustomCerts = localStorage.getItem('tanuj_portfolio_user_added_certs');
      if (savedCustomCerts) {
        const parsed: Certificate[] = JSON.parse(savedCustomCerts);
        setCertificates([...defaultCertificatesData, ...parsed]);
      } else {
        setCertificates(defaultCertificatesData);
      }
    } catch {
      setCertificates(defaultCertificatesData);
    }
  }, []);

  const saveCustomImages = (images: Record<string, string>) => {
    setCustomImages(images);
    try {
      localStorage.setItem('tanuj_portfolio_custom_certs', JSON.stringify(images));
    } catch {
      // ignore
    }
  };

  const handleFileUpload = (certId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, JPEG, WEBP, or SVG).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        const updated = { ...customImages, [certId]: result };
        saveCustomImages(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (certId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = { ...customImages };
    delete updated[certId];
    saveCustomImages(updated);
  };

  const handleAddNewCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title.trim() || !newCert.issuer.trim()) {
      alert('Please provide at least the certificate title and issuer.');
      return;
    }

    const newId = `custom-cert-${Date.now()}`;
    const skills = newCert.skillsInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const createdCert: Certificate = {
      id: newId,
      title: newCert.title.trim(),
      issuer: newCert.issuer.trim(),
      date: newCert.date.trim() || '2026',
      certificateId: newCert.certificateId.trim() || undefined,
      signatory: newCert.signatory.trim() || undefined,
      duration: newCert.duration.trim() || undefined,
      credentialUrl: newCert.credentialUrl.trim() || undefined,
      type: newCert.type,
      skillsCovered: skills.length > 0 ? skills : ['Technical Proficiency', 'Practical Application'],
      badgeColor: newCert.type === 'AI / Emerging Tech' ? 'from-amber-500 to-red-500' :
                  newCert.type === 'Programming' ? 'from-blue-600 to-cyan-500' :
                  newCert.type === 'Security & AI' ? 'from-emerald-600 to-teal-500' :
                  newCert.type === 'Hackathon' ? 'from-pink-600 to-rose-500' : 'from-indigo-600 to-violet-500'
    };

    const updatedCertificates = [...certificates, createdCert];
    setCertificates(updatedCertificates);

    // Save custom added certificates
    try {
      const userAdded = updatedCertificates.filter(c => c.id.startsWith('custom-cert-'));
      localStorage.setItem('tanuj_portfolio_user_added_certs', JSON.stringify(userAdded));
    } catch {
      // ignore
    }

    // Save image if uploaded during creation
    if (newCert.image) {
      const updatedImgs = { ...customImages, [newId]: newCert.image };
      saveCustomImages(updatedImgs);
    }

    // Reset modal
    setNewCert({
      title: '',
      issuer: '',
      date: '',
      certificateId: '',
      signatory: '',
      duration: '',
      credentialUrl: '',
      type: 'AI / Emerging Tech',
      skillsInput: '',
      image: '',
    });
    setShowAddModal(false);
  };

  const handleDeleteCertificate = (certId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this certificate?')) {
      const updated = certificates.filter(c => c.id !== certId);
      setCertificates(updated);
      try {
        const userAdded = updated.filter(c => c.id.startsWith('custom-cert-'));
        localStorage.setItem('tanuj_portfolio_user_added_certs', JSON.stringify(userAdded));
      } catch {
        // ignore
      }
      handleRemoveImage(certId);
      if (selectedCert?.id === certId) {
        setSelectedCert(null);
      }
    }
  };

  const getCertImage = (cert: Certificate) => {
    return customImages[cert.id] || cert.imageUrl;
  };

  const categories = ['All', 'AI / Emerging Tech', 'Programming', 'Security & AI', 'Hackathon', 'Leadership'];

  const filteredCerts = activeFilter === 'All' 
    ? certificates 
    : certificates.filter(c => c.type === activeFilter);

  const getCertIcon = (type: string) => {
    switch (type) {
      case 'AI / Emerging Tech': return <Bot className="w-4 h-4 text-amber-400" />;
      case 'Programming': return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'Security & AI': return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'Hackathon': return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'Leadership': return <Users className="w-4 h-4 text-indigo-400" />;
      default: return <Award className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <section id="certificates" className="py-20 bg-slate-950 relative border-t border-slate-900">
      {/* Hidden File Input for Card Image Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file && uploadTargetCertId) {
            handleFileUpload(uploadTargetCertId, file);
          }
          e.target.value = '';
        }}
      />

      {/* Hidden File Input for Add Modal */}
      <input
        type="file"
        ref={addModalFileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
              const res = ev.target?.result as string;
              if (res) {
                setNewCert(prev => ({ ...prev, image: res }));
              }
            };
            reader.readAsDataURL(file);
          }
          e.target.value = '';
        }}
      />

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
            Verified credentials in AI/ML, Python, Cybersecurity, and Hackathons. You can upload and attach your own official certificate photos directly to any card.
          </p>

          {/* Action Bar: Add Certificate & Info */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Certificate</span>
            </button>
            <div className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-800">
              <Info className="w-3.5 h-3.5 text-cyan-400" />
              <span>Click "Upload Photo" on any card or drag-and-drop your certificate image</span>
            </div>
          </div>
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
            const isCustomAdded = cert.id.startsWith('custom-cert-');
            const isDragOver = dragOverCertId === cert.id;

            return (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverCertId(cert.id);
                }}
                onDragLeave={() => setDragOverCertId(null)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverCertId(null);
                  const file = e.dataTransfer.files?.[0];
                  if (file) {
                    handleFileUpload(cert.id, file);
                  }
                }}
                className={`bg-slate-900/90 border rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col justify-between shadow-xl ${
                  isDragOver 
                    ? 'border-cyan-400 bg-slate-900 scale-[1.02] ring-2 ring-cyan-400/50' 
                    : 'border-slate-800/90 hover:border-cyan-500/50 hover:bg-slate-900 hover:shadow-cyan-500/10'
                }`}
              >
                {/* Certificate Banner Area */}
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
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950/90 backdrop-blur-md border border-slate-700/80 text-[10px] font-bold text-cyan-300 shadow-sm">
                      {getCertIcon(cert.type)}
                      <span>{cert.type}</span>
                    </div>

                    {/* Quick Action Controls */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover/img:opacity-100 transition-opacity">
                      <button
                        title="Upload / Change Certificate Photo"
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadTargetCertId(cert.id);
                          fileInputRef.current?.click();
                        }}
                        className="px-2 py-1 rounded-md bg-slate-950/90 hover:bg-cyan-600 border border-slate-700 text-[10px] font-bold text-white flex items-center gap-1 shadow backdrop-blur transition"
                      >
                        <Camera className="w-3 h-3 text-cyan-300" />
                        <span>Change Photo</span>
                      </button>

                      <button
                        title="Remove Photo"
                        onClick={(e) => handleRemoveImage(cert.id, e)}
                        className="p-1 rounded-md bg-slate-950/90 hover:bg-red-600/80 border border-slate-700 text-slate-300 hover:text-white shadow transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="absolute bottom-2.5 right-3 text-[10px] font-mono font-semibold text-slate-300 bg-slate-950/90 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-cyan-400" />
                      {cert.date}
                    </div>
                  </div>
                ) : (
                  /* Clean Dropzone when no photo is attached yet */
                  <div className="p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex flex-col justify-between gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                          {getCertIcon(cert.type)}
                        </div>
                        <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                          {cert.type}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {cert.date}
                      </span>
                    </div>

                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadTargetCertId(cert.id);
                        fileInputRef.current?.click();
                      }}
                      className="w-full py-3 px-3 rounded-xl border border-dashed border-slate-700 hover:border-cyan-400 bg-slate-950/60 hover:bg-slate-950 text-slate-400 hover:text-cyan-300 transition flex items-center justify-center gap-2 text-xs font-semibold group/upload"
                    >
                      <Upload className="w-4 h-4 text-cyan-400 group-hover/upload:scale-110 transition-transform" />
                      <span>Upload Certificate Photo</span>
                    </div>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                        {cert.issuer}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {cert.certificateId && (
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 shrink-0">
                            ID: {cert.certificateId}
                          </span>
                        )}
                        {isCustomAdded && (
                          <button
                            title="Delete this custom certificate"
                            onClick={(e) => handleDeleteCertificate(cert.id, e)}
                            className="text-slate-500 hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
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
                      {currentImg ? 'View Certificate Photo & Details' : 'View Full Details & Upload'}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Details Modal */}
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

            {/* Certificate Photo Section */}
            {getCertImage(selectedCert) ? (
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
                      Replace Photo
                    </button>
                    <button
                      onClick={() => handleRemoveImage(selectedCert.id)}
                      className="text-red-400 hover:text-red-300 flex items-center gap-1 text-[11px] bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Remove
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
            ) : (
              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-800 bg-slate-950/60 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-400 flex items-center justify-center mx-auto">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">No Certificate Photo Attached</h4>
                  <p className="text-xs text-slate-400 mt-1">Upload your official certificate scan or photo to display it here.</p>
                </div>
                <button
                  onClick={() => {
                    setUploadTargetCertId(selectedCert.id);
                    fileInputRef.current?.click();
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold inline-flex items-center gap-2 transition shadow-md"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Image File</span>
                </button>
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
                  <Download className="w-4 h-4" />
                  Download Image
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

      {/* Add New Certificate Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-5 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white">Add Custom Certificate</h3>
                  <p className="text-xs text-slate-400">Enter details and attach your certificate photo</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddNewCertificate} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Certificate Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Certified Cloud Practitioner / Machine Learning with Python"
                  value={newCert.title}
                  onChange={e => setNewCert({ ...newCert, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Issuing Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Coursera / IBM / Oracle / LPU"
                    value={newCert.issuer}
                    onChange={e => setNewCert({ ...newCert, issuer: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Domain / Category</label>
                  <select
                    value={newCert.type}
                    onChange={e => setNewCert({ ...newCert, type: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="AI / Emerging Tech">AI / Emerging Tech</option>
                    <option value="Programming">Programming</option>
                    <option value="Security & AI">Security & AI</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Leadership">Leadership</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Issue Date</label>
                  <input
                    type="text"
                    placeholder="e.g. August 2026 / July 15, 2026"
                    value={newCert.date}
                    onChange={e => setNewCert({ ...newCert, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Certificate ID (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. CERT-123456"
                    value={newCert.certificateId}
                    onChange={e => setNewCert({ ...newCert, certificateId: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Skills Covered (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Neural Networks, PyTorch, Model Evaluation, Data Pipelines"
                  value={newCert.skillsInput}
                  onChange={e => setNewCert({ ...newCert, skillsInput: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Photo Upload in Add Form */}
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Certificate Photo / Scan</label>
                {newCert.image ? (
                  <div className="relative rounded-xl overflow-hidden border border-slate-700 max-h-40 flex items-center justify-center bg-slate-950">
                    <img src={newCert.image} alt="Upload Preview" className="max-h-40 object-contain" />
                    <button
                      type="button"
                      onClick={() => setNewCert({ ...newCert, image: '' })}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/90 text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => addModalFileInputRef.current?.click()}
                    className="w-full py-4 rounded-xl border border-dashed border-slate-700 hover:border-cyan-400 bg-slate-950 cursor-pointer flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-cyan-300 transition"
                  >
                    <Upload className="w-5 h-5 text-cyan-400" />
                    <span className="font-semibold">Click to select certificate image file</span>
                    <span className="text-[10px] text-slate-500">Supports PNG, JPG, JPEG, WEBP</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl transition"
                >
                  Save Certificate
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="py-2.5 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
              </div>
            </form>
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
