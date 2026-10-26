import React from 'react';
import type { ServiceRecommendation } from '../types/motor';
import { formatRupiah } from '../utils/calculator';
import { Banknote, CheckCircle, Printer } from 'lucide-react';

interface CostSummaryProps {
  recommendations: ServiceRecommendation[];
  currentKm: number;
  onPrint: () => void;
}

export const CostSummary: React.FC<CostSummaryProps> = ({
  recommendations,
  currentKm,
  onPrint
}) => {
  const dueItems = recommendations.filter(r => r.isDueNow);
  const upcomingItems = recommendations.filter(r => r.isUpcoming);

  // Calculate totals for due items
  const totalPartMin = dueItems.reduce((acc, r) => acc + r.item.estimatedCostMin, 0);
  const totalPartMax = dueItems.reduce((acc, r) => acc + r.item.estimatedCostMax, 0);
  const totalLaborMin = dueItems.reduce((acc, r) => acc + r.item.estimatedLaborMin, 0);
  const totalLaborMax = dueItems.reduce((acc, r) => acc + r.item.estimatedLaborMax, 0);

  const grandTotalMin = totalPartMin + totalLaborMin;
  const grandTotalMax = totalPartMax + totalLaborMax;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 border border-amber-500/25 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 flex-shrink-0">
              <Banknote className="w-4 h-4" />
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Estimasi Biaya Servis (KM {currentKm.toLocaleString('id-ID')})
            </h3>
          </div>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Suku cadang original & estimasi jasa mekanik bengkel
          </p>
        </div>

        <button
          type="button"
          onClick={onPrint}
          className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[42px] px-4 py-2 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 shadow-md shadow-amber-500/20 transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak Checklist Bengkel</span>
        </button>
      </div>

      {dueItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Wajib Servis</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-rose-400 font-mono">{dueItems.length}</span>
              <span className="text-[10px] text-slate-400">item</span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
              +{upcomingItems.length} mendatang
            </span>
          </div>

          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3">
            <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">Sparepart</span>
            <div className="text-xs sm:text-sm font-bold text-slate-200 font-mono truncate">
              {formatRupiah(totalPartMin)}
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block truncate">
              Jasa: {formatRupiah(totalLaborMin)}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex sm:flex-col items-center sm:items-start justify-between">
            <div>
              <span className="text-amber-300 text-[10px] uppercase font-bold block mb-0.5">Total Estimasi</span>
              <div className="text-base sm:text-lg font-black text-amber-400 font-mono">
                {formatRupiah(grandTotalMin)} - {formatRupiah(grandTotalMax)}
              </div>
            </div>
            <span className="text-[10px] text-amber-300/70 block sm:mt-1 font-medium">
              Parts + Pasang
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2.5 p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs">
          <CheckCircle className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          <div>
            <span className="font-bold block text-xs sm:text-sm">Semua Komponen Dalam Batas Aman!</span>
            <span className="text-[11px] text-emerald-300/80">Tidak ada komponen kritis yang jatuh tempo di {currentKm.toLocaleString('id-ID')} KM.</span>
          </div>
        </div>
      )}
    </div>
  );
};
