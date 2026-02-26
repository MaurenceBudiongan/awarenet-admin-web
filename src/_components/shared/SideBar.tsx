"use client";

import { useDescope, useSession } from "@descope/nextjs-sdk/client";
import { useState } from "react";
import Link from "next/link";

import LogoutModal from "@/components/common/Modal";
import { useAppRoutes } from "@/store/useAppRoutes";
import cn from "@/utils/cn";
import { on } from "events";
import { Button } from "../common/Button";

const items = [
  { name: "Dashboard", route: "/dashboard" },
  { name: "Users", route: "/user" },
  { name: "Feedback", route: "/feedback" },
  { name: "History", route: "/history" },
  { name: "Awareness Guide", route: "/awareness-guide" },
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
    <nav className="fixed flex h-187 min-w-45 flex-col justify-between border-r border-zinc-300 bg-zinc-100 px-4 py-2 shadow-lg">
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

    </nav>
  );
}
