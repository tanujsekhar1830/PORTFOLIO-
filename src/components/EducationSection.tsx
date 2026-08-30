import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Calendar, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Trophy, 
  BookOpen
} from 'lucide-react';
import { educationData, achievementsData } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-slate-950/60 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-xs font-semibold text-cyan-400">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education & Honors
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Strong foundations in mathematics, physical sciences, and computer engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Education Timeline */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-400" /> Formal Education Timeline
            </h3>

            <div className="space-y-4">
              {educationData.map((edu) => (
                <div
                  key={edu.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    edu.isHighlight
                      ? 'bg-slate-900 border-amber-500/50 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/20'
                      : 'bg-slate-900/60 border-slate-800'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        {edu.institution}
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                        {edu.degree}
                      </h4>
                      <div className="text-xs text-slate-400 font-medium">{edu.field}</div>
                    </div>

                    <div className="text-right">
                      <div className={`text-lg font-extrabold font-mono ${
                        edu.isHighlight ? 'text-amber-400' : 'text-cyan-400'
                      }`}>
                        {edu.score}
                      </div>
                      <div className="text-[10px] text-slate-400">{edu.scoreLabel}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 py-2.5 border-t border-b border-slate-800/80 my-3">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{edu.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-mono">{edu.duration}</span>
                    </div>
                  </div>

                  {edu.courseworkOrFocus && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                        Focus Areas & Highlights:
                      </span>
                      <div className="space-y-1">
                        {edu.courseworkOrFocus.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="text-cyan-400 font-bold">•</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Achievements & Academic Milestones */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" /> Key Honors & Milestones
            </h3>

            <div className="space-y-3">
              {achievementsData.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <Award className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">{item.title}</h4>
                    </div>
                    {item.date && (
                      <span className="text-[10px] font-mono text-slate-500 shrink-0 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {item.date}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-9">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
