// app/api/chat/route.ts
import { SYSTEM_PROMPT } from "@/utils/prompts";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",   // or "gpt-4o" for smarter intent detection
    max_tokens: 500,
    response_format: { type: "json_object" },  // ← forces valid JSON, no parseability issues
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ],
  });

  const raw = response.choices[0].message.content ?? "";

  try {
    const parsed = JSON.parse(raw);
    return Response.json(parsed);
  } catch {
    return Response.json({
      intent: "none",
      text: raw,
      actions: [],
    });
  }
}