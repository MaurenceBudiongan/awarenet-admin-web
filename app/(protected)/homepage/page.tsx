"use client";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import user from "../user/page";
import feedback from "../feedback/page";
import history from "../history/page";
import manage_awareness_guide from "../manage_awareness_guide/page";

const Dashboard = dynamic(() => import("../dashboard/page"), { ssr: false });
const User = dynamic(() => Promise.resolve(user), {
  ssr: false,
});
const Feedback = dynamic(() => Promise.resolve(feedback), {
  ssr: false,
});
const History = dynamic(() => Promise.resolve(history), {
  ssr: false,
});
const Manage_Awareness_Guide = dynamic(
  () => Promise.resolve(manage_awareness_guide),
  {
    ssr: false,
  }
);
const Logout = dynamic(() => Promise.resolve(history), {
  ssr: false,
});

const Homepage = () => {
  const [active, setActive] = useState("welcome");

  let content;

  switch (active) {
    case "dashboard":
      content = <Dashboard />;
      break;
    case "user":
      content = <User />;
      break;
    case "feedback":
      content = <Feedback />;
      break;
    case "history":
      content = <History />;
      break;
    case "manage_awareness_guide":
      content = <Manage_Awareness_Guide />;
      break;
    case "logout":
      content = <Logout />;
      break;
    default:
      content = <Dashboard />;
      break;
  }
  return (
    <div className="flex h-screen">
      {/* <nav className="w-120 text-white flex flex-col p-6 space-y-6 border-r-3 border-gray-100">
        <Image
          src="/logo.png"
          alt="AwareNet Logo"
          width={150}
          height={150}
          className="rounded-full float-right"
        />
        <div className="group flex text-xs md:text-base">
          <button className="group-hover:bg-[#05893E] active:bg-[#05893E] w-1 rounded"></button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-2 ml-2 mr-2 text-[#565d6d] group-hover:text-[#05893E] gitlucide lucide-layout-dashboard-icon lucide-layout-dashboard"
          >
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
          </svg>
          <button
            onClick={() => setActive("dashboard")}
            className="py-2 px-1 w-px rounded text-left text-[#565d6d] hover:text-[#05893E] font-inter font-medium "
          >
            Dashboard
          </button>
        </div>
        <div className="group flex text-xs md:text-base">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-2 ml-2 mr-2 text-[#565d6d] group-hover:text-[#05893E] lucide lucide-user-check-icon lucide-user-check"
          >
            <path d="m16 11 2 2 4-4" />
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
          </svg>
          <button
            onClick={() => setActive("user")}
            className="py-2 px-1 w-full  rounded text-left text-[#565d6d] hover:text-[#05893E] font-inter font-medium text-md"
          >
            User
          </button>
        </div>
        <div className="group flex text-xs md:text-base">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-2 ml-2 mr-2 text-[#565d6d] group-hover:text-[#05893E] lucide lucide-message-circle-more-icon lucide-message-circle-more"
          >
            <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
            <path d="M8 12h.01" />
            <path d="M12 12h.01" />
            <path d="M16 12h.01" />
          </svg>
          <button
            onClick={() => setActive("feedback")}
            className="py-2 px-1 w-full  rounded text-left text-[#565d6d] hover:text-[#05893E] font-inter font-medium text-md"
          >
            Feedback
          </button>
        </div>
        <div className="group flex text-xs md:text-base">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-2 ml-2 mr-2 text-[#565d6d] group-hover:text-[#05893E] lucide lucide-history-icon lucide-history"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M12 7v5l4 2" />
          </svg>
          <button
            onClick={() => setActive("history")}
            className="py-2 px-1 w-full  rounded text-left text-[#565d6d] hover:text-[#05893E] font-inter font-medium text-md"
          >
            History
          </button>
        </div>
        <div className="group flex text-xs md:text-base">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-2 ml-2 mr-2 text-[#565d6d] group-hover:text-[#05893E] lucide lucide-book-icon lucide-book"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
          </svg>
          <button
            onClick={() => setActive("manage_awareness_guide")}
            className="py-2 px-1 w-full  rounded text-left text-[#565d6d] hover:text-[#05893E] font-inter font-medium text-md"
          >
            Manage Awareness Guide
          </button>
        </div>

        <div className="group flex text-xs md:text-base">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-2 ml-2 mr-2 text-[#565d6d] group-hover:text-[#05893E] lucide lucide-log-out-icon lucide-log-out"
          >
            <path d="m16 17 5-5-5-5" />
            <path d="M21 12H9" />
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          </svg>
          <button
            onClick={() => setActive("logout")}
            className="py-2 px-1 w-full  rounded text-left text-[#565d6d] hover:text-[#05893E] font-inter font-medium text-md"
          >
            Logout
          </button>
        </div>
      </nav> */}

      <main className="relative flex flex-col space-y-6 w-full">
        <header className="p-4 border-b-3 border-gray-100 ">
          <Image
            src="/profile.png"
            alt="AwareNet Logo"
            width={50}
            height={50}
            className="rounded-full float-right mr-10"
          />
        </header>
        <div>{content}</div>
      </main>
    </div>
  );
};

export default Homepage;
