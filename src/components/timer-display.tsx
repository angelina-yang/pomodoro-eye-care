"use client";

import type { TimerMode } from "@/hooks/use-timer";

interface TimerDisplayProps {
  remaining: number;
  mode: TimerMode;
  eyeTip?: { title: string; text: string } | null;
}

export function TimerDisplay({ remaining, mode, eyeTip }: TimerDisplayProps) {
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
      {isBreak && eyeTip && (
        <div
          className="mt-6 mx-auto max-w-sm rounded-xl p-4 text-left"
          style={{ background: "var(--accent-surface)", border: "1px solid var(--accent)" }}
        >
          <div className="text-xs uppercase tracking-wider mb-1 font-medium" style={{ color: "var(--accent)" }}>
            {eyeTip.title}
          </div>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {eyeTip.text}
          </div>
        </div>
      )}
    </div>
  );
}
