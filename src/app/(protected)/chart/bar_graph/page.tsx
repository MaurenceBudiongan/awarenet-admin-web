"use client";

import React from "react";

export default function BarChartPage() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = [170, 220, 180, 240, 300, 280, 210];
  const maxValue = 300;

  const chartWidth = 400;
  const chartHeight = 400;
  const padding = 60;
  const barWidth = (chartWidth - 2 * padding) / days.length;
  const barSpacing = barWidth * 0.8;
  const radius = 5;

  // Dark mode detection via CSS custom property trick using a wrapper class
  // We render two SVGs and show/hide via Tailwind dark: utilities
  const gridLines = [0, 75, 150, 225, 300];

  const renderChart = (barColor: string, axisColor: string, gridColor: string) => (
    <svg width={chartWidth} height={chartHeight}>
      {/* Horizontal grid lines with labels */}
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
              x={padding - 20}
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
        strokeWidth="2"
      />

      {/* Bars */}
      {days.map((day, index) => {
        const barHeight =
          (values[index] / maxValue) * (chartHeight - 2 * padding);
        const xPos = padding + index * barWidth + (barWidth - barSpacing) / 2;
        const yPos = chartHeight - padding - barHeight;
        return (
          <g key={`bar-${day}`}>
            <rect
              x={xPos}
              y={yPos}
              width={barSpacing}
              height={barHeight}
              fill={barColor}
              ry={radius}
            />
            <text
              x={xPos + barSpacing / 2}
              y={chartHeight - padding + 25}
              fontSize="14"
              fill={axisColor}
              textAnchor="middle"
            >
              {day}
            </text>
          </g>
        );
      })}
    </svg>
  );

  return (
    <div className="flex items-center justify-center">
      {/* Light mode chart */}
      <div className="block dark:hidden">
        {renderChart("#0d243a", "#565d6d", "#dee1e6")}
      </div>
      {/* Dark mode chart */}
      <div className="hidden dark:block">
        {renderChart("#60a5fa", "#9ca3af", "#3f3f46")}
      </div>
    </div>
  );
}