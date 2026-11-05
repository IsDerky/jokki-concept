import "server-only";
import { normalizeTrackName } from "./spotify-shared";
import type { PreviewMap } from "./spotify-shared";

export { normalizeTrackName };
export type { PreviewMap, PreviewInfo } from "./spotify-shared";

const ARTIST_ID = "4d6NFauD483NG4W8lqQ6fD";

type SpotifyToken = { access_token: string; expires_in: number };
type TokenCache = { token: string; expiresAt: number } | null;

let cache: TokenCache = null;

async function getToken(): Promise<string | null> {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) return null;

  const now = Date.now();
  if (cache && cache.expiresAt > now + 30_000) return cache.token;

  const basic = Buffer.from(`${id}:${secret}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data: SpotifyToken = await res.json();
  cache = {
    token: data.access_token,
    expiresAt: now + data.expires_in * 1000,
  };
  return data.access_token;
}

export type SpotifyImage = { url: string; width: number; height: number };
export type SpotifyRelease = {
  id: string;
  name: string;
  album_type: string;
  release_date: string;
  total_tracks: number;
  images: SpotifyImage[];
  external_urls: { spotify: string };
};
export type SpotifyTrack = {
  id: string;
  name: string;
  preview_url: string | null;
  album: {
    name: string;
    release_date: string;
    images: SpotifyImage[];
  };
  external_urls: { spotify: string };
  popularity: number;
};

type ReleasesRes = { items: SpotifyRelease[] };
type TopTracksRes = { tracks: SpotifyTrack[] };

export async function getReleases(): Promise<SpotifyRelease[] | null> {
  const token = await getToken();
  if (!token) return null;
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=album,single&limit=12&market=ES`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 * 60 * 6 }, // 6h cache
    },
  );
  if (!res.ok) return null;
  const data: ReleasesRes = await res.json();
  return data.items;
}

export async function getTopTracks(): Promise<SpotifyTrack[] | null> {
  const token = await getToken();
  if (!token) return null;
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${ARTIST_ID}/top-tracks?market=ES`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 * 60 * 6 },
    },
  );
  if (!res.ok) return null;
  const data: TopTracksRes = await res.json();
  return data.tracks;
}

export type SpotifySimpleTrack = {
  id: string;
  name: string;
  preview_url: string | null;
  duration_ms: number;
  external_urls: { spotify: string };
};

type AlbumTracksRes = { items: SpotifySimpleTrack[] };

export async function getAlbumTracks(
  albumId: string,
): Promise<SpotifySimpleTrack[] | null> {
  const token = await getToken();
  if (!token) return null;
  const res = await fetch(
    `https://api.spotify.com/v1/albums/${albumId}/tracks?market=ES&limit=50`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 * 60 * 6 },
    },
  );
  if (!res.ok) return null;
  const data: AlbumTracksRes = await res.json();
  return data.items;
}

/**
 * Devuelve un mapa: albumId → (nombre de canción → preview).
 * Los nombres se normalizan (ver normalizeTrackName) para compararlos de
 * forma flexible con la lista de jokki-data.
 */
export async function getPreviewMap(
  albumIds: readonly (string | null)[],
): Promise<PreviewMap> {
  const results = await Promise.all(
    albumIds.map(async (id) => {
      if (!id) return { id, tracks: null };
      const tracks = await getAlbumTracks(id);
      return { id, tracks };
    }),
  );
  const map: PreviewMap = {};
  for (const { id, tracks } of results) {
    if (!id || !tracks) continue;
    map[id] = {};
    for (const t of tracks) {
      map[id][normalizeTrackName(t.name)] = {
        previewUrl: t.preview_url,
        spotifyUrl: t.external_urls.spotify,
        durationMs: t.duration_ms,
      };
    }
  }
  return map;
}
