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
    <nav className="h-full bg-zinc-100 z-10 left-0 top-0 w-50 flex py-2 px-4 justify-between flex-col">
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <div
            key={item.name}
            className="rounded-lg px-2 p-2 hover:bg-gray-200"
          >
            <Link href={item.route} className="text-text-gray-900 text-md">
              {item.name}
            </Link>
          </div>
        ))}

        <div className="rounded-md px-2 p-2 hover:bg-gray-200 cursor-pointer">
          <div className="text-text-gray-900 text-md" onClick={onLogout}>
            Logout
          </div>
        </div>
      </div>
    </nav>
  );
}
