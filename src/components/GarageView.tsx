import React, { useState } from 'react';
import type { GarageVehicle, MotorcycleType } from '../types/motor';
import { MOTORCYCLE_BRANDS, MOTORCYCLE_TYPES } from '../data/motorcycles';
import { calculateMaintenanceRecommendations } from '../utils/calculator';
import {
  Bike,
  Plus,
  Trash2,
  ArrowRight,
  Gauge,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';

interface GarageViewProps {
  vehicles: GarageVehicle[];
  activeVehicleId: string | null;
  onSelectVehicle: (vehicle: GarageVehicle) => void;
  onAddVehicle: (vehicle: GarageVehicle) => void;
  onDeleteVehicle: (id: string) => void;
  onUpdateKm: (id: string, newKm: number) => void;
  onGoToCheck: () => void;
}

export const GarageView: React.FC<GarageViewProps> = ({
  vehicles,
  activeVehicleId,
  onSelectVehicle,
  onAddVehicle,
  onDeleteVehicle,
  onUpdateKm,
  onGoToCheck
}) => {
  const [isAdding, setIsAdding] = useState(vehicles.length === 0);
  const [nickname, setNickname] = useState('');
  const [brandId, setBrandId] = useState('yamaha');
  const [type, setType] = useState<MotorcycleType>('matic');
  const [modelId, setModelId] = useState('');
  const [customModelName] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [currentKm, setCurrentKm] = useState<number>(3000);
  const [year] = useState<number>(2024);

  const selectedBrand = MOTORCYCLE_BRANDS.find(b => b.id === brandId) || MOTORCYCLE_BRANDS[0];
  const brandModels = selectedBrand.popularModels.filter(m => m.type === type);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newVehicle: GarageVehicle = {
      id: 'v_' + Date.now(),
      nickname: nickname || customModelName || selectedBrand.name,
      brandId,
      modelId: modelId || (brandModels[0] ? brandModels[0].id : 'custom'),
      customModelName: customModelName || undefined,
      type,
      plateNumber: plateNumber || undefined,
      currentKm: currentKm || 0,
      year: year || undefined,
      createdAt: new Date().toISOString()
    };

    onAddVehicle(newVehicle);
    setIsAdding(false);
    // Reset fields
    setNickname('');
    setPlateNumber('');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <Bike className="w-5 h-5 text-amber-400" />
            <span>Garasi Motor Saya</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Pantau status servis motormu langsung dari sini. Cukup ubah angka KM untuk melihat saran servis secara instan!
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 transition cursor-pointer shadow-md shadow-amber-500/10"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Tutup Form' : 'Tambah Motor Baru'}</span>
        </button>
      </div>

      {/* FORM TAMBAH MOTOR */}
      {isAdding && (
        <form onSubmit={handleCreate} className="bg-slate-900 border border-amber-500/40 rounded-2xl p-4 sm:p-6 shadow-xl space-y-3.5 animate-in fade-in duration-200">
          <h3 className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider">
            Tambah Profil Motor Baru
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Panggilan Motor</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Misal: Fazzio Harian / Vario Kantor"
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Merek Pabrikan</label>
              <select
                value={brandId}
                onChange={(e) => {
                  setBrandId(e.target.value);
                  const b = MOTORCYCLE_BRANDS.find(x => x.id === e.target.value);
                  if (b && b.popularModels.length > 0) {
                    setModelId(b.popularModels[0].id);
                  }
                }}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {MOTORCYCLE_BRANDS.map(b => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tipe Motor</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as MotorcycleType)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {MOTORCYCLE_TYPES.map(t => (
                  <option key={t.type} value={t.type}>{t.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Model / Varian</label>
              <select
                value={modelId}
                onChange={(e) => setModelId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              >
                {brandModels.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
                <option value="custom">Model Lain / Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Kilometer Odometer Saat Ini</label>
              <input
                type="number"
                inputMode="numeric"
                value={currentKm}
                onChange={(e) => setCurrentKm(parseInt(e.target.value, 10) || 0)}
                placeholder="3000"
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm font-mono font-bold focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Plat Nomor (Opsional)</label>
              <input
                type="text"
                value={plateNumber}
                onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                placeholder="B 1234 ABC"
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm uppercase font-mono focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="min-h-[44px] px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 active:scale-95 transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 transition cursor-pointer"
            >
              Simpan Motor
            </button>
          </div>
        </form>
      )}

      {/* LIST KARTU MOTOR DI GARASI */}
      {vehicles.length === 0 ? (
        <div className="text-center py-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <Bike className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <h3 className="text-sm sm:text-base font-bold text-white">Belum Ada Motor Tersimpan</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Klik tombol &quot;Tambah Motor Baru&quot; di atas untuk menyimpan profil motormu di garasi lokal.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {vehicles.map(v => {
            const isActive = v.id === activeVehicleId;
            const brand = MOTORCYCLE_BRANDS.find(b => b.id === v.brandId);
            const model = brand?.popularModels.find(m => m.id === v.modelId);
            const modelDisplayName = model?.name || v.customModelName || 'Motor';

            // Real-time calculation right on the Garage card!
            const recs = calculateMaintenanceRecommendations({
              currentKm: v.currentKm,
              motorcycleType: v.type,
              hasRadiator: model?.hasRadiator ?? false
            });

            const dueNow = recs.filter(r => r.isDueNow);
            const upcoming = recs.filter(r => r.isUpcoming);

            return (
              <div
                key={v.id}
                className={`bg-slate-900 border rounded-2xl p-4 transition-all shadow-lg flex flex-col justify-between ${
                  isActive
                    ? 'border-amber-400 ring-2 ring-amber-400/40 bg-slate-850'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                          {brand?.name.split(' ')[0]}
                        </span>
                        {isActive && (
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                            Aktif
                          </span>
                        )}
                        {model?.hasVerifiedManualBook && (
                          <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            Manual Resmi
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-bold text-white leading-snug">{v.nickname}</h4>
                      <p className="text-xs text-slate-400">{modelDisplayName} ({v.type.toUpperCase()})</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onDeleteVehicle(v.id)}
                      className="p-2 text-slate-500 hover:text-red-400 active:scale-95 bg-slate-950 hover:bg-slate-800 rounded-xl transition cursor-pointer"
                      title="Hapus motor"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {v.plateNumber && (
                    <div className="inline-block px-2.5 py-0.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] font-bold text-slate-300 mb-2.5">
                      {v.plateNumber}
                    </div>
                  )}

                  {/* Quick Inline Kilometer Editor (Directly in Garage!) */}
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 mb-2.5">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Gauge className="w-3.5 h-3.5 text-amber-400" />
                        <span>Odometer Saat Ini:</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <input
                          type="number"
                          inputMode="numeric"
                          value={v.currentKm}
                          onChange={(e) => onUpdateKm(v.id, Math.max(0, parseInt(e.target.value, 10) || 0))}
                          className="w-24 text-right font-mono font-black text-amber-400 bg-slate-900 border border-slate-700 rounded-lg px-2 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-400"
                        />
                        <span className="text-xs font-bold text-slate-400 font-mono">KM</span>
                      </div>
                    </div>

                    {/* Quick increment buttons */}
                    <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-slate-900">
                      <button
                        type="button"
                        onClick={() => onUpdateKm(v.id, v.currentKm + 500)}
                        className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-300 rounded-md border border-slate-700"
                      >
                        +500 km
                      </button>
                      <button
                        type="button"
                        onClick={() => onUpdateKm(v.id, v.currentKm + 1000)}
                        className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 hover:bg-slate-700 active:scale-95 text-amber-300 rounded-md border border-slate-700"
                      >
                        +1.000 km
                      </button>
                    </div>
                  </div>

                  {/* Real-Time Live Status Pill right on the Garage Card! */}
                  <div className="mb-3">
                    {dueNow.length > 0 ? (
                      <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                        <div className="flex items-center gap-1.5 font-bold mb-0.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400 flex-shrink-0" />
                          <span>{dueNow.length} Item Wajib Servis Sekarang</span>
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-1">
                          • {dueNow[0].item.name} {dueNow.length > 1 ? `(+${dueNow.length - 1} lainnya)` : ''}
                        </p>
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                        <div className="flex items-center gap-1.5 font-bold mb-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                          <span>Kondisi Prima di {v.currentKm.toLocaleString('id-ID')} KM</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Servis berikutnya: {upcoming[0]?.item.name || 'Pemeriksaan rutin'}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectVehicle(v);
                      onGoToCheck();
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 min-h-[42px] py-2 px-3 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 transition cursor-pointer shadow-md shadow-amber-500/10"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Lihat Rincian Servis Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
