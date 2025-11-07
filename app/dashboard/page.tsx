"use client";

const Dashboard = () => {
  return (
    <div>
      <p className="ml-10 mt-4 text-4xl font-bold ">Dashboard Overview</p>
      <div className="m-10 p-4 bg-[#F3F7FC] rounded-lg h-64 flex flex-col justify-around gap-y-2">
        <div className="flex flex-col items-center ">
          <div className="flex items-center p-2 bg-black rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shield-check-icon lucide-shield-check text-white"
            >
              <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <p className="ml-5 mt-5 text-md text-gray-500 font-bold mt-3">
            Total Active Users
          </p>
        </div>
        <div className="flex flex-col ">
          <p className="ml-5 text-6xl font-bold ">2,450</p>
          <p className="ml-5 text-md text-gray-500 font-semibold mt-3">
            Currently online and active
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
