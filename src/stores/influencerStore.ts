import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { InfluencerSettings, ContentItem, Brief } from '@/types';

interface InfluencerState {
  settings: InfluencerSettings;
  myContent: ContentItem[];
  briefs: Brief[];
  updateSettings: (settings: Partial<InfluencerSettings>) => void;
  setMyContent: (content: ContentItem[]) => void;
  toggleContentAdOptIn: (id: string) => void;
  setBriefs: (briefs: Brief[]) => void;
  applyToBrief: (briefId: string, message: string) => void;
}

export const useInfluencerStore = create<InfluencerState>()(
  persist(
    (set) => ({
      settings: {
        globalOptIn: true,
        categoryAllow: ['Fashion', 'Technology', 'Lifestyle'],
        categoryDeny: ['Gambling', 'Alcohol'],
      },
      myContent: [],
      briefs: [],
      updateSettings: (updates) =>
        set((state) => ({
          settings: { ...state.settings, ...updates },
        })),
      setMyContent: (content) => set({ myContent: content }),
      toggleContentAdOptIn: (id) =>
        set((state) => ({
          myContent: state.myContent.map((item) =>
            item.id === id ? { ...item, adOptIn: !item.adOptIn } : item
          ),
        })),
      setBriefs: (briefs) => set({ briefs }),
      applyToBrief: (briefId, message) =>
        set((state) => ({
          briefs: state.briefs.map((b) =>
            b.id === briefId ? { ...b, status: 'applied' as const } : b
          ),
        })),
    }),
    {
      name: 'influencer-storage',
    }
  )
);
