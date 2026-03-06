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
  userId?: string;
};

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

function isSameDay(a: Date, b: Date) {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function getLast7Days() {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    return d;
  });
}

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
            userId: data.userId,
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
    return historyItems.filter((item) => {
      const parsed = toDate(item.date);
      return parsed ? isSameDay(parsed, today) : false;
    }).length;
  }, [historyItems]);

  const highRiskAlerts = useMemo(() => {
    return historyItems.filter((item) => {
      const type = (item.activityType ?? "").toLowerCase();
      return type.includes("malicious") || type.includes("suspicious");
    }).length;
  }, [historyItems]);

  const todayScansTrend = useMemo(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayCount = historyItems.filter((item) => {
      const parsed = toDate(item.date);
      return parsed ? isSameDay(parsed, yesterday) : false;
    }).length;
    if (yesterdayCount === 0) return "+0.0% vs yesterday";
    const change = ((todaysScans - yesterdayCount) / yesterdayCount) * 100;
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(1)}% vs yesterday`;
  }, [historyItems, todaysScans]);

  // Bar chart: daily scan/verify counts for the last 7 days
  const barData = useMemo(() => {
    const last7 = getLast7Days();
    return last7.map((d) => {
      const count = historyItems.filter((item) => {
        const parsed = toDate(item.date);
        return parsed ? isSameDay(parsed, d) : false;
      }).length;
      return {
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        count,
      };
    });
  }, [historyItems]);

  // Line graph: daily active users (unique userIds) for the last 7 days
  const lineData = useMemo(() => {
    const last7 = getLast7Days();
    return last7.map((d) => {
      const dayItems = historyItems.filter((item) => {
        const parsed = toDate(item.date);
        return parsed ? isSameDay(parsed, d) : false;
      });
      const uniqueUsers = new Set(
        dayItems.map((i) => i.userId).filter(Boolean),
      );
      const count = uniqueUsers.size > 0 ? uniqueUsers.size : dayItems.length;
      return {
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        count,
      };
    });
  }, [historyItems]);

  const currentMonthName = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full px-4 py-6 sm:px-8 lg:px-12">
      {/* Hero banner */}
      <div className="rounded-2xl bg-linear-to-r from-[#0b1f35] via-[#12365d] to-[#1c4f80] p-6 text-white shadow-lg sm:p-8">
        <p className="text-sm tracking-[0.2em] text-cyan-100 uppercase">
          Dashboard
        </p>
        <p className="mt-2 text-2xl font-bold sm:text-4xl">
          AwareNet Statistics
        </p>
        <p className="mt-2 text-sm text-cyan-50 sm:text-base">
          Real-time security visibility across users, risks, and scanning
          activity.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-wider text-cyan-100 uppercase">
              Total Users
            </p>
            <p className="mt-2 text-3xl font-bold">
              {totalUsers.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-cyan-100">From users collection</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-wider text-cyan-100 uppercase">
              Today Scans
            </p>
            <p className="mt-2 text-3xl font-bold">
              {todaysScans.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-cyan-100">{todayScansTrend}</p>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-xs font-semibold tracking-wider text-cyan-100 uppercase">
              High Risk Alerts
            </p>
            <p className="mt-2 text-3xl font-bold">
              {highRiskAlerts.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-cyan-100">
              Malicious + suspicious scans
            </p>
          </div>
        </div>
      </div>

      {/* Chart cards */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Scans / Verifications Per Day
          </p>
          <p className="mt-1 mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            Number of link scans each day — last 7 days.
          </p>
          <BarChart data={barData} />
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            URL Category Breakdown
          </p>
          <p className="mt-1 mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            Safe · Malicious · Suspicious — {currentMonthName}.
          </p>
          <DonutChart />
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Daily Active Users
          </p>
          <p className="mt-1 mb-4 text-sm text-zinc-500 dark:text-zinc-400">
            Unique active users per day — last 7 days.
          </p>
          <LineGraph data={lineData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
