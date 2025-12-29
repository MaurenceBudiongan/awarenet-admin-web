"use client";

import { useDescope, useSession } from "@descope/nextjs-sdk/client";
import { useState } from "react";
import Link from "next/link";

import LogoutModal from "@/components/common/Modal";
import { useAppRoutes } from "@/store/useAppRoutes";
import cn from "@/utils/cn";
import { on } from "events";

const items = [
  { name: "Dashboard", route: "/dashboard" },
  { name: "User", route: "/user" },
  { name: "Feedback", route: "/feedback" },
  { name: "History", route: "/history" },
  { name: "Awareness Guide", route: "/manage_awareness_guide" },
];

export default function SideBar() {
  const { isAuthenticated } = useSession();
  const { route, setRoute, resetRoute: reset } = useAppRoutes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sdk = useDescope();

  if (!isAuthenticated) return null;

  const onItemClick = (page: string) => {
    setRoute(page);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const onClickLogout = () => {
    setIsModalOpen(true);
  };

  const onLogout = async () => {
    await sdk.logout();
    reset();
  };

  return (
    <nav className="top-0 left-0 z-10 flex min-w-50 flex-col justify-between border-r border-zinc-300 bg-zinc-100 px-4 py-2 shadow-lg">
      <div className="flex cursor-pointer flex-col gap-1">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.route}
            onClick={() => onItemClick(item.route)}
            className={cn(
              route === item.route && "bg-gray-200",
              "rounded-lg p-2 px-2 hover:bg-gray-200",
            )}
          >
            <div className="text-text-gray-900 text-md">{item.name}</div>
          </Link>
        ))}
      </div>

      <div className="rounded-md p-2 px-2 hover:bg-gray-200">
        <div
          className="text-text-gray-900 text-md cursor-pointer"
          onClick={onClickLogout}
        >
          Logout
        </div>
      </div>

      <LogoutModal isOpen={isModalOpen} onClose={onModalClose}>
        <div className="flex h-auto w-full flex-col items-center justify-between p-8">
          <div className="text-lg font-bold">Confirm Logout</div>
          <div className="pt-2 text-gray-500">
            Are you sure you want to logout?
          </div>
          <div className="flex justify-end gap-4 pt-8">
            <button
              className="cursor-pointer rounded-md border border-black px-4 py-2 text-black hover:bg-gray-200"
              onClick={onModalClose}
            >
              Close
            </button>
            <button
              className="cursor-pointer rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
              onClick={onLogout}
            >
              Confirm
            </button>
          </div>
        </div>
      </LogoutModal>
    </nav>
  );
}
