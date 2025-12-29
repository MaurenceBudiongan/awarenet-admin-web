import type { Metadata } from "next";

import DonutChart from "../chart/donut_chart/page";
import BarChart from "../chart/bar_graph/page";
import LineGraph from "../chart/line_graph/page";

export const metadata: Metadata = {
  title: "AwareNet - Dashboard",
};

const Dashboard = () => {
  return (
    <div>
      <p className="mt-4 ml-10 text-lg font-bold sm:text-4xl">
        Dashboard Overview
      </p>
      <div className="flex w-full flex-col">
        <div className="mt-10 mr-10 mb-7 ml-10 flex flex-col justify-around gap-y-2 rounded-xl bg-[#F3F7FC] p-6">
          <div className="flex flex-col items-start sm:items-center">
            <div className="ml-5 rounded-full bg-black p-2 sm:ml-0">
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
            <p className="text-md mt-5 ml-5 font-bold text-gray-500">
              Total Active Users
            </p>
          </div>
          <div className="flex flex-col">
            <p className="ml-5 text-5xl font-bold">2,450</p>
            <p className="text-md mt-3 ml-5 font-semibold text-gray-500">
              Currently online and active
            </p>
          </div>
        </div>
        <div className="mr-10 ml-10 flex-row justify-between space-y-5 gap-x-15 rounded-lg sm:space-y-0 md:flex md:space-y-0">
          <div className="w-full rounded-xl p-8 shadow-sm">
            <p className="text-md mb-3 font-semibold sm:text-xl">
              Scans Analytic volume
            </p>
            <p className="text-md font-semibold text-gray-500">
              Daily security scan activity.
            </p>
            <div>
              <BarChart />
            </div>
          </div>
          <div className="w-full rounded-xl p-8 shadow-sm">
            <p className="mb-3 text-xl font-semibold">
              Risk Category Breakdown
            </p>
            <p className="text-md font-semibold text-gray-500">
              Distribution of security risk and malicious activities{" "}
            </p>
            <div>
              <DonutChart />
            </div>
          </div>
          <div className="w-full rounded-xl p-8 shadow-sm">
            <p className="mb-3 text-xl font-semibold">User Activity Trends</p>
            <p className="text-md font-semibold text-gray-500">
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
