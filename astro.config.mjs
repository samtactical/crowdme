// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // TODO: bekräfta slutgiltig domän — styr canonical + og:url i Layout.astro
  site: 'https://crowdme.se',
  vite: {
    plugins: [tailwindcss()],
  },
});
