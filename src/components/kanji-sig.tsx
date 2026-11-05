"use client";

import { motion } from "motion/react";

/**
 * Firma animada con el kanji 落気, en dos fases:
 *  1) Se traza el contorno con stroke-dashoffset (parece un pincel)
 *  2) Después entra el relleno con una máscara suave
 */
export function KanjiSignature() {
  return (
    <div className="flex items-center gap-4 md:gap-8 select-none">
      <KanjiChar char="落" delay={0.4} />
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
        className="block w-16 md:w-24 h-px bg-washi/60 origin-left"
      />
      <KanjiChar char="気" delay={1.0} />
    </div>
  );
}

function KanjiChar({ char, delay }: { char: string; delay: number }) {
  return (
    <div className="relative w-[2.5rem] h-[2.5rem] md:w-[5rem] md:h-[5rem]">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          {/* Máscara de tinta que crece y descubre el relleno */}
          <mask id={`ink-mask-${char}`}>
            <rect x="0" y="0" width="100" height="100" fill="black" />
            <motion.circle
              cx="50"
              cy="50"
              initial={{ r: 0 }}
              animate={{ r: 90 }}
              transition={{
                delay: delay + 0.9,
                duration: 0.7,
                ease: [0.65, 0, 0.35, 1],
              }}
              fill="white"
            />
          </mask>
        </defs>

        {/* Contorno trazado */}
        <motion.text
          x="50"
          y="72"
          textAnchor="middle"
          fontSize="72"
          fontFamily="var(--font-jp-serif), serif"
          fontWeight={900}
          fill="none"
          stroke="oklch(0.96 0.015 85)"
          strokeWidth={0.8}
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{
            delay,
            duration: 1.1,
            ease: [0.65, 0, 0.35, 1],
          }}
          style={{ paintOrder: "stroke fill" }}
        >
          {char}
        </motion.text>

        {/* Kanji relleno, descubierto con la máscara */}
        <text
          x="50"
          y="72"
          textAnchor="middle"
          fontSize="72"
          fontFamily="var(--font-jp-serif), serif"
          fontWeight={900}
          fill="oklch(0.96 0.015 85)"
          mask={`url(#ink-mask-${char})`}
        >
          {char}
        </text>

        {/* Brillo bermellón suave detrás */}
        <motion.text
          x="50"
          y="72"
          textAnchor="middle"
          fontSize="72"
          fontFamily="var(--font-jp-serif), serif"
          fontWeight={900}
          fill="oklch(0.55 0.22 27)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0.15] }}
          transition={{
            delay: delay + 1.2,
            duration: 1.5,
            ease: "easeOut",
          }}
          style={{ filter: "blur(4px)" }}
        >
          {char}
        </motion.text>
      </svg>
    </div>
  );
}
