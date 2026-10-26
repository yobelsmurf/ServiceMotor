import React, { useState } from 'react';
import { Gauge, Plus, Minus, RotateCcw, ChevronRight } from 'lucide-react';

interface OdometerInputProps {
  currentKm: number;
  setCurrentKm: (km: number) => void;
}

export const OdometerInput: React.FC<OdometerInputProps> = ({ currentKm, setCurrentKm }) => {
  const [inputValue, setInputValue] = useState<string>(currentKm.toString());

  const triggerHaptic = () => {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(8);
      } catch {
        // ignore
      }
    }
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(rawVal);
    const parsed = parseInt(rawVal, 10);
    if (!isNaN(parsed)) {
      setCurrentKm(Math.max(0, Math.min(250000, parsed)));
    } else if (rawVal === '') {
      setCurrentKm(0);
    }
  };

  const handleIncrement = (amount: number) => {
    triggerHaptic();
    const nextVal = Math.max(0, Math.min(250000, currentKm + amount));
    setCurrentKm(nextVal);
    setInputValue(nextVal.toString());
  };

  const handleSetPreset = (targetKm: number) => {
    triggerHaptic();
    setCurrentKm(targetKm);
    setInputValue(targetKm.toString());
  };

  const presets = [
    { km: 1000, label: '1.000 KM', note: 'Inreyen Perdana' },
    { km: 4000, label: '4.000 KM', note: 'Servis Rutin' },
    { km: 8000, label: '8.000 KM', note: 'Gardan & Busi' },
    { km: 10000, label: '10.000 KM', note: 'Oli Shock & CVT' }, // Specific highlight
    { km: 16000, label: '16.000 KM', note: 'Filter Udara' },
    { km: 24000, label: '24.000 KM', note: 'V-Belt & Rantai' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div>
          <span className="text-amber-400 font-bold text-[11px] uppercase tracking-wider block">
            Langkah 3
          </span>
          <h2 className="text-base sm:text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Gauge className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <span>Angka Kilometer (Odometer)</span>
          </h2>
        </div>

        {currentKm > 0 && (
          <button
            type="button"
            onClick={() => handleSetPreset(0)}
            className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-slate-800/80 active:scale-95 transition cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* DIGITAL SPEEDOMETER DISPLAY (Optimized for Mobile) */}
      <div className="bg-slate-950 border-2 border-slate-800/90 rounded-2xl p-4 sm:p-5 relative mb-4 shadow-inner">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 font-semibold mb-1">
            ODOMETER SPEEDOMETER
          </span>

          {/* Big LCD Numbers */}
          <div className="flex items-baseline justify-center gap-1.5 py-1">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={inputValue}
              onChange={handleManualInput}
              placeholder="10000"
              aria-label="Kilometer Motor Odometer"
              className="w-48 sm:w-64 bg-transparent text-4xl sm:text-5xl font-mono font-black text-amber-400 focus:outline-none focus:border-b-2 focus:border-amber-400 tracking-wider text-center"
            />
            <span className="text-base sm:text-xl font-black text-slate-400 font-mono">KM</span>
          </div>

          <p className="text-[11px] text-slate-400 mt-1">
            Sentuh angka untuk mengetik atau gunakan tombol di bawah
          </p>

          {/* Quick Increment Buttons (4 buttons in grid on mobile, large touch targets) */}
          <div className="grid grid-cols-4 gap-2 w-full mt-4 pt-3 border-t border-slate-800/80">
            <button
              type="button"
              onClick={() => handleIncrement(-1000)}
              disabled={currentKm <= 0}
              className="flex items-center justify-center gap-1 min-h-[44px] py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-300 disabled:opacity-20 transition border border-slate-700 cursor-pointer"
            >
              <Minus className="w-3 h-3 text-slate-400" />
              <span>1K</span>
            </button>
            <button
              type="button"
              onClick={() => handleIncrement(500)}
              className="flex items-center justify-center gap-1 min-h-[44px] py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 active:scale-95 text-slate-200 transition border border-slate-700 cursor-pointer"
            >
              <Plus className="w-3 h-3 text-amber-400" />
              <span>500</span>
            </button>
            <button
              type="button"
              onClick={() => handleIncrement(1000)}
              className="flex items-center justify-center gap-1 min-h-[44px] py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 active:scale-95 text-amber-300 transition border border-slate-700 cursor-pointer"
            >
              <Plus className="w-3 h-3 text-amber-400" />
              <span>1.000</span>
            </button>
            <button
              type="button"
              onClick={() => handleIncrement(5000)}
              className="flex items-center justify-center gap-1 min-h-[44px] py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 active:scale-95 text-amber-300 transition border border-slate-700 cursor-pointer"
            >
              <Plus className="w-3 h-3 text-amber-400" />
              <span>5.000</span>
            </button>
          </div>
        </div>

        {/* Range Slider for quick scrubbing */}
        <div className="mt-3 pt-2">
          <input
            type="range"
            min="0"
            max="60000"
            step="500"
            value={Math.min(60000, currentKm)}
            aria-label="Penggeser Kilometer"
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setCurrentKm(val);
              setInputValue(val.toString());
            }}
            className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>0 km</span>
            <span>20.000 km</span>
            <span>40.000 km</span>
            <span>60.000 km+</span>
          </div>
        </div>
      </div>

      {/* HORIZONTAL SWIPEABLE PRESET MILESTONES */}
      <div>
        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Kilometer Acuan Standar Buku Manual:
        </label>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
          {presets.map(preset => {
            const isActive = currentKm === preset.km;
            return (
              <button
                key={preset.km}
                type="button"
                onClick={() => handleSetPreset(preset.km)}
                className={`flex-shrink-0 flex flex-col items-start px-3 py-2 rounded-xl text-left transition active:scale-95 border cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center gap-1 w-full justify-between">
                  <span className="text-xs font-mono font-black">{preset.label}</span>
                  <ChevronRight className={`w-3 h-3 ${isActive ? 'text-slate-950' : 'text-slate-500'}`} />
                </div>
                <span className={`text-[10px] font-medium truncate ${
                  isActive ? 'text-slate-900 font-bold' : 'text-slate-400'
                }`}>
                  {preset.note}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
