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
import { useTimer } from "@/hooks/use-timer";
import { useTheme } from "@/hooks/use-theme";
import { useUser } from "@/hooks/use-user";
import { useAmbient } from "@/hooks/use-ambient";
import type { TimerMode } from "@/hooks/use-timer";

export default function Home() {
  const theme = useTheme();
  const user = useUser();
  const timer = useTimer();
  const ambient = useAmbient();

  const [showBreakOverlay, setShowBreakOverlay] = useState(false);
  const [breakIsLong, setBreakIsLong] = useState(false);

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
      // Work session ended — show break overlay
      timer.completeWorkSession();
      const isLong = (timer.sessionsCompleted + 1) % 4 === 0;
      setBreakIsLong(isLong);
      setShowBreakOverlay(true);
      ambient.pause();
    } else {
      // Break ended — notify and go to idle
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Pomodoro Eye Care", { body: "Break is over! Ready to focus?" });
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
  }, [timer, ambient]);

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
  if (!theme.loaded || !user.loaded || !timer.loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)" }}>
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "var(--accent)", borderTopColor: "transparent" }} />
      </div>
    );
  }

  const isRunning = timer.mode !== "idle";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-primary)" }}>
      <Header
        isDark={theme.isDark}
        onToggleTheme={theme.toggleTheme}
      />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-8">
        {/* Timer */}
        <TimerDisplay remaining={timer.remaining} mode={timer.mode} />

        {/* Session tracker */}
        <SessionTracker
          sessionsCompleted={timer.sessionsCompleted}
          onReset={timer.resetSessions}
        />

        {/* Controls */}
        <TimerControls
          mode={timer.mode}
          onStartWork={handleStartWork}
          onStop={handleStop}
          onStartBreak={handleStartBreak}
          onSkipBreak={timer.skipBreak}
        />

        {/* Duration picker — only when idle */}
        <div className="mt-4" style={{ opacity: isRunning ? 0.4 : 1, pointerEvents: isRunning ? "none" : "auto" }}>
          <DurationPicker
            workMinutes={timer.settings.workMinutes}
            breakMinutes={timer.settings.breakMinutes}
            longBreakMinutes={timer.settings.longBreakMinutes}
            onChangeWork={m => timer.updateSettings({ workMinutes: m })}
            onChangeBreak={m => timer.updateSettings({ breakMinutes: m })}
            onChangeLongBreak={m => timer.updateSettings({ longBreakMinutes: m })}
            disabled={isRunning}
          />
        </div>

        {/* Ambient sounds */}
        <div className="mt-2">
          <AmbientSounds
            sound={ambient.sound}
            volume={ambient.volume}
            onSoundChange={ambient.setSound}
            onVolumeChange={ambient.setVolume}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs" style={{ color: "var(--text-faint)" }}>
        A free tool by{" "}
        <a href="https://twosetai.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>
          TwoSetAI
        </a>
      </footer>

      {/* Break overlay */}
      <BreakOverlay
        visible={showBreakOverlay}
        isLongBreak={breakIsLong}
        onStartBreak={handleStartBreak}
        onSkipBreak={handleSkipBreak}
      />

      {/* Welcome modal */}
      <WelcomeModal
        isOpen={!user.isRegistered}
        onComplete={handleRegister}
      />
    </div>
  );
}
