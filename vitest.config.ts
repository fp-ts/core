/// <reference types="vitest" />
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
  test: {
    include: ["./test/**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: [
      "./test/util.ts",
      "./test/test-data/*.ts"
    ],
    globals: true
  },
  resolve: {
    alias: {
      "@fp-ts/core/test": path.resolve(__dirname, "/test"),
      "@fp-ts/core": path.resolve(__dirname, "/src")
    }
  }
})
