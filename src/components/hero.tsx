"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ARTIST, SOCIALS } from "@/lib/jokki-data";
import { KanjiSignature } from "@/components/kanji-sig";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden pt-20 md:pt-16 pb-8 md:pb-0"
    >
      {/* Círculo Hinomaru enorme de fondo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(80vw,85vh)] aspect-square rounded-full bg-bermellon hinomaru-pulse"
        style={{
          filter: "blur(0.5px)",
          boxShadow:
            "0 0 120px 20px oklch(0.55 0.22 27 / 0.35), inset 0 0 80px oklch(0.4 0.2 27 / 0.4)",
        }}
      />

      {/* Rejilla superpuesta */}
      <div className="absolute inset-0 grid-lines opacity-40 pointer-events-none" />

      {/* Texto japonés vertical (izquierda) */}
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 0.7 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 tategaki font-heading text-washi/70 text-lg tracking-widest"
      >
        東京 発 · アルトロック · 実験
      </motion.div>

      {/* Texto japonés vertical (derecha) */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 0.7 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 tategaki font-heading text-washi/70 text-lg tracking-widest"
      >
        二〇二六年 · 日本 · ジョッキ
      </motion.div>

      {/* Marcas de esquina, más pequeñas en móvil */}
      <div className="absolute top-20 md:top-24 left-3 md:left-12 font-mono text-[9px] md:text-[10px] text-washi/50 tracking-widest">
        <div>N 35.6762°</div>
        <div>E 139.6503°</div>
        <div className="mt-1 text-bermellon">▲ TOKYO</div>
      </div>
      <div className="absolute top-20 md:top-24 right-3 md:right-12 font-mono text-[9px] md:text-[10px] text-washi/50 tracking-widest text-right">
        <div>REL. 03</div>
        <div>VER. 2026</div>
        <div className="mt-1 text-bermellon">● LIVE</div>
      </div>

      {/* Contenido central */}
      <div className="relative z-10 flex flex-col items-center gap-3 md:gap-8 px-4 w-full max-w-2xl mt-4 md:mt-0">
        {/* Firma en kanji con trazo de pincel animado */}
        <KanjiSignature />

        {/* Logo de JOKKI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          whileHover={{ scale: 1.02 }}
          className="relative w-[min(55vw,320px)] md:w-[min(78vw,600px)] group cursor-pointer"
        >
          <Image
            src="/assets/jokki-logo.webp"
            alt="JOKKI"
            width={600}
            height={424}
            priority
            className="w-full h-auto invert drop-shadow-[0_0_30px_oklch(1_0_0/0.15)] group-hover:drop-shadow-[0_0_50px_oklch(0.55_0.22_27/0.5)] transition-all duration-500"
          />
        </motion.div>

        {/* Lema */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col items-center gap-2 text-center"
        >
          <p className="font-heading text-base md:text-3xl text-washi tracking-wide leading-tight">
            {ARTIST.tagline}
          </p>
          <p className="font-mono text-[10px] md:text-xs text-washi/60 tracking-[0.4em] uppercase">
            &gt; new album · out now
            <span className="cursor-blink text-bermellon ml-1">_</span>
          </p>
        </motion.div>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center gap-2.5 md:gap-3 mt-1 md:mt-4 w-auto"
        >
          <a
            href="#music"
            className="group relative inline-flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 h-10 md:h-12 border border-washi text-washi hover:text-sumi md:hover:text-washi overflow-hidden transition-colors duration-300 font-heading font-bold text-xs md:text-sm tracking-widest uppercase"
          >
            <span className="absolute inset-0 bg-washi md:bg-sumi origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            <span className="relative z-10 text-base md:text-lg leading-none transition-transform group-hover:translate-x-0.5">
              ▶
            </span>
            <span className="relative z-10">Escuchar Álbum</span>
            <span className="relative z-10 font-mono text-[10px] md:text-xs opacity-60">音楽</span>
          </a>
          <a
            href="#about"
            className="group relative inline-flex items-center justify-center gap-2 md:gap-3 px-4 md:px-6 h-10 md:h-12 border border-washi/40 text-washi hover:text-sumi md:hover:text-washi overflow-hidden transition-colors duration-300 font-mono text-[10px] md:text-xs tracking-widest uppercase"
          >
            <span className="absolute inset-0 bg-washi md:bg-sumi origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            <span className="relative z-10">Ver Universo</span>
            <span className="relative z-10 font-heading text-sm transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>

        {/* Franja de redes, estilo link-in-bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-4 md:mt-6 flex flex-col items-center gap-2 md:gap-3 w-full"
        >
          <div className="flex items-center gap-3 font-mono text-[10px] text-washi/60 tracking-[0.3em] uppercase">
            <span className="w-6 h-px bg-washi/40" />
            <span>連絡 · Follow</span>
            <span className="w-6 h-px bg-washi/40" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 max-w-[min(94vw,540px)]">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.name} · ${social.handle}`}
                className="group/chip flex items-center gap-1.5 md:gap-2 h-8 md:h-9 pl-0.5 md:pl-1 pr-2.5 md:pr-3 border border-washi/30 bg-sumi/60 backdrop-blur hover:border-bermellon hover:bg-bermellon transition-colors"
              >
                <span className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center bg-bermellon text-washi group-hover/chip:bg-washi group-hover/chip:text-bermellon font-heading font-black text-xs md:text-sm transition-colors">
                  {social.kanji}
                </span>
                <span className="font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-washi/80 group-hover/chip:text-washi transition-colors">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}
