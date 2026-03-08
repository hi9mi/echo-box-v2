import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  oxc: {
    jsx: {
      runtime: "classic", // Required for custom pragma
      pragma: "h",
      pragmaFrag: "hf",
    },
    jsxInject: `import { h, hf } from "@reatom/jsx"`,
  },
  resolve: {
    alias: {
      "@app": resolve("./src/app"),
      "@pages": resolve("./src/pages"),
      "@widgets": resolve("./src/widgets"),
      "@features": resolve("./src/features"),
      "@entities": resolve("./src/entities"),
      "@shared": resolve("./src/shared"),
      "@wails": resolve("./wailsjs"),
      "@wails/go": resolve("./wailsjs/go"),
      "@wails/runtime": resolve("./wailsjs/runtime"),
    },
  },
  build: {
    target: "esnext",
  },
});
