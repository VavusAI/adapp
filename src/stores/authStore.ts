import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  setRole: (role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        // Mock login
        const user: User = {
          id: 'user-' + Date.now(),
          email,
          name: email.split('@')[0],
          role: 'advertiser', // Default, will be set later
        };
        set({ user, isAuthenticated: true });
      },
      register: async (email: string, password: string, name: string) => {
        // Mock registration
        const user: User = {
          id: 'user-' + Date.now(),
          email,
          name,
          role: 'advertiser', // Default, will be set in role selection
        };
        set({ user, isAuthenticated: true });
      },
      setRole: (role: UserRole) => {
        set((state) => ({
          user: state.user ? { ...state.user, role } : null,
        }));
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
