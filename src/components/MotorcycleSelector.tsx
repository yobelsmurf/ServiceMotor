import React from 'react';
import { MOTORCYCLE_BRANDS, MOTORCYCLE_TYPES } from '../data/motorcycles';
import type { MotorcycleBrand, MotorcycleModel, MotorcycleType } from '../types/motor';
import { Zap, GitFork, Flame, Compass, Check, ChevronDown, BookmarkPlus, Droplet, Thermometer } from 'lucide-react';

interface MotorcycleSelectorProps {
  selectedBrandId: string;
  setSelectedBrandId: (brandId: string) => void;
  selectedType: MotorcycleType;
  setSelectedType: (type: MotorcycleType) => void;
  selectedModel: MotorcycleModel | null;
  setSelectedModel: (model: MotorcycleModel | null) => void;
  customModelName: string;
  setCustomModelName: (name: string) => void;
  hasRadiator: boolean;
  setHasRadiator: (has: boolean) => void;
  onSaveToGarage: () => void;
}

export const MotorcycleSelector: React.FC<MotorcycleSelectorProps> = ({
  selectedBrandId,
  setSelectedBrandId,
  selectedType,
  setSelectedType,
  selectedModel,
  setSelectedModel,
  customModelName,
  setCustomModelName,
  hasRadiator,
  setHasRadiator,
  onSaveToGarage
}) => {
  const currentBrand = MOTORCYCLE_BRANDS.find(b => b.id === selectedBrandId) || MOTORCYCLE_BRANDS[0];

  // Filter models for selected brand and type
  const availableModels = currentBrand.popularModels.filter(m => m.type === selectedType);

  const handleBrandChange = (brand: MotorcycleBrand) => {
    setSelectedBrandId(brand.id);
    const matching = brand.popularModels.filter(m => m.type === selectedType);
    if (matching.length > 0) {
      setSelectedModel(matching[0]);
      setHasRadiator(matching[0].hasRadiator);
    } else if (brand.popularModels.length > 0) {
      setSelectedType(brand.popularModels[0].type);
      setSelectedModel(brand.popularModels[0]);
      setHasRadiator(brand.popularModels[0].hasRadiator);
    } else {
      setSelectedModel(null);
    }
  };

  const handleTypeChange = (type: MotorcycleType) => {
    setSelectedType(type);
    const matching = currentBrand.popularModels.filter(m => m.type === type);
    if (matching.length > 0) {
      setSelectedModel(matching[0]);
      setHasRadiator(matching[0].hasRadiator);
    } else {
      setSelectedModel(null);
      if (type === 'sport') setHasRadiator(true);
      else setHasRadiator(false);
    }
  };

  const handleModelSelect = (modelId: string) => {
    if (modelId === 'custom') {
      setSelectedModel(null);
    } else {
      const found = currentBrand.popularModels.find(m => m.id === modelId);
      if (found) {
        setSelectedModel(found);
        setHasRadiator(found.hasRadiator);
      }
    }
  };

  const getTypeIcon = (type: MotorcycleType) => {
    switch (type) {
      case 'matic': return <Zap className="w-4 h-4 sm:w-4 sm:h-4" />;
      case 'bebek': return <GitFork className="w-4 h-4 sm:w-4 sm:h-4" />;
      case 'sport': return <Flame className="w-4 h-4 sm:w-4 sm:h-4" />;
      case 'trail': return <Compass className="w-4 h-4 sm:w-4 sm:h-4" />;
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header section with mobile-optimized CTA */}
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/90">
        <div>
          <span className="text-amber-400 font-bold text-[11px] uppercase tracking-wider block">
            Langkah 1 & 2
          </span>
          <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
            Pilih Merek & Tipe Motor
          </h2>
        </div>

        <button
          type="button"
          onClick={onSaveToGarage}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 border border-amber-500/30 rounded-xl transition cursor-pointer flex-shrink-0"
          title="Simpan motor ini ke Garasi Saya"
        >
          <BookmarkPlus className="w-4 h-4 text-amber-400" />
          <span className="hidden xs:inline">Simpan Garasi</span>
          <span className="inline xs:hidden">Garasi</span>
        </button>
      </div>

      {/* 1. MEREK MOTOR (Grid 3 cols on mobile, 6 cols on desktop) */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          1. Merek Pabrikan
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {MOTORCYCLE_BRANDS.map(brand => {
            const isSelected = selectedBrandId === brand.id;
            return (
              <button
                key={brand.id}
                type="button"
                onClick={() => handleBrandChange(brand)}
                className={`relative flex flex-col items-center justify-center p-2.5 sm:p-3 min-h-[58px] rounded-xl border text-center transition-all active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-800 border-amber-400 shadow-md shadow-amber-500/15 ring-2 ring-amber-400/50'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-amber-400 rounded-full flex items-center justify-center text-slate-950 shadow">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </span>
                )}
                <div
                  className="w-2.5 h-2.5 rounded-full mb-1"
                  style={{ backgroundColor: brand.badgeColor }}
                />
                <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {brand.name.split(' ')[0]}
                </span>
                <span className="text-[9px] text-slate-500 truncate max-w-full">
                  {brand.country}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. TIPE MOTOR (2x2 on mobile, 4 in row on desktop - Fully Responsive) */}
      <div className="mb-5">
        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          2. Kategori / Tipe Motor
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5">
          {MOTORCYCLE_TYPES.map(cat => {
            const isSelected = selectedType === cat.type;
            return (
              <button
                key={cat.type}
                type="button"
                onClick={() => handleTypeChange(cat.type)}
                className={`flex items-start gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-xl border text-left transition-all active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 ring-2 ring-amber-400/40 shadow-sm'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className={`p-1.5 sm:p-2 rounded-lg flex-shrink-0 mt-0.5 ${
                  isSelected ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300'
                }`}>
                  {getTypeIcon(cat.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <span className={`text-[11px] sm:text-xs font-bold leading-tight break-words ${
                      isSelected ? 'text-amber-300' : 'text-slate-200'
                    }`}>
                      {cat.label}
                    </span>
                    {isSelected && <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />}
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 mt-1 leading-tight break-words line-clamp-2">
                    {cat.type === 'matic' ? 'CVT, V-Belt, Gardan' : cat.type === 'bebek' ? 'Kopling Sentrifugal' : cat.type === 'sport' ? 'Kopling Manual' : 'Dual-Purpose'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. MODEL SPESIFIK & FITUR PENDINGIN */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80">
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            3. Model Motor
          </label>
          <div className="relative">
            <select
              value={selectedModel ? selectedModel.id : 'custom'}
              onChange={(e) => handleModelSelect(e.target.value)}
              aria-label="Pilih Model Motor"
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            >
              {availableModels.map(model => (
                <option key={model.id} value={model.id}>
                  {model.name} ({model.cc}cc)
                </option>
              ))}
              <option value="custom">-- Motor Lain / Tulis Manual --</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-4 pointer-events-none" />
          </div>

          {!selectedModel && (
            <div className="mt-2">
              <input
                type="text"
                value={customModelName}
                onChange={(e) => setCustomModelName(e.target.value)}
                placeholder="Contoh: Vario 110 Karbu / Mio Sporty"
                aria-label="Nama Model Motor Kustom"
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          )}
        </div>

        {/* PENDINGIN CAIRAN / RADIATOR TOGGLE */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-1.5">
            Sistem Pendingin
          </label>
          <button
            type="button"
            onClick={() => setHasRadiator(!hasRadiator)}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl border text-xs font-semibold transition active:scale-95 cursor-pointer ${
              hasRadiator
                ? 'bg-blue-500/10 border-blue-400/50 text-blue-300 shadow-sm'
                : 'bg-slate-950 border-slate-700 text-slate-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <Thermometer className={`w-4 h-4 ${hasRadiator ? 'text-blue-400' : 'text-slate-500'}`} />
              <span>{hasRadiator ? 'Radiator (Coolant)' : 'Pendingin Udara'}</span>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded font-black ${
              hasRadiator ? 'bg-blue-400 text-slate-950' : 'bg-slate-800 text-slate-400'
            }`}>
              {hasRadiator ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </div>

      {/* INFORMASI SPESIFIKASI MANUAL BOOK */}
      {selectedModel && (
        <div className="mt-3.5 p-3.5 bg-slate-950/80 border border-slate-800/90 rounded-xl space-y-2 text-xs text-slate-300">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-amber-300 font-medium">
              <Droplet className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Oli Mesin: <strong className="text-white">{selectedModel.oilCapacityLiters}L</strong></span>
              {selectedModel.gearOilCapacityLiters && (
                <>
                  <span className="text-slate-600">•</span>
                  <span>Oli Gardan: <strong className="text-white">{selectedModel.gearOilCapacityLiters}L</strong></span>
                </>
              )}
            </div>

            {selectedModel.hasVerifiedManualBook && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1">
                <span>⭐ Manual Resmi {selectedModel.codeName || selectedModel.name}</span>
              </span>
            )}
          </div>

          <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 border-t border-slate-800/70">
            <div>
              Oli: <strong className="text-slate-200">{selectedModel.recommendedOilViscosity}</strong>
            </div>
            {selectedModel.sparkPlugSpec && (
              <div>
                • Busi: <strong className="text-slate-200">{selectedModel.sparkPlugSpec}</strong>
              </div>
            )}
            {selectedModel.tireSpecFront && (
              <div>
                • Ban: <strong className="text-slate-200">{selectedModel.tireSpecFront}</strong>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
