import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { qwen, MODEL_ID } from "@/lib/model";
import { PROMPTS, isToyKey } from "@/lib/prompts";
import { checkInput, checkRate, clientIp } from "@/lib/guard";

export const maxDuration = 300;
export const runtime = "nodejs";

function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role !== "user") continue;
    let text = "";
    for (const part of m.parts) {
      if (part.type === "text") {
        const t = (part as { text?: unknown }).text;
        if (typeof t === "string") text += t;
      }
    }
    return text;
  }
  return "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { toy?: unknown; messages?: UIMessage[] };
    const { toy, messages } = body;

    if (!isToyKey(toy) || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "bad_request" }, { status: 400 });
    }

    const rate = checkRate(clientIp(req));
    if (!rate.ok) {
      return Response.json(
        { error: "rate", reason: rate.reason },
        { status: 429 },
      );
    }

    const guard = checkInput(lastUserText(messages));
    if (!guard.ok) {
      return Response.json(
        { error: "guard", reason: guard.reason },
        { status: 400 },
      );
    }

    const result = streamText({
      model: qwen(MODEL_ID),
      system: PROMPTS[toy],
      messages: await convertToModelMessages(messages),
      temperature: 0.9,
      abortSignal: AbortSignal.timeout(120_000),
    });

    return result.toUIMessageStreamResponse();
  } catch {
    // 模型不可达或中途出错：前端据此显示歇工降级
    return Response.json({ error: "idle" }, { status: 503 });
  }
}
