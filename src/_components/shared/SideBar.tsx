"use client";

import Link from "next/link";
import { useDescope, useSession } from "@descope/nextjs-sdk/client";
import { useAppRoutes } from "@/store/useAppRoutes";
import cn from "@/_utils/cn";

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
  const sdk = useDescope();

  if (!isAuthenticated) return null;

  const onItemClick = (page: string) => {
    setRoute(page);
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
          onClick={onLogout}
        >
          Logout
        </div>
      </div>
    </nav>
  );
}
