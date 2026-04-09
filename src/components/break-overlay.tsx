"use client";

import { useEffect, useRef, useState } from "react";

interface BreakOverlayProps {
  visible: boolean;
  isLongBreak: boolean;
  onStartBreak: () => void;
  onSkipBreak: () => void;
}

const EYE_TIPS = [
  { title: "20-20-20 Rule", text: "Look at something 20 feet away for 20 seconds." },
  { title: "Deep Breathing", text: "Close your eyes and take 5 slow, deep breaths." },
  { title: "Eye Rolls", text: "Roll your eyes in circles — clockwise, then counter-clockwise." },
  { title: "Rapid Blinks", text: "Blink rapidly 10 times to re-moisten your eyes." },
  { title: "Palm Cupping", text: "Cup your warm palms over your closed eyes for 15 seconds." },
  { title: "Distance Focus", text: "Focus on the farthest object you can see for 10 seconds." },
  { title: "Stretch Break", text: "Stand up, stretch your arms overhead, and roll your shoulders." },
  { title: "Hydrate", text: "Drink some water. Your eyes and body will thank you." },
];

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

function sendNotification(isLongBreak: boolean) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Pomodoro Eye Care", {
      body: isLongBreak
        ? "Great work! Time for a long break. Rest your eyes."
        : "Time for an eye break! Look away from the screen.",
    });
  }
}

export function BreakOverlay({ visible, isLongBreak, onStartBreak, onSkipBreak }: BreakOverlayProps) {
  const [tipIndex, setTipIndex] = useState(0);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    if (visible) {
      setTipIndex(Math.floor(Math.random() * EYE_TIPS.length));
      if (!hasPlayedRef.current) {
        playAlarm();
        sendNotification(isLongBreak);
        hasPlayedRef.current = true;
      }
    } else {
      hasPlayedRef.current = false;
    }
  }, [visible, isLongBreak]);

  if (!visible) return null;

  const tip = EYE_TIPS[tipIndex];

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center animate-fade-in"
      style={{ background: "#000000" }}
    >
      <div className="text-center max-w-md mx-4">
        {/* Eye icon */}
        <div className="mb-6">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--break-text)", margin: "0 auto" }}>
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>

        <h2 className="text-3xl font-bold mb-2" style={{ color: "#f4f4f5" }}>
          {isLongBreak ? "Long Break Time!" : "Time for an Eye Break!"}
        </h2>

        <p className="text-lg mb-8" style={{ color: "rgba(244,244,245,0.6)" }}>
          {isLongBreak
            ? "You completed 4 pomodoros. Take a longer rest."
            : "Step away from the screen."}
        </p>

        {/* Tip card */}
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

        <div className="flex gap-3 justify-center">
          <button
            onClick={onStartBreak}
            className="px-6 py-3 rounded-xl text-sm font-medium text-white transition-all"
            style={{ background: "var(--accent)" }}
          >
            Start {isLongBreak ? "Long " : ""}Break
          </button>
          <button
            onClick={onSkipBreak}
            className="px-6 py-3 rounded-xl text-sm font-medium transition-all"
            style={{ background: "rgba(255,255,255,0.08)", color: "rgba(244,244,245,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Skip, Keep Working
          </button>
        </div>
      </div>
    </div>
  );
}
