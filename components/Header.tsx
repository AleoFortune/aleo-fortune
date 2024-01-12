"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  useAccount,
  connect,
  shortenAddress,
  useDisconnect,
} from "@puzzlehq/sdk";

type Props = {
  className?: string;
};

const Header = (props: Props) => {
  const { account } = useAccount();
  const { disconnect, loading } = useDisconnect();

  return (
    <div
      className={cn(
        props.className,
        "h-24 font-bold text-2xl border-b-[1px] border-gray-500 bg-muted"
      )}
    >
      <div className="container  flex justify-between items-center h-full">
        <h3>ALEO FORTUNE</h3>

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
      </div>
    </div>
  );
};

export default Header;
