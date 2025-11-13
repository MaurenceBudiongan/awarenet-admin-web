"use client";

import React from "react";

const LineGraph = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = [30, 80, 50, 120, 90, 150, 110];
  const maxValue = 200;
  const lineColor = "#0d243a";
  const dotColor = "#0d243a";
  const axisColor = "#dee1e6";

  const chartWidth = 700;
  const chartHeight = 400;
  const padding = 60;
  const pointSpacing = (chartWidth - 2 * padding) / (days.length - 1);

  // Calculate points for the line
  const points = days.map((_, index) => {
    const xPos = padding + index * pointSpacing;
    const yPos =
      chartHeight -
      padding -
      (values[index] / maxValue) * (chartHeight - 2 * padding);
    return { xPos, yPos, value: values[index] };
  });

  // Create SVG path for line
  const pathD = points
    .map((point, idx) => `${idx === 0 ? "M" : "L"} ${point.xPos} ${point.yPos}`)
    .join(" ");

  return (
    <div style={{ padding: "40px", background: "#f5f5f5", minHeight: "100vh" }}>
      <h1>Weekly Activity Line Graph</h1>
      <svg
        width={chartWidth}
        height={chartHeight}
        style={{ background: "#fff", border: "1px solid #ccc" }}
      >
        {/* Horizontal grid lines with labels */}
        {[0, 50, 100, 150, 200].map((yValue) => {
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
                stroke={axisColor}
                strokeDasharray="5,5"
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
          stroke={axisColor}
          strokeWidth="2"
        />

        {/* X-axis */}
        <line
          x1={padding}
          y1={chartHeight - padding}
          x2={chartWidth - padding}
          y2={chartHeight - padding}
          stroke={axisColor}
          strokeWidth="2"
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
    </div>
  );
};

export default LineGraph;
