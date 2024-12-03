import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/client-build/",
  plugins: [
    react(),
    VitePWA({
      workbox: {
        // Use network first strategy for all requests
        // This will attempt to fetch the latest response from the network,
        // falling back to the cache if the network request fails.
        runtimeCaching: [
          {
            urlPattern: new RegExp('.*'), // Match all requests
            handler: 'NetworkFirst',
          },
        ],
      },
    }),
  ],
  build: {
    // outDir: "../client-build",
    emptyOutDir: true,
  },
});
