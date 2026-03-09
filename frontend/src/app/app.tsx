import { currentScreen } from "@screens/current-screen";
import { mainRoute, testRoute } from "@shared/router";

export const App = () => {
  return (
    <div class="app">
      <nav>
        <a href={mainRoute.path}>Main</a>
        <a href={testRoute.path}>Test</a>
      </nav>

      <main>
        <h1>App</h1>
        <div>{currentScreen}</div>
      </main>
    </div>
  );
};
