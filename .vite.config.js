import { defineConfig } from 'vite';
import babel from 'vite-plugin-babel';

export default defineConfig({
  plugins: [
    babel({
      babelConfig: {
        presets: ['@babel/preset-env'],
      },
    }),
  ],
  server: {
    proxy: {
      '/': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\//, ''),
      },
    },
  },
});
