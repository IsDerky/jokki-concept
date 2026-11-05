"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause } from "lucide-react";

const ARTIST_URI = "artist/4d6NFauD483NG4W8lqQ6fD";
const LATEST_ALBUM_URI = "album/1rfqqudfmNZLeMhPR3Wc7x";

export function SpotifyHud() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"album" | "artist">("album");

  return (
    <div className="fixed bottom-3 right-3 md:bottom-4 md:right-4 z-[70] flex flex-col items-end gap-2 pointer-events-none max-w-[calc(100vw-1.5rem)]">
      <AnimatePresence>
        {open && (
          <motion.div
            key="hud-panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
            className="pointer-events-auto w-[min(94vw,380px)] border-2 border-border bg-sumi/95 backdrop-blur-lg shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
          >
            {/* Barra superior del HUD */}
            <div className="flex items-center justify-between px-3 py-2 bg-bermellon/15 border-b border-border">
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-washi">
                <span className="w-1.5 h-1.5 rounded-full bg-bermellon animate-pulse" />
                <span>NOW PLAYING · 音楽</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close player"
                className="w-6 h-6 flex items-center justify-center border border-border hover:border-bermellon hover:text-bermellon text-washi/70 font-mono text-xs transition-colors"
              >
                ×
              </button>
            </div>

            {/* Pestañas */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setTab("album")}
                className={`flex-1 px-3 py-2 font-heading text-sm tracking-widest transition-colors ${
                  tab === "album"
                    ? "bg-bermellon text-washi"
                    : "text-washi/70 hover:text-washi hover:bg-accent/40"
                }`}
              >
                アルバム
              </button>
              <button
                onClick={() => setTab("artist")}
                className={`flex-1 px-3 py-2 font-heading text-sm tracking-widest transition-colors ${
                  tab === "artist"
                    ? "bg-bermellon text-washi"
                    : "text-washi/70 hover:text-washi hover:bg-accent/40"
                }`}
              >
                アーティスト
              </button>
            </div>

            {/* Reproductor embebido */}
            <div className="p-2 bg-sumi">
              <iframe
                key={tab}
                title="Spotify player"
                src={`https://open.spotify.com/embed/${
                  tab === "album" ? LATEST_ALBUM_URI : ARTIST_URI
                }?utm_source=jokki-portfolio&theme=0`}
                width="100%"
                height={tab === "album" ? 352 : 232}
                frameBorder={0}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                loading="lazy"
                className="rounded-sm"
              />
            </div>

            {/* Franja inferior del HUD */}
            <div className="flex items-center justify-between px-3 py-1.5 border-t border-border font-mono text-[9px] tracking-widest text-muted-foreground bg-sumi">
              <span>SYS · SPOTIFY</span>
              <span>{tab === "album" ? "SOLO NECESITABA IR A JAPÓN" : "JOKKI"}</span>
              <span className="text-bermellon">● 320k</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón para abrir/cerrar */}
      <motion.button
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar reproductor" : "Abrir reproductor"}
        className="pointer-events-auto group relative flex items-center gap-3 h-12 px-4 border-2 border-bermellon bg-sumi/90 backdrop-blur hover:bg-bermellon hover:text-washi text-washi transition-all font-heading font-bold tracking-widest text-sm shadow-[0_10px_30px_-10px_oklch(0.55_0.22_27/0.5)]"
      >
        <span className="w-8 h-8 rounded-full bg-bermellon group-hover:bg-washi flex items-center justify-center text-washi group-hover:text-bermellon transition-colors">
          {open ? (
            <Pause className="w-4 h-4 fill-current" strokeWidth={0} />
          ) : (
            <Play className="w-4 h-4 fill-current" strokeWidth={0} />
          )}
        </span>
        <span className="hidden sm:inline">
          {open ? "音楽 ON" : "音楽"}
        </span>
        {!open && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-bermellon animate-ping" />
        )}
      </motion.button>
    </div>
  );
}
