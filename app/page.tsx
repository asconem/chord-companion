"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ChordVoicing,
  lookupChord,
  isChordToken,
  isChordLine,
  extractUniqueChords,
  SAMPLE_SONG,
} from "./lib/chords";

/* ═══════════════════════════════════════════════════════════════
   SVG CHORD DIAGRAM — HORIZONTAL (nut on left, like looking down at neck)
   Strings: low E at top, high e at bottom. Fret numbers at bottom.
   ═══════════════════════════════════════════════════════════════ */
function HorizontalChordDiagram({
  voicing,
  width = 100,
}: {
  voicing: ChordVoicing;
  width?: number;
}) {
  const { frets, baseFret } = voicing;
  const vw = 112;
  const vh = 76;
  const xOff = 18;
  const yOff = 7;
  const fretSpacing = 17;
  const strSpacing = 10;
  const fretCount = 5;
  const dotR = 3.8;
  const strAreaH = strSpacing * 5;

  const maxFret = Math.max(...frets.filter((f) => f > 0));
  const minFret = Math.min(...frets.filter((f) => f > 0));
  const displayBase = baseFret > 1 ? baseFret : maxFret <= 5 ? 1 : minFret;
  const height = width * (vh / vw);

  return (
    <svg viewBox={`0 0 ${vw} ${vh}`} style={{ width, height, display: "block" }}>
      <rect width={vw} height={vh} rx="5" fill="#1a1a2e" />
      {/* Nut */}
      {displayBase === 1 && (
        <rect x={xOff - 3} y={yOff - 1} width={4} height={strAreaH + 2} rx={1.5} fill="#f0e68c" />
      )}
      {/* Fret lines (vertical) */}
      {Array.from({ length: fretCount + 1 }).map((_, i) => (
        <line key={`fr${i}`} x1={xOff + i * fretSpacing} y1={yOff} x2={xOff + i * fretSpacing} y2={yOff + strAreaH} stroke="#3a3a5a" strokeWidth={i === 0 ? 1.5 : 0.5} />
      ))}
      {/* String lines (horizontal) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={`st${i}`} x1={xOff} y1={yOff + i * strSpacing} x2={xOff + fretCount * fretSpacing} y2={yOff + i * strSpacing} stroke="#5a5a7a" strokeWidth={0.7} />
      ))}
      {/* Dots and markers — reversed: low E (index 0) at bottom, high e (index 5) at top */}
      {frets.map((f, i) => {
        const y = yOff + (5 - i) * strSpacing;
        if (f === -1) return <text key={i} x={xOff - 7} y={y + 3.5} fill="#ff6b6b" fontSize="8" textAnchor="middle" fontFamily="sans-serif">×</text>;
        if (f === 0) return <circle key={i} cx={xOff - 7} cy={y} r={dotR - 1} fill="none" stroke="#a0e080" strokeWidth={1} />;
        const relFret = baseFret > 1 ? f : f - (displayBase - 1);
        const x = xOff + (relFret - 0.5) * fretSpacing;
        return <circle key={i} cx={x} cy={y} r={dotR} fill="#e8b4f8" />;
      })}
      {/* Fret numbers along the bottom */}
      {Array.from({ length: fretCount }).map((_, i) => (
        <text key={`fn${i}`} x={xOff + (i + 0.5) * fretSpacing} y={yOff + strAreaH + 10} fill="#6a6a8a" fontSize="7" textAnchor="middle" fontFamily="'JetBrains Mono', monospace">
          {displayBase + i}
        </text>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   VOICING CONFIG MODAL
   ═══════════════════════════════════════════════════════════════ */
function ChordConfigModal({
  chords, voicingMap, onSave, onClose,
}: {
  chords: string[];
  voicingMap: Record<string, number>;
  onSave: (map: Record<string, number>) => void;
  onClose: () => void;
}) {
  const [local, setLocal] = useState<Record<string, number>>({ ...voicingMap });

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        width: "95%", maxWidth: 780, maxHeight: "85vh", overflowY: "auto",
        borderRadius: 16, padding: 32,
        background: "linear-gradient(135deg, #12122a 0%, #1a1a3e 100%)",
        border: "1px solid #2a2a5a",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, color: "#e8b4f8", fontFamily: "'JetBrains Mono', monospace", fontSize: 20, letterSpacing: 1, fontWeight: 700 }}>
            Configure Chord Voicings
          </h2>
          <button onClick={onClose} style={{ background: "none", border: "1px solid #3a3a5a", color: "#8a8a9a", borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 13 }}>
            Cancel
          </button>
        </div>
        <p style={{ color: "#6a6a8a", fontSize: 13, marginBottom: 20 }}>
          Select your preferred voicing for each chord. The chosen diagram displays inline while you play.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {chords.map((chord) => {
            const voicings = lookupChord(chord) || [];
            return (
              <div key={chord} style={{ background: "#0e0e1f", borderRadius: 12, padding: 16, border: "1px solid #1e1e3e" }}>
                <div style={{ color: "#f0e68c", fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, marginBottom: 12 }}>
                  {chord}
                </div>
                {voicings.length === 0 ? (
                  <div style={{ color: "#5a5a6a", fontSize: 12, fontStyle: "italic" }}>No voicings in database</div>
                ) : (
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {voicings.map((v, idx) => (
                      <div key={idx}
                        onClick={() => setLocal((p) => ({ ...p, [chord]: idx }))}
                        style={{
                          cursor: "pointer", borderRadius: 10, padding: 8,
                          border: `2px solid ${local[chord] === idx ? "#e8b4f8" : "#1e1e3e"}`,
                          background: local[chord] === idx ? "rgba(232,180,248,0.08)" : "transparent",
                          transition: "all 0.2s",
                        }}>
                        <HorizontalChordDiagram voicing={v} width={110} />
                        <div style={{ color: local[chord] === idx ? "#e8b4f8" : "#5a5a7a", fontSize: 10, textAlign: "center", marginTop: 4, maxWidth: 110, lineHeight: "1.2" }}>
                          {v.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24, gap: 12 }}>
          <button onClick={onClose} style={{ background: "none", border: "1px solid #3a3a5a", color: "#8a8a9a", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 14 }}>
            Cancel
          </button>
          <button onClick={() => onSave(local)} style={{
            background: "linear-gradient(135deg, #7b2ff7 0%, #e8b4f8 100%)", border: "none", color: "#0e0e1f",
            borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontSize: 14, fontWeight: 600,
          }}>Save Voicings</button>
        </div>
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   SONG RENDERER — Paginated teleprompter
   4 rows per page, max 4 chords per row, big readable diagrams
   Navigate with arrows or buttons
   ═══════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════
   SONG RENDERER — Paginated teleprompter with audio sync
   Modes: Manual | Sync (record timestamps) | Play (synced playback)
   ═══════════════════════════════════════════════════════════════ */
function SongRenderer({ lines, voicingMap, showDiagrams }: {
  lines: string[];
  voicingMap: Record<string, number>;
  showDiagrams: boolean;
}) {
  const MONO = "'JetBrains Mono', monospace";
  const ROWS_PER_PAGE = 3;
  // Diagram width: calculated from viewport height
  // Header ~77px, palette ~36px, nav ~44px, audio bar ~40px = ~197px overhead
  // Remaining split 3 ways, each row: diagram + chord name(20) + lyric(18) = 38px text
  // Use 85% of theoretical max to ensure margin
  const availH = typeof window !== "undefined" ? window.innerHeight - 200 : 600;
  const perRow = availH / ROWS_PER_PAGE;
  const DIAGRAM_W = Math.min(180, Math.max(90, (perRow - 40) / 0.6786 * 0.85));

  const [page, setPage] = useState(0);
  // Per-segment horizontal nudge offsets: keyed by "rowIdx-chordIdx"
  const [lyricOffsets, setLyricOffsets] = useState<Record<string, number>>({});
  const dragRef = useRef<{ key: string; startX: number; startOffset: number } | null>(null);

  // Audio state
  const [audioFile, setAudioFile] = useState<string | null>(null);
  const [audioName, setAudioName] = useState("");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioTime, setAudioTime] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const animRef = useRef<number>(0);

  type SyncMode = "manual" | "syncing" | "synced";
  const [mode, setMode] = useState<SyncMode>("manual");
  const [syncMarks, setSyncMarks] = useState<number[]>([]);
  const syncingPageRef = useRef(0);

  type Row = {
    section: string | null;
    chords: { name: string; col: number }[];
    chordLine: string;
    lyricLine: string | null;
  };

  const rows: Row[] = [];
  let i = 0;
  let pendingSection: string | null = null;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) { i++; continue; }
    if (/^\[.*\]$/.test(trimmed) || /^(Verse|Chorus|Bridge|Intro|Outro|Pre-Chorus|Solo|Interlude)/i.test(trimmed)) {
      pendingSection = trimmed; i++;
    } else if (isChordLine(line)) {
      const chords: { name: string; col: number }[] = [];
      const regex = /(\S+)/g;
      let match: RegExpExecArray | null;
      while ((match = regex.exec(line)) !== null) {
        if (isChordToken(match[1])) chords.push({ name: match[1], col: match.index });
      }
      const nextLine = i + 1 < lines.length && !isChordLine(lines[i + 1]) && lines[i + 1].trim() ? lines[i + 1] : null;
      rows.push({ section: pendingSection, chords, chordLine: line, lyricLine: nextLine });
      pendingSection = null;
      i += nextLine !== null ? 2 : 1;
    } else {
      rows.push({ section: pendingSection, chords: [], chordLine: "", lyricLine: line });
      pendingSection = null; i++;
    }
  }

  const totalPages = Math.ceil(rows.length / ROWS_PER_PAGE);
  const clampedPage = Math.min(page, Math.max(0, totalPages - 1));
  const pageRows = rows.slice(clampedPage * ROWS_PER_PAGE, (clampedPage + 1) * ROWS_PER_PAGE);

  // Audio time tracking via requestAnimationFrame
  const trackTime = useCallback(() => {
    if (audioRef.current) {
      const t = audioRef.current.currentTime;
      setAudioTime(t);
      if (mode === "synced" && syncMarks.length > 0) {
        let targetPage = 0;
        for (let s = 0; s < syncMarks.length; s++) {
          if (t >= syncMarks[s]) targetPage = s + 1;
        }
        setPage(Math.min(targetPage, totalPages - 1));
      }
    }
    animRef.current = requestAnimationFrame(trackTime);
  }, [mode, syncMarks, totalPages]);

  useEffect(() => {
    if (audioPlaying) {
      animRef.current = requestAnimationFrame(trackTime);
    } else {
      cancelAnimationFrame(animRef.current);
    }
    return () => cancelAnimationFrame(animRef.current);
  }, [audioPlaying, trackTime]);

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAudioName(file.name);
    setAudioFile(URL.createObjectURL(file));
    setMode("manual"); setSyncMarks([]); setPage(0);
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioPlaying) { audioRef.current.pause(); setAudioPlaying(false); }
    else { audioRef.current.play(); setAudioPlaying(true); }
  };

  const startSync = () => {
    if (!audioRef.current) return;
    setSyncMarks([]); setPage(0); syncingPageRef.current = 0;
    audioRef.current.currentTime = 0;
    audioRef.current.play(); setAudioPlaying(true); setMode("syncing");
  };

  const recordMark = useCallback(() => {
    if (!audioRef.current || mode !== "syncing") return;
    const t = audioRef.current.currentTime;
    setSyncMarks(prev => [...prev, t]);
    syncingPageRef.current += 1;
    if (syncingPageRef.current >= totalPages - 1) {
      setMode("synced");
      audioRef.current.pause(); setAudioPlaying(false);
      audioRef.current.currentTime = 0; setPage(0);
    } else {
      setPage(syncingPageRef.current);
    }
  }, [mode, totalPages]);

  const startSyncedPlayback = () => {
    if (!audioRef.current || syncMarks.length === 0) return;
    audioRef.current.currentTime = 0; setPage(0);
    audioRef.current.play(); setAudioPlaying(true);
  };

  const stopPlayback = useCallback(() => {
    if (audioRef.current) { audioRef.current.pause(); setAudioPlaying(false); }
    if (mode === "syncing") { setMode("manual"); setSyncMarks([]); }
  }, [mode]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't capture keys when typing in an input or textarea
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (mode === "syncing") {
        if (e.key === " " || e.key === "ArrowRight") { e.preventDefault(); recordMark(); }
        if (e.key === "Escape") { e.preventDefault(); stopPlayback(); }
      } else if (mode !== "synced" || !audioPlaying) {
        if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); setPage(p => Math.min(p + 1, totalPages - 1)); }
        if (e.key === "ArrowLeft") { e.preventDefault(); setPage(p => Math.max(0, p - 1)); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode, audioPlaying, recordMark, stopPlayback, totalPages]);

  const fmt = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden" }}>
      {audioFile && (
        <audio ref={audioRef} src={audioFile} preload="auto"
          onLoadedMetadata={() => { if (audioRef.current) setAudioDuration(audioRef.current.duration); }}
          onEnded={() => { setAudioPlaying(false); if (mode === "syncing") { setMode("synced"); setPage(0); } }}
        />
      )}

      {/* Audio bar */}
      {audioFile && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10, padding: "6px 12px",
          background: "#0a0a18", borderBottom: "1px solid #1a1a3a", flexShrink: 0,
        }}>
          <button onClick={toggleAudio} style={{
            background: "none", border: "1px solid #2a2a4a", color: audioPlaying ? "#a0e080" : "#8a8a9a",
            borderRadius: 6, width: 28, height: 28, cursor: "pointer",
            fontFamily: MONO, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center",
          }}>{audioPlaying ? "⏸" : "▶"}</button>

          <span style={{ color: "#5a5a7a", fontFamily: MONO, fontSize: 10, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {audioName}
          </span>
          <span style={{ color: "#8a8a9a", fontFamily: MONO, fontSize: 11 }}>
            {fmt(audioTime)}/{fmt(audioDuration)}
          </span>

          {/* Progress bar */}
          <div style={{ flex: 1, height: 6, background: "#1a1a3a", borderRadius: 3, cursor: "pointer", position: "relative" }}
            onClick={(e) => {
              if (!audioRef.current) return;
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              audioRef.current.currentTime = ((e.clientX - rect.left) / rect.width) * audioDuration;
            }}>
            <div style={{
              width: `${audioDuration ? (audioTime / audioDuration) * 100 : 0}%`,
              height: "100%", background: "linear-gradient(90deg, #7b2ff7, #e8b4f8)",
              borderRadius: 3, transition: "width 0.1s linear",
            }} />
            {syncMarks.map((t, si) => (
              <div key={si} style={{
                position: "absolute", left: `${(t / audioDuration) * 100}%`, top: -2,
                width: 2, height: 10, background: "#f0e68c", borderRadius: 1,
              }} />
            ))}
          </div>

          <div style={{ width: 1, height: 20, background: "#2a2a4a" }} />

          {mode === "manual" && (
            <button onClick={startSync} style={{
              background: "linear-gradient(135deg, #f0e68c, #c8a820)", border: "none",
              borderRadius: 8, padding: "4px 12px", color: "#0e0e1f",
              fontFamily: MONO, fontSize: 11, fontWeight: 700, cursor: "pointer",
            }}>Sync</button>
          )}
          {mode === "syncing" && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff6b6b", animation: "pulse-dots 1s infinite" }} />
              <span style={{ color: "#ff6b6b", fontFamily: MONO, fontSize: 10, fontWeight: 700 }}>SYNCING</span>
              <button onClick={recordMark} style={{
                background: "#ff6b6b", border: "none", borderRadius: 6,
                padding: "3px 8px", color: "#fff", fontFamily: MONO, fontSize: 10,
                fontWeight: 700, cursor: "pointer",
              }}>Tap ({syncMarks.length}/{totalPages - 1})</button>
              <button onClick={stopPlayback} style={{
                background: "none", border: "1px solid #3a3a5a", borderRadius: 6,
                padding: "3px 6px", color: "#8a8a9a", fontFamily: MONO, fontSize: 9, cursor: "pointer",
              }}>✕</button>
            </div>
          )}
          {mode === "synced" && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#a0e080" }} />
              {!audioPlaying ? (
                <button onClick={startSyncedPlayback} style={{
                  background: "linear-gradient(135deg, #a0e080, #60c040)", border: "none",
                  borderRadius: 8, padding: "4px 12px", color: "#0e0e1f",
                  fontFamily: MONO, fontSize: 11, fontWeight: 700, cursor: "pointer",
                }}>▶ Synced</button>
              ) : (
                <button onClick={stopPlayback} style={{
                  background: "#ff6b6b", border: "none", borderRadius: 8,
                  padding: "4px 12px", color: "#fff",
                  fontFamily: MONO, fontSize: 11, fontWeight: 700, cursor: "pointer",
                }}>⏹ Stop</button>
              )}
              <button onClick={() => { setMode("manual"); setSyncMarks([]); }} style={{
                background: "none", border: "1px solid #3a3a5a", borderRadius: 6,
                padding: "3px 6px", color: "#5a5a7a", fontFamily: MONO, fontSize: 9, cursor: "pointer",
              }}>Re-sync</button>
            </div>
          )}
        </div>
      )}

      {/* Rows */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-evenly", padding: "4px 0", overflow: "hidden", minHeight: 0 }}>
        {pageRows.map((row, ri) => {
          const chordSlice = row.chords.slice(0, 4);
          const lyricSegments: string[] = [];
          if (row.lyricLine && chordSlice.length > 0) {
            const lyric = row.lyricLine;
            // Pre-compute split points snapped to word boundaries, no overlaps
            const splitPoints: number[] = [];
            for (let ci = 1; ci < chordSlice.length; ci++) {
              let sp = chordSlice[ci].col;
              // If mid-word, prefer the space before the word
              if (sp > 0 && sp < lyric.length && lyric[sp] !== " " && lyric[sp - 1] !== " ") {
                // Scan backward to find start of this word, split before it
                let back = sp;
                while (back > 0 && lyric[back - 1] !== " ") back--;
                sp = back;
              }
              splitPoints.push(sp);
            }
            // Build segments from split points
            let cursor = 0;
            for (let ci = 0; ci < chordSlice.length; ci++) {
              const end = ci < splitPoints.length ? splitPoints[ci] : lyric.length;
              lyricSegments.push(lyric.substring(cursor, end).trim());
              cursor = end;
            }
          }
          return (
            <div key={ri} style={{ marginBottom: 0 }}>
              {row.section && (
                <div style={{ color: "#f0e68c", fontFamily: MONO, fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>
                  {row.section}
                </div>
              )}
              {row.chords.length > 0 ? (
                <div style={{ display: "flex", gap: 16 }}>
                  {chordSlice.map((c, j) => {
                    const voicings = lookupChord(c.name);
                    const sel = voicingMap[c.name] ?? 0;
                    const v = voicings ? voicings[sel] : null;
                    const absRowIdx = clampedPage * ROWS_PER_PAGE + ri;
                    const offsetKey = `${absRowIdx}-${j}`;
                    const offset = lyricOffsets[offsetKey] || 0;
                    return (
                      <div key={j} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {showDiagrams && v && <HorizontalChordDiagram voicing={v} width={DIAGRAM_W} />}
                        <div style={{ color: "#e8b4f8", fontFamily: MONO, fontWeight: 700, fontSize: Math.max(14, DIAGRAM_W * 0.1), marginTop: 1 }}>{c.name}</div>
                        {lyricSegments[j] && (
                          <div
                            style={{
                              color: "#c8c8e0", fontFamily: MONO,
                              fontSize: Math.max(13, DIAGRAM_W * 0.09),
                              marginTop: 1, textAlign: "center", lineHeight: "1.2",
                              transform: `translateX(${offset}px)`,
                              cursor: "grab", userSelect: "none",
                            }}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              dragRef.current = { key: offsetKey, startX: e.clientX, startOffset: offset };
                              const onMove = (ev: MouseEvent) => {
                                if (!dragRef.current) return;
                                const dx = ev.clientX - dragRef.current.startX;
                                setLyricOffsets(prev => ({ ...prev, [dragRef.current!.key]: dragRef.current!.startOffset + dx }));
                              };
                              const onUp = () => {
                                dragRef.current = null;
                                window.removeEventListener("mousemove", onMove);
                                window.removeEventListener("mouseup", onUp);
                              };
                              window.addEventListener("mousemove", onMove);
                              window.addEventListener("mouseup", onUp);
                            }}
                          >
                            {lyricSegments[j].trim()}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                row.lyricLine && <div style={{ fontFamily: MONO, fontSize: 18, color: "#c8c8e0", lineHeight: "1.4" }}>{row.lyricLine}</div>
              )}
            </div>
          );
        })}

        {/* Syncing mode overlay hint */}
        {mode === "syncing" && (
          <div style={{
            position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50%)",
            background: "rgba(255,107,107,0.15)", border: "1px solid #ff6b6b",
            borderRadius: 10, padding: "8px 20px",
            color: "#ff6b6b", fontFamily: MONO, fontSize: 13, fontWeight: 700,
          }}>
            Press SPACE or tap Mark when chords change
          </div>
        )}
      </div>

      {/* Navigation + Upload */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: 16,
        padding: "8px 0", borderTop: "1px solid #1a1a3a", flexShrink: 0,
      }}>
        <button onClick={() => setPage(Math.max(0, clampedPage - 1))} disabled={clampedPage === 0}
          style={{
            background: "none", border: "1px solid #2a2a4a",
            color: clampedPage === 0 ? "#2a2a4a" : "#8a8a9a",
            borderRadius: 8, padding: "6px 16px", cursor: clampedPage === 0 ? "not-allowed" : "pointer",
            fontFamily: MONO, fontSize: 13,
          }}>◀</button>
        <span style={{ color: "#5a5a7a", fontFamily: MONO, fontSize: 13, minWidth: 50, textAlign: "center" }}>
          {clampedPage + 1}/{totalPages}
        </span>
        <button onClick={() => setPage(Math.min(totalPages - 1, clampedPage + 1))} disabled={clampedPage >= totalPages - 1}
          style={{
            background: clampedPage >= totalPages - 1 ? "none" : "linear-gradient(135deg, #7b2ff7, #e8b4f8)",
            border: clampedPage >= totalPages - 1 ? "1px solid #2a2a4a" : "none",
            color: clampedPage >= totalPages - 1 ? "#2a2a4a" : "#0e0e1f",
            borderRadius: 8, padding: "6px 16px", cursor: clampedPage >= totalPages - 1 ? "not-allowed" : "pointer",
            fontFamily: MONO, fontSize: 13, fontWeight: 700,
          }}>▶</button>
        <div style={{ width: 1, height: 24, background: "#2a2a4a", margin: "0 4px" }} />
        {!audioFile ? (
          <label style={{
            background: "rgba(240,230,140,0.08)", border: "1px solid #3a3a2a",
            borderRadius: 8, padding: "5px 14px", color: "#f0e68c",
            fontFamily: MONO, fontSize: 12, fontWeight: 600, cursor: "pointer",
          }}>
            Upload Audio
            <input type="file" accept="audio/*" onChange={handleAudioUpload} style={{ display: "none" }} />
          </label>
        ) : (
          <button onClick={() => { setAudioFile(null); setAudioName(""); setMode("manual"); setSyncMarks([]); stopPlayback(); }}
            style={{
              background: "none", border: "1px solid #2a2a4a", borderRadius: 8,
              padding: "5px 10px", color: "#5a5a7a", fontFamily: MONO, fontSize: 11, cursor: "pointer",
            }}>Remove Audio</button>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CHAT PANEL
   ═══════════════════════════════════════════════════════════════ */
interface ChatMessage { role: "user" | "assistant"; content: string }

function ChatPanel({ songText, voicingMap }: { songText: string; voicingMap: Record<string, number> }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const updated: ChatMessage[] = [...messages, { role: "user", content: userMsg }];
    setMessages(updated);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated, songText, voicingMap }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error — please try again." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "#0a0a1a" }}>
      <div style={{ padding: "14px 16px", borderBottom: "1px solid #1e1e3e", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: songText ? "#a0e080" : "#5a5a6a", boxShadow: songText ? "0 0 8px rgba(160,224,128,0.5)" : "none" }} />
        <span style={{ color: "#8a8a9a", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1 }}>THEORY COMPANION</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.length === 0 && (
          <div style={{ color: "#3a3a5a", fontSize: 13, textAlign: "center", marginTop: 40, lineHeight: "1.8" }}>
            {songText ? "Song loaded. Ask about chord progressions, key, theory — anything." : "Load a song to start discussing music theory."}
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "85%", padding: "10px 14px",
            background: m.role === "user" ? "linear-gradient(135deg, #2a1a4e, #3a2a6e)" : "#12122a",
            border: m.role === "user" ? "1px solid #4a3a7e" : "1px solid #1e1e3e",
            borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
            color: "#c8c8e0", fontSize: 13, lineHeight: "1.6", whiteSpace: "pre-wrap",
          }}>{m.content}</div>
        ))}
        {loading && (
          <div style={{ color: "#5a5a7a", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, display: "flex", gap: 4 }}>
            <span style={{ animation: "pulse-dots 1.5s infinite" }}>thinking</span>
            <span style={{ animation: "pulse-dots 1.5s infinite 0.3s" }}>.</span>
            <span style={{ animation: "pulse-dots 1.5s infinite 0.6s" }}>.</span>
          </div>
        )}
        <div ref={endRef} />
      </div>
      <div style={{ padding: 12, borderTop: "1px solid #1e1e3e", display: "flex", gap: 8 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder={songText ? "Ask about the theory..." : "Load a song first..."}
          disabled={!songText}
          style={{ flex: 1, background: "#12122a", border: "1px solid #2a2a4a", borderRadius: 10, padding: "10px 14px", color: "#c8c8e0", fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, outline: "none" }}
        />
        <button onClick={send} disabled={!songText || loading}
          style={{ background: "linear-gradient(135deg, #7b2ff7, #e8b4f8)", border: "none", borderRadius: 10, padding: "10px 18px", color: "#0e0e1f", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, cursor: songText ? "pointer" : "not-allowed", opacity: songText ? 1 : 0.4 }}>
          Send
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════ */
export default function ChordCompanion() {
  const [songText, setSongText] = useState("");
  const [parsedLines, setParsedLines] = useState<string[]>([]);
  const [uniqueChords, setUniqueChords] = useState<string[]>([]);
  const [voicingMap, setVoicingMap] = useState<Record<string, number>>({});
  const [showConfig, setShowConfig] = useState(false);
  const [palettePopover, setPalettePopover] = useState<{ chord: string; x: number; y: number } | null>(null);

  // Close palette popover on outside click
  useEffect(() => {
    if (!palettePopover) return;
    const handler = () => setPalettePopover(null);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [palettePopover]);
  const [showDiagrams, setShowDiagrams] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [inputText, setInputText] = useState("");
  const [chatCollapsed, setChatCollapsed] = useState(false);

  const loadSong = useCallback((text: string) => {
    const lines = text.split("\n");
    setParsedLines(lines);
    setSongText(text);
    const chords = extractUniqueChords(lines);
    setUniqueChords(chords);
    const defaultMap: Record<string, number> = {};
    chords.forEach((c) => (defaultMap[c] = 0));
    setVoicingMap(defaultMap);
    setIsLoaded(true);
    setShowConfig(true);
  }, []);

  const reset = () => {
    setIsLoaded(false); setSongText(""); setParsedLines([]);
    setUniqueChords([]); setVoicingMap({}); setInputText("");
  };

  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
      minHeight: "100vh", width: "100%",
      fontFamily: "'IBM Plex Sans', sans-serif",
      background: "linear-gradient(180deg, #08081a 0%, #0e0e24 50%, #08081a 100%)",
      color: "#c8c8e0", overflow: "hidden",
    }}>
      {/* ── HEADER ── */}
      <div style={{
        padding: "20px 28px", borderBottom: "1px solid #1a1a3a",
        display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: "linear-gradient(135deg, #7b2ff7, #e8b4f8)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
          }}>♬</div>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: "#e8b4f8", letterSpacing: 1 }}>
              Chord Companion
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#5a5a7a", letterSpacing: 2, marginTop: 2 }}>
              INTERACTIVE CHORD SHEET
            </div>
          </div>
        </div>
        {isLoaded && (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button onClick={() => setShowDiagrams(!showDiagrams)} style={{
              background: showDiagrams ? "rgba(232,180,248,0.12)" : "none",
              border: `1px solid ${showDiagrams ? "#5a3a8e" : "#2a2a4a"}`,
              color: showDiagrams ? "#e8b4f8" : "#5a5a7a",
              borderRadius: 8, padding: "7px 14px", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 0.5,
            }}>{showDiagrams ? "Diagrams ON" : "Diagrams OFF"}</button>
            <button onClick={() => setShowConfig(true)} style={{
              background: "rgba(240,230,140,0.08)", border: "1px solid #3a3a2a", color: "#f0e68c",
              borderRadius: 8, padding: "7px 14px", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: 0.5,
            }}>Voicings</button>
            <button onClick={reset} style={{
              background: "none", border: "1px solid #2a2a4a", color: "#5a5a7a",
              borderRadius: 8, padding: "7px 14px", cursor: "pointer",
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            }}>New Song</button>
          </div>
        )}
      </div>

      {/* ── CONTENT ── */}
      {!isLoaded ? (
        /* ── UPLOAD SCREEN ── */
        <div style={{
          width: "100%", display: "flex", justifyContent: "center",
          paddingTop: 60, paddingBottom: 60,
          overflowY: "auto", height: "calc(100vh - 77px)",
        }}>
          <div style={{ width: "100%", maxWidth: 640, padding: "0 24px", animation: "fadeIn 0.5s ease" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 28, fontWeight: 600, color: "#e8b4f8", fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>
                Load a Song
              </div>
              <div style={{ color: "#5a5a7a", fontSize: 14, lineHeight: "1.6" }}>
                Paste chord sheet text below. Chords on their own lines are detected automatically.
              </div>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Paste your chord sheet here...\n\nExample format:\n\n[Verse]\nAm        C\nHere are some lyrics\nG         D\nMore lyrics go here`}
              style={{
                display: "block", width: "100%", minHeight: 300, background: "#0e0e1f",
                border: "1px solid #2a2a4a", borderRadius: 12, padding: 16,
                color: "#c8c8e0", fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13, lineHeight: "1.6", resize: "vertical", outline: "none",
                boxSizing: "border-box",
              }}
            />
            <div style={{ display: "flex", gap: 12, marginTop: 16, justifyContent: "center" }}>
              <button onClick={() => inputText.trim() && loadSong(inputText)}
                disabled={!inputText.trim()}
                style={{
                  background: inputText.trim() ? "linear-gradient(135deg, #7b2ff7, #e8b4f8)" : "#1a1a2e",
                  border: "none", borderRadius: 10, padding: "12px 32px",
                  color: inputText.trim() ? "#0e0e1f" : "#3a3a5a", fontWeight: 700,
                  cursor: inputText.trim() ? "pointer" : "not-allowed",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 14, letterSpacing: 0.5,
                }}>Load Song</button>
              <button onClick={() => { setInputText(SAMPLE_SONG); loadSong(SAMPLE_SONG); }}
                style={{
                  background: "none", border: "1px solid #2a2a4a", color: "#8a8a9a",
                  borderRadius: 10, padding: "12px 24px", cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                }}>Try Sample</button>
            </div>
          </div>
        </div>
      ) : (
        /* ── SONG VIEW ── */
        <div style={{ display: "flex", width: "100%", height: "calc(100vh - 77px)", overflow: "hidden" }}>
          {/* Song area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "12px 24px", overflow: "hidden" }}>
            {/* Chord palette — click to change voicings */}
            <div style={{
              display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8, flexShrink: 0,
              padding: "8px 12px", background: "#0a0a18", borderRadius: 10, border: "1px solid #1a1a3a",
              position: "relative",
            }}>
              <span style={{ color: "#5a5a7a", fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: 1, alignSelf: "center", marginRight: 4 }}>
                CHORDS:
              </span>
              {uniqueChords.map((c) => {
                const isActive = palettePopover?.chord === c;
                return (
                  <span key={c} onClick={(e) => {
                    e.stopPropagation();
                    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    setPalettePopover(isActive ? null : { chord: c, x: rect.left, y: rect.bottom + 6 });
                  }} style={{
                    background: isActive ? "rgba(232,180,248,0.2)" : "rgba(232,180,248,0.08)",
                    border: `1px solid ${isActive ? "#e8b4f8" : "#2a1a4e"}`,
                    borderRadius: 6, padding: "2px 8px", color: "#e8b4f8",
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600,
                    cursor: "pointer", transition: "all 0.15s",
                  }}>{c}</span>
                );
              })}
            </div>
            {/* Palette voicing popover */}
            {palettePopover && (() => {
              const voicings = lookupChord(palettePopover.chord);
              if (!voicings || voicings.length === 0) return null;
              const currentSel = voicingMap[palettePopover.chord] ?? 0;
              return (
                <div onClick={(e) => e.stopPropagation()}
                  style={{
                    position: "fixed",
                    left: Math.min(palettePopover.x, window.innerWidth - 500),
                    top: palettePopover.y,
                    zIndex: 999,
                    background: "linear-gradient(135deg, #12122a 0%, #1a1a3e 100%)",
                    border: "1px solid #3a3a6a", borderRadius: 12, padding: 16,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.6)", maxWidth: 560,
                  }}>
                  <div style={{ color: "#f0e68c", fontFamily: "'JetBrains Mono', monospace", fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
                    {palettePopover.chord} — select voicing
                  </div>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {voicings.map((v, idx) => (
                      <div key={idx}
                        onClick={() => {
                          setVoicingMap(prev => ({ ...prev, [palettePopover.chord]: idx }));
                          setPalettePopover(null);
                        }}
                        style={{
                          cursor: "pointer", borderRadius: 10, padding: 8,
                          border: `2px solid ${currentSel === idx ? "#e8b4f8" : "#1e1e3e"}`,
                          background: currentSel === idx ? "rgba(232,180,248,0.1)" : "transparent",
                          transition: "all 0.15s",
                        }}>
                        <HorizontalChordDiagram voicing={v} width={130} />
                        <div style={{ color: currentSel === idx ? "#e8b4f8" : "#5a5a7a", fontSize: 10, textAlign: "center", marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>
                          {v.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
            <div style={{ flex: 1, overflow: "hidden" }}>
              <SongRenderer lines={parsedLines} voicingMap={voicingMap} showDiagrams={showDiagrams} />
            </div>
          </div>
          {/* Chat panel */}
          <div style={{
            width: chatCollapsed ? 44 : 380, minWidth: chatCollapsed ? 44 : 380,
            maxWidth: chatCollapsed ? 44 : 380,
            height: "100%", borderLeft: "1px solid #1a1a3a",
            transition: "all 0.3s ease", position: "relative", flexShrink: 0,
            overflow: "hidden",
          }}>
            <button onClick={() => setChatCollapsed(!chatCollapsed)} style={{
              position: "absolute", left: -14, top: 14, width: 28, height: 28,
              borderRadius: "50%", background: "#1a1a3a", border: "1px solid #2a2a5a",
              color: "#8a8a9a", cursor: "pointer", zIndex: 10,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12,
            }}>{chatCollapsed ? "◀" : "▶"}</button>
            {!chatCollapsed && <ChatPanel songText={songText} voicingMap={voicingMap} />}
          </div>
        </div>
      )}

      {showConfig && uniqueChords.length > 0 && (
        <ChordConfigModal chords={uniqueChords} voicingMap={voicingMap}
          onSave={(map) => { setVoicingMap(map); setShowConfig(false); }}
          onClose={() => setShowConfig(false)}
        />
      )}
    </div>
  );
}
