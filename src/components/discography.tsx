"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ALBUMS } from "@/lib/jokki-data";
import { normalizeTrackName, type PreviewMap } from "@/lib/spotify-shared";
import { cn } from "@/lib/utils";

export function Discography({
  topTracksSlot,
  previews,
}: {
  topTracksSlot?: React.ReactNode;
  previews?: PreviewMap;
}) {
  const [active, setActive] = useState<string>(ALBUMS[0].id);
  const activeAlbum = ALBUMS.find((a) => a.id === active) ?? ALBUMS[0];
  const stripRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const [progress, setProgress] = useState(0);

  // Audio de las previews
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  const activePreviewByTrack = useMemo(() => {
    if (!previews) return null;
    const id = activeAlbum.spotifyAlbumId;
    return id ? (previews[id] ?? null) : null;
  }, [previews, activeAlbum]);

  // Para el audio al cambiar de álbum
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setPlayingKey(null);
  }, [active]);

  const togglePreview = (trackKey: string, previewUrl: string | null) => {
    if (!previewUrl) return;
    const audio = audioRef.current;
    if (!audio) return;
    if (playingKey === trackKey) {
      audio.pause();
      setPlayingKey(null);
      return;
    }
    audio.src = previewUrl;
    audio.currentTime = 0;
    audio.volume = 0.75;
    audio.play().then(() => setPlayingKey(trackKey)).catch(() => setPlayingKey(null));
  };

  // Progreso, si se puede hacer scroll y arrastrar para desplazar (también sobre botones)
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;

    const updateState = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth) return;
      if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };

    // Arrastrar para hacer scroll, distinguiendo clic de arrastre (también sobre botones)
    let isDown = false;
    let didDrag = false;
    let startX = 0;
    let startY = 0;
    let startScroll = 0;
    const DRAG_THRESHOLD = 6;

    const onDown = (e: MouseEvent) => {
      isDown = true;
      didDrag = false;
      startX = e.pageX;
      startY = e.pageY;
      startScroll = el.scrollLeft;
    };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      const dx = e.pageX - startX;
      const dy = e.pageY - startY;
      if (!didDrag && Math.abs(dx) > DRAG_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        didDrag = true;
        el.style.cursor = "grabbing";
        el.style.userSelect = "none";
      }
      if (didDrag) {
        el.scrollLeft = startScroll - dx;
      }
    };
    const onUp = () => {
      if (didDrag) {
        // Se come el clic que llega tras un arrastre, para no "pulsar" la tarjeta
        const swallow = (e: MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          window.removeEventListener("click", swallow, true);
        };
        window.addEventListener("click", swallow, true);
      }
      isDown = false;
      didDrag = false;
      el.style.cursor = "";
      el.style.userSelect = "";
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("scroll", updateState, { passive: true });
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("resize", updateState);
    updateState();

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("scroll", updateState);
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", updateState);
    };
  }, []);

  // Lleva a la vista la tarjeta activa
  useEffect(() => {
    const el = stripRef.current;
    const card = cardRefs.current.get(active);
    if (!el || !card) return;
    const cardLeft = card.offsetLeft;
    const cardCenter = cardLeft + card.offsetWidth / 2;
    const target = cardCenter - el.clientWidth / 2;
    el.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

  const goPrev = () => {
    const idx = ALBUMS.findIndex((a) => a.id === active);
    if (idx > 0) setActive(ALBUMS[idx - 1].id);
  };
  const goNext = () => {
    const idx = ALBUMS.findIndex((a) => a.id === active);
    if (idx < ALBUMS.length - 1) setActive(ALBUMS[idx + 1].id);
  };

  const registerCard = (id: string) => (node: HTMLButtonElement | null) => {
    if (node) cardRefs.current.set(id, node);
    else cardRefs.current.delete(id);
  };

  const activeIdx = ALBUMS.findIndex((a) => a.id === active);

  return (
    <section
      id="music"
      className="relative py-16 md:py-32 border-t border-border overflow-hidden"
    >
      <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 pointer-events-none select-none">
        <span className="font-heading font-black text-[160px] md:text-[420px] leading-none text-bermellon/[0.05]">
          音
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        {/* Cabecera de la sección */}
        <div className="flex items-end justify-between mb-10 border-b border-border/60 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-px bg-bermellon" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-bermellon">
                Section 02
              </span>
            </div>
            <h2 className="font-heading font-black text-3xl md:text-6xl text-washi flex items-baseline gap-4">
              <span>音楽</span>
              <span className="text-xl md:text-2xl text-washi/50 font-normal tracking-widest">
                / DISCOGRAPHY
              </span>
            </h2>
          </div>
          <div className="hidden md:flex flex-col items-end font-mono text-[10px] text-muted-foreground tracking-widest uppercase gap-1">
            <span>読み方 → RIGHT TO LEFT</span>
            <span className="text-bermellon">3 巻 · 2024 — 2026</span>
          </div>
        </div>

        {/* Pista de la tira manga y navegación */}
        <div className="flex items-center justify-between mb-4 gap-4">
          <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground">
            <span className="text-bermellon">▸</span>
            CLICK · DRAG · SWIPE
          </span>
          <span className="flex items-center gap-3 font-mono text-[10px] tracking-widest text-muted-foreground">
            <span>
              <span className="text-washi">{String(activeIdx + 1).padStart(2, "0")}</span>
              <span className="opacity-40"> / 0{ALBUMS.length}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <button
                onClick={goPrev}
                aria-label="Álbum anterior"
                disabled={activeIdx <= 0}
                className="w-9 h-9 flex items-center justify-center border border-washi/40 hover:border-bermellon hover:bg-bermellon hover:text-washi text-washi disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-washi transition-colors"
              >
                ←
              </button>
              <button
                onClick={goNext}
                aria-label="Álbum siguiente"
                disabled={activeIdx >= ALBUMS.length - 1}
                className="w-9 h-9 flex items-center justify-center border border-washi/40 hover:border-bermellon hover:bg-bermellon hover:text-washi text-washi disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-washi transition-colors"
              >
                →
              </button>
            </span>
          </span>
        </div>

        {/* Tira manga horizontal, con margen vertical para el zoom al pasar el ratón y la marca de lectura */}
        <div
          ref={stripRef}
          className="relative flex gap-4 md:gap-6 overflow-x-auto pt-10 pb-8 -mt-6 hide-scrollbar cursor-grab active:cursor-grabbing px-[max(0px,calc(50%-40vw))] md:px-0"
        >
          {/* Guía de viñetas (inicio) */}
          <div className="shrink-0 hidden md:flex flex-col items-center justify-center w-8 tategaki font-heading text-washi/40 text-sm tracking-widest">
            始 · START
          </div>

          {ALBUMS.map((album, idx) => {
            const isActive = album.id === active;
            return (
              <motion.button
                key={album.id}
                ref={registerCard(album.id)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => setActive(album.id)}
                className={cn(
                  "group relative shrink-0 text-left transition-all",
                  "border-2 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-bermellon",
                  "w-[80vw] max-w-[320px] md:w-[440px]",
                  isActive
                    ? "border-bermellon shadow-[0_20px_60px_-20px_oklch(0.55_0.22_27_/_0.7)]"
                    : "border-border hover:border-bermellon hover:shadow-[0_15px_40px_-15px_oklch(0.55_0.22_27_/_0.5)]",
                )}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${album.color}30 0%, oklch(0.14 0.005 260) 100%)`
                    : "oklch(0.18 0.008 260)",
                }}
              >
                {/* Barra superior estilo DS */}
                <div className="flex items-center justify-between px-3 py-2 bg-sumi/60 border-b border-border group-hover:border-bermellon/60 group-hover:bg-bermellon/10 transition-colors">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-bermellon group-hover:animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-washi/40 group-hover:bg-bermellon/60 transition-colors" />
                    <div className="w-1.5 h-1.5 rounded-full bg-washi/40 group-hover:bg-bermellon/40 transition-colors" />
                  </div>
                  <span className="font-mono text-[9px] tracking-widest text-muted-foreground group-hover:text-bermellon transition-colors">
                    巻 · 0{idx + 1}
                  </span>
                </div>

                {/* Portada */}
                <div
                  className="aspect-square relative flex items-center justify-center overflow-hidden"
                  style={{ background: `${album.color}20` }}
                >
                  <div className="absolute inset-0 grid-lines opacity-30 group-hover:opacity-60 transition-opacity" />

                  {/* Año en grande */}
                  <div
                    className="font-heading font-black text-[9rem] leading-none opacity-15 absolute -bottom-8 -right-3 group-hover:opacity-30 group-hover:-rotate-2 transition-all"
                    style={{ color: album.color }}
                  >
                    {String(album.year).slice(2)}
                  </div>

                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 8, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-28 h-28 rounded-full flex items-center justify-center font-heading font-black text-5xl border-2"
                      style={{
                        borderColor: album.color,
                        color: album.color,
                        background: "oklch(0.14 0.005 260 / 0.85)",
                        boxShadow: `0 0 40px -10px ${album.color}80`,
                      }}
                    >
                      {album.titleJP[0]}
                    </motion.div>
                    <div className="font-mono text-[10px] tracking-widest text-washi/80">
                      {album.year}
                    </div>
                  </div>
                </div>

                {/* Barra de info */}
                <div className="p-4 space-y-2 border-t border-border group-hover:border-bermellon/60 transition-colors">
                  <div className="font-heading font-bold text-washi text-lg leading-tight line-clamp-2 group-hover:text-bermellon transition-colors">
                    {album.title}
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground group-hover:text-washi tracking-widest uppercase transition-colors">
                    <span>{album.genre}</span>
                    <span>{album.tracks} TR</span>
                  </div>
                </div>

                {/* Marca de lectura */}
                {isActive && (
                  <motion.span
                    layoutId="reading-mark"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 font-heading text-bermellon text-xl"
                  >
                    ▼
                  </motion.span>
                )}
              </motion.button>
            );
          })}

          {/* Guía de viñetas (fin) */}
          <div className="shrink-0 hidden md:flex flex-col items-center justify-center w-8 tategaki font-heading text-washi/40 text-sm tracking-widest">
            終 · END
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="mt-2 mb-12 h-px bg-border relative overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-bermellon"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Detalles del álbum activo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAlbum.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
          >
            <div className="md:col-span-5 border border-border bg-card p-6 md:p-8 relative overflow-hidden group/detail hover:border-bermellon hover:bg-card/70 transition-colors flex flex-col">
              <div
                className="w-full h-1 mb-6 group-hover/detail:h-1.5 transition-all"
                style={{ background: activeAlbum.color }}
              />
              <div className="font-mono text-[10px] text-bermellon tracking-widest uppercase mb-2 group-hover/detail:tracking-[0.4em] transition-all">
                Now Selecting
              </div>
              <h3 className="font-heading font-black text-3xl text-washi mb-2 group-hover/detail:text-bermellon transition-colors">
                {activeAlbum.title}
              </h3>
              <div className="font-heading text-washi/60 text-lg mb-6 group-hover/detail:text-washi transition-colors">
                {activeAlbum.titleJP}
              </div>
              <p className="text-washi/80 leading-relaxed group-hover/detail:text-washi transition-colors">
                {activeAlbum.description}
              </p>
              <a
                href={activeAlbum.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center justify-center md:justify-start gap-3 px-6 h-12 mt-8 md:mt-auto md:pt-0 bg-washi text-sumi font-heading font-bold text-sm tracking-widest uppercase overflow-hidden hover:text-washi transition-colors self-stretch md:self-start"
              >
                <span className="absolute inset-0 bg-bermellon origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 ease-out" />
                <span className="relative z-10">▶</span>
                <span className="relative z-10">Escuchar en Spotify</span>
              </a>
            </div>

            <div className="md:col-span-7 border border-border bg-card p-6 md:p-8 relative hover:border-bermellon/60 transition-colors group/list">
              <div className="flex items-center justify-between mb-6">
                <div className="font-mono text-[10px] text-bermellon tracking-widest uppercase group-hover/list:tracking-[0.4em] transition-all">
                  Tracklist
                </div>
                <div className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase group-hover/list:text-washi transition-colors">
                  {activeAlbum.tracks} tracks
                </div>
              </div>
              <ul className="divide-y divide-border/60">
                {activeAlbum.tracklist.map((track, i) => {
                  const trackKey = `${activeAlbum.id}:${i}`;
                  const info = activePreviewByTrack?.[normalizeTrackName(track)] ?? null;
                  const hasPreview = Boolean(info?.previewUrl);
                  const isPlaying = playingKey === trackKey;
                  return (
                    <li key={track} className="flex items-center">
                      <button
                        type="button"
                        onClick={() => togglePreview(trackKey, info?.previewUrl ?? null)}
                        disabled={!hasPreview}
                        aria-label={
                          hasPreview
                            ? isPlaying
                              ? `Pausar preview de ${track}`
                              : `Escuchar preview de ${track}`
                            : `${track} — sin preview disponible`
                        }
                        className={cn(
                          "group/track flex items-center gap-4 py-3 w-full text-left transition-all",
                          hasPreview
                            ? "cursor-pointer hover:pl-3"
                            : "cursor-default",
                        )}
                      >
                        <span
                          className="font-mono text-xs w-6 text-right"
                          style={{ color: activeAlbum.color }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "flex-1 font-heading transition-colors",
                            isPlaying
                              ? "text-bermellon"
                              : "text-washi group-hover/track:text-bermellon",
                          )}
                        >
                          {track}
                        </span>
                        {isPlaying ? (
                          <span
                            aria-hidden
                            className="flex items-end gap-[3px] h-4 text-bermellon"
                          >
                            <span className="w-[3px] bg-bermellon inline-block audio-bar audio-bar-1" />
                            <span className="w-[3px] bg-bermellon inline-block audio-bar audio-bar-2" />
                            <span className="w-[3px] bg-bermellon inline-block audio-bar audio-bar-3" />
                          </span>
                        ) : hasPreview ? (
                          <span className="text-bermellon opacity-0 -translate-x-2 group-hover/track:opacity-100 group-hover/track:translate-x-0 transition-all">
                            ▶
                          </span>
                        ) : (
                          <a
                            href={activeAlbum.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="font-mono text-[9px] text-muted-foreground tracking-widest uppercase opacity-0 group-hover/track:opacity-100 transition-opacity hover:text-bermellon"
                            aria-label={`Abrir ${track} en Spotify`}
                          >
                            spotify ↗
                          </a>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <audio
                ref={audioRef}
                preload="none"
                onEnded={() => setPlayingKey(null)}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {topTracksSlot}
      </div>
    </section>
  );
}
