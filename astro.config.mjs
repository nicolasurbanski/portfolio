// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://urbanskinico.dev",
  devToolbar: {
    enabled: false
  },
  vite: {
    plugins: [tailwindcss()]
  },
  // Pages are prerendered as static HTML; only routes with
  // `export const prerender = false` (the mail API) run on Vercel.
  output: "static",
  adapter: vercel(),
});
