import { NextResponse } from "next/server";
import { getReleases, getTopTracks } from "@/lib/spotify";

export const revalidate = 21600; // 6h

export async function GET() {
  const [releases, tracks] = await Promise.all([getReleases(), getTopTracks()]);
  return NextResponse.json({
    ok: Boolean(releases && tracks),
    releases: releases ?? [],
    tracks: tracks ?? [],
  });
}
