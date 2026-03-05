"use client";
import React from "react";

type Slice = {
  label: string;
  value: number;
  color: string;
  darkColor?: string;
};

const DonutChart: React.FC<{
  slices: Slice[];
  size?: number;
  thickness?: number;
  isDark?: boolean;
}> = ({ slices, size = 200, thickness = 48, isDark = false }) => {
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
      const strokeWidth = thickness;
      acc.arcs.push({
        label: slice.label,
        color: slice.color,
        darkColor: slice.darkColor,
        dash,
        gap,
        strokeWidth,
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
        {/* Center circle */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - thickness - 6}
          fill={centerFill}
        />
        <text
          x={radius}
          y={radius}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={centerTextFill}
          style={{ fontSize: 14, fontWeight: 600 }}
        >
          {total}
        </text>
      </svg>

      {/* Legend */}
      <div className="flex flex-col gap-2">
        {slices.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span
              className="inline-block h-3.5 w-3.5 rounded-sm"
              style={{ background: isDark && s.darkColor ? s.darkColor : s.color }}
            />
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              {s.label}
            </span>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Dark mode aware wrapper using two renders toggled by Tailwind
function DonutChartWrapper({ slices, size, thickness }: { slices: Slice[]; size?: number; thickness?: number }) {
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

export default function Page(): React.ReactElement {
  const data: Slice[] = [
    {
      label: "Security Risk",
      value: 68,
      color: "#0D243A",
      darkColor: "#60a5fa", // blue-400 — visible on dark bg
    },
    {
      label: "Malicious Activities",
      value: 32,
      color: "#8AAB67",
      darkColor: "#86efac", // green-300 — brighter on dark bg
    },
  ];

  return (
    <main className="p-12">
      <DonutChartWrapper slices={data} size={200} thickness={20} />
    </main>
  );
}