"use client";

const RouletteWheel = dynamic(
  () => import("@/components/RouletteWheel/RouletteWheel"),
  { ssr: false }
);
import SelectionSection from "@/components/SelectionSection/selectionSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React, { useState } from "react";

type Props = { className?: string };

const MainContent = (props: Props) => {
  const [startSpin, setStartSpin] = useState(false);
  let random = Math.floor(Math.random() * 36 + 1);
  const [prizeNumber, setPrizeNumber] = useState(random);

  return (
    <Card className={cn(props.className, "mt-4 rounded-lg px-4 py-6")}>
      <SelectionSection />
      {/* <RouletteWheel prizeNumber={prizeNumber} startSpin={startSpin} /> */}
    </Card>
  );
};

export default MainContent;
