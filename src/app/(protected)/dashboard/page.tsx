"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import DonutChart from "../chart/donut_chart/page";
import BarChart from "../chart/bar_graph/page";
import LineGraph from "../chart/line_graph/page";
import { db } from "lib/firebase";

type HistoryItem = {
  activityType?: string;
  date?: unknown;
};

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        setTotalUsers(snapshot.size);
      },
      (error) => {
        console.error("Failed to subscribe users collection:", error);
      },
    );

    const unsubscribeHistory = onSnapshot(
      collection(db, "history"),
      (snapshot) => {
        const list: HistoryItem[] = snapshot.docs.map((itemDoc) => {
          const data = itemDoc.data();
          return {
            activityType: data.activityType,
            date: data.date,
          };
        });
        setHistoryItems(list);
      },
      (error) => {
        console.error("Failed to subscribe history collection:", error);
      },
    );

    return () => {
      unsubscribeUsers();
      unsubscribeHistory();
    };
  }, []);

  const todaysScans = useMemo(() => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    return historyItems.filter((item) => {
      const parsedDate = toDate(item.date);
      if (!parsedDate) return false;
      return (
        parsedDate.getDate() === day &&
        parsedDate.getMonth() === month &&
        parsedDate.getFullYear() === year
      );
    }).length;
  }, [historyItems]);

  const highRiskAlerts = useMemo(() => {
    return historyItems.filter((item) => {
      const type = (item.activityType ?? "").toLowerCase();
      return type.includes("risk") || type.includes("alert");
    }).length;
  }, [historyItems]);

  const todayScansTrend = useMemo(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayCount = historyItems.filter((item) => {
      const parsedDate = toDate(item.date);
      if (!parsedDate) return false;
      return (
        parsedDate.getDate() === yesterday.getDate() &&
        parsedDate.getMonth() === yesterday.getMonth() &&
        parsedDate.getFullYear() === yesterday.getFullYear()
      );
    }).length;

    if (yesterdayCount === 0) return "+0.0% vs yesterday";

    const change = ((todaysScans - yesterdayCount) / yesterdayCount) * 100;
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(1)}% vs yesterday`;
  }, [historyItems, todaysScans]);

  return (
    <div className="w-full px-4 py-6 sm:px-8 lg:px-12">

      {/* Hero banner — always dark gradient, white text is correct */}
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
              Total Users
            </p>
            <p className="mt-2 text-3xl font-bold">{totalUsers.toLocaleString()}</p>
            <p className="mt-1 text-xs text-cyan-100">From users collection</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-wider text-cyan-100 uppercase">
              Today Scans
            </p>
            <p className="mt-2 text-3xl font-bold">{todaysScans.toLocaleString()}</p>
            <p className="mt-1 text-xs text-cyan-100">{todayScansTrend}</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-wider text-cyan-100 uppercase">
              High Risk Alerts
            </p>
            <p className="mt-2 text-3xl font-bold">{highRiskAlerts.toLocaleString()}</p>
            <p className="mt-1 text-xs text-cyan-100">Based on history activityType</p>
          </div>
        </div>
      </div>

      {/* Chart cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Scans Analytic Volume
          </p>
          <p className="mt-1 mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            Daily security scan activity.
          </p>
          <BarChart />
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Risk Category Breakdown
          </p>
          <p className="mt-1 mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            Distribution of security risk and malicious activities.
          </p>
          <DonutChart />
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            User Activity Trends
          </p>
          <p className="mt-1 mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            Daily active users over the last 7 days.
          </p>
          <LineGraph />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "object" && value !== null && "toDate" in value) {
    const valueWithToDate = value as { toDate: () => Date };
    return valueWithToDate.toDate();
  }

  const parsed = new Date(value as string | number);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}