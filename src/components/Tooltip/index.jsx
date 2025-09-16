import React from "react";
import { Tooltip } from "antd";

export default function TooltipComponent({
  title = "prompt text",
  children,
  placement = "top",
}) {
  return (
    <Tooltip title={title} placement={placement}>
      {children}
    </Tooltip>
  );
}
