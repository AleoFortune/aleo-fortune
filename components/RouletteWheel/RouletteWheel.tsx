"use client";
import React, { useState } from "react";
import { data } from "./data";
import { Wheel } from "react-custom-roulette";
import { Button } from "../ui/button";
type Props = {
  startSpin: boolean;
  prizeNumber: number;
};

const RouletteWheel = ({ startSpin, prizeNumber }: Props) => {
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
