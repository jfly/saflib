import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./index.ts"),
      name: "CronVue",
      formats: ["es"],
      fileName: "cron-vue",
    },
  },
  plugins: [
    vue(),
    dts({
      tsconfigPath: "./tsconfig.json",
      rollupTypes: true,
    }),
  ],
});
