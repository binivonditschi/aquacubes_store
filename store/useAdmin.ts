import { create } from "zustand";

interface AdminState {
  isEditMode: boolean;
  selectedProductId: string | null;
  toggleEditMode: () => void;
  selectProduct: (id: string | null) => void;
}

export const useAdmin = create<AdminState>((set) => ({
  isEditMode: false,
  selectedProductId: null,
  toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
  selectProduct: (id) => set({ selectedProductId: id }),
}));
