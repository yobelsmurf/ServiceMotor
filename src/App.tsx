import { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MotorcycleSelector } from './components/MotorcycleSelector';
import { OdometerInput } from './components/OdometerInput';
import { RecommendationCard } from './components/RecommendationCard';
import { CostSummary } from './components/CostSummary';
import { GarageView } from './components/GarageView';
import { ServiceHistoryView } from './components/ServiceHistoryView';
import { ManualBookTipsView } from './components/ManualBookTipsModal';
import { PrintableReport } from './components/PrintableReport';
import { MOTORCYCLE_BRANDS } from './data/motorcycles';
import type {
  MotorcycleModel,
  MotorcycleType,
  GarageVehicle,
  ServiceLogEntry,
  ServiceRecommendation
} from './types/motor';
import { calculateMaintenanceRecommendations } from './utils/calculator';
import {
  getStoredVehicles,
  saveStoredVehicles,
  getStoredServiceLogs,
  saveStoredServiceLogs,
  getActiveVehicleId,
  setActiveVehicleId,
  getStoredServicedItemIds,
  saveStoredServicedItemIds
} from './utils/storage';
import {
  Sparkles,
  AlertOctagon,
  Clock,
  CheckCircle2,
  Bike,
  RotateCcw
} from 'lucide-react';
import './App.css';

export function App() {
  const [activeTab, setActiveTab] = useState<'check' | 'garage' | 'history' | 'tips'>('check');

  // Selected vehicle state in Check Tab
  const [selectedBrandId, setSelectedBrandId] = useState<string>('yamaha');
  const [selectedType, setSelectedType] = useState<MotorcycleType>('matic');
  const [selectedModel, setSelectedModel] = useState<MotorcycleModel | null>(() => {
    const yamaha = MOTORCYCLE_BRANDS.find(b => b.id === 'yamaha');
    return yamaha ? yamaha.popularModels[0] : null; // Yamaha Fazzio default
  });
  const [customModelName, setCustomModelName] = useState<string>('');
  const [hasRadiator, setHasRadiator] = useState<boolean>(false);
  const [currentKm, setCurrentKm] = useState<number>(10000); // 10.000 KM matches user's prompt!

  // Garage and History persistence
  const [vehicles, setVehicles] = useState<GarageVehicle[]>(() => getStoredVehicles());
  const [activeVehicleIdState, setActiveVehicleIdState] = useState<string | null>(() => getActiveVehicleId());
  const [serviceLogs, setServiceLogs] = useState<ServiceLogEntry[]>(() => getStoredServiceLogs());

  // Serviced / Hidden item tracking
  const [servicedItemIds, setServicedItemIds] = useState<string[]>(() => getStoredServicedItemIds());

  // Filter state for recommendations
  const [filterMode, setFilterMode] = useState<'all' | 'due' | 'upcoming'>('all');

  // Modal / Toast states
  const [isPrintOpen, setIsPrintOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show a temporary toast message
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync vehicles to localStorage
  useEffect(() => {
    saveStoredVehicles(vehicles);
  }, [vehicles]);

  // Sync service logs to localStorage
  useEffect(() => {
    saveStoredServiceLogs(serviceLogs);
  }, [serviceLogs]);

  // Sync serviced items to localStorage
  useEffect(() => {
    saveStoredServicedItemIds(servicedItemIds);
  }, [servicedItemIds]);

  // Load default vehicle if garage has one
  useEffect(() => {
    if (activeVehicleIdState) {
      const active = vehicles.find(v => v.id === activeVehicleIdState);
      if (active) {
        setSelectedBrandId(active.brandId);
        setSelectedType(active.type);
        const brand = MOTORCYCLE_BRANDS.find(b => b.id === active.brandId);
        const model = brand?.popularModels.find(m => m.id === active.modelId);
        if (model) {
          setSelectedModel(model);
          setHasRadiator(model.hasRadiator);
        } else {
          setSelectedModel(null);
          setCustomModelName(active.customModelName || '');
        }
        setCurrentKm(active.currentKm);
      }
    }
  }, [activeVehicleIdState, vehicles]);

  // Calculate ALL maintenance recommendations for the current mileage & type
  const allRecommendations = useMemo(() => {
    return calculateMaintenanceRecommendations({
      currentKm,
      motorcycleType: selectedType,
      hasRadiator
    });
  }, [currentKm, selectedType, hasRadiator]);

  // Active recommendations: Filter out items that the user has already marked as serviced!
  const activeRecommendations = useMemo(() => {
    return allRecommendations.filter(r => !servicedItemIds.includes(r.item.id));
  }, [allRecommendations, servicedItemIds]);

  // Filtered by user selection ('all', 'due', 'upcoming')
  const filteredRecommendations = useMemo(() => {
    if (filterMode === 'due') {
      return activeRecommendations.filter(r => r.isDueNow);
    }
    if (filterMode === 'upcoming') {
      return activeRecommendations.filter(r => r.isUpcoming);
    }
    return activeRecommendations;
  }, [activeRecommendations, filterMode]);

  const dueCount = activeRecommendations.filter(r => r.isDueNow).length;
  const upcomingCount = activeRecommendations.filter(r => r.isUpcoming).length;

  // Handle saving current bike into Garage
  const handleSaveCurrentToGarage = () => {
    const brand = MOTORCYCLE_BRANDS.find(b => b.id === selectedBrandId) || MOTORCYCLE_BRANDS[0];
    const modelTitle = selectedModel?.name || customModelName || `${brand.name} ${selectedType.toUpperCase()}`;
    const newVehicle: GarageVehicle = {
      id: 'v_' + Date.now(),
      nickname: modelTitle,
      brandId: selectedBrandId,
      modelId: selectedModel ? selectedModel.id : 'custom',
      customModelName: customModelName || undefined,
      type: selectedType,
      currentKm,
      createdAt: new Date().toISOString()
    };

    setVehicles(prev => [...prev, newVehicle]);
    setActiveVehicleIdState(newVehicle.id);
    setActiveVehicleId(newVehicle.id);
    showToast(`✓ Motor "${modelTitle}" berhasil disimpan ke Garasi Saya!`);
  };

  // Handle selecting a vehicle from garage
  const handleSelectVehicleFromGarage = (v: GarageVehicle) => {
    setActiveVehicleIdState(v.id);
    setActiveVehicleId(v.id);
    setSelectedBrandId(v.brandId);
    setSelectedType(v.type);
    const brand = MOTORCYCLE_BRANDS.find(b => b.id === v.brandId);
    const model = brand?.popularModels.find(m => m.id === v.modelId);
    if (model) {
      setSelectedModel(model);
      setHasRadiator(model.hasRadiator);
    } else {
      setSelectedModel(null);
      setCustomModelName(v.customModelName || '');
    }
    setCurrentKm(v.currentKm);
    showToast(`Memuat data motor: ${v.nickname}`);
  };

  // Handle adding vehicle
  const handleAddVehicle = (newVehicle: GarageVehicle) => {
    setVehicles(prev => [...prev, newVehicle]);
    setActiveVehicleIdState(newVehicle.id);
    setActiveVehicleId(newVehicle.id);
    showToast(`✓ Motor "${newVehicle.nickname}" berhasil ditambahkan!`);
  };

  // Handle deleting vehicle
  const handleDeleteVehicle = (id: string) => {
    if (confirm('Yakin ingin menghapus profil motor ini dari garasi?')) {
      setVehicles(prev => prev.filter(v => v.id !== id));
      if (activeVehicleIdState === id) {
        setActiveVehicleIdState(null);
        setActiveVehicleId(null);
      }
      showToast('Profil motor dihapus.');
    }
  };

  // Update vehicle KM
  const handleUpdateVehicleKm = (id: string, newKm: number) => {
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, currentKm: newKm } : v));
    if (activeVehicleIdState === id) {
      setCurrentKm(newKm);
    }
  };

  // Handle marking service as DONE: Log it and automatically HIDE it from view!
  const handleMarkAsDone = (rec: ServiceRecommendation) => {
    const newLog: ServiceLogEntry = {
      id: 'log_' + Date.now(),
      vehicleId: activeVehicleIdState || 'general',
      date: new Date().toISOString().split('T')[0],
      km: currentKm,
      itemsServiced: [rec.item.name],
      workshopName: 'Servis Mandiri / Bengkel',
      totalCost: rec.item.estimatedCostMin + rec.item.estimatedLaborMin,
      notes: `Ditandai selesai pada ${currentKm.toLocaleString('id-ID')} KM`
    };

    setServiceLogs(prev => [newLog, ...prev]);
    setServicedItemIds(prev => Array.from(new Set([...prev, rec.item.id])));
    showToast(`✓ "${rec.item.name}" selesai diservis & disembunyikan!`);
  };

  // Handle restoring hidden items
  const handleRestoreServicedItems = () => {
    setServicedItemIds([]);
    showToast('Semua item saran servis kembali ditampilkan.');
  };

  // Handle adding custom log
  const handleAddLog = (newLog: ServiceLogEntry) => {
    setServiceLogs(prev => [newLog, ...prev]);
    showToast('✓ Riwayat servis berhasil disimpan!');
  };

  // Handle deleting log
  const handleDeleteLog = (id: string) => {
    setServiceLogs(prev => prev.filter(l => l.id !== id));
    showToast('Catatan riwayat dihapus.');
  };

  const currentBrand = MOTORCYCLE_BRANDS.find(b => b.id === selectedBrandId) || MOTORCYCLE_BRANDS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-20 sm:pb-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-14 sm:top-16 right-3 sm:right-4 z-50 bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-2xl animate-in slide-in-from-top duration-200 border border-amber-300 max-w-[90vw]">
          {toastMessage}
        </div>
      )}

      {/* Main Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedVehiclesCount={vehicles.length}
        serviceLogsCount={serviceLogs.length}
        onPrint={() => setIsPrintOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3.5 sm:px-6 py-4 sm:py-6">
        {/* TAB 1: CEK SERVIS (MAIN CALCULATOR) */}
        {activeTab === 'check' && (
          <div className="space-y-4 sm:space-y-6 animate-in fade-in duration-200">
            {/* Active Vehicle Banner (if from garage) */}
            {activeVehicleIdState && (
              <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-2.5 text-xs shadow-md">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 flex-shrink-0">
                    <Bike className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <span className="text-slate-400 hidden xs:inline">Motor Garasi:</span>
                    <strong className="text-white ml-1 font-semibold">
                      {vehicles.find(v => v.id === activeVehicleIdState)?.nickname}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('garage')}
                  className="text-amber-400 hover:text-amber-300 font-bold text-[11px] sm:text-xs flex-shrink-0 hover:underline cursor-pointer"
                >
                  Ganti Motor
                </button>
              </div>
            )}

            {/* Step 1 & 2: Select Brand, Type & Model */}
            <MotorcycleSelector
              selectedBrandId={selectedBrandId}
              setSelectedBrandId={setSelectedBrandId}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
              customModelName={customModelName}
              setCustomModelName={setCustomModelName}
              hasRadiator={hasRadiator}
              setHasRadiator={setHasRadiator}
              onSaveToGarage={handleSaveCurrentToGarage}
            />

            {/* Step 3: Enter Odometer KM */}
            <OdometerInput
              currentKm={currentKm}
              setCurrentKm={setCurrentKm}
            />

            {/* Financial & Urgency Summary (Calculated on active un-serviced items) */}
            <CostSummary
              recommendations={activeRecommendations}
              currentKm={currentKm}
              onPrint={() => setIsPrintOpen(true)}
            />

            {/* Notification Banner when items are completed & hidden */}
            {servicedItemIds.length > 0 && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 text-xs text-emerald-300 shadow-md">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">
                    <strong>{servicedItemIds.length} item</strong> telah diservis dan otomatis disembunyikan.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleRestoreServicedItems}
                  className="flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:text-amber-300 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700 active:scale-95 transition cursor-pointer flex-shrink-0"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Tampilkan Lagi</span>
                </button>
              </div>
            )}

            {/* Recommendations Header & Filter Chips */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pt-2">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" />
                  <span>Saran Servis Buku Manual ({currentKm.toLocaleString('id-ID')} KM)</span>
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
                  Menampilkan {filteredRecommendations.length} item perawatan aktif ({dueCount} jatuh tempo)
                </p>
              </div>

              {/* Filter Tabs (Horizontal scroll on mobile) */}
              <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs w-full sm:w-auto overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => setFilterMode('all')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg font-semibold transition active:scale-95 cursor-pointer text-center whitespace-nowrap text-[11px] sm:text-xs ${
                    filterMode === 'all'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Semua ({activeRecommendations.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('due')}
                  className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold transition active:scale-95 cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap text-[11px] sm:text-xs ${
                    filterMode === 'due'
                      ? 'bg-rose-500 text-white font-bold shadow'
                      : 'text-slate-400 hover:text-rose-400'
                  }`}
                >
                  <AlertOctagon className="w-3 h-3" />
                  <span>Wajib ({dueCount})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFilterMode('upcoming')}
                  className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg font-semibold transition active:scale-95 cursor-pointer flex items-center justify-center gap-1 whitespace-nowrap text-[11px] sm:text-xs ${
                    filterMode === 'upcoming'
                      ? 'bg-blue-600 text-white font-bold shadow'
                      : 'text-slate-400 hover:text-blue-400'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>Mendatang ({upcomingCount})</span>
                </button>
              </div>
            </div>

            {/* List of Recommendation Cards */}
            <div className="space-y-3">
              {filteredRecommendations.length === 0 ? (
                <div className="text-center py-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                  <h4 className="text-sm font-bold text-white">
                    {servicedItemIds.length > 0 && dueCount === 0
                      ? 'Hebat! Semua Servis Jatuh Tempo Sudah Selesai'
                      : 'Tidak Ada Item Dalam Kategori Ini'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                    {servicedItemIds.length > 0
                      ? 'Item yang sudah Anda tandai telah dicatat ke riwayat servis. Klik "Tampilkan Lagi" jika ingin melihatnya kembali.'
                      : 'Silakan pilih filter "Semua" untuk melihat daftar komponen jadwal servis.'}
                  </p>
                </div>
              ) : (
                filteredRecommendations.map(rec => (
                  <RecommendationCard
                    key={rec.item.id}
                    recommendation={rec}
                    onMarkAsDone={handleMarkAsDone}
                  />
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: GARASI SAYA */}
        {activeTab === 'garage' && (
          <div className="animate-in fade-in duration-200">
            <GarageView
              vehicles={vehicles}
              activeVehicleId={activeVehicleIdState}
              onSelectVehicle={handleSelectVehicleFromGarage}
              onAddVehicle={handleAddVehicle}
              onDeleteVehicle={handleDeleteVehicle}
              onUpdateKm={handleUpdateVehicleKm}
              onGoToCheck={() => setActiveTab('check')}
            />
          </div>
        )}

        {/* TAB 3: RIWAYAT SERVIS */}
        {activeTab === 'history' && (
          <div className="animate-in fade-in duration-200">
            <ServiceHistoryView
              logs={serviceLogs}
              vehicles={vehicles}
              activeVehicleId={activeVehicleIdState}
              onAddLog={handleAddLog}
              onDeleteLog={handleDeleteLog}
            />
          </div>
        )}

        {/* TAB 4: TIPS MANUAL BOOK */}
        {activeTab === 'tips' && (
          <div className="animate-in fade-in duration-200">
            <ManualBookTipsView />
          </div>
        )}
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedVehiclesCount={vehicles.length}
        serviceLogsCount={serviceLogs.length}
      />

      {/* PRINTABLE REPORT MODAL */}
      {isPrintOpen && (
        <PrintableReport
          brand={currentBrand}
          model={selectedModel}
          customModelName={customModelName}
          type={selectedType}
          currentKm={currentKm}
          hasRadiator={hasRadiator}
          recommendations={activeRecommendations}
          onClose={() => setIsPrintOpen(false)}
        />
      )}

      {/* Minimal Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 sm:py-6 text-center text-[11px] sm:text-xs text-slate-500 no-print mb-14 sm:mb-0">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            CekMotor © 2026 — Jadwal Servis Standar Buku Manual Sepeda Motor Indonesia.
          </p>
          <p className="text-slate-400">
            Yamaha Fazzio, NMAX, Honda BeAT, Vario, Suzuki, Kawasaki & Kustom.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
