import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  // define: {
  //    'process.env.BUILD_MODE': JSON.stringify(process.env.BUILD_MODE),
  // },
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
});
