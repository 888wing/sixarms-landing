import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sixarms.app',
  output: 'static',
  build: {
    assets: 'assets'
  }
});
