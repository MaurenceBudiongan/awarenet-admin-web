import type { PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren) {
  return (
    <main className="flex h-screen w-full justify-center bg-gray-50 p-4">
      {children}
    </main>
  );
}
