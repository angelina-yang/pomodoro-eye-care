"use client";

interface SessionTrackerProps {
  sessionsCompleted: number;
  onReset: () => void;
}

export function SessionTracker({ sessionsCompleted, onReset }: SessionTrackerProps) {
  const currentInCycle = sessionsCompleted % 4;
  const totalCycles = Math.floor(sessionsCompleted / 4);

  return (
    <div className="flex items-center gap-3 justify-center">
      {/* 4 dots for current cycle */}
      <div className="flex gap-2">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className="w-3 h-3 rounded-full transition-colors"
            style={{
              background: i < currentInCycle
                ? "var(--dot-done)"
                : i === currentInCycle && sessionsCompleted > 0 && currentInCycle > 0
                  ? "var(--dot-active)"
                  : "var(--dot-pending)",
            }}
          />
        ))}
      </div>

      <span className="text-xs" style={{ color: "var(--text-muted)" }}>
        {sessionsCompleted} pomodoro{sessionsCompleted !== 1 ? "s" : ""} today
        {totalCycles > 0 && ` (${totalCycles} cycle${totalCycles !== 1 ? "s" : ""})`}
      </span>

      {sessionsCompleted > 0 && (
        <button
          onClick={onReset}
          className="text-xs transition-colors hover:opacity-80"
          style={{ color: "var(--text-faint)" }}
          title="Reset session count"
        >
          Reset
        </button>
      )}
    </div>
  );
}
