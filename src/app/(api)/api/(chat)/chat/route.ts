import { google } from "@ai-sdk/google";
import { streamText, type Message } from "ai";
import { env } from "@/env";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  if (env.NODE_ENV !== "development") {
    return new Response("Work in progress", {
      status: 400,
    });
  }

  const { messages }: { messages: Message[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.5-pro-preview-05-06"),
    messages,
  });

  return result.toDataStreamResponse();
}
