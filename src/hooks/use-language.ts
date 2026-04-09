"use client";

import { useState, useEffect, useCallback } from "react";
import type { Language } from "@/lib/i18n";

const STORAGE_KEY = "pomodoro-language";

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>("en");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored) setLanguageState(stored);
    setLoaded(true);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  return { language, setLanguage, loaded };
}
