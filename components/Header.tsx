"use client";
import React, { useContext } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useAccount, connect, shortenAddress, useDisconnect } from "@puzzlehq/sdk";
import Image from "next/image";
import aleoFortuneLogo from "@/assets/fortune-logo.jpeg";
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
      className={cn(props.className, "h-24 font-bold text-2xl border-b-[1px] border-gray-500 bg-muted")}
    >
      <div className="flex justify-between items-center h-full px-[8px] md:px-[10px] lg:px-[13px] xl:px-[16px]">
        <div className="flex gap-2 items-center">
          <div className="rounded-full overflow-hidden relative w-[56px] md:w-[67px] lg:w-[73px] xl:w-[80px] h-[56px] md:h-[67px] lg:h-[73px] xl:h-[80px]">
            <Image alt="aleo fortune logo" src={aleoFortuneLogo} fill></Image>
          </div>
          <h3 className="text-[14px] md:text-[16x] lg:text-[20px] xl:text-[24px]">FORTUNE</h3>
        </div>
        {/* <h3>roulette.</h3> */}

        {!account && (
          <>
            <Button size={"lg"} onClick={connect} className="hidden xl:flex">
              Connect Wallet
            </Button>
            <Button size={"xs"} onClick={connect}>
              Connect Wallet
            </Button>
          </>
        )}
        {account && (
          <>
            <Button size={"lg"} onClick={disconnect} disabled={loading} className="hidden xl:flex">
              {shortenAddress(account.address)}
            </Button>
            <Button size={"xs"} onClick={disconnect} disabled={loading}>
              {shortenAddress(account.address)}
            </Button>
          </>
        )}
        {!account && (
          <>
            <Button size={"lg"} onClick={disconnect} disabled={loading} className="hidden xl:flex">
              LOG OUT
            </Button>
            <Button size={"xs"} onClick={disconnect} disabled={loading}>
              LOG OUT
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
