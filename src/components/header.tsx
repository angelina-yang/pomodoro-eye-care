"use client";

import { LanguageSelector } from "@/components/language-selector";
import type { Language } from "@/lib/i18n";

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  appName: string;
  appTagline: string;
  switchThemeTitle: string;
  buyMeACoffeeTitle: string;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  languageLabel: string;
}

export function Header({
  isDark, onToggleTheme, appName, appTagline,
  switchThemeTitle, buyMeACoffeeTitle,
  language, onLanguageChange, languageLabel,
}: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between px-4 py-3 md:py-4"
      style={{
        borderBottom: `1px solid var(--border-primary)`,
        background: `var(--bg-primary)`,
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "var(--accent)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            {appName}
          </h1>
          <p className="text-xs hidden sm:block" style={{ color: "var(--text-muted)" }}>
            {appTagline}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <LanguageSelector language={language} onChange={onLanguageChange} label={languageLabel} />

        <button
          onClick={onToggleTheme}
          className="p-1.5 rounded-lg transition-colors"
          style={{ color: "var(--text-muted)" }}
          title={switchThemeTitle}
        >
          {isDark ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>

        <a
          href="https://buymeacoffee.com/angelinayang"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm transition-colors hover:text-yellow-400"
          style={{ color: "var(--text-muted)" }}
          title={buyMeACoffeeTitle}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 21h18v-2H2v2zM20 8h-2V5h2v3zm0-5H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm-4 10c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2V5h10v8zm4-5h-2V5h2v3z" />
          </svg>
        </a>

        <a
          href="https://twosetai.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium px-2 py-1 rounded transition-colors hidden sm:block"
          style={{ color: "var(--text-muted)", border: "1px solid var(--border-primary)" }}
        >
          TwoSetAI
        </a>
      </div>
    </header>
  );
}
