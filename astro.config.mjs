import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  base: '/',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false
    },
    fallback: {
      en: 'es'
    }
  },
  integrations: [tailwind(), react()],
  compressHTML: true,
  prefetch: true,
  image: {
    domains: ['images.unsplash.com'],
    remotePatterns: [{ protocol: 'https' }],
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },
  build: {
    assets: "_astro",
    inlineStylesheets: "always",
    format: "file",
  },
  vite: {
    base: '',
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name.includes('ServiciosDestacados')) {
              return '_astro/slider-services.[hash].js';
            }
            if (chunkInfo.name.includes('Locaciones')) {
              return '_astro/slider-locations.[hash].js';
            }
            return '_astro/[name].[hash].js';
          },
          chunkFileNames: '_astro/[name].[hash].js',
          assetFileNames: '_astro/[name].[hash][extname]',
        },
      },
    },
  },
  // Use relative paths for universal hosting compatibility
  site: "https://www.tusanagustin.com", // Replace with your actual domain
  trailingSlash: "ignore",
});
