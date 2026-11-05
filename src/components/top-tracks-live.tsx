import { getTopTracks } from "@/lib/spotify";
import { TOP_TRACKS } from "@/lib/jokki-data";

/**
 * Server component. Con credenciales de Spotify usa su top de canciones en directo;
 * si no, la lista estática.
 */
export async function TopTracksLive() {
  const live = await getTopTracks();
  const items = live && live.length > 0
    ? live.slice(0, 5).map((t) => ({
        title: t.name,
        streams: formatPopularity(t.popularity),
        url: t.external_urls.spotify,
        cover: t.album.images[0]?.url,
      }))
    : TOP_TRACKS.map((t) => ({
        title: t.title,
        streams: t.streams,
        url: "https://open.spotify.com/artist/4d6NFauD483NG4W8lqQ6fD",
        cover: null,
      }));

  return (
    <div className="mt-16 border-t border-border/60 pt-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="w-6 h-px bg-bermellon" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-bermellon">
            Most Played
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-widest text-muted-foreground">
          {live ? "▸ LIVE · SPOTIFY" : "▸ CURATED"}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {items.map((track, i) => (
          <a
            key={track.title}
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-border bg-card p-4 hover:border-bermellon hover:-translate-y-1 hover:bg-bermellon/5 transition-all group relative overflow-hidden"
          >
            {track.cover && (
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity bg-cover bg-center"
                style={{ backgroundImage: `url(${track.cover})` }}
              />
            )}
            <div className="relative">
              <div className="font-mono text-[10px] text-bermellon mb-2">
                #{i + 1}
              </div>
              <div className="font-heading text-washi text-sm leading-tight mb-3 line-clamp-2 min-h-[2.5em] group-hover:text-bermellon transition-colors">
                {track.title}
              </div>
              <div className="font-mono text-xs text-muted-foreground group-hover:text-washi transition-colors">
                ▸ {track.streams}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function formatPopularity(pop: number): string {
  // La popularidad de Spotify va de 0 a 100; se pinta como barra relativa.
  return `${pop}/100 pop`;
}
