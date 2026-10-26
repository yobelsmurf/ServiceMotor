import type { MotorcycleType, ServiceRecommendation, UrgencyLevel } from '../types/motor';
import { SERVICE_ITEM_TEMPLATES } from '../data/maintenanceSchedules';

export interface CalculationOptions {
  currentKm: number;
  motorcycleType: MotorcycleType;
  hasRadiator: boolean;
  lastServiceHistory?: Record<string, number>; // itemId -> km when last performed
}

export function calculateMaintenanceRecommendations(options: CalculationOptions): ServiceRecommendation[] {
  const { currentKm, motorcycleType, hasRadiator, lastServiceHistory = {} } = options;

  // Filter applicable items
  const applicableItems = SERVICE_ITEM_TEMPLATES.filter(item => {
    if (!item.applicableTypes.includes(motorcycleType)) return false;
    if (item.requiresRadiator && !hasRadiator) return false;
    return true;
  });

  const recommendations: ServiceRecommendation[] = applicableItems.map(item => {
    const lastKm = lastServiceHistory[item.id];
    let dueKm: number;
    let kmDifference: number; // currentKm - dueKm (positive means overdue, negative means upcoming)

    if (lastKm !== undefined && lastKm > 0) {
      // User has custom logged history for this item
      dueKm = lastKm + item.intervalKm;
      kmDifference = currentKm - dueKm;
    } else {
      // Standard calculation from 0 km
      if (currentKm < (item.firstServiceKm || item.intervalKm)) {
        dueKm = item.firstServiceKm || item.intervalKm;
        kmDifference = currentKm - dueKm;
      } else {
        const interval = item.intervalKm;
        const cycle = Math.floor(currentKm / interval);
        const lastCycleKm = cycle * interval;
        const nextCycleKm = (cycle + 1) * interval;

        // If we are within tolerance past lastCycleKm, it's overdue/due
        const kmPastLastCycle = currentKm - lastCycleKm;
        const kmUntilNextCycle = nextCycleKm - currentKm;

        if (kmPastLastCycle <= item.toleranceKm && lastCycleKm > 0) {
          dueKm = lastCycleKm;
          kmDifference = kmPastLastCycle;
        } else if (kmUntilNextCycle <= item.toleranceKm) {
          dueKm = nextCycleKm;
          kmDifference = -kmUntilNextCycle;
        } else {
          dueKm = nextCycleKm;
          kmDifference = -kmUntilNextCycle;
        }
      }
    }

    // Determine status
    let status: UrgencyLevel = 'upcoming';
    let statusLabel = 'Kondisi Baik';
    let isDueNow = false;
    let isOverdue = false;
    let isUpcoming = false;

    // Tolerance thresholds
    const tolerance = item.toleranceKm;

    if (kmDifference >= 0) {
      // Past the due date!
      if (kmDifference === 0) {
        status = item.defaultUrgency;
        statusLabel = 'Wajib Servis Sekarang (Tepat KM)';
        isDueNow = true;
      } else if (kmDifference <= tolerance) {
        status = item.defaultUrgency;
        statusLabel = `Wajib Servis (Telat ${kmDifference.toLocaleString('id-ID')} KM)`;
        isDueNow = true;
        isOverdue = true;
      } else {
        // High overdue!
        status = 'critical';
        statusLabel = `Sangat Mendesak (Terlewat ${kmDifference.toLocaleString('id-ID')} KM)`;
        isDueNow = true;
        isOverdue = true;
      }
    } else {
      // Before due date (kmDifference is negative)
      const remainingKm = Math.abs(kmDifference);
      if (remainingKm <= tolerance) {
        status = item.defaultUrgency === 'critical' ? 'critical' : 'important';
        statusLabel = `Segera Lakukan (${remainingKm.toLocaleString('id-ID')} KM lagi)`;
        isDueNow = true;
      } else if (remainingKm <= tolerance * 2.5) {
        status = 'upcoming';
        statusLabel = `Mendatang (${remainingKm.toLocaleString('id-ID')} KM lagi)`;
        isUpcoming = true;
      } else {
        status = 'inspection';
        statusLabel = `Aman (${remainingKm.toLocaleString('id-ID')} KM lagi)`;
        isUpcoming = false;
      }
    }

    // Approximate midpoint costs
    const avgPartCost = Math.round((item.estimatedCostMin + item.estimatedCostMax) / 2);
    const avgLaborCost = Math.round((item.estimatedLaborMin + item.estimatedLaborMax) / 2);

    return {
      item,
      status,
      statusLabel,
      currentKm,
      dueKm,
      kmDifference,
      isDueNow,
      isOverdue,
      isUpcoming,
      estimatedPartCost: avgPartCost,
      estimatedLaborCost: avgLaborCost
    };
  });

  // Sort recommendations: Critical & Due now first, then upcoming, then normal
  const priorityOrder: Record<UrgencyLevel, number> = {
    critical: 1,
    important: 2,
    upcoming: 3,
    inspection: 4
  };

  return recommendations.sort((a, b) => {
    // If one is due now and other isn't
    if (a.isDueNow && !b.isDueNow) return -1;
    if (!a.isDueNow && b.isDueNow) return 1;

    // By urgency priority
    const prioDiff = priorityOrder[a.status] - priorityOrder[b.status];
    if (prioDiff !== 0) return prioDiff;

    // By remaining km
    return Math.abs(a.kmDifference) - Math.abs(b.kmDifference);
  });
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(amount);
}
