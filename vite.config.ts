import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => ({
  // Keep local IDE/dev URLs and Vercel (root domain) at "/", while
  // preserving the repository sub-path used by the GitHub Pages build.
  base: command === "serve" || process.env.VERCEL ? "/" : "/Ezen_fandomapp_project/",
  plugins: [react(), tailwindcss()],
}));
