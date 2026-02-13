"use client";
import type { PropsWithChildren } from "react";
import AuthGuard from "@/shared/AuthGuard";
import TopBar from "@/_components/shared/TopBar";
import { AuthProvider } from "@descope/react-sdk";
import Content from "@/shared/Content";

export default function Layout({ children }: PropsWithChildren) {
  return <AuthGuard>{children}</AuthGuard>;
}
