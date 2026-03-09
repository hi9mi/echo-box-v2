import { computed, is404 } from "@reatom/core";
import { mainRoute, testRoute } from "@shared/router";
import { MainScreen } from "@screens/main";
import { TestScreen } from "@screens/test";

const routes = [
  [mainRoute, MainScreen],
  [testRoute, TestScreen],
] as const;

export const currentScreen = computed(() => {
  for (const [route, render] of routes) {
    if (route.exact()) return render();
  }
  if (is404()) return <div>404</div>;
  return null;
});
