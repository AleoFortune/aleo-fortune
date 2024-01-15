import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { GamePlayContext } from "@/context/gamePlayContext";
import { Button } from "./ui/button";

type Props = {
  open: boolean;
  setOpen: any;
};

const FinishGameDialog = (props: Props) => {
  const { selection, prizeNumber, resetGamePlayContext } =
    useContext(GamePlayContext);

  const returnWinLoseStatement = () => {
    if (!isNaN(selection) && selection >= 0 && selection <= 36) {
      return prizeNumber === selection ? "YOU WIN !" : "YOU LOST";
    }
    switch (selection) {
      case "1st":
        return prizeNumber <= 12 ? "YOU WIN !" : "YOU LOST";
      case "2nd":
        return prizeNumber > 12 && prizeNumber <= 24 ? "YOU WIN !" : "YOU LOST";
      case "3rd":
        return prizeNumber > 24 && prizeNumber <= 36 ? "YOU WIN !" : "YOU LOST";
      case "1-18":
        return prizeNumber <= 18 ? "YOU WIN !" : "YOU LOST";
      case "19-36":
        return prizeNumber > 18 ? "YOU WIN !" : "YOU LOST";
      case "Even":
        return prizeNumber % 2 === 0 ? "YOU WIN !" : "YOU LOST";
      case "Odd":
        return prizeNumber % 2 !== 0 ? "YOU WIN !" : "YOU LOST";
      default:
        return "YOU LOST";
    }
  };

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{returnWinLoseStatement()}</DialogTitle>
          <DialogDescription asChild>
            <div className="flex gap-6 w-full mt-2">
              <div className="w-full">
                <Button
                  onClick={() => {
                    resetGamePlayContext();
                    props.setOpen(false);
                  }}
                >
                  PLAY AGAIN
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FinishGameDialog;
