"use client";

import { useEffect, type PropsWithChildren } from "react";

import { useSession } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
}
