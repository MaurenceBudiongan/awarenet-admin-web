"use client";

import { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";

import Pagination from "@/components/common/Pagination";
import { db } from "lib/firebase";

type HistoryItem = {
  id: string;
  activityType?: string;
  description?: string;
  posterName?: string;
  date?: unknown;
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

function formatHistoryDate(value: unknown) {
  const parsedDate = toDate(value);
  if (!parsedDate) return "No date";

  const day = String(parsedDate.getDate()).padStart(2, "0");
  const month = parsedDate.toLocaleString("en-US", { month: "long" });
  const year = parsedDate.getFullYear();

  let hour = parsedDate.getHours();
  const minute = String(parsedDate.getMinutes()).padStart(2, "0");
  const meridiem = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  const formattedHour = String(hour).padStart(2, "0");

  return `${day} ${month}, ${year} at ${formattedHour}:${minute} ${meridiem}`;
}

function getActivityIcon(activityType?: string) {
  const normalized = (activityType ?? "").toLowerCase();

  if (normalized.includes("feedback")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#16A34A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
      </svg>
    );
  }

  if (normalized.includes("verify") || normalized.includes("link")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#EF4444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.801 10A10 10 0 1 1 17 3.335" />
        <path d="m9 11 3 3L22 4" />
      </svg>
    );
  }

  if (normalized.includes("post")) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#05893E"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

const History = () => {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(historyItems.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "history"),
      (snapshot) => {
        const list: HistoryItem[] = snapshot.docs.map((itemDoc) => {
          const data = itemDoc.data();
          return {
            id: itemDoc.id,
            activityType: data.activityType,
            description: data.description,
            posterName: data.posterName,
            date: data.date,
          };
        });

        list.sort((a, b) => {
          const aTime = toDate(a.date)?.getTime() ?? 0;
          const bTime = toDate(b.date)?.getTime() ?? 0;
          return bTime - aTime;
        });

        setHistoryItems(list);
        setIsLoading(false);
      },
      (error) => {
        console.error("Failed to subscribe history collection:", error);
        setIsLoading(false);
      },
    );

    return () => unsubscribe();
  }, []);

  const totalActivities = historyItems.length;
  const uniquePosters = useMemo(() => {
    const posters = new Set(
      historyItems
        .map((item) => item.posterName?.trim())
        .filter((value): value is string => Boolean(value)),
    );
    return posters.size;
  }, [historyItems]);

  const topActivityType = useMemo(() => {
    if (historyItems.length === 0) return "No activity yet";

    const counter: Record<string, number> = {};
    historyItems.forEach((item) => {
      const key = item.activityType?.trim() || "Unknown";
      counter[key] = (counter[key] ?? 0) + 1;
    });

    return Object.entries(counter).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Unknown";
  }, [historyItems]);

  const latestActivity = historyItems[0]?.date;
  const paginatedHistoryItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return historyItems.slice(startIndex, endIndex);
  }, [historyItems, safeCurrentPage]);

  return (
    <div className="w-full">
      <p className="mt-4 ml-10 text-lg font-bold sm:text-4xl">History</p>

      <div className="mt-10 mr-10 mb-7 ml-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm text-[#565d6d]">Total Activities</p>
            <p className="mt-2 text-2xl font-bold">{totalActivities}</p>
          </div>
          {getActivityIcon("history")}
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm text-[#565d6d]">Top Activity</p>
            <p className="mt-2 text-sm font-semibold">{topActivityType}</p>
          </div>
          {getActivityIcon(topActivityType)}
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm text-[#565d6d]">Unique Posters</p>
            <p className="mt-2 text-2xl font-bold">{uniquePosters}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8AAB67"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <path d="M16 3.128a4 4 0 0 1 0 7.744" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <circle cx="9" cy="7" r="4" />
          </svg>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div>
            <p className="text-sm text-[#565d6d]">Latest Activity</p>
            <p className="mt-2 text-sm font-semibold">
              {latestActivity ? formatHistoryDate(latestActivity) : "No date"}
            </p>
          </div>
          {getActivityIcon("latest")}
        </div>
      </div>

      <div className="mt-10 mr-10 mb-7 ml-10 overflow-x-auto rounded-xl border border-[#dee1e6] p-2 shadow-xs">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left text-[#565d6d]"></th>
              <th className="p-4 text-left text-[#565d6d]">Activity Type</th>
              <th className="p-4 text-left text-[#565d6d]">Description</th>
              <th className="p-4 text-left text-[#565d6d]">User</th>
              <th className="p-4 text-left text-[#565d6d]">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="border-t border-t-[#dee1e6]">
                <td className="p-4 text-[#565d6d]" colSpan={5}>
                  Loading history...
                </td>
              </tr>
            ) : null}

            {!isLoading && historyItems.length === 0 ? (
              <tr className="border-t border-t-[#dee1e6]">
                <td className="p-4 text-[#565d6d]" colSpan={5}>
                  No history records found.
                </td>
              </tr>
            ) : null}

            {!isLoading
              ? paginatedHistoryItems.map((item) => (
                  <tr key={item.id} className="border-t border-t-[#dee1e6]">
                    <td className="p-4">{getActivityIcon(item.activityType)}</td>
                    <td className="p-4">{item.activityType ?? "Unknown"}</td>
                    <td className="p-4 text-[#565d6d]">{item.description ?? "-"}</td>
                    <td className="p-4 text-[#565d6d]">{item.posterName ?? "Unknown"}</td>
                    <td className="p-4 text-[#565d6d]">
                      {formatHistoryDate(item.date)}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        {!isLoading && historyItems.length > 0 ? (
          <Pagination
            currentPage={safeCurrentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              if (page < 1 || page > totalPages) return;
              setCurrentPage(page);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default History;
