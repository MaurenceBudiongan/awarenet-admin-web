"use client";

import React from "react";

export default function BarChartPage() {
  {
    /* Replace value from application user data */
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = [150, 120, 180, 90, 220, 150, 100];
  const maxValue = 300;
  const barColor = "#0d243a";
  const axisColor = "#565d6d";

  const chartWidth = 400;
  const chartHeight = 400;
  const padding = 60;
  const barWidth = (chartWidth - 2 * padding) / days.length;
  const barSpacing = barWidth * 0.8;
  const radius = 5;

  return (
    <div className="flex justify-center items-center">
      <svg
        width={chartWidth}
        height={chartHeight}
        style={{ background: "#fff" }}
      >
        {/* Horizontal grid lines with labels */}
        {[0, 75, 150, 225, 300].map((yValue) => {
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
                stroke="#dee1e6"
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
          stroke="#dee1e6"
          strokeWidth="1"
        />

        {/* X-axis */}
        <line
          x1={padding}
          y1={chartHeight - padding}
          x2={chartWidth - padding}
          y2={chartHeight - padding}
          stroke="#dee1e6"
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
    </div>
  );
}
