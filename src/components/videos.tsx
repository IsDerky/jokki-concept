"use client";

import { motion } from "motion/react";
import { VIDEOS } from "@/lib/jokki-data";

export function Videos() {
  return (
    <section
      id="videos"
      className="relative py-16 md:py-32 border-t border-border overflow-hidden"
    >
      <div className="absolute top-6 -right-6 md:top-10 md:-right-10 pointer-events-none select-none">
        <span className="font-heading font-black text-[160px] md:text-[420px] leading-none text-washi/[0.03]">
          映
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        {/* Cabecera de la sección */}
        <div className="flex items-end justify-between mb-10 md:mb-16 border-b border-border/60 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-px bg-bermellon" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-bermellon">
                Section 03
              </span>
            </div>
            <h2 className="font-heading font-black text-3xl md:text-6xl text-washi flex items-baseline gap-4">
              <span>映像</span>
              <span className="text-xl md:text-2xl text-washi/50 font-normal tracking-widest">
                / VIDEOS
              </span>
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@jokkijokki"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-muted-foreground hover:text-bermellon transition-colors whitespace-nowrap"
          >
            Ver canal →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {VIDEOS.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group"
            >
              {/* Marco de pantalla CRT */}
              <div className="border-2 border-border bg-card p-3 relative hover:border-bermellon transition-all group-hover:-translate-y-1 duration-300">
                {/* Barra superior de la pantalla */}
                <div className="flex items-center justify-between mb-2 px-2">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground group-hover:text-bermellon tracking-widest transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-bermellon animate-pulse" />
                    <span>REC · 0{idx + 1}</span>
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground group-hover:text-washi tracking-widest uppercase transition-colors">
                    {video.kind}
                  </div>
                </div>

                {/* Vídeo */}
                <div className="relative aspect-video overflow-hidden bg-sumi border border-border group-hover:border-bermellon scanlines transition-colors">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                {/* Etiqueta inferior de la pantalla */}
                <div className="mt-3 px-2 flex items-center justify-between gap-4">
                  <h3 className="font-heading text-washi group-hover:text-bermellon text-base md:text-lg leading-tight line-clamp-1 transition-colors">
                    {video.title}
                  </h3>
                  <span className="font-mono text-[10px] text-bermellon tracking-widest whitespace-nowrap group-hover:tracking-[0.3em] transition-all">
                    ▸ HD
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Franja con llamada a YouTube */}
        <div className="mt-12 border border-border bg-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-bermellon/60 transition-colors group/yt">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-bermellon flex items-center justify-center font-heading font-black text-2xl text-washi group-hover/yt:rotate-12 group-hover/yt:scale-110 transition-transform duration-300">
              映
            </div>
            <div>
              <div className="font-heading font-bold text-washi text-lg group-hover/yt:text-bermellon transition-colors">
                Más contenido en YouTube
              </div>
              <div className="font-mono text-xs text-muted-foreground tracking-widest group-hover/yt:text-washi transition-colors">
                @jokkijokki
              </div>
            </div>
          </div>
          <a
            href="https://www.youtube.com/@jokkijokki"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 h-11 border border-washi/40 hover:border-bermellon hover:bg-bermellon hover:text-washi transition-all font-mono text-xs tracking-widest uppercase text-washi"
          >
            <span>Suscribirse</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
