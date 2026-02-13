import type { PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren) {
  return (
    <main className="ml-44 flex w-full justify-center bg-gray-50 p-4">
      {children}
    </main>
  );
}
