// import { reactRouter } from "@react-router/dev/vite";
// import tailwindcss from "@tailwindcss/vite";
// import { defineConfig } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";

// export default defineConfig({
//   plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
// });

import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    // ✅ 커스텀 미들웨어 플러그인 추가
    {
      name: "ignore-well-known-routes",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith("/.well-known/")) {
            res.statusCode = 404;
            res.end("Not Found");
            return;
          }
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      // cloudflare 전용 모듈 alias 처리
      "cloudflare:sockets": path.resolve(__dirname, "app/stubs/cloudflare-sockets.ts"),
    },
  },
});
