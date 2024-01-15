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

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen} modal={true}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selection == prizeNumber ? "YOU WIN !" : "YOU LOST !"}
          </DialogTitle>
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
