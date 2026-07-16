import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  // Keep local IDE/dev URLs at the origin root while preserving the
  // repository sub-path used by the production GitHub Pages build.
  base: command === "serve" ? "/" : "/Ezen_fandomapp_project/",
  plugins: [react(), tailwindcss()],
}));
