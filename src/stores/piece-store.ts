import { create } from "zustand";

export type PieceStore = {
  selectePiecesIds: string[];
  addSelectedPiece: (id: string) => void;
  removeSelectedPiece: (id: string) => void;
  clearSelectedPieces: () => void;
  updateSelectedPieces: (ids: string[]) => void;
};

export const usePieceStore = create<PieceStore>((set) => ({
  selectePiecesIds: [],
  addSelectedPiece: (id: string) =>
    set((state) => ({
      selectePiecesIds: [...state.selectePiecesIds, id],
    })),
  removeSelectedPiece: (id: string) =>
    set((state) => ({
      selectePiecesIds: state.selectePiecesIds.filter((i) => i !== id),
    })),
  clearSelectedPieces: () => set({ selectePiecesIds: [] }),
  updateSelectedPieces: (ids: string[]) => set({ selectePiecesIds: ids }),
}));
