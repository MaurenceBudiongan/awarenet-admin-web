"use client";

import React from "react";

type DayData = { day: string; count: number };

const chartWidth = 400;
const chartHeight = 400;
const padding = 60;
const radius = 5;

function computeGrid(data: DayData[]) {
  const rawMax = Math.max(...data.map((d) => d.count), 1);
  const maxValue = Math.ceil(rawMax / 10) * 10;
  const step = maxValue / 4;
  return {
    maxValue,
    gridLines: [0, step, step * 2, step * 3, maxValue],
  };
}

function renderChart(
  data: DayData[],
  barColor: string,
  axisColor: string,
  gridColor: string,
) {
  const { maxValue, gridLines } = computeGrid(data);
  const barWidth = (chartWidth - 2 * padding) / data.length;
  const barSpacing = barWidth * 0.8;

  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      width="100%"
      style={{ display: "block" }}
    >
      {gridLines.map((yValue) => {
        const yPos =
          chartHeight -
          padding -
          (yValue / maxValue) * (chartHeight - 2 * padding);
        return (
          <g key={`grid-${yValue}`}>
            <line
              x1={padding}
              y1={yPos}
              x2={chartWidth - padding}
              y2={yPos}
              stroke={gridColor}
              strokeWidth="1"
            />
            <text
              x={padding - 8}
              y={yPos + 5}
              fontSize="11"
              fill={axisColor}
              textAnchor="end"
            >
              {Math.round(yValue)}
            </text>
          </g>
        );
      })}

      {/* Y-axis */}
      <line
        x1={padding}
        y1={padding}
        x2={padding}
        y2={chartHeight - padding}
        stroke={gridColor}
        strokeWidth="1"
      />

      {/* X-axis */}
      <line
        x1={padding}
        y1={chartHeight - padding}
        x2={chartWidth - padding}
        y2={chartHeight - padding}
        stroke={gridColor}
        strokeWidth="2"
      />

      {data.map((item, index) => {
        const barHeight =
          (item.count / maxValue) * (chartHeight - 2 * padding);
        const xPos =
          padding + index * barWidth + (barWidth - barSpacing) / 2;
        const yPos = chartHeight - padding - Math.max(barHeight, 0);
        return (
          <g key={`bar-${item.day}-${index}`}>
            <rect
              x={xPos}
              y={yPos}
              width={barSpacing}
              height={Math.max(barHeight, 0)}
              fill={barColor}
              ry={radius}
            />
            <text
              x={xPos + barSpacing / 2}
              y={chartHeight - padding + 22}
              fontSize="12"
              fill={axisColor}
              textAnchor="middle"
            >
              {item.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function BarChartPage({ data }: { data?: DayData[] }) {
  const chartData: DayData[] = data ?? [
    { day: "Mon", count: 0 },
    { day: "Tue", count: 0 },
    { day: "Wed", count: 0 },
    { day: "Thu", count: 0 },
    { day: "Fri", count: 0 },
    { day: "Sat", count: 0 },
    { day: "Sun", count: 0 },
  ];

  return (
    <div className="flex items-center justify-center w-full">
      {/* Light mode */}
      <div className="block dark:hidden w-full max-w-[400px]">
        {renderChart(chartData, "#0d243a", "#565d6d", "#dee1e6")}
      </div>
      {/* Dark mode */}
      <div className="hidden dark:block w-full max-w-[400px]">
        {renderChart(chartData, "#60a5fa", "#9ca3af", "#3f3f46")}
      </div>
    </div>
  );
}
