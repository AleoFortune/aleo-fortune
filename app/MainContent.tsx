"use client";

const RouletteWheel = dynamic(() => import("@/components/RouletteWheel/RouletteWheel"), { ssr: false });

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
import { getBlockHashFromTxID } from "@/lib/queries/getBlockHashfromTxID";
import Spinner from "@/components/ui/spinner";

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
    currentGameTransactionID,
    setCurrentGameTransactionID,
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

  const { data: transactionData, isFetched } = useQuery({
    enabled: currentGameTransactionID != null,
    refetchInterval: 3500,
    queryKey: ["currentGameTransactionID", currentGameTransactionID],
    queryFn: () => getBlockHashFromTxID(currentGameTransactionID!),
  });

  useEffect(() => {
    if (transactionData !== null && transactionData !== undefined) {
      getRandomGeneratedNumbers.mutate();
    }
  }, [transactionData]);

  const { data, isLoading } = useQuery({
    queryKey: ["puzzleWalletEvents"],
    refetchInterval: 4000,
    queryFn: () => getAllPuzzleWalletEvents(),
  });

  const getRandomGeneratedNumbers = useMutation({
    mutationKey: ["getRandomGeneratedNumbers"],
    mutationFn: () => getRandomGeneratedNumber(account!),
    onSuccess(data, variables, context) {
      console.log("PRIZE NUMBER :", data);
      setPrizeNumber(data);
    },
  });

  useEffect(() => {
    if (gameEventID == "" || gameEventID == null) {
      return;
    }

    data?.map((e) => {
      if (e._id == gameEventID) {
        setCurrentGameTransactionID(e.transactionId);
      }
    });
  }, [gameEventID, data]);

  return (
    <Card
      className={cn(
        props.className,
        "mt-4 rounded-lg px-[8px] md:px-[10px] lg:px-[13px] xl:px-[16px] py-1 md:py-2 lg:py-5 xl:py-6 flex flex-col"
      )}
    >
      <Card className="px-[8px] md:px-[10px] lg:px-[13px] xl:px-[16px] py-1 md:py-2 lg:py-5 xl:py-6 xl:mb-12 flex items-center justify-between">
        <p className=" font-bold text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px]">
          Selected Bet: <span className="text-red-400">{selection}</span>
        </p>
        <Separator orientation="vertical" className="h-6"></Separator>
        <Label
          htmlFor="bet"
          className="whitespace-nowrap font-bold text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px]"
        >
          Bet Amount
        </Label>
        <Input
          id="bet"
          value={userBet || ""}
          className="w-[64px] md:w-[107px] lg:w-[117px] xl:w-[128px]"
          type="number"
          onChange={(e) => setUserBet(e.target.value)}
        />{" "}
        <Button
          disabled={isBetButtonDisabled || isGamePlaying}
          variant={"default"}
          size={"lg"}
          className="hidden xl:flex"
          onClick={() => {
            setBetButtonDisabled(true);
            placeBetMutation.mutate();
          }}
        >
          Place Bet
        </Button>
      </Card>
      <Button
        disabled={isBetButtonDisabled || isGamePlaying}
        variant={"default"}
        size={"xs"}
        className="mb-6 md:mb-8 lg:mb-10 mt-3 w-[40vw] max-w-60"
        onClick={() => {
          setBetButtonDisabled(true);
          placeBetMutation.mutate();
        }}
      >
        Place Bet
      </Button>

      {gameEventID && (
        <Card className="text-center mb-6 md:mb-8 lg:mb-10 xl:mb-12 flex justify-between items-center gap-4">
          <div className="flex-1">
            <p className="font-bold text-base">Current Game</p>
            <span className="text-sm">{gameEventID}</span>
          </div>
          {!startSpin && <Spinner />}
          <p className="font-bold text-base justify-end flex-1">Spin will start in a minute, do not refresh the page</p>
        </Card>
      )}

      <div className="flex flex-col gap-4 xl:gap-0 xl:flex-row justify-center items-center xl:items-start">
        {!gameEventID && <SelectionSection />}
        <RouletteWheel />
      </div>
    </Card>
  );
};

export default MainContent;
