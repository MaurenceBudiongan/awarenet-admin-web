import type { PropsWithChildren } from "react";

import SideBar from "@/components/shared/SideBar";
import Main from "@/components/shared/Main";

export default function Content({ children }: PropsWithChildren) {
  return (
    <div className="fixed left-0 mt-16 flex h-screen w-full">
      <SideBar />
      <Main>{children}</Main>
    </div>
  );
}
