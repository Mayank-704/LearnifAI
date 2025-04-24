// store.js
import { create } from 'zustand';

interface PathStoreState {
    currentPath: string;
}

interface PathStoreActions {
    setCurrentPath: (path: string) => void;
}

export const usePathStore = create<PathStoreState & PathStoreActions>((set) => ({
    currentPath: '/',
    setCurrentPath: (path: string) => set({ currentPath: path }),
}));
