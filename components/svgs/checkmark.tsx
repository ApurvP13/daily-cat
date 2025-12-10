import React from "react";

export const Checkmark = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12 9 17L20 6">
        <animate
          attributeName="stroke-dasharray"
          from="0 100"
          to="100 0"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};
