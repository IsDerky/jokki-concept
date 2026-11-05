"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type MascotProps = {
  size?: number | string;
  className?: string;
  style?: CSSProperties;
  /** Sin el fondo bermellón redondeado, para usarlo encima de superficies bermellón. */
  bare?: boolean;
  /** Balanceo suave en reposo. */
  float?: boolean;
};

export function Mascot({
  size = 64,
  className,
  style,
  bare = false,
  float = false,
}: MascotProps) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="JOKKI mascota"
      className={cn("block", className)}
      style={style}
      animate={float ? { y: [0, -3, 0] } : undefined}
      transition={
        float
          ? { duration: 3.4, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    >
      {!bare && <rect width="64" height="64" rx="10" fill="#BC002D" />}
      {/* Oreja izquierda */}
      <path d="M16 26 L22 8 L31 22 Z" fill="#F5F1E8" />
      <path d="M22 22 L24 14 L28 21 Z" fill="#BC002D" />
      {/* Oreja derecha */}
      <path d="M48 26 L42 8 L33 22 Z" fill="#F5F1E8" />
      <path d="M42 22 L40 14 L36 21 Z" fill="#BC002D" />
      {/* Cabeza */}
      <ellipse cx="32" cy="36" rx="18" ry="17" fill="#F5F1E8" />
      {/* Ojos */}
      <rect x="23" y="31" width="4.5" height="11" rx="1.5" fill="#1A1A1A" />
      <rect x="36.5" y="31" width="4.5" height="11" rx="1.5" fill="#1A1A1A" />
      {/* Brillo */}
      <ellipse cx="26" cy="27" rx="3" ry="1.5" fill="#ffffff" opacity="0.55" />
    </motion.svg>
  );
}
