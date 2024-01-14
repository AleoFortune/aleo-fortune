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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAccount } from "@puzzlehq/sdk";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";
import { getAllPuzzleWalletEvents } from "@/lib/queries/getAllPuzzleWalletEvents";
import { getRandomGeneratedNumber } from "@/lib/queries/getRandomGeneratedNumber";

type Props = { className?: string };

const MainContent = (props: Props) => {
  const { account } = useAccount();
  const {
    selection,
    startSpin,
    setStartSpin,
    prizeNumber,
    setPrizeNumber,
    userBet,
    setUserBet,
    gameEventID,
    setGameEventID,
    isGamePlaying,
    setIsGamePlaying,
  } = useContext(GamePlayContext);

  const [isBetButtonDisabled, setBetButtonDisabled] = useState<boolean>(false);

  const placeBetMutation = useMutation({
    mutationKey: ["placeBetMutation"],
    mutationFn: () => placeBet(userBet, selection),

    onSuccess(data, variables, context) {
      setIsGamePlaying(true);
      setBetButtonDisabled(false);
      setGameEventID(data.eventId);
    },
    onError(error, variables, context) {
      setIsGamePlaying(false);
      setBetButtonDisabled(false);
      alert("There was an error while sending your bet");
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["currentGameEvent"],
    refetchInterval: 2000,
    queryFn: () => getAllPuzzleWalletEvents(),
  });

  const getRandomGeneratedNumbers = useMutation({
    mutationKey: ["getRandomGeneratedNumbers"],
    mutationFn: () => getRandomGeneratedNumber(account!),
    onSuccess(data, variables, context) {
      setPrizeNumber(data);
    },
  });

  useEffect(() => {
    if (gameEventID == "" || gameEventID == null) {
      return;
    }

    data?.map((e) => {
      if (e._id == gameEventID) {
        if (e.status == "Settled") {
          getRandomGeneratedNumbers.mutate();
        }
      }
    });
  }, [gameEventID, data]);

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
          disabled={isBetButtonDisabled || isGamePlaying}
          variant={"default"}
          size={"lg"}
          onClick={() => {
            setBetButtonDisabled(true);
            placeBetMutation.mutate();
          }}
        >
          Place Bet
        </Button>
      </Card>
      <Card className="text-center mb-12">
        <p className="font-bold text-base">Current Game</p>
        <span className="text-sm">{gameEventID}</span>
      </Card>
      <div className="flex justify-center">
        <SelectionSection />
        <RouletteWheel startSpin={startSpin} prizeNumber={prizeNumber} />
      </div>
    </Card>
  );
};

export default MainContent;
