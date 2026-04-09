"use client";

import type { TimerMode } from "@/hooks/use-timer";

interface TimerDisplayProps {
  remaining: number;
  mode: TimerMode;
}

export function TimerDisplay({ remaining, mode }: TimerDisplayProps) {
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const display = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const statusLabel: Record<TimerMode, string> = {
    idle: "Ready",
    work: "Focusing",
    break: "Short Break",
    longBreak: "Long Break",
  };

  const isBreak = mode === "break" || mode === "longBreak";

  return (
    <div className="text-center">
      <div
        className="text-sm uppercase tracking-[3px] mb-3 font-medium"
        style={{ color: isBreak ? "var(--break-text)" : "var(--text-muted)" }}
      >
        {statusLabel[mode]}
      </div>
      <div
        className="text-[7rem] sm:text-[9rem] font-extralight leading-none tabular-nums"
        style={{ color: "var(--timer-color)" }}
      >
        {display}
      </div>
    </div>
  );
}
