"use client";

import { useEffect, useState } from "react";
import { useSession } from "@descope/nextjs-sdk/client";
import { Descope } from "@descope/nextjs-sdk";
import { useRouter } from "next/navigation";

import Loading from "@/components/common/Loading";
import cn from "@/utils/cn";

export default function Login() {
  const router = useRouter();
  const { isSessionLoading, isAuthenticated } = useSession();
  const [showLoginForm, setShowLoginForm] = useState(false);

  const isLoggedIn = !isSessionLoading && isAuthenticated;

  useEffect(() => {
    if (isLoggedIn) router.push("/dashboard");
  }, [isSessionLoading, isAuthenticated, router]);

  const handleLoginSuccess = async () => {
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
      {!showLoginForm && <Loading />}
      <div
        className={cn(
          !showLoginForm && "hidden",
          "xs:min-w-auto rounded-xl border border-zinc-300 bg-white p-8 shadow-lg md:min-w-lg",
        )}
      >
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
