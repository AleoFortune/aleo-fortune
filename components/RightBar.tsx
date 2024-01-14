"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getUserFortuneCredit } from "@/lib/queries/getUserFortuneCredit";
import { useAccount, connect } from "@puzzlehq/sdk";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import AddCreditDialog from "./addCreditDialog";
import AddAleoCreditDialog from "./addAleoCreditDialog";
import WithdrawCreditDialog from "./withdrawCreditDialog";
type Props = { className?: string };

const RightBar = (props: Props) => {
  const { account } = useAccount();
  const { data: fortuneCredit, isLoading } = useQuery({
    refetchInterval: 10000,
    queryKey: ["userCredit"],
    queryFn: () => getUserFortuneCredit(account!),
  });

  return (
    <Card
      className={cn(
        props.className,
        "mt-4 rounded-lg px-2 py-4 flex flex-col gap-2 justify-start"
      )}
    >
      {!account && (
        <>
          <p className="font-bold text-center text-xl">
            Connect your wallet to start playing!
          </p>
          <Button onClick={connect}>Connect</Button>
        </>
      )}

      {account && (
        <div className="flex flex-col gap-4 ">
          <div className="flex border-2  px-2 py-2 justify-between items-center rounded-sm ">
            <p className="font-bold text-base">Balance</p>
            {
              <Badge variant={"default"} className="text-sm">
                {isLoading
                  ? "Getting Balance"
                  : `${fortuneCredit} Fortune Credits`}
              </Badge>
            }
          </div>
          <div className="flex justify-between gap-2">
            <AddCreditDialog />
            <WithdrawCreditDialog />
          </div>
          <AddAleoCreditDialog />

          <p>Game Rules:</p>
          <p className="text-sm">1. Deposit some Aleo token to get Fortune token</p>
          <p className="text-sm">2. Select a bet (odd even bet: 2x, black and red bet: 2x, Dozen bet (1-12. 13-24, 25-36) : 3x, Straightup bet: 36x, Low-High bet (1-18, 19-36): 2x )</p>
          <p className="text-sm">3. Select a bet amount</p>
          <p className="text-sm">4. Enjoy to play</p>
          <p className="text-sm">5. To cashout, withdraw your Fortune token first</p>
          <p className="text-sm">6. Withdraw your Aleo token</p>

        </div>
      )}
    </Card>
  );
};

export default RightBar;
