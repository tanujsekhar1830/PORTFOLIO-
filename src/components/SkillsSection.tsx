import React, { useState } from 'react';
import { 
  Code2, 
  Layers, 
  Cpu, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Terminal,
  Database
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-4 h-4 text-cyan-400" />;
      case 'Layers': return <Layers className="w-4 h-4 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-amber-400" />;
      case 'Users': return <Users className="w-4 h-4 text-indigo-400" />;
      default: return <Sparkles className="w-4 h-4 text-cyan-400" />;
    }
  };

  const activeCategory = skillsData[activeCategoryIndex];

  return (
    <section id="skills" className="py-20 bg-slate-950/80 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-xs font-semibold text-cyan-400">
            <Database className="w-3.5 h-3.5" />
            <span>Technical Competency Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills & Applied Experience
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A comprehensive matrix of programming languages, hardware toolkits, and software engineering principles.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {skillsData.map((cat, idx) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 transition ${
                activeCategoryIndex === idx
                  ? 'bg-slate-900 border-cyan-500 text-white shadow-md shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900/70'
              }`}
            >
              {getCategoryIcon(cat.iconName)}
              <span>{cat.category}</span>
            </button>
          ))}
        </div>

        {/* Active Category Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeCategory.skills.map((skill, idx) => (
            <div
              key={skill.name}
              className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 transition space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <h4 className="font-bold text-white text-base">{skill.name}</h4>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                  {skill.level}% Proficiency
                </span>
              </div>

              {/* Progress Meter */}
              <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800/80">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
              </div>

              {/* Experience Description */}
              <p className="text-xs text-slate-300 leading-relaxed">
                {skill.experience}
              </p>

              {/* Applied In Badge */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">Applied in:</span>
                <span className="font-mono text-cyan-400 bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                  {skill.appliedIn}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
