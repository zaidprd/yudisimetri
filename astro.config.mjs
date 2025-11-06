// astro.config.mjs (Versi Final yang Bersih)

// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Properti 'site' ini WAJIB diisi agar sitemap berfungsi dengan benar.
  // Ganti dengan URL Cloudflare Anda jika berbeda.
  site: 'https://yudisimetri.pages.dev',

  integrations: [
    icon( ), 
    sitemap()
  ]
});
