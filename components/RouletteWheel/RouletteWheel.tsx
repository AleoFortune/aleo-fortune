"use client";
import React, { useState, useContext, useEffect } from "react";
import { data } from "./data";
import { Wheel } from "react-custom-roulette";
import { Button } from "../ui/button";
import { GamePlayContext } from "@/context/gamePlayContext";
import { getOrder } from "@/lib/utils";
import FinishGameDialog from "../finishGameDialog";

const RouletteWheel = () => {
  const { startSpin, prizeNumber } = useContext(GamePlayContext);
  const [openGameFinishDialog, setOpenGameFinishDialog] =
    useState<boolean>(false);
  const [prizeHolder, setPrizeHolder] = useState<any>(null);

  useEffect(() => {
    if (prizeNumber !== null) {
      setPrizeHolder(getOrder(prizeNumber)!);
    }
  }, [prizeNumber]);

  return (
    <div>
      <Wheel
        mustStartSpinning={startSpin}
        prizeNumber={prizeHolder}
        innerRadius={40}
        innerBorderWidth={5}
        data={data}
        onStopSpinning={() => {
          setOpenGameFinishDialog(true);
        }}
        // backgroundColors={["#fafafa", "#fafafa"]}
        textDistance={75}
        textColors={["#ffffff"]}
      />
      <FinishGameDialog
        open={openGameFinishDialog}
        setOpen={setOpenGameFinishDialog}
      />
    </div>
  );
};

export default RouletteWheel;
