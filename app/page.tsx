"use client"

import { useRouter } from "next/navigation";

const LOGIN_PAGE = "/login";

export default function Home() {
  const router = useRouter();

  const goToLoginPage = () => {
    router.push(LOGIN_PAGE);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        
        <h1>Awarenet Admin Web</h1>

        <div onClick={goToLoginPage} className="cursor-pointer hover:text-blue-200">
          Go to Login page
        </div>
      </main>
    </div>
  );
}
