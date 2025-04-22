import React from "react";

export default function Skeleton({ width, height }) {
  return (
    <div className="skeleton-container">
      <div
        className="skeleton-box"
        style={{ width: width, height: height }}></div>
      {/* <div
        className="skeleton-box"
        style={{ width: width, height: height }}></div>
      <div
        className="skeleton-box"
        style={{ width: width, height: height }}></div> */}
    </div>
  );
}
