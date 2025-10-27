import { create } from 'zustand';
import { Creative } from '@/types';

interface CreativeState {
  creatives: Creative[];
  setCreatives: (creatives: Creative[]) => void;
  addCreative: (creative: Creative) => void;
  deleteCreative: (id: string) => void;
}

export const useCreativeStore = create<CreativeState>((set) => ({
  creatives: [],
  setCreatives: (creatives) => set({ creatives }),
  addCreative: (creative) =>
    set((state) => ({ creatives: [...state.creatives, creative] })),
  deleteCreative: (id) =>
    set((state) => ({
      creatives: state.creatives.filter((c) => c.id !== id),
    })),
}));
