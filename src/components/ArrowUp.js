import React from "react";

export function ArrowUp() {
  return (
    <svg
      className="icon-down"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path
        className="icon-down__border"
        fill="#909090"
        d="M31.1,16.3C31.2,8,24.6,1.1,16.3,1C8.1,0.9,1.2,7.5,1,15.8C0.9,24,7.5,30.9,15.8,31.1C24.1,31.1,31,24.5,31.1,16.3z M2.7,15.8C2.9,8.4,9,2.6,16.3,2.7c7.4,0.1,13.2,6.2,13,13.5s-6.2,13.2-13.6,13C8.5,29.2,2.7,23.1,2.7,15.8z"
      />
      <path
        className="icon-down__shape"
        fill="#909090"
        d="M20,13L16,16.9l-3.9-4l-1.3,1.2l3.9,4l1.3,1.3l5.2-5.1L20,13z"
      />
    </svg>
  );
}
