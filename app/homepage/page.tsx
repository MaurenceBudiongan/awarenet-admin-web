"use client";
import Image from "next/image";

const Homepage = () => {
  return (
    <div className="flex h-screen">
      <nav className="w-96 text-white flex flex-col p-6 space-y-6 border-r-3 border-gray-100">
        <Image
          src="/logo.png"
          alt="AwareNet Logo"
          width={100}
          height={100}
          className="rounded-full float-right"
        />
        <div className="group flex">
          <button className="group-hover:bg-[#05893E] active:bg-[#05893E] w-1 rounded"></button>
          <button className="py-2 px-1 w-px  rounded text-left text-[#05893E] font-inter font-medium">
            Dashboard
          </button>
        </div>
        <div className="group flex">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <button className="py-2 px-1 w-full  rounded text-left text-[#05893E] font-inter font-medium">
            User
          </button>
        </div>
        <div className="group flex">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <button className="py-2 px-1 w-full  rounded text-left text-[#05893E] font-inter font-medium">
            Feedback
          </button>
        </div>
        <div className="group flex">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <button className="py-2 px-1 w-full  rounded text-left text-[#05893E] font-inter font-medium">
            History
          </button>
        </div>
        <div className="group flex">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <button className="py-2 px-1 w-full  rounded text-left text-[#05893E] font-inter font-medium">
            Manage Awareness Guide
          </button>
        </div>

        <div className="group flex">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <button className="py-2 px-1 w-full  rounded text-left text-[#05893E] font-inter font-medium">
            Logout
          </button>
        </div>
      </nav>

      <main className="relative flex flex-col space-y-6 w-full">
        <header className="p-4 border-b-3 border-gray-100 mr-10">
          <Image
            src="/profile.png"
            alt="AwareNet Logo"
            width={50}
            height={50}
            className="rounded-full float-right"
          />
        </header>
        <p className="ml-6 text-2xl font-semibold">Dashboard Overview</p>
      </main>
    </div>
  );
};

export default Homepage;
