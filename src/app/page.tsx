"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { Header } from "@/components/header";
import { TimerDisplay } from "@/components/timer-display";
import { TimerControls } from "@/components/timer-controls";
import { SessionTracker } from "@/components/session-tracker";
import { DurationPicker } from "@/components/duration-picker";
import { AmbientSounds } from "@/components/ambient-sounds";
import { BreakOverlay } from "@/components/break-overlay";
import { WelcomeModal } from "@/components/welcome-modal";
import { SupportLinks } from "@/components/support-links";
import { useTimer } from "@/hooks/use-timer";
import { useTheme } from "@/hooks/use-theme";
import { useUser } from "@/hooks/use-user";
import { useAmbient } from "@/hooks/use-ambient";
import { useLanguage } from "@/hooks/use-language";
import { getTranslations } from "@/lib/i18n";
import type { TimerMode } from "@/hooks/use-timer";

export default function Home() {
  const theme = useTheme();
  const user = useUser();
  const timer = useTimer();
  const ambient = useAmbient();
  const lang = useLanguage();

  const t = getTranslations(lang.language);

  const [showBreakOverlay, setShowBreakOverlay] = useState(false);
  const [breakIsLong, setBreakIsLong] = useState(false);
  const [currentTip, setCurrentTip] = useState<{ title: string; text: string } | null>(null);

  // Request notification permission on first interaction
  const hasRequestedNotif = useRef(false);
  const requestNotifPermission = useCallback(() => {
    if (!hasRequestedNotif.current && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
      hasRequestedNotif.current = true;
    }
  }, []);

  // Handle timer completion
  const handleTimerComplete = useCallback((completedMode: TimerMode) => {
    if (completedMode === "work") {
      timer.completeWorkSession();
      const isLong = (timer.sessionsCompleted + 1) % 4 === 0;
      setBreakIsLong(isLong);
      setCurrentTip(t.eyeTips[Math.floor(Math.random() * t.eyeTips.length)]);
      setShowBreakOverlay(true);
      ambient.pause();
    } else {
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(t.appName, { body: t.breakOverNotify });
      }
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = 660;
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      } catch { /* ignore */ }
      timer.stop();
    }
  }, [timer, ambient, t]);

  useEffect(() => {
    timer.setOnComplete(handleTimerComplete);
  }, [timer, handleTimerComplete]);

  // Manage ambient sound based on timer mode
  useEffect(() => {
    if (timer.mode === "work" && ambient.sound !== "silence") {
      ambient.resume();
    } else if (timer.mode === "idle") {
      ambient.pause();
    }
  }, [timer.mode]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStartWork = useCallback(() => {
    requestNotifPermission();
    setShowBreakOverlay(false);
    setCurrentTip(null);
    timer.startWork();
    if (ambient.sound !== "silence") {
      ambient.playSound(ambient.sound, ambient.volume);
    }
  }, [requestNotifPermission, timer, ambient]);

  const handleStartBreak = useCallback(() => {
    setShowBreakOverlay(false);
    timer.startBreak();
  }, [timer]);

  const handleSkipBreak = useCallback(() => {
    setShowBreakOverlay(false);
    handleStartWork();
  }, [handleStartWork]);

  const handleStop = useCallback(() => {
    setShowBreakOverlay(false);
    timer.stop();
    ambient.stopSound();
  }, [timer, ambient]);

  const handleRegister = useCallback((name: string, email: string) => {
    user.register(name, email);
  }, [user]);

  // Don't render until localStorage is loaded
  if (!theme.loaded || !user.loaded || !timer.loaded || !lang.loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  const isRunning = timer.mode !== "idle";

  const statusLabels: Record<TimerMode, string> = {
    idle: t.ready,
    work: t.focusing,
    break: t.shortBreak,
    longBreak: t.longBreak,
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
      <Header
        isDark={theme.isDark}
        onToggleTheme={theme.toggleTheme}
        appName={t.appName}
        appTagline={t.appTagline}
        switchThemeTitle={theme.isDark ? t.switchToLight : t.switchToDark}
        buyMeACoffeeTitle={t.buyMeACoffee}
        language={lang.language}
        onLanguageChange={lang.setLanguage}
        languageLabel={t.language}
      />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-8">
        <TimerDisplay
          remaining={timer.remaining}
          mode={timer.mode}
          eyeTip={currentTip}
          statusLabels={statusLabels}
        />

        <SessionTracker
          sessionsCompleted={timer.sessionsCompleted}
          onReset={timer.resetSessions}
          labels={{
            pomodorosToday: t.pomodorosToday,
            cycles: t.cycles,
            reset: t.reset,
          }}
        />

        <TimerControls
          mode={timer.mode}
          onStartWork={handleStartWork}
          onStop={handleStop}
          onStartBreak={handleStartBreak}
          onSkipBreak={handleSkipBreak}
          labels={{
            startFocus: t.startFocus,
            stop: t.stop,
            skipBreak: t.skipBreak,
          }}
        />

        <div className="mt-4" style={{ opacity: isRunning ? 0.4 : 1, pointerEvents: isRunning ? "none" : "auto" }}>
          <DurationPicker
            workMinutes={timer.settings.workMinutes}
            breakMinutes={timer.settings.breakMinutes}
            longBreakMinutes={timer.settings.longBreakMinutes}
            onChangeWork={m => timer.updateSettings({ workMinutes: m })}
            onChangeBreak={m => timer.updateSettings({ breakMinutes: m })}
            onChangeLongBreak={m => timer.updateSettings({ longBreakMinutes: m })}
            disabled={isRunning}
            labels={{
              focus: t.focus,
              breakLabel: t.breakLabel,
              longBreakLabel: t.longBreakLabel,
            }}
          />
        </div>

        <div className="mt-2">
          <AmbientSounds
            sound={ambient.sound}
            volume={ambient.volume}
            onSoundChange={ambient.setSound}
            onVolumeChange={ambient.setVolume}
            labels={{
              ambientSound: t.ambientSound,
              off: t.off,
              white: t.white,
              brown: t.brown,
              rain: t.rain,
              ocean: t.ocean,
            }}
          />
        </div>

        <a
          href="https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:scale-105"
          style={{
            background: "var(--pill-bg)",
            color: "var(--text-secondary)",
            border: "1px solid var(--border-secondary)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: "#1DB954" }}>
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          {t.openSpotify}
        </a>
      </main>

      <footer className="flex flex-col items-center gap-2 py-4 text-xs" style={{ color: "var(--text-faint)" }}>
        <div>
          {t.freeToolBy}{" "}
          <a href="https://twosetai.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
            TwoSetAI
          </a>
        </div>
        <SupportLinks appName="Pomodoro Eye Care" />
      </footer>

      <BreakOverlay
        visible={showBreakOverlay}
        isLongBreak={breakIsLong}
        onStartBreak={handleStartBreak}
        onSkipBreak={handleSkipBreak}
        tip={currentTip}
        labels={{
          timeForEyeBreak: t.timeForEyeBreak,
          longBreakTime: t.longBreakTime,
          stepAway: t.stepAway,
          completed4: t.completed4,
          startBreakBtn: t.startBreakBtn,
          startLongBreakBtn: t.startLongBreakBtn,
          skipKeepWorking: t.skipKeepWorking,
        }}
      />

      <WelcomeModal
        isOpen={!user.isRegistered}
        onComplete={handleRegister}
        labels={{
          welcomeTitle: t.welcomeTitle,
          welcomeDesc: t.welcomeDesc,
          name: t.name,
          yourName: t.yourName,
          email: t.email,
          emailPlaceholder: t.emailPlaceholder,
          newsletterText: t.newsletterText,
          getStarted: t.getStarted,
          settingUp: t.settingUp,
        }}
      />
    </div>
  );
}
