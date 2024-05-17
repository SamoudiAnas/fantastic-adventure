import { create } from "zustand";

export type SidebarStore = {
  isOpen: boolean;
  toggle: () => void;
  set: (isOpen: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  set: (isOpen: boolean) => set({ isOpen }),
}));
