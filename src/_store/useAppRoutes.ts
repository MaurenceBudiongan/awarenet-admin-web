import { create } from "zustand";

interface State {
  route: string;
  setRoute: (route: string) => void;
  resetRoute: () => void;
}

const DEFAULT_ROUTE = "/dashboard";

export const useAppRoutes = create<State>((set) => ({
  route: DEFAULT_ROUTE,
  setRoute: (route: string) => set({ route }),
  resetRoute: () => set({ route: DEFAULT_ROUTE }),
}));
