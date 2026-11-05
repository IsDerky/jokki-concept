"use client";

import { motion } from "motion/react";
import { ARTIST } from "@/lib/jokki-data";
import { Flag } from "@/components/flag";

export function About() {
  return (
    <section
      id="about"
      className="relative py-16 md:py-32 border-t border-border overflow-hidden"
    >
      {/* Kanji de marca de agua al fondo */}
      <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 pointer-events-none select-none">
        <span className="font-heading font-black text-[160px] md:text-[420px] leading-none text-washi/[0.03]">
          紹
        </span>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        {/* Cabecera de la sección */}
        <div className="flex items-end justify-between mb-10 md:mb-16 border-b border-border/60 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-px bg-bermellon" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-bermellon">
                Section 01
              </span>
            </div>
            <h2 className="font-heading font-black text-3xl md:text-6xl text-washi flex items-baseline gap-4">
              <span>紹介</span>
              <span className="text-xl md:text-2xl text-washi/50 font-normal tracking-widest">
                / ABOUT
              </span>
            </h2>
          </div>
          <div className="hidden md:block hanko w-16 h-16 flex-shrink-0 items-center justify-center text-xl font-black">
            <div className="w-full h-full flex items-center justify-center">
              落
            </div>
          </div>
        </div>

        {/* Rejilla de contenido estilo viñetas manga */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {/* Viñeta grande: intro */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 border border-border bg-card washi-texture p-6 md:p-10 relative hover:border-bermellon/60 transition-colors group"
          >
            <div className="absolute top-3 right-3 font-mono text-[10px] text-muted-foreground group-hover:text-bermellon transition-colors">
              01 / 04
            </div>
            <div className="flex items-baseline gap-4 mb-6">
              <span className="font-heading font-black text-5xl md:text-6xl text-bermellon transition-all">
                {ARTIST.name}
              </span>
              <span className="font-heading text-2xl md:text-3xl text-washi/70 group-hover:text-washi transition-colors">
                {ARTIST.nameJP}
              </span>
            </div>
            <p className="text-washi/80 leading-relaxed text-base md:text-lg mb-6 group-hover:text-washi transition-colors">
              {ARTIST.bio[0]}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/60 group-hover:border-bermellon/40 transition-colors">
              <div>
                <div className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-1 group-hover:text-bermellon transition-colors">
                  Nombre real
                </div>
                <div className="font-heading text-washi text-lg">
                  {ARTIST.real}
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-1 group-hover:text-bermellon transition-colors">
                  Base
                </div>
                <div className="font-heading text-washi text-lg">
                  {ARTIST.location}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Viñeta pequeña: origen */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-4 border border-border bg-card p-6 md:p-8 relative flex flex-col justify-between min-h-[280px] hover:border-bermellon/60 hover:bg-card/60 transition-colors group"
          >
            <div className="absolute top-3 right-3 font-mono text-[10px] text-muted-foreground group-hover:text-bermellon transition-colors">
              02 / 04
            </div>
            <div>
              <div className="font-mono text-[10px] text-bermellon tracking-widest uppercase mb-3 group-hover:tracking-[0.4em] transition-all">
                Origen → Destino
              </div>
              <div className="space-y-3 font-heading text-washi">
                <div className="flex items-center gap-3">
                  <Flag
                    code="es"
                    className="w-10 h-7 border border-border/60 group-hover:border-bermellon/60 transition-colors shrink-0"
                  />
                  <div>
                    <div className="text-lg group-hover:text-bermellon transition-colors">
                      Madrid
                    </div>
                    <div className="text-xs text-muted-foreground font-mono group-hover:text-washi transition-colors">
                      MAD
                    </div>
                  </div>
                </div>
                <div className="pl-4 flex items-center gap-2">
                  <span className="block h-4 w-px bg-bermellon/60 group-hover:h-6 transition-all" />
                  <span className="text-bermellon font-mono text-xs tracking-widest">
                    TRANSIT
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Flag
                    code="jp"
                    className="w-10 h-7 border border-border/60 group-hover:border-bermellon shadow-none group-hover:shadow-[0_0_20px_-4px_oklch(0.55_0.22_27/0.6)] transition-all shrink-0"
                  />
                  <div>
                    <div className="text-lg group-hover:text-bermellon transition-colors">
                      Tokyo
                    </div>
                    <div className="text-xs text-muted-foreground font-mono group-hover:text-washi transition-colors">
                      HND
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-border/60 group-hover:border-bermellon/40 font-mono text-[10px] text-muted-foreground group-hover:text-bermellon tracking-widest transition-colors">
              ★ ONE WAY TICKET
            </div>
          </motion.div>

          {/* Viñeta: cita sobre la música */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-5 border border-border bg-gradient-to-br from-bermellon/20 to-transparent p-6 md:p-8 relative hover:from-bermellon/30 hover:border-bermellon/60 transition-all group"
          >
            <div className="absolute top-3 right-3 font-mono text-[10px] text-washi/60 group-hover:text-washi transition-colors">
              03 / 04
            </div>
            <div className="text-6xl font-heading text-bermellon leading-none mb-3 group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform">
              「
            </div>
            <p className="font-heading text-xl md:text-2xl text-washi leading-relaxed">
              Alt-rock, electrónica y hip-hop — lo que él llama{" "}
              <span className="text-bermellon group-hover:text-neon-magenta transition-colors">música experiencial</span>.
            </p>
            <div className="text-6xl font-heading text-bermellon leading-none text-right mt-3 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform">
              」
            </div>
          </motion.div>

          {/* Viñeta: universo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-7 border border-border bg-card p-6 md:p-10 relative hover:border-bermellon/60 transition-colors group"
          >
            <div className="absolute top-3 right-3 font-mono text-[10px] text-muted-foreground group-hover:text-bermellon transition-colors">
              04 / 04
            </div>
            <div className="font-mono text-[10px] text-bermellon tracking-widest uppercase mb-4 group-hover:tracking-[0.4em] transition-all">
              El Universo
            </div>
            <p className="text-washi/80 leading-relaxed text-base md:text-lg mb-6 group-hover:text-washi transition-colors">
              {ARTIST.bio[2]}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Anime", "Gaming", "NFC", "Nintendo DS"].map((tag) => (
                <div
                  key={tag}
                  className="border border-border/60 py-2 px-3 font-mono text-[10px] tracking-widest uppercase text-washi/70 text-center hover:border-bermellon hover:text-bermellon transition-colors"
                >
                  ▸ {tag}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
