import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./test/setup.ts"],
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: ["lib/**/*.test.ts"],
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
