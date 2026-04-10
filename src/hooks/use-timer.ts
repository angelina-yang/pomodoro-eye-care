"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export type TimerMode = "idle" | "work" | "break" | "longBreak";

interface TimerSettings {
  workMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
}

const SETTINGS_KEY = "pomodoro-settings";
const SESSION_KEY = "pomodoro-sessions-today";

function loadSettings(): TimerSettings {
  if (typeof window === "undefined") return { workMinutes: 25, breakMinutes: 5, longBreakMinutes: 15 };
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return { workMinutes: 25, breakMinutes: 5, longBreakMinutes: 15 };
}

function loadSessionsToday(): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      const { count, date } = JSON.parse(stored);
      if (date === new Date().toDateString()) return count;
    }
  } catch { /* ignore */ }
  return 0;
}

function saveSessionsToday(count: number) {
  localStorage.setItem(SESSION_KEY, JSON.stringify({ count, date: new Date().toDateString() }));
}

export function useTimer() {
  const [settings, setSettingsState] = useState<TimerSettings>(loadSettings);
  const [mode, setMode] = useState<TimerMode>("idle");
  const [remaining, setRemaining] = useState(settings.workMinutes * 60);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onCompleteRef = useRef<((mode: TimerMode) => void) | null>(null);

  useEffect(() => {
    const s = loadSettings();
    setSettingsState(s);
    setRemaining(s.workMinutes * 60);
    setSessionsCompleted(loadSessionsToday());
    setLoaded(true);
  }, []);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Tick effect
  useEffect(() => {
    if (mode === "idle") {
      clearTimer();
      return;
    }

    clearTimer();
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearTimer();
          // Timer completed — notify
          if (onCompleteRef.current) onCompleteRef.current(mode);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clearTimer;
  }, [mode, clearTimer]);

  // Update tab title
  useEffect(() => {
    if (mode === "idle") {
      document.title = "Pomodoro Eye Care";
    } else {
      const m = Math.floor(remaining / 60);
      const s = remaining % 60;
      const label = mode === "work" ? "Focus" : "Break";
      document.title = `${m}:${s.toString().padStart(2, "0")} - ${label}`;
    }
  }, [mode, remaining]);

  const setOnComplete = useCallback((fn: (mode: TimerMode) => void) => {
    onCompleteRef.current = fn;
  }, []);

  const startWork = useCallback(() => {
    setMode("work");
    setRemaining(settings.workMinutes * 60);
  }, [settings.workMinutes]);

  const startBreak = useCallback(() => {
    const isLongBreak = (sessionsCompleted + 1) % 4 === 0 && sessionsCompleted > 0;
    const breakMode: TimerMode = isLongBreak ? "longBreak" : "break";
    setMode(breakMode);
    setRemaining(isLongBreak ? settings.longBreakMinutes * 60 : settings.breakMinutes * 60);
  }, [settings.breakMinutes, settings.longBreakMinutes, sessionsCompleted]);

  const completeWorkSession = useCallback(() => {
    const newCount = sessionsCompleted + 1;
    setSessionsCompleted(newCount);
    saveSessionsToday(newCount);
  }, [sessionsCompleted]);

  const stop = useCallback(() => {
    clearTimer();
    setMode("idle");
    setRemaining(settings.workMinutes * 60);
  }, [clearTimer, settings.workMinutes]);

  const skipBreak = useCallback(() => {
    clearTimer();
    setMode("idle");
    setRemaining(settings.workMinutes * 60);
  }, [clearTimer, settings.workMinutes]);

  const updateSettings = useCallback((newSettings: Partial<TimerSettings>) => {
    setSettingsState(prev => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      // If idle, update remaining to reflect new work duration
      if (mode === "idle") {
        setRemaining((newSettings.workMinutes ?? prev.workMinutes) * 60);
      }
      return updated;
    });
  }, [mode]);

  const resetSessions = useCallback(() => {
    setSessionsCompleted(0);
    saveSessionsToday(0);
  }, []);

  return {
    mode,
    remaining,
    sessionsCompleted,
    settings,
    loaded,
    startWork,
    startBreak,
    completeWorkSession,
    stop,
    skipBreak,
    updateSettings,
    resetSessions,
    setOnComplete,
  };
}
