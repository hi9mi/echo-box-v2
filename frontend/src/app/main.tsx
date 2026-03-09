import { connectLogger, context, clearStack, action } from "@reatom/core";
import { mount } from "@reatom/jsx";
import { App } from "./app";
import "./styles/index.css";

clearStack();

const rootContext = context.start();

if (import.meta.env.DEV) {
  rootContext.run(connectLogger);
}

const setTheme = action(() => {
  const systemSettingDark = globalThis.matchMedia("(prefers-color-scheme: dark)");
  if (systemSettingDark.matches) {
    globalThis.document.documentElement.dataset.theme = "dark";
  } else {
    globalThis.document.documentElement.dataset.theme = "light";
  }
});

rootContext.run(() => {
  const appEl = document.getElementById("app");
  if (!appEl) {
    throw new Error("No app element");
  }
  setTheme();
  mount(appEl, <App />);
});
