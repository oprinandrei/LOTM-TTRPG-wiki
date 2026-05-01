// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://oprinandrei.github.io',
  base: 'LOTM-TTRPG-wiki',
  integrations: [mdx()],
});
