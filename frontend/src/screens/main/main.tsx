import { activeTrackId, queueAtom, TrackList } from "@entities/player";
import styles from "./main.module.css";
import { action, atom, withActions, withAsyncData, wrap } from "@reatom/core";
import { ActionIcon, Icon } from "@shared/ui";
import { OpenDialog, Greet } from "@wails/go/main/App";

const value = atom("", "value").extend(
  withActions((target) => ({
    setValue: (nextValue: string) => target.set(nextValue),
    resetValue: () => target.set(""),
  })),
);

const greet = action(async () => {
  const name = value();
  if (name.trim().length < 1) return;
  return await wrap(Greet(value()));
}, "value.greet").extend(withAsyncData({ status: true }));

console.log(queueAtom());

export const MainScreen = () => {
  return (
    <>
      <header class={styles.header}>
        <h1 class={styles.title}>
          echo<span>box</span>
        </h1>
        <div> </div>
        <div class={styles.settings}>
          <ActionIcon
            type="button"
            variant="default"
            size="lg"
            aria-label="Open settings"
            title="Open settings"
          >
            <Icon id="settings" size={24} />
          </ActionIcon>
        </div>
      </header>
      <div class={styles.main}>
        <TrackList
          tracks={queueAtom}
          activeTrackId={activeTrackId}
          onTrackClick={(id: string) => {
            activeTrackId.set(id);
          }}
        />

        <main>
          <input
            value={value}
            on:input={(event) => value.setValue(event.currentTarget.value)}
          />
          <div>{value}</div>
          <button on:click={greet}>Greet</button>
          <div>{greet.ready() ? "ready" : "loading"}</div>
          <div>{String(greet.error())}</div>
          <div>{greet.data()}</div>

          <div>
            <button on:click={() => OpenDialog()}>Open Dialog</button>
          </div>
        </main>
      </div>
      <footer class={styles.bottomBar}>bottom bar</footer>
    </>
  );
};
