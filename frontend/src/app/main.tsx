import { connectLogger, context, clearStack } from "@reatom/core";
import { mount } from "@reatom/jsx";
import { App } from "./app";
import "./styles/index.css";

clearStack();

const rootContext = context.start();

if (import.meta.env.DEV) {
  rootContext.run(connectLogger);
}

rootContext.run(() => {
  const appEl = document.getElementById("app");
  if (!appEl) {
    throw new Error("No app element");
  }
  mount(appEl, <App />);
});
