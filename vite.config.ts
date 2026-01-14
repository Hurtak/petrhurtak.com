import { execSync } from "node:child_process";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const commitHash = execSync("git rev-parse HEAD").toString().trim();
const buildTime = Date.now();

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["styled-jsx/babel"],
      },
    }),
  ],
  assetsInclude: ["**/*.mp4"],
  build: {
    outDir: "dist",
  },
  define: {
    __BUILD_TIME__: JSON.stringify(buildTime),
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
});
