import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// UPDATE: replace with your real domain, then update robots.txt sitemap line too.
const SITE = 'https://ohmoments.co.za';

export default defineConfig({
  site: SITE,
  output: 'static',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    formats: ['webp'],
  },
});
