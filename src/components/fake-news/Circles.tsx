import React from "react";

type CircleProps = {
  /** Diameter of the circle (number = px, or any CSS size like "3rem" / "40px") */
  size?: number | string;
  /** Border or fill color, depending on variant */
  color?: string;
  /** Border width in pixels (for outline variant) */
  borderWidth?: number;
  /** "outline" = colored border, "solid" = filled circle */
  variant?: "outline" | "solid";
  /** Extra classes for positioning (absolute, flex, margins, etc.) */
  className?: string;
  /** Extra inline styles if needed */
  style?: React.CSSProperties;
};

export default function Circles({
  size = 40,
  color = "#f97373", // default rose-ish
  borderWidth = 3,
  variant = "outline",
  className = "",
  style,
}: CircleProps) {
  const dimension = typeof size === "number" ? `${size}px` : size;

  const baseStyle: React.CSSProperties = {
    width: dimension,
    height: dimension,
    borderRadius: "9999px",
    display: "inline-block",
    ...style,
  };

  if (variant === "solid") {
    baseStyle.backgroundColor = color;
  } else {
    baseStyle.border = `${borderWidth}px solid ${color}`;
    baseStyle.backgroundColor = "transparent";
  }

  return <div className={className} style={baseStyle} />;
}
