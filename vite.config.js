import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "rograbber.vercel.app/api": {
        target: "https://users.roblox.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "rograbber.vercel.app/pfp": {
        target: "https://thumbnails.roblox.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pfp/, ""),
      },
      "rograbber.vercel.app/users": {
        target: "https://friends.roblox.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/users/, ""),
      },
      "rograbber.vercel.app/presence": {
        target: "https://presence.roblox.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/presence/, ""),
      },
    },
  },
});
