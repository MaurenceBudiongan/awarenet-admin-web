"use client";

import React from "react";

type DayData = { day: string; count: number };

const chartWidth = 400;
const chartHeight = 400;
const padding = 60;

function computeChart(data: DayData[]) {
  const rawMax = Math.max(...data.map((d) => d.count), 1);
  const maxValue = Math.ceil(rawMax / 10) * 10;
  const step = maxValue / 4;
  const gridValues = [0, step, step * 2, step * 3, maxValue];

  const pointSpacing =
    data.length > 1 ? (chartWidth - 2 * padding) / (data.length - 1) : 0;

  const points = data.map((item, index) => {
    const xPos =
      data.length === 1
        ? chartWidth / 2
        : padding + index * pointSpacing;
    const yPos =
      chartHeight -
      padding -
      (item.count / maxValue) * (chartHeight - 2 * padding);
    return { xPos, yPos, label: item.day };
  });

  const pathD = points
    .map((point, idx) => {
      if (idx === 0) return `M ${point.xPos} ${point.yPos}`;
      const prevPoint = points[idx - 1];
      const nextPoint = points[idx + 1];
      const cpX1 = prevPoint.xPos + (point.xPos - prevPoint.xPos) / 2;
      const cpY1 = prevPoint.yPos;
      const cpX2 = point.xPos - (nextPoint ? (nextPoint.xPos - point.xPos) / 2 : 0);
      const cpY2 = point.yPos;
      return `C ${cpX1} ${cpY1} ${cpX2} ${cpY2} ${point.xPos} ${point.yPos}`;
    })
    .join(" ");

  return { points, pathD, gridValues, maxValue };
}

function Chart({
  data,
  lineColor,
  dotColor,
  axisColor,
  gridColor,
}: {
  data: DayData[];
  lineColor: string;
  dotColor: string;
  axisColor: string;
  gridColor: string;
}) {
  const { points, pathD, gridValues, maxValue } = computeChart(data);

  return (
    <svg
      viewBox={`0 0 ${chartWidth} ${chartHeight}`}
      width="100%"
      style={{ display: "block" }}
    >
      {gridValues.map((yValue) => {
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
        strokeWidth=".2"
      />

      {/* Line */}
      <path d={pathD} stroke={lineColor} strokeWidth="2" fill="none" />

      {/* Dots */}
      {points.map((point, index) => (
        <circle
          key={`dot-${index}`}
          cx={point.xPos}
          cy={point.yPos}
          r="5"
          fill={dotColor}
        />
      ))}

      {/* X-axis labels */}
      {data.map((item, index) => (
        <text
          key={`label-${item.day}-${index}`}
          x={points[index].xPos}
          y={chartHeight - padding + 22}
          fontSize="12"
          fill={axisColor}
          textAnchor="middle"
        >
          {item.day}
        </text>
      ))}
    </svg>
  );
}

const LineGraph = ({ data }: { data?: DayData[] }) => {
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
    <div className="flex w-full">
      {/* Light mode */}
      <div className="block dark:hidden w-full max-w-[400px]">
        <Chart
          data={chartData}
          lineColor="#0d243a"
          dotColor="#0d243a"
          axisColor="#565d6d"
          gridColor="#dee1e6"
        />
      </div>
      {/* Dark mode */}
      <div className="hidden dark:block w-full max-w-[400px]">
        <Chart
          data={chartData}
          lineColor="#60a5fa"
          dotColor="#60a5fa"
          axisColor="#9ca3af"
          gridColor="#3f3f46"
        />
      </div>
    </div>
  );
};

export default LineGraph;
