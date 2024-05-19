import { create } from "zustand";

export type RightbarStore = {
  isOpen: boolean;
  toggle: () => void;
  set: (isOpen: boolean) => void;
};

export const useRightbarStore = create<RightbarStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  set: (isOpen: boolean) => set({ isOpen }),
}));
