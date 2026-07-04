// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: "https://lapakku.id",
  devToolbar: { enabled: false },
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: 'suppress-wellknown-warn',
        configureServer(server) {
          const fn = (req, res, next) => {
            if (req.url?.startsWith('/.well-known/')) {
              res.statusCode = 204;
              res.end();
              return;
            }
            next();
          };
          server.middlewares.stack.unshift({ route: '', handle: fn });
        },
      },
    ],
  },
  integrations: [sitemap()],
});