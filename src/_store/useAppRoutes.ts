import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
  route: string;
  setRoute: (route: string) => void;
  resetRoute: () => void;
}

const DEFAULT_ROUTE = "/dashboard";
export const useAppRoutes = create<State>()(
  persist(
    (set) => ({
      route: DEFAULT_ROUTE,
      setRoute: (route) => set({ route }),
      resetRoute: () => set({ route: DEFAULT_ROUTE }),
    }),
    {
      name: "app_routes",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
