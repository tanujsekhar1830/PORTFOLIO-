import React, { useState } from 'react';
import { 
  Sprout, 
  TrendingUp, 
  Droplets, 
  BookOpen, 
  Search, 
  Filter, 
  Sun, 
  ShieldAlert, 
  Check, 
  Layers, 
  ExternalLink,
  DollarSign,
  Thermometer
} from 'lucide-react';

interface CropInfo {
  id: string;
  name: string;
  category: string;
  idealSoil: string;
  waterNeed: string;
  season: string;
  currentPrice: string;
  priceTrend: '+4.2%' | '-1.8%' | '+2.5%' | '+6.1%';
  isPositive: boolean;
  commonPest: string;
  solution: string;
  harvestTime: string;
}

const SAMPLE_CROPS: CropInfo[] = [
  {
    id: "wheat",
    name: "Wheat (Sharbati / HD-2967)",
    category: "Cereal / Rabi",
    idealSoil: "Well-drained Loamy Soil (pH 6.0 - 7.5)",
    waterNeed: "Medium (4-6 Irrigations across CRI & Heading stages)",
    season: "Rabi (Oct - Nov Sowing, Mar - Apr Harvest)",
    currentPrice: "₹2,275 / Quintal",
    priceTrend: "+4.2%",
    isPositive: true,
    commonPest: "Yellow Rust (Puccinia striiformis)",
    solution: "Spray Propiconazole 25% EC @ 1ml/L at early onset.",
    harvestTime: "110-125 days"
  },
  {
    id: "rice",
    name: "Paddy / Rice (Basmati PB-1121)",
    category: "Cereal / Kharif",
    idealSoil: "Clayey / Silt Loam with high water retention",
    waterNeed: "High (Standing water 5cm during tillering)",
    season: "Kharif (June - July Sowing)",
    currentPrice: "₹3,850 / Quintal",
    priceTrend: "+2.5%",
    isPositive: true,
    commonPest: "Stem Borer & Bacterial Leaf Blight",
    solution: "Apply Cartap Hydrochloride 4G granules and balanced nitrogen.",
    harvestTime: "120-140 days"
  },
  {
    id: "cotton",
    name: "Cotton (Bt Cotton)",
    category: "Cash Crop / Fiber",
    idealSoil: "Deep Black Cotton Soil (Regur)",
    waterNeed: "Moderate (Critical at flowering & boll formation)",
    season: "Kharif (April - May Sowing)",
    currentPrice: "₹7,120 / Quintal",
    priceTrend: "-1.8%",
    isPositive: false,
    commonPest: "Pink Bollworm (Pectinophora gossypiella)",
    solution: "Install pheromone traps (5/acre) and Neem seed kernel extract (NSKE 5%).",
    harvestTime: "150-180 days"
  },
  {
    id: "mustard",
    name: "Mustard (Pusa Mustard 30)",
    category: "Oilseed / Rabi",
    idealSoil: "Light to Heavy Loam, sandy loam",
    waterNeed: "Low (2 irrigations at pre-bloom and pod fill)",
    season: "Rabi (Sept - Oct Sowing)",
    currentPrice: "₹5,450 / Quintal",
    priceTrend: "+6.1%",
    isPositive: true,
    commonPest: "Mustard Aphid (Lipaphis erysimi)",
    solution: "Spray Dimethoate 30% EC or Imidacloprid 17.8% SL.",
    harvestTime: "100-115 days"
  },
  {
    id: "tomato",
    name: "Tomato (Hybrid Arka Rakshak)",
    category: "Horticulture",
    idealSoil: "Rich sandy loam with high organic matter",
    waterNeed: "Frequent drip irrigation (avoid waterlogging)",
    season: "Year-Round / Kharif & Rabi",
    currentPrice: "₹1,850 / Crates (25kg)",
    priceTrend: "+4.2%",
    isPositive: true,
    commonPest: "Early Blight & Tomato Fruit Borer",
    solution: "Mancozeb 75% WP spray + Trichogramma bio-control cards.",
    harvestTime: "75-90 days"
  }
];

export const AgriPlatformSimulator: React.FC = () => {
  const [selectedCrop, setSelectedCrop] = useState<CropInfo>(SAMPLE_CROPS[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'portal' | 'calculator' | 'resources'>('portal');

  // Calculator State
  const [soilType, setSoilType] = useState<'sandy' | 'loamy' | 'clay'>('loamy');
  const [temperature, setTemperature] = useState<number>(32); // Celsius
  const [currentMoisture, setCurrentMoisture] = useState<number>(35); // Percentage

  // Calculate irrigation needs
  const getIrrigationRecommendation = () => {
    let idealMoisture = 60;
    let waterVolume = "15,000 Liters / Acre";
    let urgency = "Moderate";
    let statusColor = "text-amber-400";

    if (soilType === 'sandy') idealMoisture = 50;
    if (soilType === 'clay') idealMoisture = 70;

    const deficit = idealMoisture - currentMoisture;

    if (deficit <= 0) {
      return {
        needed: false,
        volume: "0 L (Soil moisture optimal)",
        urgency: "Optimal",
        time: "Next check in 48 hours",
        color: "text-emerald-400"
      };
    } else if (deficit > 25 || temperature > 36) {
      urgency = "Immediate Irrigation Required (High Evaporation)";
      waterVolume = `${Math.round(deficit * 650)} Liters / Acre`;
      statusColor = "text-red-400";
    } else {
      urgency = "Scheduled Watering Advised";
      waterVolume = `${Math.round(deficit * 500)} Liters / Acre`;
      statusColor = "text-cyan-400";
    }

    return {
      needed: true,
      volume: waterVolume,
      urgency,
      time: temperature > 30 ? "Best Time: Early Morning (5:30 AM - 7:30 AM) or Late Evening" : "Morning Irrigation Preferred",
      color: statusColor
    };
  };

  const filteredCrops = SAMPLE_CROPS.filter(crop => 
    crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calcResult = getIrrigationRecommendation();

  return (
    <div id="agri-platform-portal" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-slate-100 shadow-2xl relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white">Agri Platform — Live Knowledge & Market Hub</h3>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                Web Architecture
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive demonstration of Tanuj's centralized digital agriculture platform for rural accessibility
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            id="tab-agri-portal"
            onClick={() => setActiveTab('portal')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'portal' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Crop Advisory & Mandi Prices
          </button>
          <button
            id="tab-agri-calc"
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'calculator' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Smart Soil & Irrigation Tool
          </button>
          <button
            id="tab-agri-resources"
            onClick={() => setActiveTab('resources')}
            className={`px-3 py-1.5 rounded-lg font-medium transition ${
              activeTab === 'resources' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Schemes & Digital Library
          </button>
        </div>
      </div>

      {/* Live Mandi Market Ticker Banner */}
      <div className="my-4 py-2.5 px-4 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center gap-4 overflow-x-auto text-xs whitespace-nowrap">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold shrink-0">
          <TrendingUp className="w-4 h-4" /> Live Mandi Rates:
        </div>
        <div className="flex items-center gap-6">
          {SAMPLE_CROPS.map(c => (
            <div key={c.id} className="flex items-center gap-2 cursor-pointer hover:opacity-80" onClick={() => setSelectedCrop(c)}>
              <span className="font-semibold text-slate-300">{c.name.split(' ')[0]}:</span>
              <span className="font-mono text-white">{c.currentPrice}</span>
              <span className={`font-mono text-[11px] ${c.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                {c.priceTrend}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tab 1: Portal & Crop Advisory Explorer */}
      {activeTab === 'portal' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
          {/* Left Column: Crop Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                id="agri-crop-search"
                placeholder="Search crops, categories (e.g., Wheat, Kharif)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
              {filteredCrops.map((crop) => (
                <div
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition text-xs ${
                    selectedCrop.id === crop.id
                      ? 'bg-emerald-950/30 border-emerald-500/60 shadow-md ring-1 ring-emerald-500/20'
                      : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-white text-sm">{crop.name}</span>
                    <span className="text-emerald-400 font-mono font-semibold">{crop.currentPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>{crop.category}</span>
                    <span className="text-slate-500">{crop.season}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Selected Crop Deep Advisory Card */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
                  Agronomic Advisory Card
                </span>
                <h4 className="text-lg font-bold text-white">{selectedCrop.name}</h4>
                <div className="text-xs text-slate-400 mt-0.5">{selectedCrop.category} • Harvest Cycle: {selectedCrop.harvestTime}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white font-mono">{selectedCrop.currentPrice}</div>
                <span className="text-xs text-emerald-400 font-medium">{selectedCrop.priceTrend} this week</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900/70 rounded-lg border border-slate-800">
                <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1.5 text-cyan-400">
                  <Sun className="w-3.5 h-3.5" /> Ideal Soil & pH
                </div>
                <div className="text-slate-200">{selectedCrop.idealSoil}</div>
              </div>

              <div className="p-3 bg-slate-900/70 rounded-lg border border-slate-800">
                <div className="text-slate-400 font-semibold mb-1 flex items-center gap-1.5 text-blue-400">
                  <Droplets className="w-3.5 h-3.5" /> Irrigation Schedule
                </div>
                <div className="text-slate-200">{selectedCrop.waterNeed}</div>
              </div>
            </div>

            {/* Disease & Pest Diagnostic Module */}
            <div className="p-4 bg-red-950/20 border border-red-900/30 rounded-xl text-xs space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-bold">
                <ShieldAlert className="w-4 h-4" /> Common Pest / Disease Diagnostic
              </div>
              <div className="text-slate-300 font-medium">
                Symptom & Vector: <span className="text-red-300 font-bold">{selectedCrop.commonPest}</span>
              </div>
              <div className="text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                <strong className="text-emerald-400">Recommended Treatment:</strong> {selectedCrop.solution}
              </div>
            </div>

            {/* Architecture note for class explanation */}
            <div className="p-3 bg-slate-900/40 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span>💡 Modular JavaScript Architecture: Zero heavyweight framework bundle, loads under 300ms on 3G.</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Smart Soil & Irrigation Tool */}
      {activeTab === 'calculator' && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800">
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-400" /> Soil Moisture & Evapotranspiration Calculator
            </h4>
            <p className="text-xs text-slate-400">
              Interactive precision agriculture tool helping farmers avoid crop water stress and conserve water resources.
            </p>

            {/* Soil Type Selection */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">Select Soil Texture Type:</label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['sandy', 'loamy', 'clay'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSoilType(type)}
                    className={`py-2 px-3 rounded-lg border font-medium capitalize transition ${
                      soilType === type
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {type} Soil
                  </button>
                ))}
              </div>
            </div>

            {/* Ambient Temperature Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span className="flex items-center gap-1"><Thermometer className="w-3.5 h-3.5 text-amber-400" /> Ambient Air Temp:</span>
                <span className="font-mono font-bold text-amber-400">{temperature}°C</span>
              </div>
              <input
                type="range"
                min="18"
                max="45"
                value={temperature}
                onChange={(e) => setTemperature(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>

            {/* Measured Moisture Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1.5">
                <span className="flex items-center gap-1"><Droplets className="w-3.5 h-3.5 text-blue-400" /> Current Soil Moisture Sensor %:</span>
                <span className="font-mono font-bold text-cyan-400">{currentMoisture}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                value={currentMoisture}
                onChange={(e) => setCurrentMoisture(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>

          {/* Calculator Output Card */}
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4 text-xs">
            <div>
              <div className="text-slate-400 font-semibold uppercase tracking-wider text-[11px] mb-1">
                Prescription Output
              </div>
              <div className={`text-base font-bold mb-2 ${calcResult.color}`}>
                {calcResult.urgency}
              </div>
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 mb-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Required Water Volume:</span>
                  <span className="font-mono font-bold text-white">{calcResult.volume}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Recommended Window:</span>
                  <span className="text-emerald-400 font-medium">{calcResult.time}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-950/30 border border-emerald-800/40 rounded-lg text-slate-300 text-[11px]">
              <strong className="text-emerald-400">Agri-Logic Formula:</strong> Calculates evapotranspiration rate based on ambient temperature curves and soil retention capacity factors.
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Schemes & Digital Library */}
      {activeTab === 'resources' && (
        <div className="mt-4 space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" /> Centralized Government Schemes & Digital Manuals
          </h4>
          <p className="text-xs text-slate-400">
            Categorized index enabling farmers to access government agricultural subsidies and official advisories.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mt-3">
            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-white flex items-center justify-between">
                <span>PM-KISAN Scheme Portal</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Income Support</span>
              </div>
              <p className="text-slate-400 text-[11px]">Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families.</p>
              <div className="text-cyan-400 text-[11px] font-semibold flex items-center gap-1">
                View Eligibility Guidelines <ExternalLink className="w-3 h-3" />
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-white flex items-center justify-between">
                <span>Sub-Mission on Agricultural Mechanization (SMAM)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">Equipment Subsidy</span>
              </div>
              <p className="text-slate-400 text-[11px]">Up to 40% - 50% government subsidy for tractors, rotavators, and precision seed drills for small farmers.</p>
              <div className="text-cyan-400 text-[11px] font-semibold flex items-center gap-1">
                Check Subsidy Calculator <ExternalLink className="w-3 h-3" />
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-white flex items-center justify-between">
                <span>PM Fasal Bima Yojana (PMFBY)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">Crop Insurance</span>
              </div>
              <p className="text-slate-400 text-[11px]">Comprehensive crop loss risk insurance covering unseasonal rains, drought, and post-harvest damages.</p>
              <div className="text-cyan-400 text-[11px] font-semibold flex items-center gap-1">
                Claim Process Documentation <ExternalLink className="w-3 h-3" />
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
              <div className="font-bold text-white flex items-center justify-between">
                <span>Soil Health Card (SHC) Initiative</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950 text-purple-400 border border-purple-800">Soil Testing</span>
              </div>
              <p className="text-slate-400 text-[11px]">Free regional soil test reports detailing NPK macronutrients and micro-nutrient replenishment tips.</p>
              <div className="text-cyan-400 text-[11px] font-semibold flex items-center gap-1">
                Find Nearest Soil Testing Lab <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
