"use client";

import { useEffect, type PropsWithChildren } from "react";
import { useSession } from "@descope/nextjs-sdk/client";
import { useRouter } from "next/navigation";

import Loading from "@/components/common/Loading";

export default function AuthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated, isSessionLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isSessionLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isSessionLoading, isAuthenticated, router]);

  if (isSessionLoading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    return children;
  }

  return null;
}
