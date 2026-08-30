import React, { useState } from 'react';
import { 
  Cpu, 
  Sprout, 
  Code2, 
  ExternalLink, 
  Github, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  AlertCircle, 
  Zap,
  Info
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types';

interface ProjectsSectionProps {
  onJumpToSimulator: (type: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onJumpToSimulator }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectsData[0].id);

  const selectedProject = projectsData.find(p => p.id === selectedProjectId) || projectsData[0];

  const getProjectIcon = (category: string) => {
    if (category.includes('IoT')) return <Cpu className="w-5 h-5 text-cyan-400" />;
    if (category.includes('Web')) return <Sprout className="w-5 h-5 text-emerald-400" />;
    return <Code2 className="w-5 h-5 text-blue-400" />;
  };

  return (
    <section id="projects" className="py-20 bg-slate-950/60 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Class Presentation Focus</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Flagship Engineering Projects
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Highlighted technical works designed, coded, and demonstrated by Tanuj Sekhar with live interactive simulators.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {projectsData.map((project) => {
            const isSelected = project.id === selectedProjectId;
            return (
              <button
                key={project.id}
                onClick={() => setSelectedProjectId(project.id)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/40'
                    : 'bg-slate-900/40 border-slate-800 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {getProjectIcon(project.category)}
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800">
                    {project.date}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-cyan-300 transition line-clamp-1 mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {project.tagline}
                </p>

                {isSelected && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-cyan-400">
                    <span>Active Deep Dive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Project Full Deep Dive Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          {/* Top Title Banner */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                  {selectedProject.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Completed in {selectedProject.date}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {selectedProject.title}
              </h3>
              <p className="text-sm text-slate-300 font-medium">
                {selectedProject.subtitle}
              </p>
            </div>

            {/* Launch Simulator CTA */}
            <div className="flex items-center gap-3">
              <button
                id="launch-interactive-sim-btn"
                onClick={() => onJumpToSimulator(selectedProject.demoType)}
                className="px-5 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 hover:scale-105 active:scale-95 transition"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Launch Interactive Demo</span>
              </button>
              
              <a
                href={selectedProject.links?.github || "https://github.com/tanujsekhar1830"}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 rounded-xl transition"
                title="View Source on GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Overview & Key Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Project Overview
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedProject.overview}
                </p>
              </div>

              {/* Highlights Bullet List */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Technical Achievements
                </h4>
                <div className="space-y-2">
                  {selectedProject.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Class Presentation Talking Points */}
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                  <Zap className="w-4 h-4" /> Recommended Points to Highlight in Class:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedProject.classTalkingPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-500 font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Problem, Architecture & Tech Stack */}
            <div className="lg:col-span-5 space-y-5">
              {/* Problem Statement Card */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4" /> Problem Addressed
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedProject.problemStatement}
                </p>
              </div>

              {/* Architecture Blueprint Card */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Engineering Architecture
                </div>
                <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                  {selectedProject.solutionArchitecture}
                </p>
              </div>

              {/* Project Metrics */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {selectedProject.metrics.map((metric, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/90 rounded-xl border border-slate-800">
                    <div className="text-base font-extrabold text-white font-mono">{metric.value}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{metric.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Badges */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Technology Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-200 border border-slate-800 text-[11px] font-mono"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
