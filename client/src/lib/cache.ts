import type { App } from "@shared/schema";

const CACHE_KEY = "joshhub_apps_cache";
const CACHE_TIMESTAMP_KEY = "joshhub_apps_cache_timestamp";
const STALE_THRESHOLD_DAYS = 7;

interface CachedData {
  apps: App[];
  timestamp: number;
}

export function getCachedApps(): App[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const data: CachedData = JSON.parse(cached);
    return data.apps;
  } catch {
    return null;
  }
}

export function setCachedApps(apps: App[]): void {
  try {
    const data: CachedData = {
      apps,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    console.warn("Failed to cache apps to localStorage");
  }
}

export function getCacheAge(): number | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const data: CachedData = JSON.parse(cached);
    return Date.now() - data.timestamp;
  } catch {
    return null;
  }
}

export function isCacheStale(): boolean {
  const age = getCacheAge();
  if (age === null) return false;
  const staleDays = age / (1000 * 60 * 60 * 24);
  return staleDays > STALE_THRESHOLD_DAYS;
}

export function getCacheAgeString(): string | null {
  const age = getCacheAge();
  if (age === null) return null;
  
  const days = Math.floor(age / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}
