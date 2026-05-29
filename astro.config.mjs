// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://salespanelsimetri.com',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
  image: {
    service: {
      // Menggunakan passthrough agar Cloudflare tidak macet memproses gambar lewat Sharp
      entrypoint: 'astro/assets/services/passthrough',
    },
  },
  compressHTML: true,
});
