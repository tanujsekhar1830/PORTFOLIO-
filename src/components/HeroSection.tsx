import React, { useRef } from 'react';
import { 
  Tv, 
  Cpu, 
  Sparkles, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  Award,
  Sprout,
  Camera,
  RotateCcw,
  Upload
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useProfilePhoto } from '../context/ProfileContext';

interface HeroSectionProps {
  onOpenPresentation: () => void;
  onOpenResume: () => void;
  onJumpToSimulator: (type: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPresentation,
  onOpenResume,
  onJumpToSimulator
}) => {
  const { photoUrl, setCustomPhoto, resetPhoto, isCustom } = useProfilePhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomPhoto(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text & Pitch */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Status Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-cyan-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Available for Technical Projects & Internships</span>
            </div>

            {/* Main Name & Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">{personalInfo.name}</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-300">
                B.Tech Computer Science Engineering Student & Developer
              </p>
            </div>

            {/* Short Bio */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              Engineering practical, human-centered technology spanning <strong className="text-slate-200">IoT embedded crash detection</strong>, <strong className="text-slate-200">accessible agricultural web platforms</strong>, and <strong className="text-slate-200">foundational Python education</strong> at Lovely Professional University.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-start-presentation-btn"
                onClick={onOpenPresentation}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-600/25 flex items-center gap-2 hover:scale-105 active:scale-95 transition"
              >
                <Tv className="w-4 h-4 animate-pulse" />
                <span>Start Class Presentation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-jump-iot-btn"
                onClick={() => onJumpToSimulator('iot-helmet')}
                className="px-5 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 font-semibold text-sm rounded-xl flex items-center gap-2 transition"
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Test IoT Simulator</span>
              </button>

              <button
                id="hero-resume-btn"
                onClick={onOpenResume}
                className="px-4 py-3.5 bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold text-sm rounded-xl flex items-center gap-2 transition"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Resume</span>
              </button>
            </div>

            {/* Social & Contact Bar */}
            <div className="flex items-center gap-4 pt-3 text-slate-400 text-xs">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition"
              >
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                <span className="hidden sm:inline">LinkedIn Profile</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition"
              >
                <Github className="w-4 h-4 text-slate-200" />
                <span className="hidden sm:inline">GitHub: tanujsekhar1830</span>
              </a>
              <span className="text-slate-700">•</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-1.5 hover:text-cyan-400 transition"
              >
                <Mail className="w-4 h-4 text-rose-400" />
                <span className="hidden sm:inline">{personalInfo.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Profile Photo Card & Academic Highlight Bento */}
          <div className="lg:col-span-5 space-y-4">
            {/* Hidden Input for direct file selection */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Profile Photo Card - Displaying Full Photo As-Is */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-sm relative overflow-hidden group hover:border-cyan-500/40 transition">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                {/* Full Aspect Ratio Photo Container */}
                <div className="relative shrink-0 w-36 sm:w-40 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-cyan-500/50 shadow-xl shadow-cyan-500/10 group-hover:scale-[1.02] transition-all duration-300 bg-slate-950">
                  <img
                    src={photoUrl}
                    alt={personalInfo.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Active Online Indicator */}
                  <span className="absolute bottom-2 right-2 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-900"></span>
                  </span>

                  {/* Quick Upload Hover Overlay */}
                  <button
                    onClick={handleUploadClick}
                    title="Change or upload your exact photo"
                    className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 text-white transition-opacity backdrop-blur-xs cursor-pointer"
                  >
                    <Camera className="w-6 h-6 text-cyan-400" />
                    <span className="text-[10px] font-bold text-cyan-200">Change Photo</span>
                  </button>
                </div>

                {/* Profile Identity & Tag */}
                <div className="space-y-2.5 text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-[11px] font-semibold text-cyan-300 font-mono">
                      <GraduationCap className="w-3 h-3 text-cyan-400" />
                      <span>B.Tech CSE • LPU (2025-29)</span>
                    </div>

                    {isCustom && (
                      <button
                        onClick={resetPhoto}
                        title="Reset to default photo"
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-300 transition"
                      >
                        <RotateCcw className="w-2.5 h-2.5" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {personalInfo.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      IoT Embedded Systems • Web Engineering • Python Teaching
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] text-slate-400 font-mono">
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-semibold">
                      CGPA: {personalInfo.cgpa}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-amber-300 font-semibold">
                      12th: 97.3%
                    </span>
                  </div>

                  {/* Direct upload button */}
                  <div className="pt-1">
                    <button
                      onClick={handleUploadClick}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload exact original photo</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic & Engineering Highlights Bento */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Academic & Engineering Highlights</div>
                    <div className="text-[11px] text-slate-400">Verified Profile Metrics</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 font-mono text-xs border border-cyan-800">
                  Verified Matrix
                </span>
              </div>

              {/* 2x2 Bento Metric Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* 12th Board Distinction */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 group hover:border-cyan-500/40 transition">
                  <div className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 font-mono">
                    97.3%
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">Higher Secondary</div>
                  <div className="text-[10px] text-slate-400">Narayana Jr. College Distinction</div>
                </div>

                {/* B.Tech Current CGPA */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 group hover:border-cyan-500/40 transition">
                  <div className="text-2xl font-extrabold text-cyan-400 font-mono">
                    7.47
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">B.Tech CGPA</div>
                  <div className="text-[10px] text-slate-400">Computer Science & Engineering</div>
                </div>

                {/* Flagship Projects */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 group hover:border-cyan-500/40 transition">
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                    3
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">Flagship Projects</div>
                  <div className="text-[10px] text-slate-400">IoT, Web Platform & Python CDP</div>
                </div>

                {/* Certifications */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 group hover:border-cyan-500/40 transition">
                  <div className="text-2xl font-extrabold text-indigo-400 font-mono">
                    5+
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">Certifications</div>
                  <div className="text-[10px] text-slate-400">Oracle AI, Infosys & Neo Colab</div>
                </div>
              </div>

              {/* Verified Competency Bullets */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Oracle Agentic AI & Enterprise Orchestration Certified</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Led Python Teaching Workshops for University Peers</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>ESP8266 Embedded Firmware & Hardware Prototyping</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
