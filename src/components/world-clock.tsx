"use client";

import { useState, useMemo } from "react";
import { CITIES, getCity, formatCityTime } from "@/lib/timezones";

interface WorldClockProps {
  cityIds: string[];
  now: Date;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  labels: {
    worldClock: string;
    addCity: string;
    searchCities: string;
    done: string;
  };
}

export function WorldClock({ cityIds, now, onAdd, onRemove, labels }: WorldClockProps) {
  const [editing, setEditing] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CITIES;
    return CITIES.filter(c => c.label.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="w-full max-w-xl">
      <div className="flex items-center justify-between mb-3 px-1">
        <span
          className="text-xs uppercase tracking-widest font-medium"
          style={{ color: "var(--text-muted)" }}
        >
          {labels.worldClock}
        </span>
        <button
          onClick={() => setEditing(v => !v)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
          style={{
            background: editing ? "var(--accent)" : "var(--accent-surface)",
            color: editing ? "white" : "var(--accent)",
            border: "1px solid var(--accent)",
          }}
        >
          {editing ? labels.done : `+ ${labels.addCity}`}
        </button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {cityIds.map(id => {
          const city = getCity(id);
          if (!city) return null;
          return (
            <div
              key={id}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
              style={{
                background: "var(--pill-bg)",
                border: "1px solid var(--border-secondary)",
                color: "var(--text-secondary)",
              }}
            >
              <span style={{ color: "var(--text-muted)" }}>{city.label}</span>
              <span className="tabular-nums font-medium" style={{ color: "var(--text-primary)" }}>
                {formatCityTime(city.timezone, now)}
              </span>
              {editing && (
                <button
                  onClick={() => onRemove(id)}
                  className="ml-1 opacity-60 hover:opacity-100"
                  aria-label={`Remove ${city.label}`}
                  style={{ color: "var(--text-muted)" }}
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
      </div>

      {editing && (
        <div
          className="mt-3 rounded-xl p-3"
          style={{ background: "var(--pill-bg)", border: "1px solid var(--border-secondary)" }}
        >
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={labels.searchCities}
            className="w-full px-3 py-2 rounded-lg text-sm mb-2 outline-none"
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border-secondary)",
              color: "var(--text-primary)",
            }}
          />
          <div className="max-h-40 overflow-y-auto flex flex-wrap gap-1.5">
            {filtered.map(c => {
              const active = cityIds.includes(c.id);
              return (
                <button
                  key={c.id}
                  onClick={() => (active ? onRemove(c.id) : onAdd(c.id))}
                  className="px-2.5 py-1 rounded-md text-xs transition-all"
                  style={{
                    background: active ? "var(--accent-surface)" : "transparent",
                    color: active ? "var(--accent)" : "var(--text-secondary)",
                    border: active ? "1px solid var(--accent)" : "1px solid var(--border-secondary)",
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
