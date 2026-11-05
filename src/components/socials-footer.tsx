"use client";

import { motion } from "motion/react";
import { SOCIALS } from "@/lib/jokki-data";

export function SocialsFooter() {
  return (
    <footer
      id="links"
      className="relative border-t border-border overflow-hidden"
    >
      <div className="absolute inset-0 grid-lines opacity-30 pointer-events-none" />

      <div className="relative pt-16 pb-6 md:pt-32 md:pb-12 mx-auto max-w-6xl px-4 md:px-8">
        {/* Cabecera de la sección */}
        <div className="flex items-end justify-between mb-10 md:mb-16 border-b border-border/60 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-6 h-px bg-bermellon" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-bermellon">
                Section 06
              </span>
            </div>
            <h2 className="font-heading font-black text-3xl md:text-6xl text-washi flex items-baseline gap-4">
              <span>連絡</span>
              <span className="text-xl md:text-2xl text-washi/50 font-normal tracking-widest">
                / LINKS
              </span>
            </h2>
          </div>
        </div>

        {/* Rejilla de sellos hanko */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-10 md:mb-20">
          {SOCIALS.map((social, idx) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group relative border border-border bg-card p-4 md:p-6 flex flex-col items-center gap-2 md:gap-3 hover:border-bermellon hover:bg-bermellon/5 hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 hanko flex items-center justify-center text-xl md:text-2xl group-hover:rotate-[12deg] group-hover:scale-110 transition-transform duration-300">
                {social.kanji}
              </div>
              <div className="text-center">
                <div className="font-heading font-bold text-washi group-hover:text-bermellon text-sm mb-0.5 transition-colors">
                  {social.name}
                </div>
                <div className="font-mono text-[10px] text-muted-foreground tracking-widest group-hover:text-washi transition-colors">
                  {social.handle}
                </div>
              </div>
              <span className="absolute top-2 right-2 font-mono text-[9px] text-muted-foreground/60 group-hover:text-bermellon transition-colors">
                {String(idx + 1).padStart(2, "0")}
              </span>
            </motion.a>
          ))}
        </div>

        {/* GRANDMARK: la firma enorme del cierre */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
          className="relative border-t border-border/60 pt-16 pb-0"
        >
          {/* Franja de datos sobre el kanji */}
          <div className="flex items-center justify-between gap-3 mb-8 font-mono text-[9px] md:text-[10px] text-muted-foreground tracking-[0.3em] md:tracking-[0.4em] uppercase">
            <span className="flex items-center gap-2 md:gap-3">
              <span className="w-4 md:w-6 h-px bg-bermellon" />
              JOKKI · ジョッキ
            </span>
            <span className="whitespace-nowrap">
              MMXXVI · <span className="text-bermellon">●</span>{" "}
              <span className="hidden sm:inline">LIVE FROM TOKYO</span>
              <span className="sm:hidden">LIVE</span>
            </span>
          </div>

          {/* El grandmark: 落気 enorme */}
          <div className="relative flex items-center justify-center">
            {/* Halo bermellón detrás */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden
            >
              <div className="w-[50%] aspect-square rounded-full bg-bermellon/15 blur-3xl" />
            </div>

            {/* Kanji */}
            <div className="relative flex items-center justify-center gap-4 md:gap-10 leading-none select-none">
              <motion.span
                whileHover={{ rotate: -3, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="font-heading font-black text-washi text-[26vw] md:text-[22vw] leading-none tracking-tighter cursor-default"
                style={{
                  textShadow:
                    "0 0 40px oklch(0.55 0.22 27 / 0.35), 0 0 120px oklch(0.55 0.22 27 / 0.2)",
                }}
              >
                落
              </motion.span>
              <motion.span
                whileHover={{ rotate: 3, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="font-heading font-black text-washi text-[26vw] md:text-[22vw] leading-none tracking-tighter cursor-default"
                style={{
                  textShadow:
                    "0 0 40px oklch(0.55 0.22 27 / 0.35), 0 0 120px oklch(0.55 0.22 27 / 0.2)",
                }}
              >
                気
              </motion.span>
            </div>

            {/* Sello hanko encima */}
            <div className="absolute -bottom-8 md:-bottom-2 right-0 md:right-16 hanko w-14 h-14 md:w-24 md:h-24 flex flex-col items-center justify-center rotate-[-6deg]">
              <div className="w-full h-full flex flex-col items-center justify-center gap-0.5 md:gap-1">
                <span className="font-heading font-black text-lg md:text-3xl leading-none">
                  落気
                </span>
                <span className="font-mono text-[7px] md:text-[9px] tracking-[0.3em]">
                  JOKKI
                </span>
              </div>
            </div>

            {/* Corchetes de esquina */}
            <span className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-bermellon/60" />
            <span className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-bermellon/60" />
            <span className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-bermellon/60" />
            <span className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-bermellon/60" />
          </div>

          {/* Lectura */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="font-mono text-[10px] text-muted-foreground tracking-[0.4em] uppercase">
              読み ▸ <span className="text-washi">JOKKI</span> ·{" "}
              <span className="text-bermellon">JO · KKI</span> · じょっき
            </div>
            <div className="font-mono text-[10px] text-muted-foreground tracking-[0.4em] uppercase">
              Concepto no oficial · hecho por Alex (Derky)
            </div>
          </div>
        </motion.div>

      </div>
    </footer>
  );
}
