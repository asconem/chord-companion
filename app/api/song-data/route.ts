import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const KEY_PREFIX = "chord-companion:song:";

export interface SongData {
  voicingMap: Record<string, number>;
  lyricOffsets: Record<string, number>;
  syncMarks: number[];
}

// GET /api/song-data?hash=<sha256>
export async function GET(req: NextRequest) {
  const hash = req.nextUrl.searchParams.get("hash");
  if (!hash) {
    return NextResponse.json({ error: "hash param required" }, { status: 400 });
  }
  try {
    const data = await redis.get<SongData>(`${KEY_PREFIX}${hash}`);
    return NextResponse.json({ data: data || null });
  } catch (error: unknown) {
    console.error("Redis GET error:", error);
    return NextResponse.json({ error: "Failed to load" }, { status: 500 });
  }
}

// POST /api/song-data  body: { hash, data: SongData }
export async function POST(req: NextRequest) {
  try {
    const { hash, data } = await req.json();
    if (!hash || !data) {
      return NextResponse.json({ error: "hash and data required" }, { status: 400 });
    }
    // TTL: 90 days — if a song isn't loaded for 3 months, clear it
    await redis.set(`${KEY_PREFIX}${hash}`, data, { ex: 60 * 60 * 24 * 90 });
    return NextResponse.json({ ok: true });
  } catch (error: unknown) {
    console.error("Redis POST error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}
