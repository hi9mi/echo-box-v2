import {
  activeTrackId,
  queueAtom,
  scanFolder,
  scanStateAtom,
  TrackList,
} from "@entities/player";
import styles from "./main.module.css";
import { ActionIcon, Icon } from "@shared/ui";

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
          {scanStateAtom().status === "idle" && (
            <div>
              <p>Choose a folder to start building your library</p>
              <ActionIcon
                type="button"
                variant="default"
                size="lg"
                aria-label="Upload folder"
                title="Upload folder"
                on:click={scanFolder}
              >
                <Icon id="folder-plus" size={24} />
              </ActionIcon>
            </div>
          )}

          {scanStateAtom().status === "running" && (
            <div>
              <h2>Scanning folder...</h2>
              <p>
                {scanStateAtom().current} / {scanStateAtom().total} tracks
              </p>
              <progress
                value={scanStateAtom().current}
                max={scanStateAtom().total || 1}
              />
              <p>{scanStateAtom().path}</p>
            </div>
          )}

          {scanStateAtom().status === "done" && (
            <div>
              <h2>Scan finished</h2>
              <p>
                Imported {scanStateAtom().success} of {scanStateAtom().total}
              </p>
            </div>
          )}

          {scanStateAtom().status === "error" && (
            <div>
              <h2>Scan failed</h2>
              <p>{scanStateAtom().path}</p>
            </div>
          )}
        </main>
      </div>
      <footer class={styles.bottomBar}>bottom bar</footer>
    </>
  );
};
