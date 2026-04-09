"use client";

interface SessionTrackerProps {
  sessionsCompleted: number;
  onReset: () => void;
  labels: {
    pomodorosToday: (n: number) => string;
    cycles: (n: number) => string;
    reset: string;
  };
}

export function SessionTracker({ sessionsCompleted, onReset, labels }: SessionTrackerProps) {
  const currentInCycle = sessionsCompleted % 4;
  const totalCycles = Math.floor(sessionsCompleted / 4);

  return (
    <div className="flex items-center gap-3 justify-center">
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
        {labels.pomodorosToday(sessionsCompleted)}
        {totalCycles > 0 && ` ${labels.cycles(totalCycles)}`}
      </span>

      {sessionsCompleted > 0 && (
        <button
          onClick={onReset}
          className="text-xs transition-colors hover:opacity-80"
          style={{ color: "var(--text-faint)" }}
          title={labels.reset}
        >
          {labels.reset}
        </button>
      )}
    </div>
  );
}
