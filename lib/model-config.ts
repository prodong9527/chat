type ModelEnvironment = Record<string, string | undefined>;

export function getModelConfig(env: ModelEnvironment) {
  return {
    baseURL:
      env.OPENAI_BASE_URL ??
      env.MODEL_BASE_URL ??
      "http://localhost:8000/v1",
    apiKey: env.OPENAI_API_KEY ?? env.MODEL_API_KEY ?? "",
    modelId: env.MODEL_NAME ?? env.MODEL_ID ?? "qwen3-27b",
  };
}
