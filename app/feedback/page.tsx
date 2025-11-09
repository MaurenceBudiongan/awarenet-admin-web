"use client";
import Image from "next/image";

const Feedback = () => {
  return (
    <div>
      <p className="ml-10 mt-4 text-4xl font-bold">Feedback Overview</p>
      <div className="flex flex-col ">
        <div className="ml-10 mr-10 mt-10  rounded-xl flex space-x-15 ">
          <div className="w-full bg-[#eafef3] rounded-lg space-y-4 h-50 flex flex-col justify-center p-10">
            <p className="text-xl font-semibold ">Total Feedback Entries</p>
            <p className="text-3xl font-bold text-[#05893E]">9</p>
            <p className="text-md text-gray-500">Across all users</p>
          </div>
          <div className="w-full bg-[#eafef3] rounded-lg space-y-4 h-50 flex flex-col justify-center p-10">
            <p className="text-xl font-semibold">Average Rating</p>
            <p className="text-3xl font-bold text-[#05893E]">4.1 / 5</p>
            <p className="text-md text-gray-500">Based on all submissions</p>
          </div>
        </div>

        <div className="ml-10 mr-10 mt-5 mb-7 rounded-xl flex space-x-15 ">
          <div className="w-full bg-[#e5f6ff] rounded-lg space-y-4 h-50 flex flex-col justify-center p-10">
            <div className="flex space-x-4">
              <div>
                <Image
                  src="/profile.png"
                  alt="AwareNet Logo"
                  width={50}
                  height={50}
                  className="rounded-full "
                />
              </div>
              <div>
                <p className="text-lg">Anora, Rhea</p>
                <p className="text-md text-[#565d6d]">July 22, 2024</p>
              </div>
            </div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#EAB308"
                stroke="#EAB308"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#EAB308"
                stroke="#EAB308"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#EAB308"
                stroke="#EAB308"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star-icon lucide-star"
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
            </div>
            <div>
              <p>
                The new dashboard update is fantastic! Its so much easier to
                navigate and find the information I need. Great job to the team!
              </p>
            </div>
            <div>
              <p>
                <button className="text-[#05893E] float-right">
                  View Details
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
