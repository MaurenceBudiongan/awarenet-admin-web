import type { PropsWithChildren } from "react";
import AuthGuard from "@/shared/AuthGuard";

export default function Layout({ children }: PropsWithChildren) {
  return <AuthGuard>{children}</AuthGuard>;
}
