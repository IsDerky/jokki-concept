"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Mascot } from "@/components/mascot";

const LINKS = [
  { href: "#about", label: "紹介", en: "About" },
  { href: "#music", label: "音楽", en: "Music" },
  { href: "#shop", label: "店", en: "Shop" },
  { href: "#collab", label: "共作", en: "Collab" },
  { href: "#links", label: "連絡", en: "Links" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-sumi/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <span className="w-8 h-8 rounded-lg bg-bermellon flex items-center justify-center overflow-hidden hinomaru-pulse group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
            <Mascot bare size={26} />
          </span>
          <span className="font-heading font-black text-lg tracking-widest text-washi group-hover:text-bermellon transition-colors">
            JOKKI
          </span>
          <span className="text-[10px] font-mono text-muted-foreground tracking-[0.3em] group-hover:text-washi transition-colors">
            ジョッキ
          </span>
        </a>

        <nav className="hidden md:flex items-end gap-1">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group px-3 py-2 flex items-end gap-2 transition-colors"
            >
              {/* Kanji fijo, bajado un poco para que su base quede cerca del subrayado */}
              <span className="font-heading text-bermellon text-sm leading-none translate-y-1 inline-block">
                {link.label}
              </span>
              {/* El subrayado solo va bajo el texto en inglés */}
              <span className="relative inline-block leading-none">
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase font-mono group-hover:text-washi transition-colors">
                  {link.en}
                </span>
                <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-bermellon origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </span>
            </a>
          ))}
        </nav>

        <a
          href="https://open.spotify.com/artist/4d6NFauD483NG4W8lqQ6fD"
          target="_blank"
          rel="noopener noreferrer"
          className="group hidden md:inline-flex items-center gap-2 px-4 h-9 border border-washi/40 hover:border-bermellon hover:bg-bermellon hover:text-washi transition-all text-xs font-mono tracking-widest uppercase relative overflow-hidden"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-bermellon group-hover:bg-washi animate-pulse transition-colors" />
          <span className="transition-transform group-hover:translate-x-0.5">
            Listen Now
          </span>
        </a>

        {/* Botón del menú móvil */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="md:hidden relative flex items-center justify-center h-10 w-10 border border-border hover:border-bermellon transition-colors"
        >
          <span className="flex flex-col gap-1 w-4">
            <span
              className={cn(
                "block h-px bg-washi transition-all duration-300",
                open ? "translate-y-1 rotate-45" : "",
              )}
            />
            <span
              className={cn(
                "block h-px bg-washi transition-all duration-300",
                open ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "block h-px bg-washi transition-all duration-300",
                open ? "-translate-y-1 -rotate-45" : "",
              )}
            />
          </span>
        </button>
      </div>

      {/* Panel del menú móvil */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={cn(
          "md:hidden absolute top-16 left-0 right-0 border-b border-border/60 bg-sumi/95 backdrop-blur-md overflow-hidden transition-[max-height,opacity] duration-300",
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none",
        )}
      >
        <div className="px-4 py-6 flex flex-col">
          <div className="flex items-center gap-3 mb-5 font-mono text-[10px] text-washi/60 tracking-[0.4em] uppercase">
            <span className="w-4 h-px bg-bermellon" />
            <span>目次 · Index</span>
          </div>

          <ul className="flex flex-col divide-y divide-border/50">
            {LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-4 py-4 -mx-1 px-1 hover:pl-3 transition-all"
                >
                  <span className="font-mono text-[10px] text-muted-foreground tracking-widest w-6">
                    0{i + 1}
                  </span>
                  <span className="w-9 h-9 flex items-center justify-center bg-bermellon/10 border border-bermellon/40 font-heading font-black text-bermellon text-base group-hover:bg-bermellon group-hover:text-washi transition-colors">
                    {link.label}
                  </span>
                  <span className="flex-1 font-heading text-washi text-lg tracking-wide group-hover:text-bermellon transition-colors">
                    {link.en}
                  </span>
                  <span className="text-bermellon opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://open.spotify.com/artist/4d6NFauD483NG4W8lqQ6fD"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="group relative mt-6 inline-flex items-center justify-center gap-3 h-12 border border-washi bg-washi text-sumi overflow-hidden transition-colors font-heading font-bold text-sm tracking-widest uppercase"
          >
            <span className="absolute inset-0 bg-bermellon origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
            <span className="relative z-10 w-2 h-2 rounded-full bg-bermellon group-hover:bg-washi animate-pulse transition-colors" />
            <span className="relative z-10 group-hover:text-washi transition-colors">
              Listen Now
            </span>
            <span className="relative z-10 font-mono text-[10px] opacity-60 group-hover:text-washi transition-colors">
              音楽
            </span>
          </a>

          <div className="mt-5 flex items-center justify-between font-mono text-[9px] text-muted-foreground tracking-[0.3em] uppercase">
            <span>MMXXVI</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bermellon animate-pulse" />
              LIVE · TOKYO
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
