import React from "react";
import { cn } from "@/lib/utils";
import { useAccount } from "@puzzlehq/sdk";
import { useQuery } from "@tanstack/react-query";
import { getAllPuzzleWalletEvents } from "@/lib/queries/getAllPuzzleWalletEvents";
import { Separator } from "@/components/ui/separator";

import Spinner from "./ui/spinner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
type Props = { className?: string };

const LeftBar = (props: Props) => {
  const { account } = useAccount();

  const { data, isLoading } = useQuery({
    queryKey: ["puzzleWalletEvents"],
    queryFn: () => getAllPuzzleWalletEvents(),
  });

  console.log(data, "all events data ");

  return (
    <div
      className={cn(
        props.className,
        "border-r-[1px] border-gray-500 bg-muted px-2 py-2 flex flex-col items-center gap-2"
      )}
    >
      {!account && <p>No account detected</p>}
      {account && (
        <>
          <h3 className="font-bold">Deposit History</h3>
          <Separator
            orientation="horizontal"
            className="mb-2 text-white bg-red-500"
          />
          <p className="text-muted-foreground text-sm font-semibold">
            You may also check executions in your Puzzle Wallet extension
          </p>
          {isLoading && <Spinner />}
          {data?.map((e) => {
            if (e.functionId == "deposit_public") {
              return (
                <Card className="w-full  rounded-sm px-2 py-2 ">
                  <CardTitle className="text-sm flex justify-between">
                    Status:{" "}
                    <Badge
                      variant={
                        (e.status == "Pending" && "destructive") || "default"
                      }
                    >
                      {e.status}
                    </Badge>
                  </CardTitle>
                  <CardContent className="mt-2 p-0">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm">
                        <span className="font-bold">Amount:</span>{" "}
                        <span className="text-red-300">
                          {parseInt(e.inputs[1]!)}
                        </span>{" "}
                        Fortune Credits
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            }
          })}
        </>
      )}
    </div>
  );
};

export default LeftBar;
