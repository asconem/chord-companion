// ═══════════════════════════════════════════════════════════════
// CHORD VOICING TYPES
// ═══════════════════════════════════════════════════════════════
export interface ChordVoicing {
  name: string;
  frets: number[]; // [E, A, D, G, B, e] — -1 = muted, 0 = open
  fingers: number[];
  baseFret: number;
}

// ═══════════════════════════════════════════════════════════════
// COMPREHENSIVE CHORD DATABASE
// CAGED voicings + open positions + common alternatives
// baseFret > 1: frets are relative positions within the diagram window
// baseFret = 1: frets are actual fret numbers
// ═══════════════════════════════════════════════════════════════
export const CHORD_DB: Record<string, ChordVoicing[]> = {

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  MAJOR CHORDS                                            ║
  // ╚═══════════════════════════════════════════════════════════╝
  "A":    [ { name: "A Open",           frets: [-1,0,2,2,2,0], fingers: [0,0,1,2,3,0], baseFret: 1 },
            { name: "A Barre (5th)",    frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 5 },
            { name: "A (barred 2nd)",   frets: [-1,0,2,2,2,0], fingers: [0,0,1,1,1,0], baseFret: 1 },
            { name: "A Barre 12th",     frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 12 } ],
  "B":    [ { name: "B Barre (2nd)",    frets: [-1,2,4,4,4,2], fingers: [0,1,3,3,3,1], baseFret: 1 },
            { name: "B Barre (7th)",    frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 7 },
            { name: "B Easy",           frets: [-1,2,4,4,4,-1], fingers: [0,1,3,3,3,0], baseFret: 1 },
            { name: "B (D shape 9th)",  frets: [-1,-1,1,3,4,3], fingers: [0,0,1,3,4,2], baseFret: 9 } ],
  "C":    [ { name: "C Open",           frets: [-1,3,2,0,1,0], fingers: [0,3,2,0,1,0], baseFret: 1 },
            { name: "C Barre (3rd)",    frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 3 },
            { name: "C Barre (8th)",    frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 8 },
            { name: "C/G",              frets: [3,3,2,0,1,0], fingers: [3,4,2,0,1,0], baseFret: 1 } ],
  "D":    [ { name: "D Open",           frets: [-1,-1,0,2,3,2], fingers: [0,0,0,1,3,2], baseFret: 1 },
            { name: "D Barre (5th)",    frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 5 },
            { name: "D Barre (10th)",   frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 10 },
            { name: "D/F#",             frets: [2,0,0,2,3,2], fingers: [2,0,0,1,3,1], baseFret: 1 } ],
  "E":    [ { name: "E Open",           frets: [0,2,2,1,0,0], fingers: [0,2,3,1,0,0], baseFret: 1 },
            { name: "E Barre (7th)",    frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 7 },
            { name: "E (A shape 7th)",  frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 7 } ],
  "F":    [ { name: "F Barre (1st)",    frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 1 },
            { name: "F Easy",           frets: [-1,-1,3,2,1,1], fingers: [0,0,3,2,1,1], baseFret: 1 },
            { name: "F (A shape 8th)",  frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 8 },
            { name: "F/C",              frets: [-1,3,3,2,1,1], fingers: [0,3,4,2,1,1], baseFret: 1 } ],
  "G":    [ { name: "G Open",           frets: [3,2,0,0,0,3], fingers: [2,1,0,0,0,3], baseFret: 1 },
            { name: "G Open (full)",    frets: [3,2,0,0,3,3], fingers: [2,1,0,0,3,4], baseFret: 1 },
            { name: "G Barre (3rd)",    frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 3 },
            { name: "G (A shape 10th)", frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 10 } ],
  // Sharps/Flats - Major
  "C#":   [ { name: "C# Barre (4th)",   frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 4 },
            { name: "C# Barre (9th)",   frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 9 },
            { name: "C# (D shape)",     frets: [-1,-1,3,1,2,1], fingers: [0,0,3,1,2,1], baseFret: 1 } ],
  "Db":   [ { name: "Db Barre (4th)",   frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 4 },
            { name: "Db Barre (9th)",   frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 9 } ],
  "D#":   [ { name: "D#/Eb Barre (6th)",frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 6 },
            { name: "D#/Eb (E shape)",  frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 11 } ],
  "Eb":   [ { name: "Eb Barre (6th)",   frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 6 },
            { name: "Eb (E shape 11th)",frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 11 },
            { name: "Eb (D shape)",     frets: [-1,-1,1,3,4,3], fingers: [0,0,1,2,4,3], baseFret: 1 } ],
  "F#":   [ { name: "F# Barre (2nd)",   frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 2 },
            { name: "F# (A shape 9th)", frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 9 },
            { name: "F# (D shape)",     frets: [-1,-1,4,3,2,2], fingers: [0,0,4,3,1,1], baseFret: 1 } ],
  "Gb":   [ { name: "Gb Barre (2nd)",   frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 2 },
            { name: "Gb (A shape 9th)", frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 9 } ],
  "G#":   [ { name: "G# Barre (4th)",   frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 4 },
            { name: "G# (A shape 11th)",frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 11 },
            { name: "G# (D shape 6th)", frets: [-1,-1,1,3,4,3], fingers: [0,0,1,2,4,3], baseFret: 6 } ],
  "Ab":   [ { name: "Ab Barre (4th)",   frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 4 },
            { name: "Ab (A shape 11th)",frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 11 } ],
  "A#":   [ { name: "A#/Bb Barre (1st)",frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 1 },
            { name: "A#/Bb (E shape 6th)",frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 6 } ],
  "Bb":   [ { name: "Bb Barre (1st)",   frets: [-1,1,3,3,3,1], fingers: [0,1,3,3,3,1], baseFret: 1 },
            { name: "Bb (E shape 6th)", frets: [1,3,3,2,1,1], fingers: [1,3,4,2,1,1], baseFret: 6 },
            { name: "Bb Easy",          frets: [-1,-1,3,3,3,1], fingers: [0,0,2,3,4,1], baseFret: 1 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  MINOR CHORDS                                            ║
  // ╚═══════════════════════════════════════════════════════════╝
  "Am":   [ { name: "Am Open",          frets: [-1,0,2,2,1,0], fingers: [0,0,2,3,1,0], baseFret: 1 },
            { name: "Am Barre (5th)",   frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 5 },
            { name: "Am (C shape 8th)", frets: [1,1,3,3,2,1], fingers: [1,1,3,4,2,1], baseFret: 8 } ],
  "Bm":   [ { name: "Bm Barre (2nd)",  frets: [-1,2,4,4,3,2], fingers: [0,1,3,4,2,1], baseFret: 1 },
            { name: "Bm Barre (7th)",   frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 7 },
            { name: "Bm Easy",          frets: [-1,2,4,4,3,-1], fingers: [0,1,3,4,2,0], baseFret: 1 },
            { name: "Bm (D shape)",     frets: [-1,-1,0,4,3,2], fingers: [0,0,0,4,3,2], baseFret: 1 } ],
  "Cm":   [ { name: "Cm Barre (3rd)",   frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 3 },
            { name: "Cm (A shape 3rd)", frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], baseFret: 3 },
            { name: "Cm Open",          frets: [-1,3,1,0,1,3], fingers: [0,3,1,0,2,4], baseFret: 1 } ],
  "Dm":   [ { name: "Dm Open",          frets: [-1,-1,0,2,3,1], fingers: [0,0,0,2,3,1], baseFret: 1 },
            { name: "Dm Barre (5th)",   frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], baseFret: 5 },
            { name: "Dm Barre (10th)",  frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 10 } ],
  "Em":   [ { name: "Em Open",          frets: [0,2,2,0,0,0], fingers: [0,2,3,0,0,0], baseFret: 1 },
            { name: "Em (alt fingers)", frets: [0,2,2,0,0,0], fingers: [0,1,2,0,0,0], baseFret: 1 },
            { name: "Em Barre (7th)",   frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 7 },
            { name: "Em (A shape 7th)", frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], baseFret: 7 } ],
  "Fm":   [ { name: "Fm Barre (1st)",   frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 1 },
            { name: "Fm (A shape 8th)", frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], baseFret: 8 },
            { name: "Fm Easy",          frets: [-1,-1,3,1,1,1], fingers: [0,0,3,1,1,1], baseFret: 1 } ],
  "Gm":   [ { name: "Gm Barre (3rd)",   frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 3 },
            { name: "Gm (A shape 10th)",frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], baseFret: 10 },
            { name: "Gm (open alt)",    frets: [3,5,5,3,3,3], fingers: [1,3,4,1,1,1], baseFret: 1 } ],
  // Sharps/Flats - Minor
  "C#m":  [ { name: "C#m Barre (4th)",  frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 4 },
            { name: "C#m (A shape 4th)",frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], baseFret: 4 },
            { name: "C#m (9th pos)",    frets: [-1,4,6,6,5,4], fingers: [0,1,3,4,2,1], baseFret: 1 } ],
  "Dbm":  [ { name: "Dbm Barre (4th)",  frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 4 } ],
  "D#m":  [ { name: "D#m Barre (6th)",  frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], baseFret: 6 },
            { name: "D#m (E shape 11th)",frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 11 } ],
  "Ebm":  [ { name: "Ebm Barre (6th)",  frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], baseFret: 6 },
            { name: "Ebm (E shape)",    frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 11 } ],
  "F#m":  [ { name: "F#m Barre (2nd)",  frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 2 },
            { name: "F#m (A shape 9th)",frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], baseFret: 9 },
            { name: "F#m (D shape)",    frets: [-1,-1,4,2,2,2], fingers: [0,0,4,1,1,1], baseFret: 1 } ],
  "Gbm":  [ { name: "Gbm Barre (2nd)",  frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 2 } ],
  "G#m":  [ { name: "G#m Barre (4th)",  frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 4 },
            { name: "G#m (A shape 11th)",frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], baseFret: 11 },
            { name: "G#m (D shape)",    frets: [-1,-1,1,3,4,4], fingers: [0,0,1,2,3,4], baseFret: 4 } ],
  "Abm":  [ { name: "Abm Barre (4th)",  frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 4 },
            { name: "Abm (A shape)",    frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], baseFret: 11 } ],
  "A#m":  [ { name: "A#m Barre (1st)",  frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], baseFret: 1 },
            { name: "A#m (E shape 6th)",frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 6 } ],
  "Bbm":  [ { name: "Bbm Barre (1st)",  frets: [-1,1,3,3,2,1], fingers: [0,1,3,4,2,1], baseFret: 1 },
            { name: "Bbm (E shape 6th)",frets: [1,3,3,1,1,1], fingers: [1,3,4,1,1,1], baseFret: 6 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  DOMINANT 7TH CHORDS                                     ║
  // ╚═══════════════════════════════════════════════════════════╝
  "A7":   [ { name: "A7 Open",          frets: [-1,0,2,0,2,0], fingers: [0,0,1,0,2,0], baseFret: 1 },
            { name: "A7 (alt)",         frets: [-1,0,2,2,2,3], fingers: [0,0,1,1,1,2], baseFret: 1 },
            { name: "A7 Barre (5th)",   frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], baseFret: 5 } ],
  "B7":   [ { name: "B7 Open",          frets: [-1,2,1,2,0,2], fingers: [0,2,1,3,0,4], baseFret: 1 },
            { name: "B7 Barre (2nd)",   frets: [-1,1,3,1,3,1], fingers: [0,1,3,1,4,1], baseFret: 2 },
            { name: "B7 Barre (7th)",   frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], baseFret: 7 } ],
  "C7":   [ { name: "C7 Open",          frets: [-1,3,2,3,1,0], fingers: [0,3,2,4,1,0], baseFret: 1 },
            { name: "C7 Barre (3rd)",   frets: [-1,1,3,1,3,1], fingers: [0,1,3,1,4,1], baseFret: 3 },
            { name: "C7 Barre (8th)",   frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], baseFret: 8 } ],
  "D7":   [ { name: "D7 Open",          frets: [-1,-1,0,2,1,2], fingers: [0,0,0,2,1,3], baseFret: 1 },
            { name: "D7 Barre (5th)",   frets: [-1,1,3,1,3,1], fingers: [0,1,3,1,4,1], baseFret: 5 },
            { name: "D7 Barre (10th)",  frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], baseFret: 10 } ],
  "E7":   [ { name: "E7 Open",          frets: [0,2,0,1,0,0], fingers: [0,2,0,1,0,0], baseFret: 1 },
            { name: "E7 Open (alt)",    frets: [0,2,2,1,3,0], fingers: [0,2,3,1,4,0], baseFret: 1 },
            { name: "E7 Barre (7th)",   frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], baseFret: 7 } ],
  "F7":   [ { name: "F7 Barre (1st)",   frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], baseFret: 1 },
            { name: "F7 Easy",          frets: [-1,-1,1,2,1,1], fingers: [0,0,1,2,1,1], baseFret: 1 },
            { name: "F7 (A shape 8th)", frets: [-1,1,3,1,3,1], fingers: [0,1,3,1,4,1], baseFret: 8 } ],
  "G7":   [ { name: "G7 Open",          frets: [3,2,0,0,0,1], fingers: [3,2,0,0,0,1], baseFret: 1 },
            { name: "G7 Barre (3rd)",   frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], baseFret: 3 },
            { name: "G7 (A shape 10th)",frets: [-1,1,3,1,3,1], fingers: [0,1,3,1,4,1], baseFret: 10 } ],
  // Sharps/Flats - 7th
  "C#7":  [ { name: "C#7 Barre (4th)",  frets: [-1,1,3,1,3,1], fingers: [0,1,3,1,4,1], baseFret: 4 },
            { name: "C#7 (E shape 9th)",frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], baseFret: 9 } ],
  "Eb7":  [ { name: "Eb7 Barre (6th)",  frets: [-1,1,3,1,3,1], fingers: [0,1,3,1,4,1], baseFret: 6 },
            { name: "Eb7 (E shape 11th)",frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], baseFret: 11 } ],
  "F#7":  [ { name: "F#7 Barre (2nd)",  frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], baseFret: 2 },
            { name: "F#7 (A shape 9th)",frets: [-1,1,3,1,3,1], fingers: [0,1,3,1,4,1], baseFret: 9 } ],
  "Ab7":  [ { name: "Ab7 Barre (4th)",  frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], baseFret: 4 },
            { name: "Ab7 (A shape 11th)",frets: [-1,1,3,1,3,1], fingers: [0,1,3,1,4,1], baseFret: 11 } ],
  "Bb7":  [ { name: "Bb7 Barre (1st)",  frets: [-1,1,3,1,3,1], fingers: [0,1,3,1,4,1], baseFret: 1 },
            { name: "Bb7 (E shape 6th)",frets: [1,3,1,2,1,1], fingers: [1,3,1,2,1,1], baseFret: 6 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  MINOR 7TH CHORDS                                       ║
  // ╚═══════════════════════════════════════════════════════════╝
  "Am7":  [ { name: "Am7 Open",         frets: [-1,0,2,0,1,0], fingers: [0,0,2,0,1,0], baseFret: 1 },
            { name: "Am7 (alt)",        frets: [-1,0,2,2,1,3], fingers: [0,0,2,3,1,4], baseFret: 1 },
            { name: "Am7 Barre (5th)",  frets: [1,3,1,1,1,1], fingers: [1,3,1,1,1,1], baseFret: 5 } ],
  "Bm7":  [ { name: "Bm7 Open",         frets: [-1,2,0,2,0,2], fingers: [0,1,0,2,0,3], baseFret: 1 },
            { name: "Bm7 Barre (2nd)",  frets: [-1,1,3,1,2,1], fingers: [0,1,3,1,2,1], baseFret: 2 },
            { name: "Bm7 Barre (7th)",  frets: [1,3,1,1,1,1], fingers: [1,3,1,1,1,1], baseFret: 7 } ],
  "Cm7":  [ { name: "Cm7 Barre (3rd)",  frets: [-1,1,3,1,2,1], fingers: [0,1,3,1,2,1], baseFret: 3 },
            { name: "Cm7 (E shape 8th)",frets: [1,3,1,1,1,1], fingers: [1,3,1,1,1,1], baseFret: 8 } ],
  "Dm7":  [ { name: "Dm7 Open",         frets: [-1,-1,0,2,1,1], fingers: [0,0,0,2,1,1], baseFret: 1 },
            { name: "Dm7 Barre (5th)",  frets: [-1,1,3,1,2,1], fingers: [0,1,3,1,2,1], baseFret: 5 },
            { name: "Dm7 Barre (10th)", frets: [1,3,1,1,1,1], fingers: [1,3,1,1,1,1], baseFret: 10 } ],
  "Em7":  [ { name: "Em7 Open",         frets: [0,2,0,0,0,0], fingers: [0,1,0,0,0,0], baseFret: 1 },
            { name: "Em7 Open (alt)",   frets: [0,2,2,0,3,0], fingers: [0,1,2,0,3,0], baseFret: 1 },
            { name: "Em7 Barre (7th)",  frets: [1,3,1,1,1,1], fingers: [1,3,1,1,1,1], baseFret: 7 } ],
  "Fm7":  [ { name: "Fm7 Barre (1st)",  frets: [1,3,1,1,1,1], fingers: [1,3,1,1,1,1], baseFret: 1 },
            { name: "Fm7 (A shape 8th)",frets: [-1,1,3,1,2,1], fingers: [0,1,3,1,2,1], baseFret: 8 } ],
  "Gm7":  [ { name: "Gm7 Barre (3rd)",  frets: [1,3,1,1,1,1], fingers: [1,3,1,1,1,1], baseFret: 3 },
            { name: "Gm7 (A shape 10th)",frets: [-1,1,3,1,2,1], fingers: [0,1,3,1,2,1], baseFret: 10 },
            { name: "Gm7 Open",         frets: [3,5,3,3,3,3], fingers: [1,3,1,1,1,1], baseFret: 1 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  MAJOR 7TH CHORDS                                       ║
  // ╚═══════════════════════════════════════════════════════════╝
  "Amaj7":[ { name: "Amaj7 Open",       frets: [-1,0,2,1,2,0], fingers: [0,0,2,1,3,0], baseFret: 1 },
            { name: "Amaj7 Barre (5th)",frets: [1,3,2,2,1,1], fingers: [1,4,2,3,1,1], baseFret: 5 } ],
  "Bmaj7":[ { name: "Bmaj7 Barre (2nd)",frets: [-1,1,3,2,3,1], fingers: [0,1,3,2,4,1], baseFret: 2 },
            { name: "Bmaj7 (E shape 7th)",frets: [1,3,2,2,1,1], fingers: [1,4,2,3,1,1], baseFret: 7 } ],
  "Cmaj7":[ { name: "Cmaj7 Open",       frets: [-1,3,2,0,0,0], fingers: [0,3,2,0,0,0], baseFret: 1 },
            { name: "Cmaj7 Barre (3rd)",frets: [-1,1,3,2,3,1], fingers: [0,1,3,2,4,1], baseFret: 3 },
            { name: "Cmaj7 Barre (8th)",frets: [1,3,2,2,1,1], fingers: [1,4,2,3,1,1], baseFret: 8 } ],
  "Dmaj7":[ { name: "Dmaj7 Open",       frets: [-1,-1,0,2,2,2], fingers: [0,0,0,1,2,3], baseFret: 1 },
            { name: "Dmaj7 Barre (5th)",frets: [-1,1,3,2,3,1], fingers: [0,1,3,2,4,1], baseFret: 5 } ],
  "Emaj7":[ { name: "Emaj7 Open",       frets: [0,2,1,1,0,0], fingers: [0,3,1,2,0,0], baseFret: 1 },
            { name: "Emaj7 Barre (7th)",frets: [1,3,2,2,1,1], fingers: [1,4,2,3,1,1], baseFret: 7 } ],
  "Fmaj7":[ { name: "Fmaj7 Open",       frets: [-1,-1,3,2,1,0], fingers: [0,0,3,2,1,0], baseFret: 1 },
            { name: "Fmaj7 Barre (1st)",frets: [1,3,2,2,1,1], fingers: [1,4,2,3,1,1], baseFret: 1 },
            { name: "Fmaj7 (A shape 8th)",frets: [-1,1,3,2,3,1], fingers: [0,1,3,2,4,1], baseFret: 8 } ],
  "Gmaj7":[ { name: "Gmaj7 Open",       frets: [3,2,0,0,0,2], fingers: [3,2,0,0,0,1], baseFret: 1 },
            { name: "Gmaj7 Barre (3rd)",frets: [1,3,2,2,1,1], fingers: [1,4,2,3,1,1], baseFret: 3 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  SUSPENDED CHORDS                                        ║
  // ╚═══════════════════════════════════════════════════════════╝
  "Asus2":[ { name: "Asus2 Open",       frets: [-1,0,2,2,0,0], fingers: [0,0,1,2,0,0], baseFret: 1 },
            { name: "Asus2 Barre (5th)",frets: [1,3,3,0,1,1], fingers: [1,3,4,0,1,1], baseFret: 5 } ],
  "Asus4":[ { name: "Asus4 Open",       frets: [-1,0,2,2,3,0], fingers: [0,0,1,2,3,0], baseFret: 1 },
            { name: "Asus4 Barre (5th)",frets: [1,3,3,3,1,1], fingers: [1,3,3,4,1,1], baseFret: 5 } ],
  "Bsus2":[ { name: "Bsus2 Barre (2nd)",frets: [-1,1,3,3,1,1], fingers: [0,1,3,4,1,1], baseFret: 2 } ],
  "Bsus4":[ { name: "Bsus4 Barre (2nd)",frets: [-1,1,3,3,4,1], fingers: [0,1,2,3,4,1], baseFret: 2 } ],
  "Csus2":[ { name: "Csus2 Open",       frets: [-1,3,0,0,1,0], fingers: [0,3,0,0,1,0], baseFret: 1 },
            { name: "Csus2 Barre (3rd)",frets: [-1,1,3,3,1,1], fingers: [0,1,3,4,1,1], baseFret: 3 } ],
  "Csus4":[ { name: "Csus4 Open",       frets: [-1,3,3,0,1,1], fingers: [0,3,4,0,1,1], baseFret: 1 },
            { name: "Csus4 Barre (3rd)",frets: [-1,1,3,3,4,1], fingers: [0,1,2,3,4,1], baseFret: 3 } ],
  "Dsus2":[ { name: "Dsus2 Open",       frets: [-1,-1,0,2,3,0], fingers: [0,0,0,1,3,0], baseFret: 1 },
            { name: "Dsus2 Barre (5th)",frets: [-1,1,3,3,1,1], fingers: [0,1,3,4,1,1], baseFret: 5 } ],
  "Dsus4":[ { name: "Dsus4 Open",       frets: [-1,-1,0,2,3,3], fingers: [0,0,0,1,2,3], baseFret: 1 },
            { name: "Dsus4 Barre (5th)",frets: [-1,1,3,3,4,1], fingers: [0,1,2,3,4,1], baseFret: 5 } ],
  "Esus2":[ { name: "Esus2 Open",       frets: [0,2,4,4,0,0], fingers: [0,1,3,4,0,0], baseFret: 1 } ],
  "Esus4":[ { name: "Esus4 Open",       frets: [0,2,2,2,0,0], fingers: [0,2,3,4,0,0], baseFret: 1 },
            { name: "Esus4 Barre (7th)",frets: [1,3,3,3,1,1], fingers: [1,3,3,4,1,1], baseFret: 7 } ],
  "Fsus2":[ { name: "Fsus2 Barre (1st)",frets: [1,3,3,0,1,1], fingers: [1,3,4,0,1,1], baseFret: 1 } ],
  "Fsus4":[ { name: "Fsus4 Barre (1st)",frets: [1,3,3,3,1,1], fingers: [1,3,3,4,1,1], baseFret: 1 } ],
  "Gsus2":[ { name: "Gsus2 Open",       frets: [3,0,0,0,3,3], fingers: [1,0,0,0,3,4], baseFret: 1 },
            { name: "Gsus2 Barre (3rd)",frets: [1,3,3,0,1,1], fingers: [1,3,4,0,1,1], baseFret: 3 } ],
  "Gsus4":[ { name: "Gsus4 Open",       frets: [3,3,0,0,1,3], fingers: [2,3,0,0,1,4], baseFret: 1 },
            { name: "Gsus4 Barre (3rd)",frets: [1,3,3,3,1,1], fingers: [1,3,3,4,1,1], baseFret: 3 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  ADD / EXTENDED CHORDS                                   ║
  // ╚═══════════════════════════════════════════════════════════╝
  "Cadd9":[ { name: "Cadd9 Open",       frets: [-1,3,2,0,3,0], fingers: [0,2,1,0,3,0], baseFret: 1 },
            { name: "Cadd9 (alt)",      frets: [-1,3,2,0,3,3], fingers: [0,2,1,0,3,4], baseFret: 1 } ],
  "Dadd9":[ { name: "Dadd9 Open",       frets: [-1,-1,0,2,3,0], fingers: [0,0,0,1,2,0], baseFret: 1 } ],
  "Eadd9":[ { name: "Eadd9 Open",       frets: [0,2,2,1,0,2], fingers: [0,2,3,1,0,4], baseFret: 1 } ],
  "Fadd9":[ { name: "Fadd9 Open",       frets: [-1,-1,3,2,1,3], fingers: [0,0,3,2,1,4], baseFret: 1 } ],
  "Gadd9":[ { name: "Gadd9 Open",       frets: [3,2,0,2,0,3], fingers: [3,1,0,2,0,4], baseFret: 1 },
            { name: "Gadd9 (alt)",      frets: [3,0,0,2,0,3], fingers: [2,0,0,1,0,3], baseFret: 1 } ],
  "Aadd9":[ { name: "Aadd9 Open",       frets: [-1,0,2,4,2,0], fingers: [0,0,1,3,2,0], baseFret: 1 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  9TH CHORDS                                              ║
  // ╚═══════════════════════════════════════════════════════════╝
  "A9":   [ { name: "A9 Open",          frets: [-1,0,2,4,2,3], fingers: [0,0,1,3,1,2], baseFret: 1 } ],
  "C9":   [ { name: "C9 Open",          frets: [-1,3,2,3,3,0], fingers: [0,2,1,3,4,0], baseFret: 1 } ],
  "D9":   [ { name: "D9 Open",          frets: [-1,-1,0,2,1,0], fingers: [0,0,0,2,1,0], baseFret: 1 },
            { name: "D9 (alt)",         frets: [-1,5,4,5,5,0], fingers: [0,2,1,3,4,0], baseFret: 1 } ],
  "E9":   [ { name: "E9 Open",          frets: [0,2,0,1,0,2], fingers: [0,2,0,1,0,3], baseFret: 1 } ],
  "G9":   [ { name: "G9 Open",          frets: [3,2,0,2,0,1], fingers: [3,2,0,4,0,1], baseFret: 1 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  6TH CHORDS                                              ║
  // ╚═══════════════════════════════════════════════════════════╝
  "A6":   [ { name: "A6 Open",          frets: [-1,0,2,2,2,2], fingers: [0,0,1,1,1,1], baseFret: 1 } ],
  "C6":   [ { name: "C6 Open",          frets: [-1,3,2,2,1,0], fingers: [0,4,2,3,1,0], baseFret: 1 } ],
  "D6":   [ { name: "D6 Open",          frets: [-1,-1,0,2,0,2], fingers: [0,0,0,1,0,2], baseFret: 1 } ],
  "E6":   [ { name: "E6 Open",          frets: [0,2,2,1,2,0], fingers: [0,2,3,1,4,0], baseFret: 1 } ],
  "G6":   [ { name: "G6 Open",          frets: [3,2,0,0,0,0], fingers: [2,1,0,0,0,0], baseFret: 1 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  MINOR 6TH CHORDS                                       ║
  // ╚═══════════════════════════════════════════════════════════╝
  "Am6":  [ { name: "Am6 Open",         frets: [-1,0,2,2,1,2], fingers: [0,0,2,3,1,4], baseFret: 1 } ],
  "Dm6":  [ { name: "Dm6 Open",         frets: [-1,-1,0,2,0,1], fingers: [0,0,0,2,0,1], baseFret: 1 } ],
  "Em6":  [ { name: "Em6 Open",         frets: [0,2,2,0,2,0], fingers: [0,1,2,0,3,0], baseFret: 1 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  DIMINISHED & AUGMENTED                                  ║
  // ╚═══════════════════════════════════════════════════════════╝
  "Bdim": [ { name: "Bdim",             frets: [-1,2,3,4,3,-1], fingers: [0,1,2,4,3,0], baseFret: 1 } ],
  "Cdim": [ { name: "Cdim",             frets: [-1,3,4,5,4,-1], fingers: [0,1,2,4,3,0], baseFret: 1 } ],
  "Ddim": [ { name: "Ddim",             frets: [-1,-1,0,1,3,1], fingers: [0,0,0,1,3,2], baseFret: 1 } ],
  "Edim": [ { name: "Edim",             frets: [0,1,2,0,2,-1], fingers: [0,1,2,0,3,0], baseFret: 1 } ],
  "F#dim":[ { name: "F#dim",            frets: [2,3,4,2,-1,-1], fingers: [1,2,3,1,0,0], baseFret: 1 } ],
  "G#dim":[ { name: "G#dim",            frets: [4,5,6,4,-1,-1], fingers: [1,2,3,1,0,0], baseFret: 1 } ],
  "Caug": [ { name: "C+ Open",          frets: [-1,3,2,1,1,0], fingers: [0,4,3,1,2,0], baseFret: 1 } ],
  "Eaug": [ { name: "E+ Open",          frets: [0,3,2,1,1,0], fingers: [0,4,3,1,2,0], baseFret: 1 } ],
  "Gaug": [ { name: "G+ Open",          frets: [3,2,1,0,0,3], fingers: [3,2,1,0,0,4], baseFret: 1 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  POWER CHORDS                                            ║
  // ╚═══════════════════════════════════════════════════════════╝
  "A5":   [ { name: "A5",               frets: [-1,0,2,2,-1,-1], fingers: [0,0,1,2,0,0], baseFret: 1 },
            { name: "A5 (higher)",      frets: [5,7,7,-1,-1,-1], fingers: [1,3,4,0,0,0], baseFret: 1 } ],
  "B5":   [ { name: "B5",               frets: [-1,2,4,4,-1,-1], fingers: [0,1,3,4,0,0], baseFret: 1 } ],
  "C5":   [ { name: "C5",               frets: [-1,3,5,5,-1,-1], fingers: [0,1,3,4,0,0], baseFret: 1 },
            { name: "C5 (8th)",         frets: [1,3,3,-1,-1,-1], fingers: [1,3,4,0,0,0], baseFret: 8 } ],
  "D5":   [ { name: "D5",               frets: [-1,-1,0,2,3,-1], fingers: [0,0,0,1,2,0], baseFret: 1 },
            { name: "D5 (10th)",        frets: [1,3,3,-1,-1,-1], fingers: [1,3,4,0,0,0], baseFret: 10 } ],
  "E5":   [ { name: "E5",               frets: [0,2,2,-1,-1,-1], fingers: [0,1,2,0,0,0], baseFret: 1 },
            { name: "E5 (7th)",         frets: [1,3,3,-1,-1,-1], fingers: [1,3,4,0,0,0], baseFret: 7 } ],
  "F5":   [ { name: "F5",               frets: [1,3,3,-1,-1,-1], fingers: [1,3,4,0,0,0], baseFret: 1 } ],
  "G5":   [ { name: "G5",               frets: [3,5,5,-1,-1,-1], fingers: [1,3,4,0,0,0], baseFret: 1 },
            { name: "G5 (3rd)",         frets: [1,3,3,-1,-1,-1], fingers: [1,3,4,0,0,0], baseFret: 3 } ],
  "F#5":  [ { name: "F#5",              frets: [2,4,4,-1,-1,-1], fingers: [1,3,4,0,0,0], baseFret: 1 },
            { name: "F#5 (2nd)",        frets: [1,3,3,-1,-1,-1], fingers: [1,3,4,0,0,0], baseFret: 2 } ],
  "Ab5":  [ { name: "Ab5",              frets: [4,6,6,-1,-1,-1], fingers: [1,3,4,0,0,0], baseFret: 1 },
            { name: "Ab5 (4th)",        frets: [1,3,3,-1,-1,-1], fingers: [1,3,4,0,0,0], baseFret: 4 } ],
  "Bb5":  [ { name: "Bb5",              frets: [1,3,3,-1,-1,-1], fingers: [1,3,4,0,0,0], baseFret: 6 } ],
  "C#5":  [ { name: "C#5",              frets: [-1,4,6,6,-1,-1], fingers: [0,1,3,4,0,0], baseFret: 1 } ],
  "Eb5":  [ { name: "Eb5",              frets: [-1,1,3,3,-1,-1], fingers: [0,1,3,4,0,0], baseFret: 6 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  SLASH CHORDS                                            ║
  // ╚═══════════════════════════════════════════════════════════╝
  "A/E":  [ { name: "A/E Open",         frets: [0,0,2,2,2,0], fingers: [0,0,1,2,3,0], baseFret: 1 } ],
  "C/G":  [ { name: "C/G Open",         frets: [3,3,2,0,1,0], fingers: [3,4,2,0,1,0], baseFret: 1 } ],
  "D/F#": [ { name: "D/F# Open",        frets: [2,0,0,2,3,2], fingers: [2,0,0,1,3,1], baseFret: 1 } ],
  "F/C":  [ { name: "F/C Open",         frets: [-1,3,3,2,1,1], fingers: [0,3,4,2,1,1], baseFret: 1 } ],
  "F/E":  [ { name: "F/E Open",         frets: [0,3,3,2,1,1], fingers: [0,4,3,2,1,1], baseFret: 1 } ],
  "G/A":  [ { name: "G/A Open",         frets: [-1,0,0,0,0,3], fingers: [0,0,0,0,0,3], baseFret: 1 },
            { name: "G/A (full)",       frets: [-1,0,0,0,3,3], fingers: [0,0,0,0,3,4], baseFret: 1 } ],
  "G/B":  [ { name: "G/B Open",         frets: [-1,2,0,0,0,3], fingers: [0,1,0,0,0,3], baseFret: 1 },
            { name: "G/B (full)",       frets: [-1,2,0,0,3,3], fingers: [0,1,0,0,3,4], baseFret: 1 } ],
  "G/D":  [ { name: "G/D Open",         frets: [-1,-1,0,0,0,3], fingers: [0,0,0,0,0,3], baseFret: 1 },
            { name: "G/D (full)",       frets: [-1,-1,0,0,3,3], fingers: [0,0,0,0,3,4], baseFret: 1 } ],
  "G7/B": [ { name: "G7/B Open",        frets: [-1,2,0,0,0,1], fingers: [0,2,0,0,0,1], baseFret: 1 } ],
  "Am/E": [ { name: "Am/E Open",        frets: [0,0,2,2,1,0], fingers: [0,0,2,3,1,0], baseFret: 1 } ],
  "Am/G": [ { name: "Am/G Open",        frets: [3,0,2,2,1,0], fingers: [4,0,3,2,1,0], baseFret: 1 } ],
  "Em/B": [ { name: "Em/B Open",        frets: [-1,2,2,0,0,0], fingers: [0,2,3,0,0,0], baseFret: 1 } ],
  "Em/D": [ { name: "Em/D Open",        frets: [-1,-1,0,0,0,0], fingers: [0,0,0,0,0,0], baseFret: 1 } ],
  "C/E":  [ { name: "C/E Open",         frets: [0,3,2,0,1,0], fingers: [0,3,2,0,1,0], baseFret: 1 } ],
  "D/A":  [ { name: "D/A Open",         frets: [-1,0,0,2,3,2], fingers: [0,0,0,1,3,2], baseFret: 1 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  MINOR-MAJOR 7TH                                        ║
  // ╚═══════════════════════════════════════════════════════════╝
  "Ammaj7":[ { name: "Am(maj7) Open",   frets: [-1,0,2,1,1,0], fingers: [0,0,3,1,2,0], baseFret: 1 },
             { name: "Am(maj7) (alt)",  frets: [-1,0,2,2,1,4], fingers: [0,0,2,3,1,4], baseFret: 1 } ],
  "Cmmaj7":[ { name: "Cm(maj7) Barre",  frets: [-1,3,1,0,0,3], fingers: [0,3,1,0,0,4], baseFret: 1 } ],
  "Dmmaj7":[ { name: "Dm(maj7) Open",   frets: [-1,-1,0,2,2,1], fingers: [0,0,0,2,3,1], baseFret: 1 } ],
  "Emmaj7":[ { name: "Em(maj7) Open",   frets: [0,2,1,0,0,0], fingers: [0,2,1,0,0,0], baseFret: 1 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  ADDITIONAL MINOR 7TH / SHARP-FLAT                      ║
  // ╚═══════════════════════════════════════════════════════════╝
  "F#m7": [ { name: "F#m7 Barre (2nd)", frets: [1,3,1,1,1,1], fingers: [1,3,1,1,1,1], baseFret: 2 },
            { name: "F#m7 (A shape 9th)",frets: [-1,1,3,1,2,1], fingers: [0,1,3,1,2,1], baseFret: 9 },
            { name: "F#m7 Open",        frets: [2,0,2,2,2,0], fingers: [1,0,2,3,4,0], baseFret: 1 } ],
  "C#m7": [ { name: "C#m7 Barre (4th)", frets: [-1,1,3,1,2,1], fingers: [0,1,3,1,2,1], baseFret: 4 },
            { name: "C#m7 (E shape 9th)",frets: [1,3,1,1,1,1], fingers: [1,3,1,1,1,1], baseFret: 9 } ],
  "G#m7": [ { name: "G#m7 Barre (4th)", frets: [1,3,1,1,1,1], fingers: [1,3,1,1,1,1], baseFret: 4 },
            { name: "G#m7 (A shape 11th)",frets: [-1,1,3,1,2,1], fingers: [0,1,3,1,2,1], baseFret: 11 } ],
  "Abm7": [ { name: "Abm7 Barre (4th)", frets: [1,3,1,1,1,1], fingers: [1,3,1,1,1,1], baseFret: 4 } ],
  "Bbm7": [ { name: "Bbm7 Barre (1st)", frets: [-1,1,3,1,2,1], fingers: [0,1,3,1,2,1], baseFret: 1 },
            { name: "Bbm7 (E shape 6th)",frets: [1,3,1,1,1,1], fingers: [1,3,1,1,1,1], baseFret: 6 } ],

  // ╔═══════════════════════════════════════════════════════════╗
  // ║  ADDITIONAL SHARP/FLAT SLASH CHORDS                      ║
  // ╚═══════════════════════════════════════════════════════════╝
  "C#m/G#":[ { name: "C#m/G# Barre",   frets: [-1,4,2,1,2,0], fingers: [0,4,2,1,3,0], baseFret: 1 },
             { name: "C#m/G# (alt)",   frets: [4,4,6,6,5,4], fingers: [1,1,3,4,2,1], baseFret: 1 } ],
  "F#/C#":[ { name: "F#/C# Barre",     frets: [-1,4,4,3,2,2], fingers: [0,3,4,2,1,1], baseFret: 1 } ],
  "B/F#": [ { name: "B/F# Barre",      frets: [2,2,4,4,4,2], fingers: [1,1,3,3,3,1], baseFret: 1 } ],
  "E/G#": [ { name: "E/G# Open",       frets: [4,2,2,1,0,0], fingers: [4,2,3,1,0,0], baseFret: 1 } ],
  "A/C#": [ { name: "A/C# Open",       frets: [-1,4,2,2,2,0], fingers: [0,4,1,2,3,0], baseFret: 1 } ],
  "D/B":  [ { name: "D/B Open",        frets: [-1,2,0,2,3,2], fingers: [0,1,0,2,4,3], baseFret: 1 } ],
};

// ═══════════════════════════════════════════════════════════════
// ENHARMONIC EQUIVALENCES
// ═══════════════════════════════════════════════════════════════
const ENHARMONIC: Record<string, string> = {
  "Db": "C#", "Eb": "D#", "Gb": "F#", "Ab": "G#", "Bb": "A#",
  "Dbm": "C#m", "Ebm": "D#m", "Gbm": "F#m", "Abm": "G#m", "Bbm": "A#m",
};

export function lookupChord(name: string): ChordVoicing[] | null {
  if (CHORD_DB[name]) return CHORD_DB[name];
  if (ENHARMONIC[name] && CHORD_DB[ENHARMONIC[name]]) return CHORD_DB[ENHARMONIC[name]];
  for (const [k, v] of Object.entries(ENHARMONIC)) {
    if (v === name && CHORD_DB[k]) return CHORD_DB[k];
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════
// CHORD DETECTION
// ═══════════════════════════════════════════════════════════════
const CHORD_PATTERN = /^[A-G][b#]?(?:m(?:maj|Maj)?|min|dim|aug|sus[24]|add[29])?(?:[2456789]|11|13|maj[79]|m[679])?(?:\/[A-G][b#]?)?$/;

export function isChordToken(token: string): boolean {
  return CHORD_PATTERN.test(token.trim());
}

export function isChordLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  const tokens = trimmed.split(/\s+/);
  const chordCount = tokens.filter(t => isChordToken(t)).length;
  return chordCount > 0 && chordCount / tokens.length >= 0.5;
}

export function extractUniqueChords(lines: string[]): string[] {
  const chordSet = new Set<string>();
  lines.forEach(line => {
    if (isChordLine(line)) {
      line.trim().split(/\s+/).forEach(token => {
        if (isChordToken(token)) chordSet.add(token);
      });
    }
  });
  return Array.from(chordSet).sort();
}

// ═══════════════════════════════════════════════════════════════
// SAMPLE SONG
// ═══════════════════════════════════════════════════════════════
export const SAMPLE_SONG = `[Intro]
Em    C    G    D

[Verse 1]
Em              C
  Sometimes I feel like
G                D
  I don't belong here
Em              C
  And the weight of the world
G                D
  Keeps pulling me down

[Chorus]
Am           C
  But I keep holding on
G            D
  To the hope inside
Am           C
  And I know someday
G        D        Em
  Everything will be alright

[Verse 2]
Em              C
  Walking through shadows
G                D
  Searching for meaning
Em              C
  Finding my way back
G                D
  To where I started

[Bridge]
Cadd9   Em
  Ohhh
Cadd9   D
  Ohhh

[Outro]
Em    C    G    D    Em`;
