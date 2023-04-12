import { create } from "zustand";

interface BottomBarState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useBottomBar = create<BottomBarState>((set) => ({
  isOpen: true,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));

export default useBottomBar;