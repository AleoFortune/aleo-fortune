"use client";
import React, { useState, useContext } from "react";
import { data } from "./data";
import { Wheel } from "react-custom-roulette";
import { Button } from "../ui/button";
import { GamePlayContext } from "@/context/gamePlayContext";
type Props = {
  startSpin: boolean;
  prizeNumber: number;
};

const RouletteWheel = () => {
  const { startSpin, prizeNumber } = useContext(GamePlayContext);

  return (
    <div>
      <Wheel
        mustStartSpinning={startSpin}
        prizeNumber={prizeNumber}
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
