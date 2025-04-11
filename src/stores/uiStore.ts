import { create } from 'zustand';
import { UIState } from '@/types';
import { DEFAULT_UI_STATE } from '@/constants';

interface UIStore extends UIState {
  toggleVisibility: (key: keyof UIState) => void;
  setAutoHideControls: (value: boolean) => void;
}

const useUIStore = create<UIStore>((set) => ({
  ...DEFAULT_UI_STATE,
  
  toggleVisibility: (key) =>
    set((state) => ({
      [key]: !state[key as keyof typeof state],
    })),

  setAutoHideControls: (value) =>
    set({
      autoHideControls: value,
    }),
}));

export default useUIStore; 