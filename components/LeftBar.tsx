import React from "react";
import { cn } from "@/lib/utils";
type Props = { className?: string };

const LeftBar = (props: Props) => {
  return (
    <div
      className={cn(props.className, "border-r-[1px] border-gray-500 bg-muted")}
    >
      LeftBar
    </div>
  );
};

export default LeftBar;
