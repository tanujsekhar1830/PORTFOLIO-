import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  MessageSquare, 
  Tv, 
  Play, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Award,
  Layers,
  Cpu,
  Sprout,
  Code2,
  GraduationCap
} from 'lucide-react';
import { presentationSlides, personalInfo } from '../data/portfolioData';
import confetti from 'canvas-confetti';

interface ClassPresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToSimulator?: (simulatorType: string) => void;
}

export const ClassPresentationModal: React.FC<ClassPresentationModalProps> = ({
  isOpen,
  onClose,
  onJumpToSimulator
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentSlide = presentationSlides[currentSlideIndex];

  // Timer effect for presentation practice
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen && isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isTimerRunning]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex]);

  if (!isOpen) return null;

  const nextSlide = () => {
    if (currentSlideIndex < presentationSlides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleActionClick = (target?: string) => {
    if (!target) return;
    if (target === 'exit') {
      onClose();
    } else if (target === 'iot-demo' || target === 'agri-demo' || target === 'python-demo') {
      onClose();
      if (onJumpToSimulator) onJumpToSimulator(target);
    } else if (target.startsWith('#')) {
      onClose();
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get icon for slide section
  const getSlideIcon = (id: string) => {
    if (id.includes('smart-helmet')) return <Cpu className="w-5 h-5 text-cyan-400" />;
    if (id.includes('agri')) return <Sprout className="w-5 h-5 text-emerald-400" />;
    if (id.includes('python')) return <Code2 className="w-5 h-5 text-blue-400" />;
    if (id.includes('skills')) return <Layers className="w-5 h-5 text-indigo-400" />;
    if (id.includes('certs') || id.includes('education')) return <GraduationCap className="w-5 h-5 text-amber-400" />;
    return <Sparkles className="w-5 h-5 text-cyan-400" />;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between overflow-hidden text-slate-100 animate-fadeIn">
      {/* Presentation Top Control Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-b border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              Class Presentation Mode
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                Slide {currentSlideIndex + 1} of {presentationSlides.length}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              {personalInfo.name} • B.Tech CSE (LPU)
            </div>
          </div>
        </div>

        {/* Center: Slide Progress Dots */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-full border border-slate-800">
          {presentationSlides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              title={slide.title}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlideIndex 
                  ? 'w-6 bg-cyan-400' 
                  : idx < currentSlideIndex 
                  ? 'w-2 bg-cyan-800' 
                  : 'w-2 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>

        {/* Right Controls: Timer, Speaker Notes Toggle, Close */}
        <div className="flex items-center gap-3">
          {/* Presenter Timer */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono text-cyan-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          <button
            id="toggle-speaker-notes-btn"
            onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition ${
              showSpeakerNotes 
                ? 'bg-cyan-950/60 border-cyan-700 text-cyan-300' 
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{showSpeakerNotes ? "Hide Notes" : "Speaker Notes"}</span>
          </button>

          <button
            id="close-presentation-btn"
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Slide Stage */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12 flex flex-col justify-center items-center max-w-6xl mx-auto w-full">
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden transition-all duration-300">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Slide Section Tag */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              {getSlideIcon(currentSlide.id)}
              <span>{currentSlide.section}</span>
            </div>
            <div className="text-xs font-mono text-slate-500">
              [Use ← / → Arrow Keys]
            </div>
          </div>

          {/* Slide Main Heading */}
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2 tracking-tight leading-tight">
            {currentSlide.title}
          </h2>
          <p className="text-sm md:text-base text-slate-400 mb-8 max-w-3xl">
            {currentSlide.subtitle}
          </p>

          {/* Slide Bullet Points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {currentSlide.bulletPoints.map((point, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3.5 transition hover:border-slate-700"
              >
                <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium">
                  {point}
                </p>
              </div>
            ))}
          </div>

          {/* Slide Action Button (e.g. Launch Simulator / Jump to Demo) */}
          {currentSlide.actionLabel && (
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80">
              <button
                id="slide-action-cta-btn"
                onClick={() => handleActionClick(currentSlide.actionTarget)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs md:text-sm rounded-xl shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2 transition"
              >
                <Play className="w-4 h-4 fill-current" />
                {currentSlide.actionLabel}
              </button>

              <span className="text-xs text-slate-400">
                Click to interact directly during class explanation
              </span>
            </div>
          )}
        </div>

        {/* Presenter / Speaker Notes Drawer */}
        {showSpeakerNotes && (
          <div className="w-full mt-6 p-4 md:p-5 bg-amber-950/20 border border-amber-800/40 rounded-2xl text-xs text-amber-200/90 shadow-lg">
            <div className="flex items-center gap-2 font-bold text-amber-400 mb-1.5 uppercase tracking-wider text-[11px]">
              <MessageSquare className="w-3.5 h-3.5" /> Presenter Talking Points (Say this to the class):
            </div>
            <p className="italic leading-relaxed font-sans text-xs md:text-[13px] text-amber-100/90">
              "{currentSlide.speakerNotes}"
            </p>
          </div>
        )}
      </div>

      {/* Slide Navigation Bottom Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-t border-slate-800 shrink-0">
        <button
          id="prev-slide-btn"
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous Slide
        </button>

        <div className="text-xs text-slate-400 font-medium">
          Slide <span className="text-white font-bold">{currentSlideIndex + 1}</span> of {presentationSlides.length}
        </div>

        <button
          id="next-slide-btn"
          onClick={nextSlide}
          className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-cyan-500/20 transition"
        >
          {currentSlideIndex === presentationSlides.length - 1 ? "Finish Presentation" : "Next Slide"}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
