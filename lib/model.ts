import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { getModelConfig } from "@/lib/model-config";

const modelConfig = getModelConfig(process.env);

export const qwen = createOpenAICompatible({
  name: "qwen-local",
  baseURL: modelConfig.baseURL,
  headers: {
    Authorization: `Bearer ${modelConfig.apiKey}`,
  },
});

export const MODEL_ID = modelConfig.modelId;
