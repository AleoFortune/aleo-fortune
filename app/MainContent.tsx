"use client";

const RouletteWheel = dynamic(
  () => import("@/components/RouletteWheel/RouletteWheel"),
  { ssr: false }
);
import SelectionSection from "@/components/SelectionSection/selectionSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { GamePlayContext } from "@/context/gamePlayContext";
import { placeBet } from "@/lib/queries/placeBet";
import { useMutation } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React, { useContext } from "react";

type Props = { className?: string };

const MainContent = (props: Props) => {
  const {
    selection,
    startSpin,
    setStartSpin,
    prizeNumber,
    setPrizeNumber,
    userBet,
    setUserBet,
    setGameEventID,
  } = useContext(GamePlayContext);

  const placeBetMutation = useMutation({
    mutationKey: ["placeBetMutation"],
    mutationFn: () => placeBet(userBet, selection),
    onSuccess(data, variables, context) {
      setGameEventID;
    },
    onError(error, variables, context) {},
  });

  return (
    <Card className={cn(props.className, "mt-4 rounded-lg px-4 py-6")}>
      <Card className="px-4 py-6 mb-12 flex items-center gap-4 justify-between">
        <p className=" font-bold text-xl">
          Selected Bet: <span className="text-red-400">{selection}</span>
        </p>
        <Separator orientation="vertical" className="h-6"></Separator>

        <Label htmlFor="bet" className="whitespace-nowrap font-bold text-xl">
          Bet Amount
        </Label>
        <Input
          id="bet"
          className="w-32"
          type="number"
          onChange={(e) => setUserBet(e.target.value)}
        />
        <Button
          variant={"default"}
          size={"lg"}
          onClick={() => {
            placeBetMutation.mutate();
          }}
        >
          Place Bet
        </Button>
      </Card>
      <div className="flex justify-center">
        <SelectionSection />
        <RouletteWheel startSpin={startSpin} prizeNumber={5} />
      </div>
    </Card>
  );
};

export default MainContent;
