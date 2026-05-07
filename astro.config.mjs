// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://acmeinc.com', // Update with actual domain
  output: 'static',
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  }),
  
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'site-config-reload',
        handleHotUpdate({ file, server }) {
          if (file.includes('config/site')) {
            server.ws.send({ type: 'full-reload' });
            return [];
          }
        }
      }
    ],
    build: {
      cssMinify: true,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'icons';
            }
            if (id.includes('/components/ui/')) {
              return 'ui-components';
            }
          }
        }
      }
    },
    ssr: {
      noExternal: ['lucide-react']
    }
  },

  integrations: [
    react(),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/api/'),
    })
  ],

  compressHTML: true,
  
  build: {
    inlineStylesheets: 'always',
  },

  image: {
    domains: [
      'ucarecdn.com',
      '3l4xnbxrrw.ucarecd.net',
      'ntv-template-1.vercel.app',
      'f.hubspotusercontent40.net',
      'images.unsplash.com',
      'images.pexels.com',
      'www.superiorcomforthvac.com',
      'ultimateheatingandair.com',
      'healthinnovation-kss.com',
    ],
    remotePatterns: [{ protocol: 'https' }],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  }
});
