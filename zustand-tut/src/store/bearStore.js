import { create } from "zustand";

export const initialState = {
  bears: 0,
  increase: () => undefined,
};

const useBearStore = create((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
}));

export default useBearStore
