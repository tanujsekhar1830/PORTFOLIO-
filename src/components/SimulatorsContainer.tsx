import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Sprout, 
  Code2, 
  Terminal, 
  Sparkles,
  Zap
} from 'lucide-react';
import { SmartHelmetSimulator } from './SmartHelmetSimulator';
import { AgriPlatformSimulator } from './AgriPlatformSimulator';
import { PythonPlaygroundSimulator } from './PythonPlaygroundSimulator';

interface SimulatorsContainerProps {
  activeSimType?: string;
}

export const SimulatorsContainer: React.FC<SimulatorsContainerProps> = ({ activeSimType = 'iot-helmet' }) => {
  const [selectedSim, setSelectedSim] = useState<'iot-helmet' | 'agri-platform' | 'python-teaching'>('iot-helmet');

  useEffect(() => {
    if (activeSimType === 'iot-helmet' || activeSimType === 'agri-platform' || activeSimType === 'python-teaching') {
      setSelectedSim(activeSimType);
    } else if (activeSimType === 'iot-demo') {
      setSelectedSim('iot-helmet');
    } else if (activeSimType === 'agri-demo') {
      setSelectedSim('agri-platform');
    } else if (activeSimType === 'python-demo') {
      setSelectedSim('python-teaching');
    }
  }, [activeSimType]);

  return (
    <section id="simulators" className="py-20 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-xs font-semibold text-cyan-400">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Live Demos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Classroom Simulator Suite
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Interact with live hardware logic, agricultural data engines, and algorithmic Python code visualizers right inside this portfolio.
          </p>
        </div>

        {/* Simulator Switcher Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            id="sim-switch-iot-btn"
            onClick={() => setSelectedSim('iot-helmet')}
            className={`px-5 py-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all duration-300 ${
              selectedSim === 'iot-helmet'
                ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-600/25 scale-105'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>Smart Helmet IoT Simulator</span>
          </button>

          <button
            id="sim-switch-agri-btn"
            onClick={() => setSelectedSim('agri-platform')}
            className={`px-5 py-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all duration-300 ${
              selectedSim === 'agri-platform'
                ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-600/25 scale-105'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Sprout className="w-4 h-4" />
            <span>Agri Platform Portal Simulator</span>
          </button>

          <button
            id="sim-switch-python-btn"
            onClick={() => setSelectedSim('python-teaching')}
            className={`px-5 py-3 rounded-2xl border text-xs sm:text-sm font-bold flex items-center gap-2.5 transition-all duration-300 ${
              selectedSim === 'python-teaching'
                ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/25 scale-105'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-850'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Python Teaching Visualizer</span>
          </button>
        </div>

        {/* Render Selected Simulator Component */}
        <div className="transition-all duration-300">
          {selectedSim === 'iot-helmet' && <SmartHelmetSimulator />}
          {selectedSim === 'agri-platform' && <AgriPlatformSimulator />}
          {selectedSim === 'python-teaching' && <PythonPlaygroundSimulator />}
        </div>
      </div>
    </section>
  );
};
