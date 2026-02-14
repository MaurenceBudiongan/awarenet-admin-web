"use client";
import type { PropsWithChildren } from "react";
import AuthGuard from "@/shared/AuthGuard";
import TopBar from "@/_components/shared/TopBar";
import { AuthProvider } from "@descope/react-sdk";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthGuard>
      <TopBar />
      <div className="ml-44 flex w-full">{children}</div>
    </AuthGuard>
  );
}
