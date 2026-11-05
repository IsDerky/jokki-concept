import type { Metadata, Viewport } from "next";
import {
  Zen_Kaku_Gothic_New,
  Shippori_Mincho,
  VT323,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ARTIST, ALBUMS, SOCIALS } from "@/lib/jokki-data";

const jpSans = Zen_Kaku_Gothic_New({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-jp-sans",
});

const jpSerif = Shippori_Mincho({
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jp-serif",
});

const pixel = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SITE_TITLE = "JOKKI ジョッキ — Solo necesitaba ir a Japón";
const SITE_DESCRIPTION =
  "Concepto no oficial de portfolio para Jokki, hecho por Alex (Derky) como proyecto personal. No está afiliado al artista.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s · JOKKI ジョッキ",
  },
  description: SITE_DESCRIPTION,
  applicationName: "JOKKI",
  keywords: [
    "Jokki",
    "ジョッキ",
    "Joaquín Pa",
    "Solo necesitaba ir a Japón",
    "alt-rock",
    "hip-hop",
    "electrónica",
    "Tokio",
    "música española",
  ],
  authors: [{ name: "Alex (Derky)" }],
  creator: "Alex (Derky)",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: ARTIST.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  // Es un concepto: que los buscadores no la tomen por la web del artista.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#BC002D" },
    { media: "(prefers-color-scheme: light)", color: "#BC002D" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn(
        "h-full antialiased dark",
        jpSans.variable,
        jpSerif.variable,
        pixel.variable,
        mono.variable,
      )}
    >
      <body
        className="min-h-full flex flex-col overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
