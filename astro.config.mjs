// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://salespanelsimetri.com',

  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],

  compressHTML: true,

  // Inline semua CSS ke dalam <style> tag — eliminasi render-blocking CSS files
  build: {
    inlineStylesheets: 'always',
  },

  vite: {
    plugins: [tailwindcss()],
    cacheDir: '.vite-build',
  },
});