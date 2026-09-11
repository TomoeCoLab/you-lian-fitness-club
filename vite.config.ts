import { cloudflare } from "@cloudflare/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import packageInfo from "./package.json" with { type: "json" };
const { version } = packageInfo;

export default defineConfig({
  define: { __APP_VERSION__: JSON.stringify(version) },
  plugins: [react(), cloudflare(), {
    name: "release-version",
    generateBundle() { this.emitFile({ type: "asset", fileName: "version.json", source: JSON.stringify({ version }) }); },
    configureServer(server) { server.middlewares.use("/version.json", (_req, res) => { res.setHeader("Content-Type", "application/json"); res.setHeader("Cache-Control", "no-store"); res.end(JSON.stringify({ version })); }); },
  }],
});
