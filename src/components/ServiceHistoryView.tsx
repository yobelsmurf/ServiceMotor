import React, { useState } from 'react';
import type { ServiceLogEntry, GarageVehicle } from '../types/motor';
import { SERVICE_ITEM_TEMPLATES } from '../data/maintenanceSchedules';
import { formatRupiah } from '../utils/calculator';
import { History, Plus, Trash2, Calendar, Banknote, Building2, Check } from 'lucide-react';

interface ServiceHistoryViewProps {
  logs: ServiceLogEntry[];
  vehicles: GarageVehicle[];
  activeVehicleId: string | null;
  onAddLog: (log: ServiceLogEntry) => void;
  onDeleteLog: (id: string) => void;
}

export const ServiceHistoryView: React.FC<ServiceHistoryViewProps> = ({
  logs,
  vehicles,
  activeVehicleId,
  onAddLog,
  onDeleteLog
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [vehicleId, setVehicleId] = useState(activeVehicleId || (vehicles[0] ? vehicles[0].id : 'general'));
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [km, setKm] = useState<number>(10000);
  const [selectedItems, setSelectedItems] = useState<string[]>(['Ganti Oli Mesin Berkala', 'Kuras & Ganti Oli Shockbreaker Depan']);
  const [workshopName, setWorkshopName] = useState('');
  const [totalCost, setTotalCost] = useState<number>(120000);
  const [notes, setNotes] = useState('');

  const handleToggleItem = (itemName: string) => {
    if (selectedItems.includes(itemName)) {
      setSelectedItems(selectedItems.filter(i => i !== itemName));
    } else {
      setSelectedItems([...selectedItems, itemName]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert('Pilih minimal 1 item yang diservis!');
      return;
    }

    const newLog: ServiceLogEntry = {
      id: 'log_' + Date.now(),
      vehicleId,
      date,
      km,
      itemsServiced: selectedItems,
      workshopName: workshopName || 'Bengkel Resmi / Umum',
      totalCost,
      notes: notes || undefined
    };

    onAddLog(newLog);
    setIsAdding(false);
    setNotes('');
  };

  const filteredLogs = activeVehicleId
    ? logs.filter(l => l.vehicleId === activeVehicleId || l.vehicleId === 'general')
    : logs;

  const totalSpent = filteredLogs.reduce((acc, l) => acc + l.totalCost, 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <History className="w-5 h-5 text-amber-400" />
            <span>Riwayat Servis</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Catat riwayat servis motormu untuk melacak pengeluaran & usia pakai sparepart.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAdding(!isAdding)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 transition cursor-pointer shadow-md shadow-amber-500/10"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Tutup Form' : 'Catat Servis Baru'}</span>
        </button>
      </div>

      {/* FORM CATAT SERVIS */}
      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-amber-500/40 rounded-2xl p-4 sm:p-6 shadow-xl space-y-3.5 animate-in fade-in duration-200">
          <h3 className="text-xs sm:text-sm font-bold text-amber-400 uppercase tracking-wider">
            Tambah Catatan Servis Baru
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {vehicles.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Pilih Motor</label>
                <select
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                >
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.nickname}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tanggal Servis</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Odometer (KM)</label>
              <input
                type="number"
                inputMode="numeric"
                value={km}
                onChange={(e) => setKm(parseInt(e.target.value, 10) || 0)}
                placeholder="10000"
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm font-mono font-bold focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Total Biaya (Rp)</label>
              <input
                type="number"
                inputMode="numeric"
                value={totalCost}
                onChange={(e) => setTotalCost(parseInt(e.target.value, 10) || 0)}
                placeholder="120000"
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm font-mono font-bold focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Nama Bengkel</label>
              <input
                type="text"
                value={workshopName}
                onChange={(e) => setWorkshopName(e.target.value)}
                placeholder="Misal: AHASS Surya Motor / Yamaha Flagship"
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Catatan Mekanik</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Misal: Kampas rem masih tebal, kampas kopling bagus"
                className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl px-3.5 py-3 text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Checklist item servis */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Pilih Item Pekerjaan yang Dilakukan:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {SERVICE_ITEM_TEMPLATES.map(tpl => {
                const isSelected = selectedItems.includes(tpl.name);
                return (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => handleToggleItem(tpl.name)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left text-xs transition border cursor-pointer active:scale-98 ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-400 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded flex items-center justify-center text-slate-950 text-[10px] flex-shrink-0 ${
                      isSelected ? 'bg-amber-400 font-bold' : 'border border-slate-700'
                    }`}>
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className="truncate">{tpl.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
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
              Simpan Riwayat Servis
            </button>
          </div>
        </form>
      )}

      {/* SUMMARY TOTAL PENGELUARAN */}
      {filteredLogs.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Banknote className="w-5 h-5 text-emerald-400" />
            <span className="text-xs text-slate-400">Total Perawatan Tercatat:</span>
          </div>
          <span className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono">
            {formatRupiah(totalSpent)}
          </span>
        </div>
      )}

      {/* LIST CATATAN RIWAYAT */}
      {filteredLogs.length === 0 ? (
        <div className="text-center py-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <History className="w-10 h-10 text-slate-600 mx-auto mb-2" />
          <h3 className="text-sm sm:text-base font-bold text-white">Belum Ada Riwayat Servis</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Catat servis motormu agar kamu tahu kapan terakhir ganti oli shock atau servis CVT.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredLogs.map(log => {
            const vehicle = vehicles.find(v => v.id === log.vehicleId);
            return (
              <div
                key={log.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-3.5 sm:p-5 transition shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5 pb-2.5 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-xs sm:text-sm">
                      {log.km.toLocaleString('id-ID')} KM
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {vehicle ? vehicle.nickname : 'Motor'}
                        </span>
                        <span className="text-slate-500 text-xs">•</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-500" />
                          {log.date}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-slate-500" />
                        <span>{log.workshopName}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
                    <span className="text-xs sm:text-sm font-bold text-emerald-400 font-mono">
                      {formatRupiah(log.totalCost)}
                    </span>
                    <button
                      type="button"
                      onClick={() => onDeleteLog(log.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 active:scale-95 bg-slate-950 rounded-lg transition cursor-pointer"
                      title="Hapus catatan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Items serviced tags */}
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {log.itemsServiced.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] sm:text-[11px] font-medium text-slate-300"
                    >
                      ✓ {item}
                    </span>
                  ))}
                </div>

                {log.notes && (
                  <p className="text-[11px] text-slate-400 italic bg-slate-950/60 p-2 rounded-xl border border-slate-800/60 mt-2">
                    &quot;{log.notes}&quot;
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
