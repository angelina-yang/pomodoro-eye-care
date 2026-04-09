"use client";

import type { TimerMode } from "@/hooks/use-timer";

interface TimerControlsProps {
  mode: TimerMode;
  onStartWork: () => void;
  onStop: () => void;
  onStartBreak: () => void;
  onSkipBreak: () => void;
  labels: { startFocus: string; stop: string; skipBreak: string };
}

export function TimerControls({ mode, onStartWork, onStop, onSkipBreak, labels }: TimerControlsProps) {
  const buttonBase = "px-6 py-3 rounded-xl text-sm font-medium transition-all";

  if (mode === "idle") {
    return (
      <div className="flex gap-3 justify-center">
        <button
          onClick={onStartWork}
          className={`${buttonBase} text-white animate-pulse-ring`}
          style={{ background: "var(--accent)" }}
        >
          {labels.startFocus}
        </button>
      </div>
    );
  }

  if (mode === "work") {
    return (
      <div className="flex gap-3 justify-center">
        <button
          onClick={onStop}
          className={buttonBase}
          style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border-secondary)" }}
        >
          {labels.stop}
        </button>
      </div>
    );
  }

  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={onSkipBreak}
        className={buttonBase}
        style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border-secondary)" }}
      >
        {labels.skipBreak}
      </button>
      <button
        onClick={onStop}
        className={buttonBase}
        style={{ background: "var(--bg-elevated)", color: "var(--text-muted)", border: "1px solid var(--border-primary)" }}
      >
        {labels.stop}
      </button>
    </div>
  );
}
