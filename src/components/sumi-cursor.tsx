"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number; life: number; width: number };

export function SumiCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const lastRef = useRef<{ x: number; y: number; t: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Solo con puntero fino (ratón); en táctil, nada.
    if (typeof window === "undefined") return;
    const canFine = window.matchMedia("(pointer: fine)").matches;
    if (!canFine) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const prev = lastRef.current;
      let speed = 0;
      if (prev) {
        const dt = Math.max(now - prev.t, 1);
        const dx = e.clientX - prev.x;
        const dy = e.clientY - prev.y;
        speed = Math.sqrt(dx * dx + dy * dy) / dt;
      }
      // Más rápido = más fino (como un pincel que se levanta)
      const width = Math.max(
        1.4,
        Math.min(10, 10 - speed * 4),
      );
      pointsRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        width,
      });
      // Longitud máxima, para no comer memoria en sesiones largas
      if (pointsRef.current.length > 220) {
        pointsRef.current.splice(0, pointsRef.current.length - 220);
      }
      lastRef.current = { x: e.clientX, y: e.clientY, t: now };
    };

    const onLeave = () => {
      lastRef.current = null;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    const tick = () => {
      const points = pointsRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Estela de tinta como trazos suaves encadenados
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 1; i < points.length; i++) {
        const p = points[i];
        const prev = points[i - 1];
        const life = Math.min(p.life, prev.life);
        if (life <= 0) continue;

        // Filtro por longitud: los saltos enormes se ignoran (el cursor se teletransporta)
        const dx = p.x - prev.x;
        const dy = p.y - prev.y;
        if (dx * dx + dy * dy > 5000) continue;

        // Halo exterior de tinta
        ctx.strokeStyle = `oklch(0.94 0.03 80 / ${0.05 * life})`;
        ctx.lineWidth = p.width * 3.5;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Halo intermedio con tono bermellón
        ctx.strokeStyle = `oklch(0.55 0.22 27 / ${0.12 * life})`;
        ctx.lineWidth = p.width * 1.8;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Trazo central (blanco washi sobre fondo oscuro)
        ctx.strokeStyle = `oklch(0.96 0.015 85 / ${0.9 * life})`;
        ctx.lineWidth = p.width;
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      // Envejecer puntos
      for (const p of points) {
        p.life -= 0.024;
      }
      // Quitar los muertos
      while (points.length && points[0].life <= 0) points.shift();

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] mix-blend-screen"
    />
  );
}
