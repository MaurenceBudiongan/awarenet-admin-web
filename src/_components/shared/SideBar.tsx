"use client";

import Link from "next/link";
import { useSession } from "@descope/nextjs-sdk/client";

import { useAppRoutes } from "@/store/useAppRoutes";
import cn from "@/utils/cn";

const items = [
  {
    name: "Dashboard",
    route: "/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    name: "Users",
    route: "/user",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    name: "Feedback",
    route: "/feedback",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    name: "History",
    route: "/history",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <polyline points="12 8 12 12 14 14" />
        <path d="M3.05 11a9 9 0 1 0 .5-4.5" />
        <polyline points="3 3 3 9 9 9" />
      </svg>
    ),
  },
  {
    name: "Awareness Guide",
    route: "/awareness-guide",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    name: "Reports",
    route: "/reports",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
];

export default function SideBar() {
  const { isAuthenticated } = useSession();
  const { route, setRoute, sidebarOpen, setSidebarOpen } = useAppRoutes();

  if (!isAuthenticated) return null;

  const onItemClick = (page: string) => {
    setRoute(page);
    setSidebarOpen(false); // auto-close on mobile after navigating
  };

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar panel ── */}
      <nav
        className={cn(
          "fixed top-14 left-0 z-40 flex h-[calc(100vh-3.5rem)] w-64 flex-col",
          "border-r border-slate-200 bg-white",
          "dark:border-cyan-500/15 dark:bg-[#020c14]",
          "transition-transform duration-300 ease-in-out",
          "-translate-x-full lg:translate-x-0",
          sidebarOpen && "translate-x-0",
        )}
      >
        {/* Top accent line */}
        <div className="h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />

        {/* Nav items */}
        <div className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
          <p className="mb-3 px-2 font-mono text-[10px] font-semibold tracking-[0.22em] text-slate-400 uppercase dark:text-cyan-600/50">
            Navigation
          </p>

          {items.map((item) => {
            const isActive = route === item.route;
            return (
              <Link
                key={item.name}
                href={item.route}
                onClick={() => onItemClick(item.route)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300 dark:shadow-[inset_0_0_14px_rgba(6,182,212,0.05)]"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/[0.04] dark:hover:text-slate-200",
                )}
              >
                {/* Icon bubble */}
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-150",
                    isActive
                      ? "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 dark:bg-white/5 dark:text-slate-500 dark:group-hover:bg-white/10 dark:group-hover:text-slate-300",
                  )}
                >
                  {item.icon}
                </span>

                <span className="truncate">{item.name}</span>

                {/* Active dot */}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.9)]" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-5 py-4 dark:border-cyan-500/10">
          <p className="font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase dark:text-cyan-900/80">
            AwareNet · v2.6.0
          </p>
        </div>
      </nav>
    </>
  );
}
