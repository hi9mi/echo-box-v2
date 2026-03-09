import styles from "./main.module.css";
import { action, atom, withAsyncData, wrap } from "@reatom/core";
import { ActionIcon, Icon } from "@shared/ui";
import { OpenDialog, Greet } from "@wails/go/main/App";

const value = atom("", "value");
const onInput = (event: Event & { currentTarget: HTMLInputElement }) =>
  value.set(event.currentTarget.value);

const onGreet = action(async () => {
  const result = await wrap(Greet(value()));

  return result;
}, "onGreet").extend(withAsyncData());

export const MainScreen = () => {
  return (
    <>
      <header class={styles.header}>
        <h1 class={styles.title}>Echo box</h1>
        <ActionIcon variant="default" size="lg">
          <Icon id="settings" size={24} />
        </ActionIcon>
      </header>
      <div class={styles.main}>
        <aside>aside</aside>
        <main>
          <input value={value} on:input={onInput} />
          <div class="result">{value}</div>
          <button on:click={onGreet}>Greet</button>
          <p>{onGreet.data()}</p>

          <div>
            <button on:click={() => OpenDialog()}>Open Dialog</button>
          </div>
        </main>
      </div>
      <footer class={styles.bottomBar}>bottom bar</footer>
    </>
  );
};
