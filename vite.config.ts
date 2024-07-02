import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [vue(), dts({ insertTypesEntry: true })],
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "tockVueKitEditor",
      fileName: "tock-vue-kit-editor",
    },
    rollupOptions: {
      external: ["vue", "tock-vue-kit"],
      output: {
        globals: {
          vue: "Vue",
          "tock-vue-kit": "tockVueKit",
        },
      },
    },
  },
  resolve: {
    // dedupe: ["vue", "tock-vue-kit"],
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
