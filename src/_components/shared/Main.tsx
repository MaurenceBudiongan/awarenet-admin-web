import type { PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren) {
  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-auto bg-gray-50 p-4">
      {children}
    </main>
  );
}
