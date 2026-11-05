"use client";

import { useEffect, useState } from "react";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

function playChime() {
  try {
    // Arpegio tipo 8 bits con WebAudio
    const ACtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new ACtx();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = freq;
      osc.connect(gain);
      gain.connect(ctx.destination);
      const start = ctx.currentTime + i * 0.08;
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.12, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.18);
      osc.start(start);
      osc.stop(start + 0.2);
    });
    // se cierra solo
    setTimeout(() => ctx.close(), 1500);
  } catch {
    /* audio no permitido, se ignora */
  }
}

export function Konami() {
  const [active, setActive] = useState(false);
  const [buffer, setBuffer] = useState<string[]>([]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Escape sale del modo DS
      if (e.key === "Escape" && active) {
        setActive(false);
        return;
      }
      setBuffer((prev) => {
        const next = [...prev, e.key].slice(-SEQUENCE.length);
        if (next.length === SEQUENCE.length) {
          const match = SEQUENCE.every(
            (k, i) => k.toLowerCase() === next[i].toLowerCase(),
          );
          if (match) {
            playChime();
            setActive(true);
            return [];
          }
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => {
    const html = document.documentElement;
    if (active) html.classList.add("konami");
    else html.classList.remove("konami");
    return () => html.classList.remove("konami");
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none">
      {/* Marco de la DS */}
      <div className="absolute inset-0 border-[8px] border-neon-cyan/40 shadow-[inset_0_0_100px_oklch(0.85_0.18_200/0.15)]" />

      {/* Franja superior del HUD */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-2 bg-sumi/70 backdrop-blur border-b border-neon-cyan/40 pointer-events-auto">
        <div className="flex items-center gap-4 font-pixel text-neon-cyan text-lg tracking-widest">
          <span className="animate-pulse">●</span>
          <span>DS MODE</span>
          <span className="text-neon-magenta">落気 SYSTEM</span>
        </div>
        <div className="flex items-center gap-3 font-pixel text-washi text-lg">
          <span>♪</span>
          <span>▮▮▮▮▯</span>
          <span>1994</span>
          <button
            onClick={() => setActive(false)}
            className="ml-3 border border-neon-cyan/60 px-2 py-0.5 text-xs hover:bg-neon-cyan/20 transition"
          >
            EXIT [ESC]
          </button>
        </div>
      </div>

      {/* Franja inferior de info */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-2 bg-sumi/70 backdrop-blur border-t border-neon-cyan/40 font-pixel text-neon-cyan text-lg tracking-widest">
        <span>▲ SOLO NECESITABA IR A JAPÓN ▲</span>
        <span className="hidden md:inline">PRESS ↑↑↓↓←→←→BA · UNLOCKED</span>
        <span>© JOKKI 2026</span>
      </div>

      {/* Líneas de escaneo a pantalla completa */}
      <div className="absolute inset-0 pointer-events-none scanlines" />
    </div>
  );
}
