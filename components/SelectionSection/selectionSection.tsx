import React, { useState, useContext } from "react";
import { data } from "../RouletteWheel/data";
import { cn } from "@/lib/utils";
import { GamePlayContext } from "@/context/gamePlayContext";

type Props = {};

type RouletteItem = {
  option: string;
  style: {
    backgroundColor: string;
    textColor?: string;
  };
};
const SelectionSection = (props: Props) => {
  const gamePlayContext = useContext(GamePlayContext);

  const { selection, setSelection } = gamePlayContext;
  const reorderArray = (inputArray: RouletteItem[]): RouletteItem[] => {
    const sortedArray = [...inputArray].sort(
      (a, b) => parseInt(a.option) - parseInt(b.option)
    );
    return sortedArray;
  };

  const orderedData = reorderArray(data);

  return (
    <div className="w-96 flex h-[600px]">
      <div></div>
      <div className="mt-[46px] text-center flex flex-col justify-between w-24 bg-green-900 border border-white"></div>
      <div className="grid grid-cols-3 w-full">
        <div className="col-span-3 bg-green-800 border border-white text-center py-2 rounded-t-sm hover:scale-110 transition-all cursor-pointer">
          <p className="font-bold text-lg">0</p>
        </div>

        {orderedData.map((item, index) => {
          if (item.option === "0") return null;
          return (
            <button
              key={item.option}
              className={cn(
                `${
                  item.style.backgroundColor === "black"
                    ? "bg-gray-900"
                    : "bg-red-700"
                } flex justify-center border border-white ${
                  selection === item.option ? "bg-green-500" : ""
                } py-2 ${
                  index === 34 ? "rounded-bl-sm" : index === 36 && ""
                } hover:scale-110 transition-all cursor-pointer`
              )}
              onClick={() => setSelection(item.option)}
              onKeyDown={() => {}}
            >
              <p className="font-bold">{item.option}</p>
            </button>
          );
        })}
      </div>
      <div className="mt-[46px] text-center flex flex-col justify-between w-24 bg-green-900 border border-white rounded-tr-sm rounded-br-sm">
        <button
          className={`flex-1 text-center flex items-center rounded-tr-sm justify-center px-2 border-b border-white cursor-pointer ${
            selection === "1st" ? "bg-green-500" : ""
          }`}
          onClick={() => setSelection("1st")}
          onKeyDown={() => {}}
          tabIndex={0}
        >
          1st 12
        </button>
        <button
          className={`flex-1 text-center flex items-center justify-center px-2 border-b border-white cursor-pointer ${
            selection === "2nd" ? "bg-green-500" : ""
          }`}
          onClick={() => setSelection("2nd")}
          onKeyDown={() => {}}
        >
          2nd 12
        </button>
        <button
          className={`flex-1 text-center flex items-center justify-center px-2 cursor-pointer ${
            selection === "3rd" ? "bg-green-500" : ""
          }`}
          onClick={() => setSelection("3rd")}
          onKeyDown={() => {}}
        >
          3rd 12
        </button>
      </div>
    </div>
  );
};

export default SelectionSection;
