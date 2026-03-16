import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, songText, voicingMap } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "messages array required" },
        { status: 400 }
      );
    }

    const systemPrompt = `You are a guitar music theory companion built into the Chord Companion app. The user is learning guitar and studying songs using an interactive chord sheet tool.

${songText ? `They have loaded the following song:\n\n---\n${songText}\n---` : "No song is currently loaded."}

${voicingMap ? `Their selected chord voicings: ${JSON.stringify(voicingMap)}` : ""}

Your role:
- Help them understand music theory behind their song — chord progressions, key analysis, Roman numeral analysis, substitutions, why certain chords work together
- Suggest strumming patterns, fingerpicking patterns, or rhythm approaches
- Explain concepts clearly using standard music theory terminology
- Reference specific chords and sections from their loaded song when relevant
- Be conversational, encouraging, and direct
- If they ask about a chord not in their song, still help — you're a general guitar theory resource
- Keep responses focused and practical — they're likely sitting with a guitar in hand`;

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const text = response.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("");

    return NextResponse.json({ response: text });
  } catch (error: unknown) {
    console.error("Chat API error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
