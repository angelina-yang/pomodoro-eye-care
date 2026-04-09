"use client";

import type { SoundType } from "@/hooks/use-ambient";

interface AmbientSoundsProps {
  sound: SoundType;
  volume: number;
  onSoundChange: (s: SoundType) => void;
  onVolumeChange: (v: number) => void;
}

const SOUNDS: { type: SoundType; label: string; icon: string }[] = [
  { type: "silence", label: "Off", icon: "🔇" },
  { type: "white-noise", label: "White", icon: "〰️" },
  { type: "brown-noise", label: "Brown", icon: "🟤" },
  { type: "rain", label: "Rain", icon: "🌧️" },
  { type: "ocean", label: "Ocean", icon: "🌊" },
];

export function AmbientSounds({ sound, volume, onSoundChange, onVolumeChange }: AmbientSoundsProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
        Ambient Sound
      </span>
      <div className="flex gap-2">
        {SOUNDS.map(s => (
          <button
            key={s.type}
            onClick={() => onSoundChange(s.type)}
            className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs transition-all"
            style={{
              background: sound === s.type ? "var(--accent-surface)" : "transparent",
              border: sound === s.type ? "1px solid var(--accent)" : "1px solid transparent",
              color: sound === s.type ? "var(--accent)" : "var(--text-muted)",
            }}
            title={s.label}
          >
            <span className="text-base">{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {sound !== "silence" && (
        <div className="flex items-center gap-3 w-48">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-faint)", flexShrink: 0 }}>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={e => onVolumeChange(parseFloat(e.target.value))}
            className="w-full"
          />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-faint)", flexShrink: 0 }}>
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        </div>
      )}
    </div>
  );
}
