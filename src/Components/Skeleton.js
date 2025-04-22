import React from "react";

export default function Skeleton({ status }) {
  if (!status) {
    return null; // Don't show anything if not loading
  }

  return (
    <div className="skeleton-container">
      <div className="skeleton-box"></div>
      <div className="skeleton-box"></div>
      <div className="skeleton-box"></div>
    </div>
  );
}
