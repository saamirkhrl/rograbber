import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://users.roblox.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/pfp": {
        target: "https://thumbnails.roblox.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pfp/, ""),
      },
      "/users": {
        target: "https://friends.roblox.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users/, ""),
      },
      "/presence": {
        target: "https://presence.roblox.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/presence/, ""),
      },
    },
  },
});
