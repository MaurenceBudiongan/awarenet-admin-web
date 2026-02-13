import type { PropsWithChildren } from "react";

import SideBar from "@/components/shared/SideBar";
import Main from "@/components/shared/Main";
import TopBar from "./TopBar";

export default function Content({ children }: PropsWithChildren) {
  return (
    <div>
      <div className="fixed w-full">
        <TopBar />
      </div>
      <div className="left-0 flex w-full pt-14">
        <div className="fixed">
          <SideBar />
        </div>

        <div className="-z-10 ml-50 w-full">
          <Main>{children}</Main>
        </div>
      </div>
    </div>
  );
}
