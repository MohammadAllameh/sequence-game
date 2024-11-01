import { create } from 'zustand';
import { StoreState } from '../types/types';

const useStore = create<StoreState>((set) => ({
    playerScore: 0,
    setPlayerScore: (score: number) => set({ playerScore: score }),
}));

export default useStore;