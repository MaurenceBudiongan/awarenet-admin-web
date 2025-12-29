"use client";

import { useDescope, useSession } from "@descope/nextjs-sdk/client";
import Link from "next/link";

const items = [
  { name: "Dashboard", route: "/dashboard" },
  { name: "User", route: "/user" },
  { name: "Feedback", route: "/feedback" },
  { name: "History", route: "/history" },
  { name: "Awareness Guide", route: "/manage_awareness_guide" },
];

export default function SideBar() {
  const { isAuthenticated } = useSession();
  const sdk = useDescope();

  if (!isAuthenticated) return null;

  const onLogout = async () => {
    await sdk.logout();
  };

  return (
    <nav className="top-0 left-0 z-10 flex h-full min-w-50 flex-col justify-between border-r border-zinc-300 bg-zinc-100 px-4 py-2 shadow-lg">
      <div className="flex cursor-pointer flex-col gap-1">
        {items.map((item) => (
          <div
            key={item.name}
            className="rounded-lg p-2 px-2 hover:bg-gray-200"
          >
            <Link href={item.route} className="text-text-gray-900 text-md">
              {item.name}
            </Link>
          </div>
        ))}

        <div className="rounded-md p-2 px-2 hover:bg-gray-200">
          <div className="text-text-gray-900 text-md" onClick={onLogout}>
            Logout
          </div>
        </div>
      </div>
    </nav>
  );
}
