"use client";

import { useEffect, useState } from "react";
import { useSession } from "@descope/nextjs-sdk/client";
import { Descope } from "@descope/nextjs-sdk";
import { useRouter } from "next/navigation";

import Loading from "@/components/common/Loading";
import { useAppRoutes } from "@/store/useAppRoutes";
import cn from "@/utils/cn";

export default function Login() {
  const router = useRouter();
  const { isSessionLoading, isAuthenticated } = useSession();
  const { resetRoute } = useAppRoutes();
  const [showLoginForm, setShowLoginForm] = useState(false);

  const isLoggedIn = !isSessionLoading && isAuthenticated;

  useEffect(() => {
    if (isLoggedIn) {
      handleLoginSuccess();
    }
  }, [isSessionLoading, isAuthenticated, router]);

  const handleLoginSuccess = () => {
    resetRoute();
    router.push("/dashboard");
  };

  const handleLoginError = async () => {
    console.info("Could not logged in");
  };

  const onReady = () => {
    setShowLoginForm(true);
  };

  if (isLoggedIn) return null;

  return (
    <>
      <div
        className={cn(
          !showLoginForm && "hidden",
          "xs:min-w-auto flex h-96 items-center justify-center rounded-xl border border-zinc-300 bg-white p-8 shadow-lg md:min-w-lg",
        )}
      >
        {!showLoginForm && <Loading />}
        <Descope
          flowId="sign-in"
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
          onReady={onReady}
        />
      </div>
    </>
  );
}
