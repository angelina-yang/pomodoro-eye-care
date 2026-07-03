"use client";

import { useState, useEffect, useCallback } from "react";
import { DEFAULT_CITIES } from "@/lib/timezones";

const STORAGE_KEY = "pomodoro-world-clock";

function loadCityIds(): string[] {
  if (typeof window === "undefined") return DEFAULT_CITIES;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.every(x => typeof x === "string")) {
        return parsed;
      }
    }
  } catch { /* ignore */ }
  return DEFAULT_CITIES;
}

export function useWorldClock() {
  const [cityIds, setCityIds] = useState<string[]>(DEFAULT_CITIES);
  const [now, setNow] = useState(() => new Date());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCityIds(loadCityIds());
    setLoaded(true);
  }, []);

  useEffect(() => {
    const tick = () => setNow(new Date());
    const interval = setInterval(tick, 30_000);
    return () => clearInterval(interval);
  }, []);

  const persist = (ids: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch { /* ignore */ }
  };

  const addCity = useCallback((id: string) => {
    setCityIds(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      persist(next);
      return next;
    });
  }, []);

  const removeCity = useCallback((id: string) => {
    setCityIds(prev => {
      const next = prev.filter(x => x !== id);
      persist(next);
      return next;
    });
  }, []);

  return { cityIds, now, addCity, removeCity, loaded };
}
