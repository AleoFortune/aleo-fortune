import React, { useState } from "react";
import { createContext } from "react";
type Props = {
  children: React.ReactNode;
};

export const GamePlayContext = createContext<any>(null);
const GamePlayProvider = (props: Props) => {
  const [selection, setSelection] = useState<any>(null);
  const [startSpin, setStartSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState(null);

  return (
    <GamePlayContext.Provider
      value={{
        selection,
        setSelection,
        startSpin,
        setStartSpin,
        prizeNumber,
        setPrizeNumber,
      }}
    >
      {props.children}
    </GamePlayContext.Provider>
  );
};

export default GamePlayProvider;
