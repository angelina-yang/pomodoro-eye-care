"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export type SoundType = "silence" | "white-noise" | "brown-noise" | "rain" | "ocean";

const SOUND_KEY = "pomodoro-sound";
const VOLUME_KEY = "pomodoro-volume";

function createWhiteNoise(ctx: AudioContext): AudioNode {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.start();
  return source;
}

function createBrownNoise(ctx: AudioContext): AudioNode {
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.02 * white) / 1.02;
    data[i] = lastOut * 3.5;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.start();
  return source;
}

function createRain(ctx: AudioContext): AudioNode {
  const mixer = ctx.createGain();
  mixer.gain.value = 1;

  // Base: filtered white noise for steady rain
  const bufferSize = ctx.sampleRate * 2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.start();

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.value = 3000;
  bandpass.Q.value = 0.5;

  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 800;

  source.connect(bandpass).connect(highpass).connect(mixer);

  // Add some low rumble
  const rumbleBuf = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const rumbleData = rumbleBuf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufferSize; i++) {
    last = (last + 0.01 * (Math.random() * 2 - 1)) / 1.01;
    rumbleData[i] = last * 2;
  }
  const rumble = ctx.createBufferSource();
  rumble.buffer = rumbleBuf;
  rumble.loop = true;
  rumble.start();

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = "lowpass";
  lowpass.frequency.value = 400;

  const rumbleGain = ctx.createGain();
  rumbleGain.gain.value = 0.4;

  rumble.connect(lowpass).connect(rumbleGain).connect(mixer);

  return mixer;
}

function createOcean(ctx: AudioContext): AudioNode {
  const mixer = ctx.createGain();
  mixer.gain.value = 1;

  // Brown noise base
  const bufferSize = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.02 * white) / 1.02;
    data[i] = lastOut * 3.5;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.start();

  // Slow amplitude modulation for wave effect
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.08; // ~8 seconds per wave cycle
  lfo.start();

  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.4;

  const modGain = ctx.createGain();
  modGain.gain.value = 0.6;

  lfo.connect(lfoGain).connect(modGain.gain);
  source.connect(modGain).connect(mixer);

  // Second wave layer slightly offset
  const source2 = ctx.createBufferSource();
  source2.buffer = buffer;
  source2.loop = true;
  source2.start(0, 1.5);

  const lfo2 = ctx.createOscillator();
  lfo2.type = "sine";
  lfo2.frequency.value = 0.05;
  lfo2.start();

  const lfo2Gain = ctx.createGain();
  lfo2Gain.gain.value = 0.3;

  const mod2Gain = ctx.createGain();
  mod2Gain.gain.value = 0.4;

  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 200;

  lfo2.connect(lfo2Gain).connect(mod2Gain.gain);
  source2.connect(highpass).connect(mod2Gain).connect(mixer);

  return mixer;
}

export function useAmbient() {
  const [sound, setSoundState] = useState<SoundType>("silence");
  const [volume, setVolumeState] = useState(0.5);
  const [playing, setPlaying] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Load saved preferences
  useEffect(() => {
    const savedSound = localStorage.getItem(SOUND_KEY) as SoundType | null;
    const savedVolume = localStorage.getItem(VOLUME_KEY);
    if (savedSound) setSoundState(savedSound);
    if (savedVolume) setVolumeState(parseFloat(savedVolume));
  }, []);

  const stopSound = useCallback(() => {
    if (sourceRef.current) {
      try { sourceRef.current.disconnect(); } catch { /* ignore */ }
      sourceRef.current = null;
    }
    if (ctxRef.current && ctxRef.current.state !== "closed") {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
    gainRef.current = null;
    setPlaying(false);
  }, []);

  const playSound = useCallback((type: SoundType, vol: number) => {
    stopSound();
    if (type === "silence") return;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const gain = ctx.createGain();
    gain.gain.value = vol;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    let source: AudioNode;
    switch (type) {
      case "white-noise": source = createWhiteNoise(ctx); break;
      case "brown-noise": source = createBrownNoise(ctx); break;
      case "rain": source = createRain(ctx); break;
      case "ocean": source = createOcean(ctx); break;
      default: return;
    }

    source.connect(gain);
    sourceRef.current = source;
    setPlaying(true);
  }, [stopSound]);

  const setSound = useCallback((type: SoundType) => {
    setSoundState(type);
    localStorage.setItem(SOUND_KEY, type);
    if (playing || type !== "silence") {
      playSound(type, volume);
    }
  }, [playing, volume, playSound]);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    localStorage.setItem(VOLUME_KEY, v.toString());
    if (gainRef.current) {
      gainRef.current.gain.value = v;
    }
  }, []);

  const pause = useCallback(() => {
    if (ctxRef.current && ctxRef.current.state === "running") {
      ctxRef.current.suspend();
      setPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (ctxRef.current && ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
      setPlaying(true);
    } else if (sound !== "silence" && !ctxRef.current) {
      playSound(sound, volume);
    }
  }, [sound, volume, playSound]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sourceRef.current) {
        try { sourceRef.current.disconnect(); } catch { /* ignore */ }
      }
      if (ctxRef.current && ctxRef.current.state !== "closed") {
        ctxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return { sound, volume, playing, setSound, setVolume, pause, resume, stopSound, playSound };
}
