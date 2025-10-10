import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [react(), tailwind()],
  vite: {
    resolve: {
      alias: {
        '@/': new URL('./src/', import.meta.url).pathname,
      },
    },
    // Asegurar que los archivos de public se copien al build
    publicDir: 'public',
  },
  // Configuración adicional para asegurar que los assets se incluyan
  build: {
    assets: 'assets'
  }
});