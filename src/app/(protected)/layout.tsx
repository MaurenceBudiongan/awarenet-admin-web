"use client";
import type { PropsWithChildren } from "react";
import AuthGuard from "@/shared/AuthGuard";
import TopBar from "@/_components/shared/TopBar";
import { AuthProvider } from "@descope/react-sdk";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthGuard>
      <AuthProvider
        projectId={process.env.NEXT_PUBLIC_DESCOPE_PROJECT_ID || ""}
      >
        <TopBar />
      </AuthProvider>
      {children}
    </AuthGuard>
  );
}
