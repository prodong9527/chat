import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

export const qwen = createOpenAICompatible({
  name: "qwen-local",
  baseURL: process.env.MODEL_BASE_URL ?? "http://localhost:8000/v1",
  headers: {
    Authorization: `Bearer ${process.env.MODEL_API_KEY ?? ""}`,
  },
});

export const MODEL_ID = process.env.MODEL_ID ?? "qwen3-27b";
