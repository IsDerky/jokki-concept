import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Discography } from "@/components/discography";
import { Videos } from "@/components/videos";
import { ShopCollab } from "@/components/shop-collab";
import { SocialsFooter } from "@/components/socials-footer";
import { TopTracksLive } from "@/components/top-tracks-live";
import { SumiCursor } from "@/components/sumi-cursor";
import { Konami } from "@/components/konami";
import { SpotifyHud } from "@/components/spotify-hud";
import { ALBUMS } from "@/lib/jokki-data";
import { getPreviewMap } from "@/lib/spotify";

export default async function Home() {
  const previews = await getPreviewMap(ALBUMS.map((a) => a.spotifyAlbumId));

  return (
    <>
      <SumiCursor />
      <Konami />
      <SpotifyHud />
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <About />
        <Discography previews={previews} topTracksSlot={<TopTracksLive />} />
        <Videos />
        <ShopCollab />
        <SocialsFooter />
      </main>
    </>
  );
}
