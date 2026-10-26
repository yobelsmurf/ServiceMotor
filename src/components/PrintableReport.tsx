import React from 'react';
import type { MotorcycleBrand, MotorcycleModel, MotorcycleType, ServiceRecommendation } from '../types/motor';
import { formatRupiah } from '../utils/calculator';
import { Wrench, X, Printer } from 'lucide-react';

interface PrintableReportProps {
  brand: MotorcycleBrand;
  model: MotorcycleModel | null;
  customModelName: string;
  type: MotorcycleType;
  currentKm: number;
  hasRadiator: boolean;
  plateNumber?: string;
  recommendations: ServiceRecommendation[];
  onClose: () => void;
}

export const PrintableReport: React.FC<PrintableReportProps> = ({
  brand,
  model,
  customModelName,
  type,
  currentKm,
  hasRadiator,
  plateNumber,
  recommendations,
  onClose
}) => {
  const modelName = model?.name || customModelName || 'Semua Model';
  const dueItems = recommendations.filter(r => r.isDueNow);
  const upcomingItems = recommendations.filter(r => r.isUpcoming);

  const totalMin = dueItems.reduce((acc, r) => acc + r.item.estimatedCostMin + r.item.estimatedLaborMin, 0);
  const totalMax = dueItems.reduce((acc, r) => acc + r.item.estimatedCostMax + r.item.estimatedLaborMax, 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-hidden print:p-0 print:bg-white print:static">
      <div className="bg-white text-slate-900 w-full max-w-3xl rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh] print:max-h-none print:shadow-none print:w-full print:border-none overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Fixed Non-Scrolling Header Bar (Always 100% visible on top) */}
        <div className="flex-shrink-0 bg-slate-50 border-b border-slate-200 px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between gap-3 no-print z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-700 flex items-center justify-center font-bold">
              <Printer className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                Lembar Checklist Servis Bengkel
              </h3>
              <p className="text-[11px] text-slate-500 hidden xs:block">
                Siap dicetak atau disimpan sebagai PDF untuk dibawa ke bengkel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Cetak / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              title="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-5 print:overflow-visible print:p-0">
          {/* Header Document */}
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-slate-900" />
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase">
                  CHECKLIST SERVIS BERKALA
                </h1>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Standar Panduan Buku Manual Pabrikan (Owner&apos;s Service Manual)
              </p>
            </div>
            <div className="text-right text-[11px]">
              <span className="block font-bold text-slate-800">Tanggal:</span>
              <span className="text-slate-600">{new Date().toLocaleDateString('id-ID', { dateStyle: 'medium' })}</span>
            </div>
          </div>

          {/* Motor Specifications Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">Merek Motor:</span>
              <span className="font-bold text-slate-900">{brand.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Model / Tipe:</span>
              <span className="font-bold text-slate-900">{modelName} ({type.toUpperCase()})</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Odometer Saat Ini:</span>
              <span className="font-bold text-slate-900 font-mono text-sm">{currentKm.toLocaleString('id-ID')} KM</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Sistem Pendingin:</span>
              <span className="font-bold text-slate-900">{hasRadiator ? 'Radiator (Coolant)' : 'Pendingin Udara'}</span>
            </div>
            {plateNumber && (
              <div>
                <span className="text-slate-500 block text-[10px]">No. Polisi:</span>
                <span className="font-bold text-slate-900 font-mono">{plateNumber}</span>
              </div>
            )}
          </div>

          {/* Table of Due Items */}
          <div>
            <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-300 pb-1">
              1. Komponen & Suku Cadang Wajib Servis (Jatuh Tempo)
            </h2>
            {dueItems.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">
                Tidak ada item kritis yang jatuh tempo di kilometer ini.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-300 bg-slate-100 text-slate-700">
                      <th className="py-2 px-2.5 w-10 text-center">Cek</th>
                      <th className="py-2 px-2.5">Komponen & Tindakan</th>
                      <th className="py-2 px-2.5 w-28">Interval Pabrik</th>
                      <th className="py-2 px-2.5 text-right w-36">Perkiraan Biaya</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dueItems.map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-200">
                        <td className="py-2 px-2.5 text-center">
                          <div className="w-4 h-4 border-2 border-slate-400 rounded mx-auto" />
                        </td>
                        <td className="py-2 px-2.5">
                          <div className="font-bold text-slate-900">{item.item.name}</div>
                          <div className="text-[11px] text-slate-600 leading-snug">
                            {item.item.action} — {item.item.description}
                          </div>
                        </td>
                        <td className="py-2 px-2.5 font-mono text-slate-600 whitespace-nowrap">
                          Tiap {item.item.intervalKm.toLocaleString('id-ID')} KM
                        </td>
                        <td className="py-2 px-2.5 text-right font-mono font-medium text-slate-800 text-[11px] whitespace-nowrap">
                          {formatRupiah(item.item.estimatedCostMin + item.item.estimatedLaborMin)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Table of Upcoming Items */}
          {upcomingItems.length > 0 && (
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 border-b border-slate-300 pb-1">
                2. Komponen Segera Menyusul (Mendatang)
              </h2>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-300 bg-slate-100 text-slate-700">
                    <th className="py-1.5 px-2.5">Komponen</th>
                    <th className="py-1.5 px-2.5 text-right">Jatuh Tempo Pada</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingItems.slice(0, 4).map((item, idx) => (
                    <tr key={idx} className="border-b border-slate-200">
                      <td className="py-1.5 px-2.5 font-medium text-slate-800">{item.item.name}</td>
                      <td className="py-1.5 px-2.5 font-mono text-slate-700 text-right text-[11px]">
                        {item.dueKm.toLocaleString('id-ID')} KM ({Math.abs(item.kmDifference).toLocaleString('id-ID')} KM lagi)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Total Budget Box */}
          <div className="bg-slate-100 p-3.5 sm:p-4 rounded-xl border border-slate-300 flex justify-between items-center text-xs">
            <div>
              <span className="font-bold text-slate-800 block text-xs sm:text-sm">Estimasi Total Anggaran:</span>
              <span className="text-slate-500 text-[10px]">*Suku cadang original + Ongkos pasang mekanik</span>
            </div>
            <div className="text-base sm:text-lg font-black text-slate-900 font-mono">
              {formatRupiah(totalMin)} - {formatRupiah(totalMax)}
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-4 pt-6 text-xs text-center border-t border-slate-200">
            <div>
              <p className="text-slate-500 mb-12 text-[11px]">Pemilik Motor</p>
              <div className="border-b border-slate-400 w-36 mx-auto" />
              <p className="text-[10px] text-slate-400 mt-1">(Tanda Tangan)</p>
            </div>
            <div>
              <p className="text-slate-500 mb-12 text-[11px]">Mekanik / Kepala Bengkel</p>
              <div className="border-b border-slate-400 w-36 mx-auto" />
              <p className="text-[10px] text-slate-400 mt-1">(Tanda Tangan & Cap)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
