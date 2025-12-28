import type { PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren) {
  return (
    <main className="h-screen w-full bg-gray-50 flex items-center justify-center relative p-4 overflow-auto">
      {children}
    </main>
  );
}
