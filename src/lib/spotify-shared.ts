export type PreviewInfo = {
  previewUrl: string | null;
  spotifyUrl: string;
  durationMs: number;
};

export type PreviewMap = Record<string, Record<string, PreviewInfo>>;

/**
 * Compara títulos de forma flexible para emparejar la lista de jokki-data
 * con lo que devuelve Spotify (que puede cambiar puntuación, mayúsculas o
 * cómo se anotan los feats).
 */
export function normalizeTrackName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\(.*?\)/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
