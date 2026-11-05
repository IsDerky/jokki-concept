"use client";

import { motion } from "motion/react";

export function ShopCollab() {
  return (
    <section
      id="shop"
      className="relative py-16 md:py-32 border-t border-border overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* TIENDA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="group/shop relative overflow-hidden border-2 border-border bg-gradient-to-br from-bermellon/25 via-transparent to-transparent p-6 md:p-10 min-h-[360px] md:min-h-[420px] flex flex-col justify-between hover:border-bermellon hover:from-bermellon/40 transition-colors duration-500"
          >
            <div className="absolute -top-10 -right-10 font-heading font-black text-[140px] md:text-[200px] leading-none text-washi/[0.04] group-hover/shop:text-bermellon/[0.15] group-hover/shop:rotate-6 select-none pointer-events-none transition-all duration-500">
              店
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-bermellon" />
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-bermellon">
                  Section 04 · Shop
                </span>
              </div>
              <h2 className="font-heading font-black text-3xl md:text-5xl text-washi mb-4">
                お店
                <span className="block text-lg md:text-xl font-normal text-washi/60 tracking-widest mt-2">
                  MERCH · NFC · VINILOS
                </span>
              </h2>
              <p className="text-washi/80 leading-relaxed max-w-md">
                Llaveros NFC que abren canciones al escanearlos, artwork
                exclusivo, camisetas y el álbum en formato físico.
              </p>
            </div>

            <div className="relative mt-8 space-y-4">
              {/* Producto destacado (maqueta) */}
              <a
                href="https://www.jokkishop.com/product/solo-necesitaba-ir-a-jap%C3%B3n"
                target="_blank"
                rel="noopener noreferrer"
                className="group/prod border border-border bg-card/60 backdrop-blur p-4 flex items-center gap-4 hover:border-bermellon hover:-translate-y-0.5 hover:bg-card/80 transition-all">
                <div className="w-16 h-16 border border-bermellon bg-bermellon/20 flex items-center justify-center font-heading font-black text-2xl text-washi group-hover/prod:rotate-6 group-hover/prod:scale-105 transition-transform">
                  NFC
                </div>
                <div className="flex-1">
                  <div className="font-heading font-bold text-washi group-hover/prod:text-bermellon transition-colors">
                    Llavero + Álbum digital
                  </div>
                  <div className="font-mono text-[10px] text-muted-foreground group-hover/prod:text-washi tracking-widest transition-colors">
                    SOLO NECESITABA IR A JAPÓN · ★★★★★
                  </div>
                </div>
                <span className="font-mono text-bermellon transition-transform group-hover/prod:translate-x-1">→</span>
              </a>

              <a
                href="https://www.jokkishop.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center gap-3 px-6 h-12 bg-washi text-sumi font-heading font-bold text-sm tracking-widest uppercase overflow-hidden hover:text-washi transition-colors"
              >
                <span className="absolute inset-0 bg-bermellon origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Visitar Tienda</span>
                <span className="relative z-10 font-heading transition-transform group-hover/btn:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>

          {/* COLLAB */}
          <motion.div
            id="collab"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group/collab relative overflow-hidden border-2 border-border bg-card p-6 md:p-10 min-h-[360px] md:min-h-[420px] flex flex-col justify-between hover:border-bermellon transition-colors duration-500"
          >
            <div className="absolute -top-10 -right-10 font-heading font-black text-[140px] md:text-[200px] leading-none text-bermellon/[0.06] group-hover/collab:text-bermellon/[0.15] group-hover/collab:-rotate-6 select-none pointer-events-none transition-all duration-500">
              共
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-6 h-px bg-bermellon" />
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-bermellon">
                  Section 05 · Collab
                </span>
              </div>
              <h2 className="font-heading font-black text-3xl md:text-5xl text-washi mb-4">
                共作
                <span className="block text-lg md:text-xl font-normal text-washi/60 tracking-widest mt-2">
                  BUSCANDO CREADORES
                </span>
              </h2>
              <p className="text-washi/80 leading-relaxed max-w-md">
                Producción musical, directos, videoclips y contenido visual en
                Japón. Si haces algo interesante, hablemos.
              </p>
            </div>

            <div className="relative mt-8 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Producción", jp: "制作" },
                  { label: "Directos", jp: "ライブ" },
                  { label: "Videoclips", jp: "MV" },
                  { label: "Visuales", jp: "映像" },
                ].map((tag) => (
                  <div
                    key={tag.label}
                    className="group/tag border border-border bg-sumi/60 p-3 text-center hover:border-bermellon hover:bg-bermellon hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <div className="font-heading text-bermellon text-sm group-hover/tag:text-washi group-hover/tag:scale-110 transition-all inline-block">
                      {tag.jp}
                    </div>
                    <div className="font-mono text-[10px] text-washi/70 group-hover/tag:text-washi tracking-widest uppercase mt-1 transition-colors">
                      {tag.label}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://www.instagram.com/joaquinpaofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-3 px-6 h-12 border border-washi/40 text-washi hover:border-bermellon hover:bg-bermellon hover:text-washi transition-all font-mono text-xs tracking-widest uppercase"
              >
                <span>Enviar DM</span>
                <span className="font-heading transition-transform group-hover/btn:translate-x-1">→</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
