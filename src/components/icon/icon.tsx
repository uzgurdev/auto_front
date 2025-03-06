import React from "react";
import classNames from "classnames";

import { IconNames } from "./type";

import "../../assets/styles/icons.css";

interface IconProps {
  icon?: IconNames;
  color?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  hover?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  iconClassName?: string;
  scale?: string;
  rotate?: number;
  iconSize?: string;
  children?: React.ReactNode;
  radiusSize?: number | "full";
}

const Icon: React.FC<IconProps> = ({
  icon = "icon-settings",
  color = "",
  size = "",
  hover = false,
  disabled = false,
  loading = false,
  onClick = () => {},
  className = "",
  iconClassName = "",
  scale,
  rotate,
  iconSize = "cover",
  children,
  radiusSize = "full",
  ...rest
}) => (
  <div
    className={classNames(
      `relative cursor-pointer overflow-hidden rounded-${radiusSize} bg-transparent transition-all duration-200`,
      {
        "h-5 w-5": size === "xs", // 20x20
        "h-6 w-6": size === "sm", // 24x24
        "h-8 w-8": size === "md", // 32x32
        "h-10 w-10": size === "lg", // 40x40
        "h-12 w-12": size === "xl", // 48x48
        "hover:bg-gray-200": hover,
        "animate-spin": loading,
        "pointer-events-none opacity-50": disabled,
        [className]: className,
      }
    )}
    style={{
      transform: `rotate(${rotate || 0}deg) scale(${scale || 1})`,
    }}
    onClick={onClick}
    {...rest}
  >
    <div
      className={classNames(
        "mask-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform",
        icon,
        iconClassName
      )}
      style={{
        width: "calc(100% - 2px)",
        height: "calc(100% - 2px)",
        background: `${
          color !== "" ? color : "var(--icon-default)"
        } no-repeat center center / contain`,
        maskPosition: "center",
        maskSize: iconSize || "contain",
      }}
    />
    {children}
  </div>
);

export default Icon;
