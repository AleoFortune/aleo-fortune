"use client";
import React, { useContext } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  useAccount,
  connect,
  shortenAddress,
  useDisconnect,
} from "@puzzlehq/sdk";
import Image from "next/image";
import aleoFortuneLogo from "@/assets/fortune-logo.png";
import { GamePlayContext } from "@/context/gamePlayContext";

type Props = {
  className?: string;
};

const Header = (props: Props) => {
  const { account } = useAccount();
  const { disconnect, loading } = useDisconnect();
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
  return (
    <div
      suppressHydrationWarning
      className={cn(
        props.className,
        "h-24 font-bold text-2xl border-b-[1px] border-gray-500 bg-muted"
      )}
    >
      <div className="flex justify-between items-center h-full px-4">
        <div className="flex gap-2 items-center">
          <div className="rounded-full overflow-hidden">
            <Image
              alt="aleo fortune logo"
              src={aleoFortuneLogo}
              width={80}
            ></Image>
          </div>
          <h3>ALEO FORTUNE</h3>
        </div>
        {/* <h3>roulette.</h3> */}

        {!account && (
          <Button size={"lg"} onClick={connect}>
            Connect Wallet
          </Button>
        )}
        {account && (
          <Button size={"lg"} onClick={disconnect} disabled={loading}>
            {shortenAddress(account.address)}
          </Button>
        )}
        {!account && (
          <Button size={"lg"} onClick={disconnect} disabled={loading}>
            LOG OUT
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
