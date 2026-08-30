import React from 'react';
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
  Sprout
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

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
            <div className="space-y-2.5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">{personalInfo.name}</span>
              </h1>
              
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <div className="px-3 py-1 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-sm sm:text-base font-bold text-cyan-300 flex items-center gap-2 shadow-sm">
                  <GraduationCap className="w-4 h-4 text-cyan-400" />
                  <span>B.Tech Computer Science & Engineering</span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-sm sm:text-base font-bold text-indigo-300 flex items-center gap-2 shadow-sm">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>AI/ML Specialization</span>
                </div>
                <span className="text-slate-500 text-xs sm:text-sm font-medium">Lovely Professional University</span>
              </div>
            </div>

            {/* Short Bio */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              Undergraduate in <strong className="text-cyan-300">Computer Science and Engineering (CSE)</strong> with a focused specialization in <strong className="text-indigo-300">Artificial Intelligence & Machine Learning (AI/ML)</strong> at Lovely Professional University. Engineering practical, human-centered technology spanning <strong className="text-slate-200">IoT embedded crash detection</strong>, <strong className="text-slate-200">accessible agricultural platforms</strong>, and <strong className="text-slate-200">foundational Python education</strong>.
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

          {/* Right Column: Profile Identity Card & Academic Highlight Bento */}
          <div className="lg:col-span-5 space-y-4">
            {/* Profile Identity Card */}
            <div className="bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 rounded-3xl p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden group transition">
              <div className="flex items-center gap-4">
                {/* Monogram / Tech Emblem */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-indigo-600/20 border border-cyan-500/40 flex flex-col items-center justify-center text-cyan-400 font-bold font-mono shadow-lg shadow-cyan-500/10 shrink-0">
                  <span className="text-xl tracking-tighter">TS</span>
                  <span className="text-[9px] uppercase font-sans text-cyan-300 font-semibold tracking-widest">AI/ML</span>
                </div>

                {/* Profile Identity & Tag */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800 text-[11px] font-semibold text-cyan-300 font-mono">
                      <GraduationCap className="w-3 h-3 text-cyan-400" />
                      <span>B.Tech CSE (AI/ML) • LPU</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight truncate">
                      {personalInfo.name}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">
                      IoT Embedded Systems • Web Engineering • Python Teaching
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[11px] text-slate-400 font-mono">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-slate-300 font-semibold">
                      CGPA: {personalInfo.cgpa}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-amber-300 font-semibold">
                      12th: 97.3%
                    </span>
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
                    8
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">Certifications</div>
                  <div className="text-[10px] text-slate-400">Oracle AI, Infosys, iamneo & Hackathons</div>
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
