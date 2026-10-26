import type { GarageVehicle, ServiceLogEntry } from '../types/motor';

const GARAGE_STORAGE_KEY = 'cekmotor_garage_vehicles';
const SERVICE_LOGS_KEY = 'cekmotor_service_logs';
const ACTIVE_VEHICLE_ID_KEY = 'cekmotor_active_vehicle_id';
const SERVICED_ITEMS_KEY = 'cekmotor_serviced_item_ids';

export function getStoredVehicles(): GarageVehicle[] {
  try {
    const raw = localStorage.getItem(GARAGE_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading garage vehicles:', e);
    return [];
  }
}

export function saveStoredVehicles(vehicles: GarageVehicle[]): void {
  try {
    localStorage.setItem(GARAGE_STORAGE_KEY, JSON.stringify(vehicles));
  } catch (e) {
    console.error('Error saving garage vehicles:', e);
  }
}

export function getActiveVehicleId(): string | null {
  return localStorage.getItem(ACTIVE_VEHICLE_ID_KEY);
}

export function setActiveVehicleId(id: string | null): void {
  if (id) {
    localStorage.setItem(ACTIVE_VEHICLE_ID_KEY, id);
  } else {
    localStorage.removeItem(ACTIVE_VEHICLE_ID_KEY);
  }
}

export function getStoredServiceLogs(): ServiceLogEntry[] {
  try {
    const raw = localStorage.getItem(SERVICE_LOGS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading service logs:', e);
    return [];
  }
}

export function saveStoredServiceLogs(logs: ServiceLogEntry[]): void {
  try {
    localStorage.setItem(SERVICE_LOGS_KEY, JSON.stringify(logs));
  } catch (e) {
    console.error('Error saving service logs:', e);
  }
}

export function getStoredServicedItemIds(): string[] {
  try {
    const raw = localStorage.getItem(SERVICED_ITEMS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading serviced item IDs:', e);
    return [];
  }
}

export function saveStoredServicedItemIds(itemIds: string[]): void {
  try {
    localStorage.setItem(SERVICED_ITEMS_KEY, JSON.stringify(itemIds));
  } catch (e) {
    console.error('Error saving serviced item IDs:', e);
  }
}
