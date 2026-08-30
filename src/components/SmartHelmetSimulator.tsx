import React, { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Wifi, 
  Volume2, 
  VolumeX, 
  Radio, 
  MapPin, 
  Terminal, 
  Cpu, 
  Play, 
  RotateCcw, 
  Send, 
  CheckCircle2, 
  Info,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const SmartHelmetSimulator: React.FC = () => {
  const [isWorn, setIsWorn] = useState<boolean>(true);
  const [impactForce, setImpactForce] = useState<number>(0.4); // G-force
  const [isCrashed, setIsCrashed] = useState<boolean>(false);
  const [alertCountdown, setAlertCountdown] = useState<number | null>(null);
  const [alertDispatched, setAlertDispatched] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    "BOOT: ESP8266 NodeMCU v2 initialized at 115200 baud.",
    "WIFI: Connected to 'LPU_CAMPUS_NET' (IP: 192.168.1.142, RSSI: -54 dBm).",
    "SENSORS: IR Proximity [D1] = ACTIVE (Helmet Worn).",
    "SENSORS: SW-420 Vibration [D2] = READY (Threshold set to 3.20G).",
    "STATUS: System Armed. Real-time telemetry monitoring active."
  ]);
  const [activeTab, setActiveTab] = useState<'simulator' | 'circuit' | 'code'>('simulator');
  const [emergencyPhone, setEmergencyPhone] = useState<string>("+91-9784668230");
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (msg: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev.slice(-30), `[${timestamp}] ${msg}`]);
  };

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Audio buzzer simulation using Web Audio API
  const playBuzzerTone = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // High pitch alert tone
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      setTimeout(() => {
        osc.stop();
        audioCtx.close();
      }, 300);
    } catch {
      // AudioContext might be restricted until user gesture
    }
  };

  // Handle countdown when crash occurs
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCrashed && alertCountdown !== null && alertCountdown > 0) {
      playBuzzerTone();
      timer = setTimeout(() => {
        setAlertCountdown(prev => (prev !== null ? prev - 1 : null));
        addLog(`BUZZER WARNING: Emergency SOS in ${alertCountdown - 1}s! (Press Cancel to abort false alarm)`);
      }, 1000);
    } else if (isCrashed && alertCountdown === 0) {
      // Dispatch SOS
      setAlertDispatched(true);
      addLog(`🚨 EMERGENCY TRIGGERED: Impact G=${impactForce.toFixed(2)}G. GPS: 31.2536° N, 75.7034° E.`);
      addLog(`📡 TELEMETRY: Dispatching Webhook POST -> Emergency Contact ${emergencyPhone}...`);
      addLog(`✅ SUCCESS: SMS & GPS Link Dispatched to relatives and campus medical unit!`);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
    return () => clearTimeout(timer);
  }, [isCrashed, alertCountdown]);

  const triggerCrashSimulation = (simulatedForce = 4.8) => {
    if (!isWorn) {
      addLog("⚠️ REJECTED: Helmet is NOT worn (IR Sensor = LOW). Crash detection ignored to prevent false drop alerts.");
      return;
    }
    setImpactForce(simulatedForce);
    setIsCrashed(true);
    setAlertCountdown(10);
    setAlertDispatched(false);
    addLog(`💥 SEVERE IMPACT DETECTED: Measured ${simulatedForce.toFixed(2)}G (Threshold 3.20G exceeded!).`);
    addLog(`🔊 PIEZO BUZZER ACTIVATED: 10-second rider cancellation window initiated.`);
  };

  const cancelAlert = () => {
    setIsCrashed(false);
    setAlertCountdown(null);
    setAlertDispatched(false);
    setImpactForce(0.4);
    addLog("🟢 CANCELLED: Rider acknowledged false alarm / minor bump. System disarmed buzzer and resumed normal scan.");
  };

  const resetSystem = () => {
    setIsCrashed(false);
    setAlertCountdown(null);
    setAlertDispatched(false);
    setImpactForce(0.3);
    addLog("🔄 SYSTEM RESET: Sensors recalibrated, buffer cleared, standing by.");
  };

  const toggleHelmetWorn = () => {
    const nextState = !isWorn;
    setIsWorn(nextState);
    if (!nextState && isCrashed) {
      cancelAlert();
    }
    addLog(`IR SENSOR: Helmet state changed to ${nextState ? 'WORN (IR HIGH)' : 'REMOVED (IR LOW)'}`);
  };

  return (
    <div id="iot-helmet-simulator" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Smart Helmet IoT Telemetry & Accident Simulator</h3>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                Live ESP8266 Logic
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive demonstration of Nakka Tanuj Sekhar's flagship embedded safety system
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              id="tab-sim-btn"
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'simulator' 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Interactive Simulator
            </button>
            <button
              id="tab-circuit-btn"
              onClick={() => setActiveTab('circuit')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'circuit' 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Circuit Diagram & Pinout
            </button>
            <button
              id="tab-code-btn"
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeTab === 'code' 
                  ? 'bg-cyan-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              C++ Firmware Logic
            </button>
          </div>

          <button
            id="toggle-buzzer-sound-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? "Mute Buzzer Audio" : "Enable Buzzer Audio"}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition ${
              soundEnabled 
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-300' 
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? "Audio On" : "Audio Muted"}</span>
          </button>
        </div>
      </div>

      {/* Main Content Area based on Tab */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          {/* Left Column: Physical & Sensor Controls */}
          <div className="lg:col-span-7 space-y-5">
            {/* Status Panel Banner */}
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              alertDispatched 
                ? 'bg-red-950/40 border-red-500/60 text-red-200'
                : isCrashed 
                ? 'bg-amber-950/40 border-amber-500/60 text-amber-200 animate-pulse'
                : 'bg-slate-950/70 border-slate-800 text-slate-300'
            }`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {alertDispatched ? (
                    <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white font-bold animate-bounce">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                  ) : isCrashed ? (
                    <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                      <Radio className="w-5 h-5 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-sm">
                      {alertDispatched 
                        ? "🚨 EMERGENCY SOS DISPATCHED!" 
                        : isCrashed 
                        ? `⚠️ ACCIDENT IMPACT DETECTED — CANCELLATION TIMER: ${alertCountdown}s` 
                        : "SYSTEM NORMAL — ACTIVE REAL-TIME MONITORING"}
                    </div>
                    <div className="text-xs opacity-80 mt-0.5">
                      {alertDispatched 
                        ? "Live coordinates broadcasted to emergency contacts via HTTP Webhook."
                        : isCrashed 
                        ? "Piezo buzzer sounding. If false alarm, tap 'Cancel Alarm' before timer expires."
                        : "ESP8266 continuously scanning SW-420 vibration and IR wear sensor."}
                    </div>
                  </div>
                </div>

                {isCrashed && !alertDispatched && (
                  <button
                    id="cancel-sos-btn"
                    onClick={cancelAlert}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg shadow-lg hover:scale-105 active:scale-95 transition"
                  >
                    Cancel False Alarm ({alertCountdown}s)
                  </button>
                )}

                {alertDispatched && (
                  <button
                    id="reset-sos-btn"
                    onClick={resetSystem}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-lg shadow-lg transition"
                  >
                    Reset System
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Sensor & State Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* IR Sensor Card */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">IR Proximity Sensor</span>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-mono rounded ${
                    isWorn ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/60' : 'bg-rose-950 text-rose-400 border border-rose-800/60'
                  }`}>
                    {isWorn ? 'PIN D1: HIGH' : 'PIN D1: LOW'}
                  </span>
                </div>
                <div className="text-sm font-medium text-white mb-2">
                  Helmet Status: <span className={isWorn ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{isWorn ? 'Active on Rider Head' : 'Helmet Removed / Off'}</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  Dual-check safeguard: Prevents sending false crash alerts when the helmet is stored or dropped on a floor.
                </p>
                <button
                  id="toggle-helmet-worn-btn"
                  onClick={toggleHelmetWorn}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition"
                >
                  {isWorn ? "Simulate Taking Helmet Off" : "Simulate Wearing Helmet"}
                </button>
              </div>

              {/* Vibration / G-Force Sensor Card */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">SW-420 Vibration (D2)</span>
                  <span className={`px-2 py-0.5 text-xs font-mono rounded ${
                    impactForce > 3.2 ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {impactForce.toFixed(2)} G
                  </span>
                </div>
                <div className="space-y-1.5 mb-3">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Normal: 0.2G - 1.5G</span>
                    <span className="text-amber-400 font-semibold">Threshold: 3.20G</span>
                  </div>
                  <input
                    type="range"
                    id="impact-force-slider"
                    min="0.1"
                    max="6.0"
                    step="0.1"
                    value={impactForce}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setImpactForce(val);
                      if (val >= 3.2 && !isCrashed) {
                        triggerCrashSimulation(val);
                      }
                    }}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>
                <div className="text-xs text-slate-400">
                  {impactForce >= 3.2 
                    ? "💥 Critical threshold exceeded! Crash condition true." 
                    : "🟢 Normal riding conditions (road bumps filtered out)."}
                </div>
              </div>
            </div>

            {/* Simulation Action Triggers */}
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Classroom Demonstration Triggers
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  id="simulate-collision-btn"
                  onClick={() => triggerCrashSimulation(4.8)}
                  disabled={isCrashed}
                  className="px-3 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-md flex items-center justify-center gap-1.5 transition"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Simulate Heavy Crash (4.8G)
                </button>

                <button
                  id="simulate-pothole-btn"
                  onClick={() => {
                    setImpactForce(1.8);
                    addLog("🚙 ROAD BUMP TEST: Measured 1.8G (< 3.2G Threshold). Correctly filtered as safe; no alert triggered.");
                  }}
                  className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center justify-center gap-1.5 transition"
                >
                  <Play className="w-3.5 h-3.5 text-cyan-400" />
                  Test Road Pothole (1.8G)
                </button>

                <button
                  id="reset-system-btn"
                  onClick={resetSystem}
                  className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 flex items-center justify-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                  Clear & Recalibrate
                </button>
              </div>
            </div>

            {/* Emergency Contact & Location Telemetry Payload */}
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <MapPin className="w-4 h-4" /> Emergency Telemetry Dispatch Target
                </span>
                <span className="text-slate-500">NodeMCU Webhook API</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-400">
                <div>
                  <span className="text-slate-500 block">Emergency Mobile Recipient:</span>
                  <input
                    type="text"
                    id="emergency-mobile-input"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="mt-1 w-full px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <span className="text-slate-500 block">Simulated GPS Coordinates:</span>
                  <div className="mt-1 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-cyan-300 font-mono text-xs">
                    31.2536° N, 75.7034° E (LPU Campus, Phagwara)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Serial Monitor & Telemetry Output */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex-1 flex flex-col font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                  <Terminal className="w-4 h-4" />
                  <span>ESP8266 Serial Monitor (115200 Baud)</span>
                </div>
                <button
                  id="clear-logs-btn"
                  onClick={() => setLogs(["[ESP8266] Log buffer cleared."])}
                  className="text-slate-500 hover:text-slate-300 text-[11px]"
                >
                  Clear
                </button>
              </div>

              {/* Log Stream */}
              <div className="flex-1 overflow-y-auto max-h-[360px] space-y-1.5 pr-2 font-mono text-[11px] leading-relaxed select-text">
                {logs.map((log, idx) => {
                  let colorClass = "text-slate-400";
                  if (log.includes("EMERGENCY") || log.includes("💥") || log.includes("🚨")) {
                    colorClass = "text-red-400 font-semibold bg-red-950/30 p-1 rounded";
                  } else if (log.includes("BUZZER") || log.includes("⚠️")) {
                    colorClass = "text-amber-300";
                  } else if (log.includes("SUCCESS") || log.includes("✅") || log.includes("🟢")) {
                    colorClass = "text-emerald-400 font-semibold";
                  } else if (log.includes("WIFI") || log.includes("BOOT")) {
                    colorClass = "text-cyan-400";
                  }
                  return (
                    <div key={idx} className={`${colorClass} transition-colors`}>
                      {log}
                    </div>
                  );
                })}
                <div ref={logEndRef} />
              </div>

              {/* Hardware Pin Indicators */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-4 gap-2 text-center text-[10px]">
                <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                  <div className="text-slate-500">PIN D1 (IR)</div>
                  <div className={`font-bold ${isWorn ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isWorn ? 'HIGH' : 'LOW'}
                  </div>
                </div>
                <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                  <div className="text-slate-500">PIN D2 (SW420)</div>
                  <div className={`font-bold ${impactForce > 3.2 ? 'text-red-400' : 'text-cyan-400'}`}>
                    {impactForce > 3.2 ? 'TRIG' : 'IDLE'}
                  </div>
                </div>
                <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                  <div className="text-slate-500">PIN D5 (BUZZER)</div>
                  <div className={`font-bold ${isCrashed ? 'text-amber-400 animate-pulse' : 'text-slate-500'}`}>
                    {isCrashed ? 'ACTIVE' : 'OFF'}
                  </div>
                </div>
                <div className="bg-slate-900 p-1.5 rounded border border-slate-800">
                  <div className="text-slate-500">WI-FI ESP</div>
                  <div className="font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Wifi className="w-2.5 h-2.5" /> READY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Circuit Diagram Tab */}
      {activeTab === 'circuit' && (
        <div className="mt-6 space-y-4">
          <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" /> Embedded Hardware Circuit Architecture
            </h4>
            <p className="text-xs text-slate-400 mb-6">
              Low-cost, high-reliability circuit connecting digital/analog sensors to the ESP8266 NodeMCU microcontroller.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="bg-slate-900 p-4 rounded-xl border border-cyan-500/30">
                <div className="text-cyan-400 font-bold text-sm mb-2">1. Input: IR Proximity Sensor</div>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• <strong className="text-white">VCC:</strong> 3.3V (NodeMCU)</li>
                  <li>• <strong className="text-white">GND:</strong> Common GND</li>
                  <li>• <strong className="text-white">OUT (Digital):</strong> GPIO D1 (GPIO5)</li>
                  <li>• <strong className="text-white">Role:</strong> Detects rider head reflection. Verifies helmet is fastened.</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-red-500/30">
                <div className="text-red-400 font-bold text-sm mb-2">2. Input: SW-420 Vibration Sensor</div>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• <strong className="text-white">VCC:</strong> 3.3V / 5V VIN</li>
                  <li>• <strong className="text-white">GND:</strong> Common GND</li>
                  <li>• <strong className="text-white">DO (Digital Output):</strong> GPIO D2 (GPIO4) (Interrupt pin)</li>
                  <li>• <strong className="text-white">Role:</strong> Piezoelectric spring triggers interrupt upon severe crash G-force spike.</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-4 rounded-xl border border-amber-500/30">
                <div className="text-amber-400 font-bold text-sm mb-2">3. Output: Piezo Buzzer & Cloud</div>
                <ul className="space-y-1.5 text-slate-300">
                  <li>• <strong className="text-white">Buzzer Positive:</strong> GPIO D5 (GPIO14)</li>
                  <li>• <strong className="text-white">Buzzer Negative:</strong> GND (via 220Ω resistor)</li>
                  <li>• <strong className="text-white">Wi-Fi Telemetry:</strong> ESP8266 802.11 b/g/n</li>
                  <li>• <strong className="text-white">Role:</strong> 10s audible warning + emergency Webhook notification.</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-900/60 rounded-lg border border-slate-800 text-xs text-slate-300">
              <span className="text-cyan-400 font-semibold block mb-1">Key Engineering Design Choices for Class Presentation:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li><strong>Hardware Interrupts (ISR):</strong> Attaching <code className="text-cyan-300">attachInterrupt(digitalPinToInterrupt(D2), crashISR, RISING)</code> ensures immediate detection without CPU-intensive polling loops.</li>
                <li><strong>Dual-Factor Verification:</strong> By evaluating both IR wear status and vibration, false triggers from dropping the helmet on a table are eliminated.</li>
                <li><strong>Low Bill of Materials (BOM):</strong> Built using cost-effective off-the-shelf components costing under ₹1,200 total.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* C++ Firmware Code Tab */}
      {activeTab === 'code' && (
        <div className="mt-6 space-y-4">
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto text-slate-300">
            <div className="text-cyan-400 font-bold mb-3">// ESP8266 Smart Helmet Firmware - Nakka Tanuj Sekhar</div>
            <pre className="text-slate-300 leading-relaxed">
{`#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define PIN_IR_SENSOR    5   // D1
#define PIN_VIBRATION    4   // D2 (Interrupt Enabled)
#define PIN_BUZZER       14  // D5

const char* ssid = "LPU_CAMPUS_NET";
const char* password = "YOUR_WIFI_PASSWORD";
const char* emergencyServer = "http://api.smartsafety.org/alert";

volatile bool crashDetected = false;
unsigned long crashTime = 0;
const unsigned long CANCEL_WINDOW_MS = 10000; // 10 seconds

// Low-latency Interrupt Service Routine
void ICACHE_RAM_ATTR handleVibration() {
  if (digitalRead(PIN_IR_SENSOR) == HIGH) { // Check if helmet is worn
    crashDetected = true;
    crashTime = millis();
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_IR_SENSOR, INPUT);
  pinMode(PIN_VIBRATION, INPUT_PULLUP);
  pinMode(PIN_BUZZER, OUTPUT);
  digitalWrite(PIN_BUZZER, LOW);

  // Attach hardware interrupt on vibration spike
  attachInterrupt(digitalPinToInterrupt(PIN_VIBRATION), handleVibration, RISING);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(200);
    Serial.print(".");
  }
  Serial.println("\\nESP8266 Safety System Ready!");
}

void loop() {
  if (crashDetected) {
    digitalWrite(PIN_BUZZER, HIGH); // Sound local alarm
    
    // Check if 10-second cancel window elapsed without rider cancellation
    if (millis() - crashTime > CANCEL_WINDOW_MS) {
      dispatchEmergencyAlert();
      crashDetected = false;
      digitalWrite(PIN_BUZZER, LOW);
    }
  }
}

void dispatchEmergencyAlert() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;
    http.begin(client, emergencyServer);
    http.addHeader("Content-Type", "application/json");
    
    String payload = "{\\"lat\\":31.2536,\\"lon\\":75.7034,\\"status\\":\\"CRASH_DETECTED\\"}";
    int httpCode = http.POST(payload);
    Serial.printf("Emergency alert dispatched! Response: %d\\n", httpCode);
    http.end();
  }
}`}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
