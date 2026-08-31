import assert from "node:assert/strict";
import test from "node:test";

import { getModelConfig } from "./model-config.ts";

test("uses the Vercel environment variable names when provided", () => {
  const config = getModelConfig({
    OPENAI_BASE_URL: "https://api.example.com/v1",
    OPENAI_API_KEY: "test-key",
    MODEL_NAME: "qwen-plus",
    MODEL_BASE_URL: "https://legacy.example.com/v1",
    MODEL_API_KEY: "legacy-key",
    MODEL_ID: "legacy-model",
  });

  assert.deepEqual(config, {
    baseURL: "https://api.example.com/v1",
    apiKey: "test-key",
    modelId: "qwen-plus",
  });
});

test("falls back to the legacy names and local defaults", () => {
  assert.deepEqual(
    getModelConfig({
      MODEL_BASE_URL: "https://legacy.example.com/v1",
      MODEL_API_KEY: "legacy-key",
      MODEL_ID: "legacy-model",
    }),
    {
      baseURL: "https://legacy.example.com/v1",
      apiKey: "legacy-key",
      modelId: "legacy-model",
    },
  );

  assert.deepEqual(getModelConfig({}), {
    baseURL: "http://localhost:8000/v1",
    apiKey: "",
    modelId: "qwen3-27b",
  });
});
