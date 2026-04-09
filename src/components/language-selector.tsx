"use client";

import { useState } from "react";
import { LANGUAGES, type Language } from "@/lib/i18n";

interface LanguageSelectorProps {
  language: Language;
  onChange: (lang: Language) => void;
  label: string;
}

export function LanguageSelector({ language, onChange, label }: LanguageSelectorProps) {
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs transition-colors"
        style={{ color: "var(--text-muted)", border: "1px solid var(--border-primary)" }}
        title={label}
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-[99]" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-full mt-1 z-[100] rounded-lg py-1 min-w-[140px] animate-fade-in"
            style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-secondary)", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
          >
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => { onChange(lang.code); setOpen(false); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors"
                style={{
                  color: language === lang.code ? "var(--accent)" : "var(--text-secondary)",
                  background: language === lang.code ? "var(--accent-surface)" : "transparent",
                }}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
