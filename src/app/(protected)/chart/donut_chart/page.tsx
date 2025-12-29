"use client";
import React from "react";

type Slice = {
  label: string;
  value: number;
  color: string;
};

const DonutChart: React.FC<{
  slices: Slice[];
  size?: number;
  thickness?: number;
}> = ({ slices, size = 200, thickness = 48 }) => {
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;

  const total = slices.reduce((s, v) => s + v.value, 0);

  // Precompute arc parameters using reduce (no reassign of top-level locals)
  type Arc = {
    label: string;
    color: string;
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
        dash,
        gap,
        strokeWidth,
        offset: -acc.offset,
      });
      acc.offset += dash;
      return acc;
    },
    { arcs: [] as Arc[], offset: 0 }
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 24,
        alignItems: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
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
              stroke={a.color}
              strokeWidth={a.strokeWidth}
              strokeDasharray={`${a.dash} ${a.gap}`}
              strokeDashoffset={a.offset}
            />
          ))}
        </g>
        {/* center label */}
        <circle
          cx={radius}
          cy={radius}
          r={radius - thickness - 6}
          fill="#fff"
        />
        <text
          x={radius}
          y={radius}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: 14, fontWeight: 600 }}
        >
          {total}
        </text>
      </svg>

      <div>
        {slices.map((s) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                width: 14,
                height: 14,
                background: s.color,
                display: "inline-block",
                borderRadius: 3,
              }}
            />
            <span style={{ fontSize: 14, fontWeight: 800 }}>{s.label}</span>
            <span style={{ color: "#666" }}>
              {Math.round((s.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Page(): React.ReactElement {
  // Two data points: Security Risk and Malicious Activities
  // Change the `value` numbers below to update the chart proportions.
  const data: Slice[] = [
    { label: "Security Risk", value: 68, color: "#0D243A" },
    { label: "Malicious Activities", value: 32, color: "#8AAB67" },
  ];

  return (
    <main style={{ padding: 50 }}>
      <DonutChart slices={data} size={200} thickness={20} />
    </main>
  );
}
