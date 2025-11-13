"use client";
import DonutChart from "../chart/donut_chart/page";
import BarChart from "../chart/bar_graph/page";
import LineGraph from "../chart/line_graph/page";

const Dashboard = () => {
  return (
    <div>
      <p className="ml-10 mt-4 text-4xl font-bold ">Dashboard Overview</p>
      <div className="flex flex-col">
        <div className="ml-10 mr-10 mt-10 mb-7 p-6 bg-[#F3F7FC] rounded-xl  flex flex-col justify-around gap-y-2">
          <div className="flex flex-col items-start sm:items-center ">
            <div className="ml-5 sm:ml-0 p-2 bg-black rounded-full">
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
            <p className="ml-5 mt-5 text-md text-gray-500 font-bold">
              Total Active Users
            </p>
          </div>
          <div className="flex flex-col ">
            <p className="ml-5 text-5xl font-bold ">2,450</p>
            <p className="ml-5 text-md text-gray-500 font-semibold mt-3">
              Currently online and active
            </p>
          </div>
        </div>
        <div className="ml-10 mr-10 rounded-lg  flex-row md:flex  justify-between gap-x-15 sm:space-y-5  ">
          <div className="p-8 rounded-xl w-full shadow-sm ">
            <p className="text-xl font-semibold mb-3">Scans Analytic volume</p>
            <p className="text-md text-gray-500 font-semibold">
              Daily security scan activity.
            </p>
            <div>
              <BarChart />
            </div>
          </div>
          <div className="p-8 rounded-xl w-full shadow-sm">
            <p className="text-xl font-semibold mb-3">
              Risk Category Breakdown
            </p>
            <p className="text-md text-gray-500 font-semibold">
              Distribution of security risk and malicious activities{" "}
            </p>
            <div>
              <DonutChart />
            </div>
          </div>
          <div className="p-8 rounded-xl w-full shadow-sm">
            <p className="text-xl font-semibold mb-3">User Activity Trends</p>
            <p className="text-md text-gray-500 font-semibold">
              Daily active user over the last 7 days.
            </p>
            <div>
              <LineGraph />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
