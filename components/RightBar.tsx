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
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 border  px-2 py-2 justify-between items-stretch rounded-sm ">
            <p className="font-bold text-xl">Balance</p>
            {
              <Badge variant={"default"} className="text-xl">
                {isLoading
                  ? "Getting Balance"
                  : `${fortuneCredit} Fortune Credits`}
              </Badge>
            }
          </div>
          <AddCreditDialog />
        </div>
      )}
    </Card>
  );
};

export default RightBar;
