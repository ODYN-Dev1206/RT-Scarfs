import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  appType: 'mpa',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        shop: resolve(__dirname, 'shop.html'),
        blog: resolve(__dirname, 'blog.html'),
        cart: resolve(__dirname, 'cart.html'),
        product: resolve(__dirname, 'product.html'),
      }
    }
  }
});