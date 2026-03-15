import {
  action,
  atom,
  computed,
  withActions,
  withConnectHook,
  wrap,
} from "@reatom/core";
import { ScanFolder } from "@wails/go/app/App";
import type { domain } from "@wails/go/models";
import { EventsOn } from "@wails/runtime/runtime";

export interface Track extends domain.Track {}

const mockTracks: Track[] = [
  {
    id: "1",
    title: "Track 1",
    artist: "Artist 1",
    album: "",
    duration: 150,
    path: "",
    fileName: "test",
    coverData: [],
    coverMime: "",
  },
  {
    id: "2",
    title: "Track 2",
    artist: "Artist 2",
    album: "",
    duration: 180,
    path: "",
    fileName: "test",
    coverData: [],
    coverMime: "",
  },
  {
    id: "3",
    title: "Track 3",
    artist: "Artist 3",
    album: "",
    duration: 210,
    path: "",
    fileName: "test",
    coverData: [],
    coverMime: "",
  },
  {
    id: "4",
    title: "Track 4",
    artist: "Artist 4",
    album: "",
    duration: 240,
    path: "",
    fileName: "test",
    coverData: [],
    coverMime: "",
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

type ScanState = {
  status: "idle" | "running" | "done" | "error";
  total: number;
  current: number;
  path: string;
  success: number;
  error: string | null;
};

type ScanStarted = {
  total: number;
};

type ScanProgress = {
  current: number;
  total: number;
  path: string;
};

type ScanFinished = {
  total: number;
  success: number;
};

type ScanFailed = {
  error: string;
};

const ScanStartedEvent = "library:scan:started";
const ScanFinishedEvent = "library:scan:finished";
const ScanProgressEvent = "library:scan:progress";
const ScanFailedEvent = "library:scan:failed";

export const scanStateAtom = atom<ScanState>(
  {
    status: "idle",
    total: 0,
    current: 0,
    path: "",
    success: 0,
    error: null,
  },
  "library.scanState",
).extend(
  withConnectHook(() => {
    const offStarted = EventsOn(
      ScanStartedEvent,
      wrap((data: ScanStarted) => {
        console.log("[started]", data);

        scanStateAtom.set((state) => ({
          ...state,
          status: "running",
          total: data.total,
          current: 0,
          success: 0,
          error: null,
        }));
      }),
    );

    const offProgress = EventsOn(
      ScanProgressEvent,
      wrap((data: ScanProgress) => {
        console.log("[progress]", data);

        scanStateAtom.set((state) => ({
          ...state,
          status: "running",
          current: data.current,
          total: data.total,
          path: data.path,
        }));
      }),
    );

    const offFinished = EventsOn(
      ScanFinishedEvent,
      wrap((data: ScanFinished) => {
        console.log("[finished]", data);

        scanStateAtom.set((state) => ({
          ...state,
          status: "done",
          total: data.total,
          current: data.total,
          success: data.success,
        }));
      }),
    );

    const offFailed = EventsOn(
      ScanFailedEvent,
      wrap((data: ScanFailed) => {
        console.log("[failed]", data);

        scanStateAtom.set((state) => ({
          ...state,
          status: "error",
          error: data.error,
        }));
      }),
    );

    return () => {
      offStarted();
      offProgress();
      offFinished();
      offFailed();
    };
  }),
  withActions((target) => ({
    reset: () =>
      target.set({
        status: "idle",
        total: 0,
        current: 0,
        path: "",
        success: 0,
        error: null,
      }),
  })),
);

export const scanFolder = action(async () => {
  scanStateAtom.reset();
  const tracks = await wrap(ScanFolder());
  queueAtom.set(tracks);

  return tracks;
}, "library.scanFolder");
