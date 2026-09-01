import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    setupFiles: ["./test/setup.ts"],
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: ["lib/**/*.test.ts", "app/**/*.test.ts"],
          exclude: ["lib/model-config.test.ts"],
        },
      },
      {
        extends: true,
        test: {
          name: "jsdom",
          environment: "jsdom",
          include: ["components/**/*.test.tsx"],
        },
      },
    ],
  },
});
