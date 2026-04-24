import { NextRequest, NextResponse } from "next/server";
import { generateCode } from "@/lib/mock-generator";

export async function POST(req: NextRequest) {
  try {
    const { prompt, existingCode, apiKey } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }

    // If API key provided, use OpenAI
    if (apiKey) {
      try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o",
            messages: [
              {
                role: "system",
                content: `You are Vibe, an AI coding assistant ⚡. Generate a complete React component using Tailwind CSS.

CRITICAL RULES:
- Use function App() { ... } — do NOT use export default
- Do NOT use any import statements
- Do NOT use export anywhere
- Destructure React hooks at the top: const { useState, useEffect, useRef, useCallback, useMemo } = React;
- Use Tailwind CSS classes for all styling
- Make it production-quality and visually polished
- If existingCode is provided, modify it based on the prompt instead of starting fresh
- Return ONLY the code, no markdown fences, no explanations`
              },
              {
                role: "user",
                content: existingCode
                  ? `Here's the current code:\n\n${existingCode}\n\nModify it based on: ${prompt}`
                  : prompt
              }
            ],
            max_tokens: 4000,
            temperature: 0.7,
          }),
        });
        const data = await response.json();
        let code = data.choices?.[0]?.message?.content || "";
        // Clean markdown fences if present
        code = code.replace(/^```(?:jsx|tsx|javascript|typescript)?\n?/gm, "").replace(/```$/gm, "").trim();
        return NextResponse.json({ code });
      } catch (err: any) {
        console.error("OpenAI error:", err);
        // Fall through to mock
      }
    }

    // Mock generation
    const code = generateCode(prompt, existingCode);
    return NextResponse.json({ code });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
