import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

// Load environment variables from .env.local

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
  resolve: {
    alias: {
      // Add your path aliases here based on your Next.js configuration
      "@": path.resolve(__dirname, "./"), // Change this path according to your alias setup
    },
  },
});
