"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: string; // tailwind text color class
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  color = "text-blue-600",
  className,
}) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "animate-spin rounded-full border-t-transparent",
          sizes[size],
          color,
          className
        )}
        style={{ borderStyle: "solid" }}
      ></div>
    </div>
  );
};
