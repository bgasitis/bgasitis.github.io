import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import fs from 'fs';

// Plugin to copy 404.html for GitHub Pages SPA fallback
const copy404 = () => {
  return {
    name: 'copy-404',
    closeBundle: () => {
      const src = path.resolve(__dirname, 'public/404.html');
      const dest = path.resolve(__dirname, 'dist/404.html');
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log('✓ Copied 404.html for SPA fallback');
      }
    }
  };
};

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        copy404(),
        VitePWA({
          registerType: 'autoUpdate',
          includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
          manifest: {
            name: 'Bhagavad Gita - As It Is',
            short_name: 'Bhagavad Gita',
            description: 'Read and explore the Bhagavad Gita in Nepali and English',
            theme_color: '#2563eb',
            background_color: '#E8E4C9',
            display: 'standalone',
            scope: '/',
            start_url: '/',
icons: [
              {
                src: '/assets/icons/icon_192.png',
                sizes: '192x192',
                type: 'image/png',
              },
              {
                src: '/assets/icons/icon_512.png',
                sizes: '512x512',
                type: 'image/png',
              },
              {
                src: '/assets/icons/icon_512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable',
              },
            ],
          },
          workbox: {
            globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
            runtimeCaching: [
              {
                urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'google-fonts-cache',
                  expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
                  },
                },
              },
              {
                urlPattern: /^https:\/\/cdn\.tailwindcss\.com\/.*/i,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'tailwind-cache',
                  expiration: {
                    maxEntries: 5,
                    maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                  },
                },
              },
              {
                urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'image-cache',
                  expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
                  },
                },
              },
            ],
          },
          devOptions: {
            enabled: true,
          },
        }),
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
