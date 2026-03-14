import { atom, computed, withActions } from "@reatom/core";

export type Track = {
  id: string;
  path: string;
  title: string;
  duration: number;
  cover: string | null;
  artist?: string;
  album?: string;
  trackNumber?: number;
  year?: number;
  genre?: string;
};

const mockTracks = [
  {
    id: "1",
    title: "Track 1",
    artist: "Artist 1",
    album: "",
    duration: 150,
    path: "",
    cover: null,
  },
  {
    id: "2",
    title: "Track 2",
    artist: "Artist 2",
    album: "",
    duration: 180,
    path: "",
    cover: null,
  },
  {
    id: "3",
    title: "Track 3",
    artist: "Artist 3",
    album: "",
    duration: 210,
    path: "",
    cover: null,
  },
  {
    id: "4",
    title: "Track 4",
    artist: "Artist 4",
    album: "",
    duration: 240,
    path: "",
    cover: null,
  },
];

export const queueAtom = atom<Track[]>(mockTracks, "player.queue").extend(
  withActions((target) => ({
    setQueue: (tracks: Track[]) => target.set(tracks),
    add: (track: Track) => target.set([...target(), track]),
    addMany: (tracks: Track[]) => target.set([...target(), ...tracks]),
    remove: (track: Track) =>
      target.set(target().filter((t) => t.id !== track.id)),
    move: (from: number, to: number) => {
      const tracks = target();
      const [removed] = tracks.toSpliced(from, 1);
      tracks.toSpliced(to, 0, removed);
      return target.set(tracks);
    },
    clear: () => target.set([]),
  })),
);

export const activeTrackId = atom<string | null>(null, "player.activeTrackId");

export const currentTrackAtom = computed(() => {
  const queue = queueAtom();
  const currentId = activeTrackId();
  if (currentId === null) return null;
  return queue.find((track) => track.id === currentId) ?? null;
}, "player.currentTrack");
