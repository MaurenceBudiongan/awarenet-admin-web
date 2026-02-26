"use client";

import { useState } from "react";
import { useDescope, useUser } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";

import Modal from "@/components/common/Modal";
import { useAppRoutes } from "@/store/useAppRoutes";

export default function TopBar() {
  const router = useRouter();
  const sdk = useDescope();
  const { user } = useUser();
  const { resetRoute } = useAppRoutes();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

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

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    if (isLoggingOut) return;
    setIsLogoutModalOpen(false);
  };

  const confirmLogout = async () => {
    await handleLogout();
    setIsLogoutModalOpen(false);
  };

  return (
    <div className="fixed top-0 z-10 flex h-14 w-full items-center justify-between border-b-2 border-gray-200 bg-zinc-100 px-4">
      <div className="font-bold text-black">AwareNet Admin</div>
      <button
        type="button"
        onClick={openLogoutModal}
        disabled={isLoggingOut}
        className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-zinc-800 hover:bg-red-100 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        title="Logout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="M16 17l5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
        <span>{user?.name ?? "User"}</span>
      </button>
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        disableOutsideClick={isLoggingOut}
      >
        <div className="p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Confirm Logout</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Are you sure you want to logout from this account?
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={closeLogoutModal}
              disabled={isLoggingOut}
              className="rounded-md border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmLogout}
              disabled={isLoggingOut}
              className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
