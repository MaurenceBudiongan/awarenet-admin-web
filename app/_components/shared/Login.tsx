"use client";

import { Descope } from "@descope/nextjs-sdk";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLoginSuccess = async () => {
    router.push("/homepage");
  };

  const handleLoginError = async () => {
    console.info("Could not logged in");
  };

  return (
    <div className="p-2 bg-white rounded-xl shadow-md min-w-2xl">
      <Descope
        flowId="sign-in"
        onSuccess={handleLoginSuccess}
        onError={handleLoginError}
      />
    </div>
  );
}
