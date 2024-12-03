import React from "react";

const TelegramIcon = ({ width = 290, height = 300, color = "black" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          strokeDasharray={16}
          strokeDashoffset={16}
          d="M21 5L18.5 20M21 5L9 13.5"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.4s"
            values="16;0"
          ></animate>
        </path>
        <path strokeDasharray={22} strokeDashoffset={22} d="M21 5L2 12.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.4s"
            values="22;0"
          ></animate>
        </path>
        <path strokeDasharray={12} strokeDashoffset={12} d="M18.5 20L9 13.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.4s"
            dur="0.3s"
            values="12;0"
          ></animate>
        </path>
        <path strokeDasharray={8} strokeDashoffset={8} d="M2 12.5L9 13.5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.4s"
            dur="0.3s"
            values="8;0"
          ></animate>
        </path>
        <path
          strokeDasharray={6}
          strokeDashoffset={6}
          d="M12 16L9 19M9 13.5L9 19"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s"
            dur="0.3s"
            values="6;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
};

export default TelegramIcon;
