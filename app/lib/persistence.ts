import { useRef, useCallback } from "react";

export interface SongData {
  voicingMap: Record<string, number>;
  lyricOffsets: Record<string, number>;
  syncMarks: number[];
}

/** SHA-256 hash of song text, hex-encoded. Used as Redis key. */
export async function hashSongText(text: string): Promise<string> {
  const encoded = new TextEncoder().encode(text.trim());
  const buf = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Load persisted song data from Redis via API route. Returns null if not found. */
export async function loadSongData(hash: string): Promise<SongData | null> {
  try {
    const res = await fetch(`/api/song-data?hash=${encodeURIComponent(hash)}`);
    if (!res.ok) return null;
    const { data } = await res.json();
    return data || null;
  } catch {
    console.error("Failed to load song data");
    return null;
  }
}

/** Save song data to Redis via API route. */
export async function saveSongData(hash: string, data: SongData): Promise<void> {
  try {
    await fetch("/api/song-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hash, data }),
    });
  } catch {
    console.error("Failed to save song data");
  }
}

/**
 * Hook: returns a debounced save function.
 * Batches rapid changes (voicing clicks, lyric drags) into a single write.
 */
export function useDebouncedSave(delayMs = 1200) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedSave = useCallback(
    (hash: string, data: SongData) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        saveSongData(hash, data);
      }, delayMs);
    },
    [delayMs]
  );

  return debouncedSave;
}
