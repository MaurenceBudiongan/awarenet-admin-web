import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface State {
  route: string;
  setRoute: (route: string) => void;
  resetRoute: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const DEFAULT_ROUTE = "/dashboard";
export const useAppRoutes = create<State>()(
  persist(
    (set) => ({
      route: DEFAULT_ROUTE,
      setRoute: (route) => set({ route }),
      resetRoute: () => set({ route: DEFAULT_ROUTE }),
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    }),
    {
      name: "app_routes",
      storage: createJSONStorage(() => localStorage),
      // Only persist route — sidebar should always start closed on reload
      partialize: (s) => ({ route: s.route }),
    },
  ),
);
