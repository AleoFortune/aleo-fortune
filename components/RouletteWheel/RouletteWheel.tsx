"use client";
import React, { useState, useContext, useEffect } from "react";
import { data } from "./data";
import { Wheel } from "react-custom-roulette";
import { Button } from "../ui/button";
import { GamePlayContext } from "@/context/gamePlayContext";
import { getOrder } from "@/lib/utils";

const RouletteWheel = () => {
  const { startSpin, prizeNumber } = useContext(GamePlayContext);

  const [prizeHolder, setPrizeHolder] = useState<any>(null);

  useEffect(() => {
    if (prizeNumber !== null) {
      setPrizeHolder(getOrder(prizeNumber)!);
    }
  }, [prizeNumber]);

  // useEffect(() => {
  //   first

  //   return () => {
  //     second
  //   }
  // }, [prizeHolder])

  return (
    <div>
      <Wheel
        mustStartSpinning={startSpin}
        prizeNumber={prizeHolder}
        innerRadius={40}
        innerBorderWidth={5}
        data={data}
        // backgroundColors={["#fafafa", "#fafafa"]}
        textColors={["#ffffff"]}
      />
    </div>
  );
};

export default RouletteWheel;
