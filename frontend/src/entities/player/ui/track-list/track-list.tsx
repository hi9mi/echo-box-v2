import styles from "./track-list.module.css";
import { TrackCard } from "../track-card/track-card";
import { ActionIcon, Icon } from "@shared/ui";
import { scanFolder, type Track } from "../../model";
import { computed, type Atom } from "@reatom/core";

export type TrackListProps = {
  tracks: Atom<Track[]>;
  activeTrackId: Atom<string | null>;
  onTrackClick?: (trackId: string) => void;
};

export const TrackList = ({
  tracks,
  activeTrackId,
  onTrackClick,
}: TrackListProps) => {
  console.log(activeTrackId);
  return (
    <aside class={styles.playlist} aria-labelledby="playlist-title">
      <header class={styles.playlistHeader}>
        <div>
          <h2 id="playlist-title" class={styles.playlistTitle}>
            Playlist
          </h2>
          <span class={styles.playlistCount}>8 tracks · 34 min</span>
        </div>
        <div class={styles.playlistActions}>
          <ActionIcon
            type="button"
            size="md"
            shape="square"
            aria-label="Upload file"
            title="Upload file"
          >
            <Icon id="file-plus" size={18} />
          </ActionIcon>
          <ActionIcon
            type="button"
            size="md"
            shape="square"
            aria-label="Upload folder"
            title="Upload folder"
            on:click={scanFolder}
          >
            <Icon id="folder-plus" size={18} />
          </ActionIcon>
        </div>
      </header>
      {computed(() => (
        <ol class={styles.trackList}>
          {tracks().map(({ id, title, artist, duration, ...rest }, index) => (
            <TrackCard
              id={id}
              active={id === activeTrackId()}
              onClick={onTrackClick}
              artist={artist}
              title={title}
              duration={duration}
              cover={null}
              trackIndex={index}
              {...rest}
            />
          ))}
        </ol>
      ))}
    </aside>
  );
};
