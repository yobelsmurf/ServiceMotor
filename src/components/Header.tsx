import React from 'react';
import { Wrench, Bike, History, BookOpen, Printer, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeTab: 'check' | 'garage' | 'history' | 'tips';
  setActiveTab: (tab: 'check' | 'garage' | 'history' | 'tips') => void;
  savedVehiclesCount: number;
  serviceLogsCount: number;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  savedVehiclesCount,
  serviceLogsCount,
  onPrint
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/90 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Tagline */}
          <div
            className="flex items-center gap-2.5 cursor-pointer select-none"
            onClick={() => setActiveTab('check')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center shadow-md shadow-amber-500/20 text-white font-bold ring-2 ring-amber-400/30 flex-shrink-0">
              <Wrench className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-black tracking-tight text-white">
                  Cek<span className="text-amber-400">Motor</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Manual Book
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 truncate max-w-[200px] sm:max-w-none">
                Jadwal Servis Standar Resmi Pabrikan
              </p>
            </div>
          </div>

          {/* Quick Print Button (visible on all screens) */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrint}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-xl transition active:scale-95 cursor-pointer shadow-sm"
              title="Cetak Jadwal Servis"
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="hidden xs:inline sm:inline">Cetak Checklist</span>
              <span className="inline xs:hidden sm:hidden">Cetak</span>
            </button>
          </div>

          {/* Desktop Navigation Tabs (Hidden on mobile, mobile uses BottomNav) */}
          <nav className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('check')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition cursor-pointer ${
                activeTab === 'check'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Cek Servis</span>
            </button>

            <button
              onClick={() => setActiveTab('garage')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition cursor-pointer relative ${
                activeTab === 'garage'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Bike className="w-4 h-4" />
              <span>Garasi Saya</span>
              {savedVehiclesCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === 'garage' ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-400'
                }`}>
                  {savedVehiclesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Riwayat Servis</span>
              {serviceLogsCount > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === 'history' ? 'bg-slate-950 text-amber-400' : 'bg-slate-700 text-slate-300'
                }`}>
                  {serviceLogsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('tips')}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-xl transition cursor-pointer ${
                activeTab === 'tips'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Tips Manual</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
