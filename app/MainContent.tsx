import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

type Props = { className?: string };

const MainContent = (props: Props) => {
  return (
    <Card className={cn(props.className, "mt-4 rounded-lg")}>MainContent</Card>
  );
};

export default MainContent;
