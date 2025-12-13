import React from "react";

export default function SkeletonShimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 rounded ${className}`}
    />
  );
}
