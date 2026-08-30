import React from 'react';
import { 
  Tv, 
  ArrowUp, 
  Github, 
  Linkedin, 
  Mail, 
  Cpu, 
  Heart 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useProfilePhoto } from '../context/ProfileContext';

interface FooterProps {
  onOpenPresentation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPresentation }) => {
  const { photoUrl } = useProfilePhoto();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 py-12 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Brand & Tagline */}
          <div className="space-y-1 text-center md:text-left">
            <div className="text-base font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-7 h-7 rounded-lg overflow-hidden border border-cyan-500/40 shadow-sm bg-slate-900">
                <img
                  src={photoUrl}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span>{personalInfo.name}</span>
            </div>
            <p className="text-slate-400 text-xs">
              Computer Science Engineering Portfolio • Lovely Professional University
            </p>
          </div>

          {/* Quick Actions & Links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onOpenPresentation}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-cyan-400 border border-slate-800 rounded-xl font-semibold flex items-center gap-1.5 transition"
            >
              <Tv className="w-3.5 h-3.5" />
              <span>Presentation Slide Deck</span>
            </button>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl transition"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-[#0077b5] border border-slate-800 rounded-xl transition"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl transition"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Built for academic excellence & technical demonstration</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
