import { formatDuration } from "@shared/libs";
import styles from "./track-card.module.css";
import type { Track } from "../../model";

export type TrackCardProps = {
  active: boolean;
  disabled?: boolean;
  trackIndex: number;
  // TODO: should have loaders?
  // loading?: boolean;
  onClick?: (
    trackId: string,
    event: Event & { currentTarget: HTMLButtonElement },
  ) => void;
} & Omit<Track, "path">;

export const TrackCard = ({
  id,
  title,
  artist,
  duration,
  cover,
  active,
  disabled,
  onClick,
  trackIndex,
}: TrackCardProps) => {
  const onClickHandler = (
    event: Event & { currentTarget: HTMLButtonElement },
  ) => {
    onClick?.(id, event);
  };

  const keyDownHandler = (
    event: KeyboardEvent & { currentTarget: HTMLButtonElement },
  ) => {
    // TODO: should have arrow keys support for track navigation
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClickHandler(event);
    }
  };

  const formattedDuration = formatDuration(duration);
  const trackNumber = trackIndex + 1;
  const formattedTrackNumber =
    trackNumber > 9 ? trackNumber : `0${trackNumber}`;

  return (
    <li
      class={[
        styles.trackItem,
        {
          [styles.active]: active,
        },
      ]}
    >
      <button
        on:click={onClickHandler}
        on:keydown={keyDownHandler}
        type="button"
        disabled={disabled}
        className={styles.trackButton}
        aria-current={active ? "true" : "false"}
      >
        {active ? (
          <div class={styles.playingDots}>
            <div class={styles.dot}></div>
            <div class={styles.dot}></div>
            <div class={styles.dot}></div>
          </div>
        ) : (
          <span class={styles.trackNum}>{formattedTrackNumber}</span>
        )}
        {cover && (
          <img
            // TODO: Maybe should have a fallback for cover, when no cover is available
            src={cover}
            alt=""
            class={styles.trackCover}
            loading="lazy"
          />
        )}
        <div class={styles.trackInfo}>
          <strong class={styles.trackName}>{title}</strong>
          <span class={styles.trackArtist}>{artist}</span>
        </div>
        <time datetime={`PT${duration}S`} class={styles.trackDuration}>
          {formattedDuration}
        </time>
      </button>
    </li>
  );
};
