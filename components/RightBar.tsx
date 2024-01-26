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
import WithdrawAleoCreditDialog from "./withdrawAleoCreditDialog";

type Props = { className?: string };

const RightBar = (props: Props) => {
  const { account } = useAccount();
  const { data: fortuneCredit, isLoading } = useQuery({
    refetchInterval: 10000,
    queryKey: ["userCredit"],
    queryFn: () => getUserFortuneCredit(account!),
  });

  return (
    <Card className={cn(props.className, "mt-4 rounded-lg px-4 py-4 flex flex-col gap-4 justify-start")}>
      {!account && (
        <div className="text-center flex flex-col gap-2 xl:gap-0">
          <p className="font-bold text-[12px] md:text-[16px] lg:text-[18px] xl:text-[20px]">
            Connect your wallet to start playing!
          </p>
          <Button onClick={connect} className="hidden xl:flex mx-auto">
            Connect
          </Button>
          <Button size={"xs"} className="xl:hidden px-2 text-sm py-1" onClick={connect}>
            Connect
          </Button>
        </div>
      )}

      {account && (
        <div className="flex flex-col gap-4">
          <div className="flex border-2 px-4 py-2 justify-between items-center rounded-md">
            <p className="font-bold text-lg">Balance</p>
            <Badge variant={"default"} className="text-sm">
              {isLoading ? "Getting Balance" : `${fortuneCredit} Fortune Credits`}
            </Badge>
          </div>
          <div className="flex flex-col gap-3">
            {" "}
            {/* Adjusted gap between buttons */}
            <p className="font-semibold">Deposit and Withdraw Fortune Token (Wrapped Aleo Token):</p>
            <div className="flex flex-col gap-3">
              {" "}
              {/* Adjusted gap between buttons */}
              <AddCreditDialog />
              <WithdrawCreditDialog />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {" "}
            {/* Adjusted gap between buttons */}
            <p className="font-semibold">Deposit and Withdraw Aleo Token:</p>
            <div className="flex flex-col gap-3">
              {" "}
              {/* Adjusted gap between buttons */}
              <AddAleoCreditDialog />
              <WithdrawAleoCreditDialog />
            </div>
          </div>
          <div className="mt-4">
            <p className="font-semibold">Game Rules:</p>
            <ul className="list-disc ml-6">
              <li>Deposit some Aleo token to get Fortune token</li>
              <li>
                Select a bet (odd even bet: 2x, black and red bet: 2x, Dozen bet (1-12. 13-24, 25-36) : 3x, Straightup
                bet: 36x, Low-High bet (1-18, 19-36): 2x )
              </li>
              <li>Select a bet amount</li>
              <li>Enjoy playing</li>
              <li>To cashout, withdraw your Fortune token first</li>
              <li>Withdraw your Aleo token</li>
            </ul>
          </div>
        </div>
      )}
    </Card>
  );
};

export default RightBar;
