// useHistoryStore.ts
import { create } from 'zustand';
import { axiosInstance } from "../../lib/axios.ts"           

interface HistoryItem {
  ques: string;
  ans: string;
  userId: string;
  timestamp: string;
}

interface HistoryStore {
  history: HistoryItem[];
  loading: boolean;
  error: string | null;
  getHistory: () => Promise<void>;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  history: [],
  loading: false,
  error: null,

  getHistory: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axiosInstance.get('/history/gethistory'); 
      set({ history: response.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },
}));
