import { defineConfig } from "vite";
import { resolve } from "node:path";
import VitePluginSvgSpritemap from "@spiriit/vite-plugin-svg-spritemap";

export default defineConfig({
  plugins: [VitePluginSvgSpritemap("./src/shared/assets/icons/*.svg")],
  oxc: {
    jsx: {
      runtime: "classic", // Required for custom pragma
      pragma: "h",
      pragmaFrag: "hf",
      throwIfNamespace: false,
    },
    jsxInject: `import { h, hf } from "@reatom/jsx"`,
  },
  resolve: {
    alias: {
      "@app": resolve("./src/app"),
      "@screens": resolve("./src/screens"),
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
