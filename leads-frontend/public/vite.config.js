/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom", // Ensure JSDOM is used for React tests
    setupFiles: "./src/tests/setup.js",
  },
});
