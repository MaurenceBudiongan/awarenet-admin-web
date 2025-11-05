"use client";
import Image from "next/image";

const Homepage = () => {
  return (
    <div className="flex h-screen">
      <nav className="w-64 text-white flex flex-col p-6 space-y-6 border-2 border-r-gray-100">
        <h1 className="text-xl font-bold mb-6 text-green-800">
          AwareNet Admin
        </h1>
        <div className="group flex">
          <button className="group-hover:bg-[#05893E] active:bg-[#05893E] w-1 rounded"></button>
          <button className="group  py-2 px-1 w-px  rounded text-left text-[#05893E] font-inter font-medium">
            Dashboard
          </button>
        </div>
        <div className="group flex">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <button className="  py-2 px-1 w-px  rounded text-left text-[#05893E] font-inter font-medium">
            User
          </button>
        </div>
        <div className="group flex">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <button className="  py-2 px-1 w-px  rounded text-left text-[#05893E] font-inter font-medium">
            Feedback
          </button>
        </div>
        <div className="group flex">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <button className="  py-2 px-1 w-px  rounded text-left text-[#05893E] font-inter font-medium">
            History
          </button>
        </div>
        <div className="group flex">
          <button className="group-hover:bg-[#05893E] w-1 rounded"></button>
          <button className="  py-2 px-1 w-px  rounded text-left text-[#05893E] font-inter font-medium">
            Logout
          </button>
        </div>
      </nav>

      <main className="flex flex-col space-y-5 p-8 bg-white-100">
        <header>
          <Image
            src="/next.svg" // 🔹 image path (public/logo.png)
            alt="AwareNet Logo" // 🔹 for accessibility
            width={40} // 🔹 required width (px)
            height={40} // 🔹 required height (px)
            className="rounded-full"
          />
        </header>
        <p className="bg-green-500 text-green-800 text-xl font-semibold">
          Welcome to AwareNet Admin homepage
        </p>
      </main>
    </div>
  );
};

export default Homepage;
