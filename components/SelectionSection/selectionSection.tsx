import React, { useState } from "react";
import { data } from "../RouletteWheel/data";
import { cn } from "@/lib/utils";
type Props = {};
type RouletteItem = {
  option: string;
  style: {
    backgroundColor: string;
    textColor?: string;
  };
};
const SelectionSection = (props: Props) => {
  const [selection, setSelection] = useState<any>(null);
  const reorderArray = (inputArray: RouletteItem[]): RouletteItem[] => {
    const sortedArray = inputArray.sort(
      (a, b) => parseInt(a.option) - parseInt(b.option)
    );
    return sortedArray;
  };

  const orderedData = reorderArray(data);

  return (
    <div className="mr-auto w-60 flex items-stretch">
      <div className="grid grid-cols-3 w-full">
        <div className="col-span-3 bg-green-700 border border-white text-center py-2 rounded-t-sm hover:scale-110 transition-all cursor-pointer">
          <p className="font-bold text-lg">0</p>
        </div>

        {orderedData.map((item, index) => {
          if (item.option == "0") return;
          console.log(item.style.backgroundColor);
          return (
            <div
              className={cn(
                `${
                  item.style.backgroundColor == "black"
                    ? "bg-gray-900"
                    : "bg-red-700"
                } flex justify-center border border-white ${
                  selection == item.option ? "bg-green-500" : ""
                } py-2 ${
                  index == 34 ? "rounded-bl-sm" : index == 36 && "rounded-br-sm"
                } hover:scale-110 transition-all cursor-pointer`
              )}
              onClick={() => setSelection(item.option)}
            >
              <p key={index} className="font-bold ">
                {item.option}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-[46px] text-center flex flex-col justify-betwee w-24">
        <div className="flex-1 text-center flex items-center  justify-center px-2">
          1st 12
        </div>
        <div className="flex-1 text-center flex items-center justify-center px-2">
          2nd 12
        </div>
        <div className="flex-1 text-center flex items-center justify-center px-2">
          3rd 12
        </div>
      </div>
    </div>
  );
};

export default SelectionSection;
