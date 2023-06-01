import { create } from "zustand";

interface TweetActionBarState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useTweetActionModal = create<TweetActionBarState>((set) => ({
  isOpen: true,
  onClose: () => set({ isOpen: true }),
  onOpen: () => set({ isOpen: false }),
}));

export default useTweetActionModal;
