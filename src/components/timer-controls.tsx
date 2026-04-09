"use client";

import type { TimerMode } from "@/hooks/use-timer";

interface TimerControlsProps {
  mode: TimerMode;
  onStartWork: () => void;
  onStop: () => void;
  onStartBreak: () => void;
  onSkipBreak: () => void;
}

export function TimerControls({ mode, onStartWork, onStop, onStartBreak, onSkipBreak }: TimerControlsProps) {
  const buttonBase = "px-6 py-3 rounded-xl text-sm font-medium transition-all";

  if (mode === "idle") {
    return (
      <div className="flex gap-3 justify-center">
        <button
          onClick={onStartWork}
          className={`${buttonBase} text-white animate-pulse-ring`}
          style={{ background: "var(--accent)" }}
        >
          Start Focus
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
          Stop
        </button>
      </div>
    );
  }

  // break or longBreak mode — timer is running
  return (
    <div className="flex gap-3 justify-center">
      <button
        onClick={onSkipBreak}
        className={buttonBase}
        style={{ background: "var(--bg-elevated)", color: "var(--text-secondary)", border: "1px solid var(--border-secondary)" }}
      >
        Skip Break
      </button>
      <button
        onClick={onStop}
        className={buttonBase}
        style={{ background: "var(--bg-elevated)", color: "var(--text-muted)", border: "1px solid var(--border-primary)" }}
      >
        Stop
      </button>
    </div>
  );
}
