export const ARTIST = {
  name: "JOKKI",
  nameJP: "ジョッキ",
  kanji: "落気",
  real: "Joaquín Pa",
  tagline: "Solo necesitaba ir a Japón",
  location: "Tokyo, JP",
  origin: "Madrid, ES",
  bio: [
    "Jokki (ジョッキ) es un artista español radicado en Tokio.",
    "Su música mezcla alt-rock, electrónica y hip-hop con elementos experimentales — lo que él llama música experiencial.",
    "Cada release forma parte de un universo mayor: anime, gaming, nostalgia de Nintendo DS, calles de Shibuya a las 3AM y llaveros NFC que abren canciones al escanearlos.",
  ],
} as const;

export const ALBUMS = [
  {
    id: "solo-necesitaba",
    spotifyAlbumId: "1rfqqudfmNZLeMhPR3Wc7x",
    title: "Solo necesitaba ir a Japón",
    titleJP: "日本に行くだけでよかった",
    year: 2026,
    tracks: 7,
    genre: "Alt-Rock / Experimental",
    color: "#BC002D",
    accent: "#FF2E97",
    description:
      "Disco conceptual ambientado en un videojuego ficticio. Incluye llavero NFC físico.",
    spotify: "https://open.spotify.com/intl-es/album/1rfqqudfmNZLeMhPR3Wc7x",
    tracklist: [
      "Solo necesitaba ir a Japón",
      "Estoy de bajón (feat. Pimp Flaco & D3llano)",
      "Tu prioridad",
      "Nada me suele gustar",
      "No sé",
      "¿Y si no voy?",
      "Sigo de bajón",
    ],
  },
  {
    id: "acoustic",
    spotifyAlbumId: null,
    title: "The Acoustic Live Sessions",
    titleJP: "アコースティック",
    year: 2025,
    tracks: 6,
    genre: "Acoustic / Live",
    color: "#F5F1E8",
    accent: "#00E5FF",
    description: "Versiones acústicas grabadas en directo. Íntimo, crudo, honesto.",
    spotify: "https://open.spotify.com/artist/4d6NFauD483NG4W8lqQ6fD",
    tracklist: [
      "Una canción mal grabada",
      "Seguiremos Aquí",
      "La Cicatriz",
      "Sin Noticias de Madrid",
      "24",
      "No Te Espero Más",
    ],
  },
  {
    id: "jokki-debut",
    spotifyAlbumId: "6OIABM8aJ3vPErbn3vdXhN",
    title: "Jokki",
    titleJP: "ジョッキ",
    year: 2024,
    tracks: 10,
    genre: "Happy Punk / Alt-Rock",
    color: "#1A1A1A",
    accent: "#BC002D",
    description:
      "El álbum debut. El editor de Auronplay lanzándose al vacío con guitarras y feeling punk.",
    spotify: "https://open.spotify.com/intl-es/album/6OIABM8aJ3vPErbn3vdXhN",
    tracklist: [
      "No Te Espero Más",
      "Seguiremos Aquí",
      "1 de Vida",
      "Ya No Estás",
      "¿Y Ahora Qué?",
      "Sin Noticias de Madrid",
      "La Cicatriz",
      "Una canción mal grabada",
      "24",
      "Jokki",
    ],
  },
] as const;

export const TOP_TRACKS = [
  { title: "No Te Espero Más", streams: "840K" },
  { title: "Estoy de bajón", streams: "682K" },
  { title: "Una canción mal grabada", streams: "458K" },
  { title: "Seguiremos Aquí", streams: "436K" },
  { title: "Nada me suele gustar", streams: "163K" },
] as const;

export const SOCIALS = [
  {
    name: "Spotify",
    handle: "Jokki",
    url: "https://open.spotify.com/artist/4d6NFauD483NG4W8lqQ6fD",
    kanji: "音",
    label: "音楽",
  },
  {
    name: "YouTube",
    handle: "@jokkijokki",
    url: "https://www.youtube.com/@jokkijokki",
    kanji: "映",
    label: "映像",
  },
  {
    name: "Instagram",
    handle: "@joaquinpaofficial",
    url: "https://www.instagram.com/joaquinpaofficial",
    kanji: "写",
    label: "写真",
  },
  {
    name: "TikTok",
    handle: "@jokki333",
    url: "https://www.tiktok.com/@jokki333",
    kanji: "踊",
    label: "踊り",
  },
  {
    name: "X / Twitter",
    handle: "@jokkij0kki",
    url: "https://x.com/jokkij0kki",
    kanji: "言",
    label: "言葉",
  },
  {
    name: "Twitch",
    handle: "@jokkijokki",
    url: "https://www.twitch.tv/jokkijokki",
    kanji: "遊",
    label: "遊び",
  },
  {
    name: "Shop",
    handle: "jokkishop.com",
    url: "https://www.jokkishop.com",
    kanji: "店",
    label: "お店",
  },
  {
    name: "Discord",
    handle: "Community",
    url: "https://discord.gg/",
    kanji: "会",
    label: "集会",
  },
] as const;

export const VIDEOS = [
  {
    id: "21q99mniELE",
    title: "Solo necesitaba ir a Japón — FULL ALBUM",
    kind: "Full Album",
  },
  {
    id: "UVsW_s0q1F0",
    title: "Solo necesitaba ir a Japón — Visual",
    kind: "Music Video",
  },
] as const;
