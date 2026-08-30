import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  FileText, 
  Github, 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  Cpu, 
  Sparkles,
  Code2
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

interface NavbarProps {
  onOpenPresentation: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPresentation,
  onOpenResume
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Live Simulators", href: "#simulators" },
    { name: "Skills Matrix", href: "#skills" },
    { name: "Certifications", href: "#certificates" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg py-3' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 shadow-md shadow-cyan-500/20 group-hover:scale-105 transition flex items-center justify-center text-cyan-400 font-bold text-sm font-mono">
            TS
          </div>
          <div>
            <div className="font-bold text-white tracking-tight text-base group-hover:text-cyan-400 transition">
              {personalInfo.name}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              B.Tech CSE (AI/ML) • LPU
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80 text-xs font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-xl transition"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Class Presentation Button */}
          <button
            id="nav-presentation-btn"
            onClick={onOpenPresentation}
            className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-md shadow-cyan-600/20 flex items-center gap-2 hover:scale-105 active:scale-95 transition"
          >
            <Tv className="w-4 h-4 animate-pulse" />
            <span>Class Presentation Mode</span>
          </button>

          {/* Resume Modal Trigger */}
          <button
            id="nav-resume-btn"
            onClick={onOpenResume}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Resume</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-6 py-6 space-y-4 animate-fadeIn">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-semibold text-slate-200 hover:text-cyan-400"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-3">
            <button
              id="mobile-presentation-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPresentation();
              }}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow"
            >
              <Tv className="w-4 h-4" />
              Launch Class Presentation Mode
            </button>

            <button
              id="mobile-resume-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="w-full py-2.5 bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              View Printable Resume
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
