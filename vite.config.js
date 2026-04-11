import { defineConfig } from 'vite';

export default defineConfig({
  root: 'dist',
  server: {
    port: 3000,
    open: '/documentation/index.html',
  },
  plugins: [
    {
      name: 'md-plain-text',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.endsWith('.md')) {
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          }
          next();
        });
      },
    },
  ],
});
