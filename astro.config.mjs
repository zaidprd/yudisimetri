// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://salespanelsimetri.com',

  integrations: [sitemap({
    changefreq: 'weekly',
    priority: 0.7,
  }), react()],

  compressHTML: true,

  // Inline semua CSS ke dalam <style> tag — eliminasi render-blocking CSS files
  build: {
    inlineStylesheets: 'always',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});