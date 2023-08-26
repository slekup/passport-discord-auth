import { defineConfig } from 'tsup';

export default defineConfig({
  entryPoints: ['src/index.ts'],
  platform: 'node',
  format: ['cjs', 'esm'],
  outDir: 'dist',
  keepNames: true,
  dts: true,
  minify: true,
  sourcemap: true,
  clean: true,
  watch: process.env.ENVIRONMENT === 'development',
});
