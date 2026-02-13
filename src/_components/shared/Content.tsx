import type { PropsWithChildren } from "react";

import SideBar from "@/components/shared/SideBar";
import Main from "@/components/shared/Main";
import TopBar from "./TopBar";

export default function Content({ children }: PropsWithChildren) {
  return (
    <div className="relative">
      <div className="w-full">
        <TopBar />
      </div>
      <div className="relative flex w-full pt-14">
        <div className="">
          <SideBar />
        </div>

        <Main>{children}</Main>
      </div>
    </div>
  );
}
