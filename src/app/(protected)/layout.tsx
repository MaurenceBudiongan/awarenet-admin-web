"use client";
import type { PropsWithChildren } from "react";
import AuthGuard from "@/shared/AuthGuard";
import TopBar from "@/shared/TopBar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthGuard>
      <TopBar />
      {/* lg:ml-64 = sidebar width on desktop; ml-0 on mobile (sidebar overlays) */}
      <div className="flex w-full lg:ml-64">{children}</div>
    </AuthGuard>
  );
}
