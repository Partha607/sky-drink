// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://partha607.github.io',
  base: 'sky-drink',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()]
});