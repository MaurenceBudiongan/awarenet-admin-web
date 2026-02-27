"use client";

import { useEffect, useRef, useState } from "react";
import { useDescope, useUser } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";

import Modal from "@/components/common/Modal";
import { useAppRoutes } from "@/store/useAppRoutes";
import { useTheme } from "@/shared/ThemeProvider";

export default function TopBar() {
  const router = useRouter();
  const sdk = useDescope();
  const { user } = useUser();
  const { resetRoute, toggleSidebar } = useAppRoutes();
  const { theme, toggle: toggleTheme } = useTheme();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await sdk.logout();
      resetRoute();
      router.replace("/login");
    } catch (error) {
      console.error("Failed to logout safely:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const confirmLogout = async () => {
    await handleLogout();
    setIsLogoutModalOpen(false);
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 shadow-sm dark:border-cyan-500/15 dark:bg-[#020c14] dark:shadow-none">

        {/* ── Left: Hamburger + Logo ── */}
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={toggleSidebar}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 dark:text-cyan-400/70 dark:hover:bg-cyan-500/10 lg:hidden"
            aria-label="Toggle navigation"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="h-5 w-5"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Brand logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-linear-to-br from-cyan-400 to-blue-600 shadow-[0_0_14px_rgba(6,182,212,0.45)]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-mono text-sm font-bold tracking-wider text-slate-800 dark:text-white">
              AWARE<span className="text-cyan-500">NET</span>
            </span>
          </div>
        </div>

        {/* ── Right: Theme Toggle + Avatar ── */}
        <div className="flex items-center gap-2">

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 dark:text-amber-300 dark:hover:bg-white/5"
          >
            {theme === "dark" ? (
              /* Sun */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              /* Moon */
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-4 w-4 text-slate-600">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Avatar + dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              className="relative flex h-9 w-9 overflow-hidden rounded-full ring-2 ring-cyan-500/30 transition hover:ring-cyan-400 dark:ring-cyan-500/40 dark:hover:ring-cyan-300/80"
              aria-label="Account menu"
            >
              {user?.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.picture}
                  alt={user.name ?? "Profile"}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-linear-to-br from-cyan-500 to-blue-600 font-mono text-xs font-bold text-white">
                  {initials}
                </span>
              )}
              {/* Online indicator */}
              <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400 dark:border-[#020c14]" />
            </button>

            {/* ── Dropdown card ── */}
            {dropdownOpen && (
              <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-cyan-500/20 dark:bg-[#061825] dark:shadow-[0_0_50px_rgba(6,182,212,0.12)]">

                {/* Top glow line */}
                <div className="h-px bg-linear-to-r from-transparent via-cyan-400/60 to-transparent" />

                {/* Profile section */}
                <div className="flex flex-col items-center px-5 py-6">
                  {/* Avatar — larger */}
                  <div className="relative">
                    <div className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-cyan-400/50 dark:shadow-[0_0_22px_rgba(6,182,212,0.35)]">
                      {user?.picture ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.picture}
                          alt={user.name ?? "Profile"}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-cyan-500 to-blue-600 font-mono text-xl font-bold text-white">
                          {initials}
                        </div>
                      )}
                    </div>
                    {/* Online dot */}
                    <span className="absolute right-0.5 bottom-0.5 h-3.5 w-3.5 rounded-full border-[2.5px] border-white bg-emerald-400 dark:border-[#061825]" />
                  </div>

                  {/* Name */}
                  <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">
                    {user?.name ?? "Admin User"}
                  </p>

                  {/* Email */}
                  <p className="mt-0.5 font-mono text-xs text-slate-500 dark:text-cyan-400/70">
                    {user?.email ?? (user?.loginIds?.[0] as string | undefined) ?? "—"}
                  </p>

                  {/* Status pill */}
                  <span className="mt-2.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-widest text-emerald-600 dark:border-emerald-500/25 dark:bg-emerald-500/10 dark:text-emerald-400">
                    ◉ ONLINE
                  </span>
                </div>

                {/* Divider */}
                <div className="mx-4 h-px bg-slate-100 dark:bg-cyan-500/10" />

                {/* Logout row */}
                <div className="p-3">
                  <button
                    type="button"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsLogoutModalOpen(true);
                    }}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100 transition group-hover:bg-rose-200 dark:bg-rose-500/15 dark:group-hover:bg-rose-500/25">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                    </span>
                    Sign out
                  </button>
                </div>

                {/* Bottom glow line */}
                <div className="h-px bg-linear-to-r from-transparent via-cyan-400/30 to-transparent" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Logout Confirmation Modal ── */}
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => !isLoggingOut && setIsLogoutModalOpen(false)}
        disableOutsideClick={isLoggingOut}
      >
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-500/15">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-rose-600 dark:text-rose-400"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                Sign out
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Are you sure you want to sign out of your account?
              </p>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsLogoutModalOpen(false)}
              disabled={isLoggingOut}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmLogout}
              disabled={isLoggingOut}
              className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
