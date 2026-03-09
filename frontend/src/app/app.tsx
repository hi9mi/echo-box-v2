import { currentScreen } from "@screens/current-screen";
import styles from "./app.module.css";

export const App = () => {
  return <div class={styles.app}>{currentScreen}</div>;
};
