import React from "react";

const ArrowIcon = ({ direction, isActive, className = "" }) => {
  const getPath = (direction) => {
    switch (direction) {
      case "up":
        return "M10 15L10 5M10 5L5 10M10 5L15 10";
      case "down":
        return "M10 5L10 15M10 15L15 10M10 15L5 10";
      case "left":
        return "M15 10L5 10M5 10L10 15M5 10L10 5";
      case "right":
        return "M5 10L15 10M15 10L10 5M15 10L10 15";
      case "stop":
        return "M5 5H15V15H5V5Z";
      default:
        return "";
    }
  };

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`icon ${className} ${isActive ? "text-gray-900" : "text-gray-400"}`}
    >
      <path
        d={getPath(direction)}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={direction === "stop" ? "currentColor" : "none"}
      />
    </svg>
  );
};

export default ArrowIcon;
