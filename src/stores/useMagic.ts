import { create } from "zustand";

export type Mode = "work" | "rest" | "change-ambiance";
export type Sound = "quiet" | "calm" | "white" | "noisy";

interface MagicState {
  mode: Mode;
  setMode: (magic: Mode) => void;

  sound: Sound;
  setSound: (sound: Sound) => void;
}

export const useMagic = create<MagicState>((set) => ({
  mode: "work",
  setMode: (mode: Mode) => set({ mode: mode }),

  sound: "quiet",
  setSound: (sound: Sound) => set({ sound: sound }),
}));
