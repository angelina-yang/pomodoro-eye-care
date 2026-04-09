"use client";

import { useEffect, useRef } from "react";

interface BreakOverlayProps {
  visible: boolean;
  isLongBreak: boolean;
  onStartBreak: () => void;
  onSkipBreak: () => void;
  tip?: { title: string; text: string } | null;
  labels: {
    timeForEyeBreak: string;
    longBreakTime: string;
    stepAway: string;
    completed4: string;
    startBreakBtn: string;
    startLongBreakBtn: string;
    skipKeepWorking: string;
  };
}

function playAlarm() {
  try {
    const ctx = new AudioContext();
    const notes = [880, 880, 880, 1047, 880];
    notes.forEach((freq, i) => {
      const delay = i * 0.35;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.35, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.25);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.3);
    });
  } catch { /* ignore */ }
}

function sendNotification(title: string, body: string) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body });
  }
}

export function BreakOverlay({ visible, isLongBreak, onStartBreak, onSkipBreak, tip, labels }: BreakOverlayProps) {
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (visible) {
      if (!hasPlayedRef.current) {
        playAlarm();
        sendNotification(
          isLongBreak ? labels.longBreakTime : labels.timeForEyeBreak,
          isLongBreak ? labels.completed4 : labels.stepAway
        );
        hasPlayedRef.current = true;
      }
    } else {
      hasPlayedRef.current = false;
    }
  }, [visible, isLongBreak, labels]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center animate-fade-in"
      style={{ background: "#000000" }}
    >
      <div className="text-center max-w-md mx-4">
        <div className="mb-6">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--break-text)", margin: "0 auto" }}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold mb-2" style={{ color: "#f4f4f5" }}>
          {isLongBreak ? labels.longBreakTime : labels.timeForEyeBreak}
        </h2>

        <p className="text-lg mb-8" style={{ color: "rgba(244,244,245,0.6)" }}>
          {isLongBreak ? labels.completed4 : labels.stepAway}
        </p>

        {tip && (
          <div
            className="rounded-xl p-5 mb-8 text-left"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="text-xs uppercase tracking-wider mb-2" style={{ color: "var(--break-text)" }}>
              {tip.title}
            </div>
            <div className="text-base" style={{ color: "rgba(244,244,245,0.8)" }}>
              {tip.text}
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={onStartBreak}
            className="px-6 py-3 rounded-xl text-sm font-medium text-white transition-all"
            style={{ background: "var(--accent)" }}
          >
            {isLongBreak ? labels.startLongBreakBtn : labels.startBreakBtn}
          </button>
          <button
            onClick={onSkipBreak}
            className="px-6 py-3 rounded-xl text-sm font-medium transition-all"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(244,244,245,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {labels.skipKeepWorking}
          </button>
        </div>
      </div>
    </div>
  );
}
