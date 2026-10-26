import React, { useState } from 'react';
import type { ServiceRecommendation } from '../types/motor';
import { formatRupiah } from '../utils/calculator';
import {
  Droplet,
  Cog,
  Activity,
  Sliders,
  Disc,
  RotateCcw,
  Zap,
  Wind,
  ShieldAlert,
  AlertTriangle,
  Thermometer,
  Link as LinkIcon,
  Crosshair,
  Cpu,
  Navigation,
  Battery,
  CircleDot,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  AlertOctagon,
  Key as KeyIcon
} from 'lucide-react';

interface RecommendationCardProps {
  recommendation: ServiceRecommendation;
  onMarkAsDone: (rec: ServiceRecommendation) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendation,
  onMarkAsDone
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { item, status, statusLabel, isDueNow, isUpcoming } = recommendation;

  // Icon mapping
  const renderIcon = (name: string) => {
    const props = { className: 'w-4 h-4 sm:w-5 sm:h-5' };
    switch (name) {
      case 'Droplet': return <Droplet {...props} />;
      case 'Cog': return <Cog {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Sliders': return <Sliders {...props} />;
      case 'Disc': return <Disc {...props} />;
      case 'RotateCcw': return <RotateCcw {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Wind': return <Wind {...props} />;
      case 'ShieldAlert': return <ShieldAlert {...props} />;
      case 'AlertTriangle': return <AlertTriangle {...props} />;
      case 'Thermometer': return <Thermometer {...props} />;
      case 'Link': return <LinkIcon {...props} />;
      case 'Crosshair': return <Crosshair {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Navigation': return <Navigation {...props} />;
      case 'Battery': return <Battery {...props} />;
      case 'CircleDot': return <CircleDot {...props} />;
      case 'Key': return <KeyIcon {...props} />;
      default: return <Activity {...props} />;
    }
  };

  // Status badge styling
  const getStatusBadge = () => {
    if (status === 'critical') {
      return {
        bg: 'bg-red-500/10 border-red-500/30 text-red-400',
        dot: 'bg-red-500',
        borderCard: 'border-red-900/40 hover:border-red-500/60 shadow-red-950/20'
      };
    }
    if (status === 'important') {
      return {
        bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
        dot: 'bg-amber-500',
        borderCard: 'border-amber-900/30 hover:border-amber-500/50 shadow-amber-950/20'
      };
    }
    if (isUpcoming) {
      return {
        bg: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
        dot: 'bg-blue-400',
        borderCard: 'border-slate-800 hover:border-slate-700'
      };
    }
    return {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      dot: 'bg-emerald-500',
      borderCard: 'border-slate-800 hover:border-slate-700'
    };
  };

  const style = getStatusBadge();

  return (
    <div className={`bg-slate-900 border rounded-2xl p-3.5 sm:p-5 transition-all shadow-lg ${style.borderCard}`}>
      {/* Top Row: Icon + Title & Action + Status Badge */}
      <div className="flex items-start justify-between gap-2.5 mb-2.5">
        <div className="flex items-start gap-2.5">
          <div className={`p-2 rounded-xl border flex-shrink-0 mt-0.5 ${style.bg}`}>
            {renderIcon(item.iconName)}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
              {item.name}
            </h3>
            <div className="flex flex-wrap items-center gap-1.5 mt-1">
              <span className={`text-[9px] sm:text-[10px] uppercase font-black px-1.5 py-0.5 rounded ${
                item.action === 'Ganti Baru'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : item.action === 'Kuras & Ganti'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
              }`}>
                {item.action}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Tiap {item.intervalKm.toLocaleString('id-ID')} KM
              </span>
            </div>
          </div>
        </div>

        {/* Urgency Status Chip */}
        <div className="flex-shrink-0">
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold ${style.bg} border`}>
            <span className={`w-1.5 h-1.5 rounded-full ${style.dot} ${isDueNow ? 'animate-pulse' : ''}`} />
            <span className="truncate max-w-[120px] sm:max-w-none">{statusLabel}</span>
          </div>
        </div>
      </div>

      {/* Description Summary */}
      <p className="text-xs text-slate-300 leading-relaxed mb-3">
        {item.description}
      </p>

      {/* Cost Breakdown & Action Button Strip */}
      <div className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-slate-500 block text-[9px] uppercase font-bold">Sparepart</span>
            <span className="font-bold text-slate-200 font-mono text-[11px] sm:text-xs">
              {formatRupiah(item.estimatedCostMin)}
            </span>
          </div>
          <div className="border-l border-slate-800/80 pl-2">
            <span className="text-slate-500 block text-[9px] uppercase font-bold">Ongkos Jasa</span>
            <span className="font-bold text-slate-300 font-mono text-[11px] sm:text-xs">
              {formatRupiah(item.estimatedLaborMin)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
          <button
            type="button"
            onClick={() => onMarkAsDone(recommendation)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 active:scale-95 border border-emerald-500/30 transition cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Sudah Diservis</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center gap-1 min-h-[38px] px-2.5 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 active:scale-95 transition border border-slate-800 cursor-pointer"
          >
            <span>{isExpanded ? 'Tutup' : 'Detail'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Accordion: Manual Book guidance & consequence */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2 text-xs animate-in fade-in duration-200">
          <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl">
            <div className="flex items-center gap-1.5 font-bold text-amber-300 mb-1">
              <BookOpen className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Panduan Buku Manual Pabrikan:</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
              {item.manualBookGuidance}
            </p>
          </div>

          <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl">
            <div className="flex items-center gap-1.5 font-bold text-red-300 mb-1">
              <AlertOctagon className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Resiko Fatal Jika Ditunda:</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px] sm:text-xs">
              {item.consequenceOfDelay}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
