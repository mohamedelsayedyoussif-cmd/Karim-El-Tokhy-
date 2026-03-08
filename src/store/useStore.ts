import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AppState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isPreloaderDone: boolean;
  setPreloaderDone: (done: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  language: 'en',
  toggleLanguage: () => set((state) => ({ language: state.language === 'en' ? 'ar' : 'en' })),
  user: null,
  setUser: (user) => set({ user }),
  isPreloaderDone: false,
  setPreloaderDone: (done) => set({ isPreloaderDone: done }),
}));
