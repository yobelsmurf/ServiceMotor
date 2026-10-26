export type MotorcycleType = 'matic' | 'bebek' | 'sport' | 'trail';

export type UrgencyLevel = 'critical' | 'important' | 'inspection' | 'upcoming';

export interface MotorcycleBrand {
  id: string;
  name: string;
  country: string;
  badgeColor: string;
  popularModels: MotorcycleModel[];
}

export interface MotorcycleModel {
  id: string;
  brandId: string;
  name: string;
  codeName?: string; // e.g. "LCF125-F"
  manualBookCode?: string; // e.g. "BEJ-F8199-B1"
  type: MotorcycleType;
  cc: number;
  engineCooling: 'air' | 'liquid'; // pendingin udara vs cairan (radiator)
  hasRadiator: boolean;
  oilCapacityLiters: number;
  gearOilCapacityLiters?: number;
  recommendedOilViscosity: string; // e.g. "10W-30" or "10W-40"
  sparkPlugSpec?: string; // e.g. "NGK/CR6HSA"
  batteryModel?: string; // e.g. "YTZ6V"
  tireSpecFront?: string; // e.g. "110/70-12 (22 psi)"
  tireSpecRear?: string; // e.g. "110/70-12 (33 psi)"
  hasVerifiedManualBook?: boolean;
}

export interface ServiceItemTemplate {
  id: string;
  name: string;
  category: 'mesin' | 'transmisi' | 'pengereman' | 'suspensi' | 'kelistrikan' | 'pengapian' | 'bodi_kemudi';
  applicableTypes: MotorcycleType[]; // Which motor types need this
  requiresRadiator?: boolean;
  intervalKm: number; // e.g. 3000, 8000, 10000, 20000
  firstServiceKm?: number; // e.g. 1000 km
  toleranceKm: number; // toleransi sebelum dianggap overdue (e.g. 500 km)
  action: 'Ganti Baru' | 'Periksa & Bersihkan' | 'Kuras & Ganti' | 'Pelumasan' | 'Penyetelan';
  description: string;
  manualBookGuidance: string; // Cuplikan panduan buku manual
  consequenceOfDelay: string; // Resiko jika ditunda
  estimatedCostMin: number; // Rupiah
  estimatedCostMax: number;
  estimatedLaborMin: number;
  estimatedLaborMax: number;
  defaultUrgency: UrgencyLevel;
  iconName: string;
}

export interface ServiceRecommendation {
  item: ServiceItemTemplate;
  status: UrgencyLevel;
  statusLabel: string;
  currentKm: number;
  dueKm: number;
  kmDifference: number; // < 0 overdue, 0 exact, > 0 upcoming
  isDueNow: boolean;
  isOverdue: boolean;
  isUpcoming: boolean;
  estimatedPartCost: number;
  estimatedLaborCost: number;
}

export interface GarageVehicle {
  id: string;
  nickname: string;
  brandId: string;
  modelId: string;
  customModelName?: string;
  type: MotorcycleType;
  plateNumber?: string;
  currentKm: number;
  year?: number;
  lastServiceDate?: string;
  lastServiceKm?: number;
  notes?: string;
  createdAt: string;
}

export interface ServiceLogEntry {
  id: string;
  vehicleId: string;
  date: string;
  km: number;
  itemsServiced: string[];
  workshopName: string;
  totalCost: number;
  notes?: string;
}
