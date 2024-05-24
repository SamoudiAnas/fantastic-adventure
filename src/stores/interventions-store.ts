import { create } from "zustand";

export type InterventionStore = {
  isOpen: boolean;
  toggle: () => void;
  set: (isOpen: boolean) => void;
};

export const useInterventionStore = create<InterventionStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  set: (isOpen: boolean) => set({ isOpen }),
}));
