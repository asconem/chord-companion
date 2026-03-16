import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const KEY_PREFIX = "chord-companion:song:";
const LIBRARY_KEY = "chord-companion:library";

export interface SongData {
  voicingMap: Record<string, number>;
  lyricOffsets: Record<string, number>;
  syncMarks: number[];
  chatMessages: { role: "user" | "assistant"; content: string }[];
}

export interface LibraryEntry {
  hash: string;
  title: string;
  songText: string;
  savedAt: number; // epoch ms
}

// GET /api/song-data?hash=<sha256>         → load single song settings
// GET /api/song-data?action=list           → list all saved songs
export async function GET(req: NextRequest) {
  const action = req.nextUrl.searchParams.get("action");

  if (action === "list") {
    try {
      const library = await redis.get<LibraryEntry[]>(LIBRARY_KEY);
      return NextResponse.json({ library: library || [] });
    } catch (error: unknown) {
      console.error("Redis library list error:", error);
      return NextResponse.json({ library: [] });
    }
  }

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

// POST /api/song-data
//   body: { hash, data: SongData }                          → save song settings
//   body: { action: "save-to-library", hash, title, songText } → add to library
//   body: { action: "delete-from-library", hash }           → remove from library
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action } = body;

    if (action === "save-to-library") {
      const { hash, title, songText } = body;
      if (!hash || !title || !songText) {
        return NextResponse.json({ error: "hash, title, songText required" }, { status: 400 });
      }
      const library = (await redis.get<LibraryEntry[]>(LIBRARY_KEY)) || [];
      // Update existing or add new
      const idx = library.findIndex((e) => e.hash === hash);
      const entry: LibraryEntry = { hash, title, songText, savedAt: Date.now() };
      if (idx >= 0) {
        library[idx] = entry;
      } else {
        library.unshift(entry);
      }
      await redis.set(LIBRARY_KEY, library);
      return NextResponse.json({ ok: true });
    }

    if (action === "delete-from-library") {
      const { hash } = body;
      if (!hash) {
        return NextResponse.json({ error: "hash required" }, { status: 400 });
      }
      const library = (await redis.get<LibraryEntry[]>(LIBRARY_KEY)) || [];
      const filtered = library.filter((e) => e.hash !== hash);
      await redis.set(LIBRARY_KEY, filtered);
      // Also delete the song settings
      await redis.del(`${KEY_PREFIX}${hash}`);
      return NextResponse.json({ ok: true });
    }

    // Default: save song settings
    const { hash, data } = body;
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
