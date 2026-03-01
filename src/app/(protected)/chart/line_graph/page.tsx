"use client";

import React from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const values = [100, 150, 130, 180, 200, 190, 160];
const maxValue = 200;

const chartWidth = 400;
const chartHeight = 400;
const padding = 60;
const pointSpacing = (chartWidth - 2 * padding) / (days.length - 1);

const points = days.map((_, index) => {
  const xPos = padding + index * pointSpacing;
  const yPos =
    chartHeight -
    padding -
    (values[index] / maxValue) * (chartHeight - 2 * padding);
  return { xPos, yPos, value: values[index] };
});

const pathD = points
  .map((point, idx) => {
    if (idx === 0) return `M ${point.xPos} ${point.yPos}`;
    const prevPoint = points[idx - 1];
    const nextPoint = points[idx + 1];
    const cpX1 = prevPoint.xPos + (point.xPos - prevPoint.xPos) / 2;
    const cpY1 = prevPoint.yPos;
    const cpX2 =
      point.xPos - (nextPoint ? (nextPoint.xPos - point.xPos) / 2 : 0);
    const cpY2 = point.yPos;
    return `C ${cpX1} ${cpY1} ${cpX2} ${cpY2} ${point.xPos} ${point.yPos}`;
  })
  .join(" ");

const gridValues = [0, 50, 100, 150, 200];

function Chart({
  lineColor,
  dotColor,
  axisColor,
  gridColor,
}: {
  lineColor: string;
  dotColor: string;
  axisColor: string;
  gridColor: string;
}) {
  return (
    <svg width={chartWidth} height={chartHeight}>
      {/* Horizontal grid lines with labels */}
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
              x={padding - 40}
              y={yPos + 5}
              fontSize="12"
              fill={axisColor}
              textAnchor="end"
            >
              {yValue}
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
      {days.map((day, index) => (
        <text
          key={`label-${day}`}
          x={points[index].xPos}
          y={chartHeight - padding + 25}
          fontSize="14"
          fill={axisColor}
          textAnchor="middle"
        >
          {day}
        </text>
      ))}
    </svg>
  );
}

const LineGraph = () => {
  return (
    <div className="flex">
      {/* Light mode */}
      <div className="block dark:hidden">
        <Chart
          lineColor="#0d243a"
          dotColor="#0d243a"
          axisColor="#565d6d"
          gridColor="#dee1e6"
        />
      </div>
      {/* Dark mode */}
      <div className="hidden dark:block">
        <Chart
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