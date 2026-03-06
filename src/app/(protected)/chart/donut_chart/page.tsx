"use client";
import React, { useEffect, useMemo, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "lib/firebase";

type Slice = {
  label: string;
  value: number;
  color: string;
  darkColor?: string;
};

type HistoryItem = {
  activityType?: string;
  description?: string;
  date?: unknown;
};

function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "object" && value !== null && "toDate" in value) {
    const v = value as { toDate: () => Date };
    return v.toDate();
  }
  const parsed = new Date(value as string | number);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

const DonutChart: React.FC<{
  slices: Slice[];
  size?: number;
  thickness?: number;
  isDark?: boolean;
}> = ({ slices, size = 200, thickness = 20, isDark = false }) => {
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  const total = slices.reduce((s, v) => s + v.value, 0);

  type Arc = {
    label: string;
    color: string;
    darkColor?: string;
    dash: number;
    gap: number;
    strokeWidth: number;
    offset: number;
  };

  const { arcs } = slices.reduce(
    (acc, slice) => {
      const fraction = slice.value / total;
      const dash = fraction * circumference;
      const gap = Math.max(0, circumference - dash);
      acc.arcs.push({
        label: slice.label,
        color: slice.color,
        darkColor: slice.darkColor,
        dash,
        gap,
        strokeWidth: thickness,
        offset: -acc.offset,
      });
      acc.offset += dash;
      return acc;
    },
    { arcs: [] as Arc[], offset: 0 },
  );

  const centerFill = isDark ? "#27272a" : "#fff";
  const centerTextFill = isDark ? "#f4f4f5" : "#18181b";

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        style={{ maxWidth: size, display: "block" }}
        aria-label="Donut chart"
      >
        <g transform={`rotate(-90 ${radius} ${radius})`}>
          {arcs.map((a) => (
            <circle
              key={a.label}
              r={radius - a.strokeWidth / 2}
              cx={radius}
              cy={radius}
              fill="transparent"
              stroke={isDark && a.darkColor ? a.darkColor : a.color}
              strokeWidth={a.strokeWidth}
              strokeDasharray={`${a.dash} ${a.gap}`}
              strokeDashoffset={a.offset}
            />
          ))}
        </g>
        <circle
          cx={radius}
          cy={radius}
          r={radius - thickness - 6}
          fill={centerFill}
        />
        <text
          x={radius}
          y={radius - 6}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={centerTextFill}
          style={{ fontSize: 11, fontWeight: 600 }}
        >
          Total
        </text>
        <text
          x={radius}
          y={radius + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={centerTextFill}
          style={{ fontSize: 14, fontWeight: 700 }}
        >
          {total}
        </text>
      </svg>

      {/* Legend */}
      <div className="flex flex-col gap-2 w-full">
        {slices.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span
              className="inline-block h-3.5 w-3.5 rounded-sm flex-shrink-0"
              style={{
                background: isDark && s.darkColor ? s.darkColor : s.color,
              }}
            />
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {s.label}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-auto">
              {s.value} ({Math.round((s.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

function DonutChartWrapper({
  slices,
  size,
  thickness,
}: {
  slices: Slice[];
  size?: number;
  thickness?: number;
}) {
  return (
    <>
      <div className="block dark:hidden">
        <DonutChart slices={slices} size={size} thickness={thickness} isDark={false} />
      </div>
      <div className="hidden dark:block">
        <DonutChart slices={slices} size={size} thickness={thickness} isDark={true} />
      </div>
    </>
  );
}

const EMPTY_LEGEND = [
  { label: "Safe", color: "#16a34a" },
  { label: "Malicious", color: "#dc2626" },
  { label: "Suspicious", color: "#ea580c" },
];

export default function Page(): React.ReactElement {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "history"),
      (snapshot) => {
        const items: HistoryItem[] = snapshot.docs.map((doc) => {
          const d = doc.data();
          return { activityType: d.activityType, description: d.description, date: d.date };
        });
        setHistoryItems(items);
        setLoading(false);
      },
      (error) => {
        console.error("Failed to subscribe history collection:", error);
        setLoading(false);
      },
    );
    return () => unsub();
  }, []);

  const { safe, malicious, suspicious } = useMemo(() => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();

    const monthItems = historyItems.filter((item) => {
      const parsed = toDate(item.date);
      if (!parsed) return false;
      return parsed.getMonth() === month && parsed.getFullYear() === year;
    });

    // The mobile app stores activityType="Scanning" and description="Safe: <url>",
    // "Malicious: <url>", or "Suspicious: <url>". Match against description first,
    // then fall back to activityType for any other format.
    const getStatus = (item: HistoryItem) => {
      const desc = (item.description ?? "").toLowerCase();
      const type = (item.activityType ?? "").toLowerCase();
      if (desc.startsWith("safe") || type.includes("safe")) return "safe";
      if (desc.startsWith("malicious") || type.includes("malicious")) return "malicious";
      if (desc.startsWith("suspicious") || type.includes("suspicious")) return "suspicious";
      return null;
    };

    return {
      safe: monthItems.filter((i) => getStatus(i) === "safe").length,
      malicious: monthItems.filter((i) => getStatus(i) === "malicious").length,
      suspicious: monthItems.filter((i) => getStatus(i) === "suspicious").length,
    };
  }, [historyItems]);

  const total = safe + malicious + suspicious;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <span className="text-sm text-zinc-400">Loading...</span>
      </div>
    );
  }

  if (total === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-6">
        <svg viewBox="0 0 200 200" width="100%" style={{ maxWidth: 200 }}>
          <circle
            cx="100"
            cy="100"
            r="76"
            fill="transparent"
            stroke="#e4e4e7"
            strokeWidth="20"
          />
          <circle
            cx="100"
            cy="100"
            r="56"
            fill="white"
            className="dark:fill-zinc-900"
          />
          <text
            x="100"
            y="95"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#a1a1aa"
            style={{ fontSize: 11 }}
          >
            No data
          </text>
          <text
            x="100"
            y="112"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#a1a1aa"
            style={{ fontSize: 11 }}
          >
            this month
          </text>
        </svg>
        <div className="flex flex-col gap-2 w-full">
          {EMPTY_LEGEND.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span
                className="inline-block h-3.5 w-3.5 rounded-sm flex-shrink-0"
                style={{ background: item.color }}
              />
              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                {item.label}
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400 ml-auto">
                0 (0%)
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const slices: Slice[] = [
    { label: "Safe", value: safe, color: "#16a34a", darkColor: "#4ade80" },
    { label: "Malicious", value: malicious, color: "#dc2626", darkColor: "#f87171" },
    { label: "Suspicious", value: suspicious, color: "#ea580c", darkColor: "#fb923c" },
  ];

  return (
    <main>
      <DonutChartWrapper slices={slices} size={200} thickness={20} />
    </main>
  );
}
