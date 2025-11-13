import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
      lines: 80,
      functions: 80,
      statements: 80,
      branches: 70,
      exclude: [
        "src/index.ts",          // re-export surface
        "src/spi/**",            // interfaces only
        "src/domain/messages.ts",// types only
        "src/examples/**"        // demo only
      ],
    },
    environment: "node",
    include: ["src/__tests__/**/*.test.ts"],
    globals: true
  }
});