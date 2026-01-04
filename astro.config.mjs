import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://sixarms.app',
  output: 'hybrid',
  adapter: cloudflare({
    mode: 'directory',
  }),
  build: {
    assets: 'assets'
  }
});
