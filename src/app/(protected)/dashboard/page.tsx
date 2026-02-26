import type { Metadata } from "next";

import DonutChart from "../chart/donut_chart/page";
import BarChart from "../chart/bar_graph/page";
import LineGraph from "../chart/line_graph/page";

export const metadata: Metadata = {
  title: "AwareNet - Dashboard",
};

const Dashboard = () => {
  return (
    <div className="w-full px-4 py-6 sm:px-8 lg:px-12">
      <div className="rounded-2xl bg-linear-to-r from-[#0b1f35] via-[#12365d] to-[#1c4f80] p-6 text-white shadow-lg sm:p-8">
        <p className="text-sm tracking-[0.2em] text-cyan-100 uppercase">
          Dashboard
        </p>
        <p className="mt-2 text-2xl font-bold sm:text-4xl">AwareNet Statistics</p>
        <p className="mt-2 text-sm text-cyan-50 sm:text-base">
          Real-time security visibility across users, risks, and scanning activity.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-wider text-cyan-100 uppercase">
              Total Active Users
            </p>
            <p className="mt-2 text-3xl font-bold">2,450</p>
            <p className="mt-1 text-xs text-cyan-100">Currently online and active</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-wider text-cyan-100 uppercase">
              Today Scans
            </p>
            <p className="mt-2 text-3xl font-bold">8,914</p>
            <p className="mt-1 text-xs text-cyan-100">+12.4% vs yesterday</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-wider text-cyan-100 uppercase">
              High Risk Alerts
            </p>
            <p className="mt-2 text-3xl font-bold">37</p>
            <p className="mt-1 text-xs text-cyan-100">Needs analyst review</p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold text-zinc-900">Scans Analytic Volume</p>
          <p className="mt-1 mb-4 text-sm text-zinc-500">
            Daily security scan activity.
          </p>
          <BarChart />
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold text-zinc-900">Risk Category Breakdown</p>
          <p className="mt-1 mb-4 text-sm text-zinc-500">
            Distribution of security risk and malicious activities.
          </p>
          <DonutChart />
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-lg font-semibold text-zinc-900">User Activity Trends</p>
          <p className="mt-1 mb-4 text-sm text-zinc-500">
            Daily active users over the last 7 days.
          </p>
          <LineGraph />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
