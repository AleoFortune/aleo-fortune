import React, { useEffect, useState } from "react";
import { createContext } from "react";
type Props = {
  children: React.ReactNode;
};

export const GamePlayContext = createContext<any>(null);
const GamePlayProvider = (props: Props) => {
  const [selection, setSelection] = useState<any>(null);
  const [userBet, setUserBet] = useState<any>(null);
  const [startSpin, setStartSpin] = useState<boolean>(false);
  const [prizeNumber, setPrizeNumber] = useState(null);
  const [gameEventID, setGameEventID] = useState<any>(null);

  return (
    <GamePlayContext.Provider
      value={{
        selection,
        setSelection,
        userBet,
        setUserBet,
        startSpin,
        setStartSpin,
        prizeNumber,
        setPrizeNumber,
        gameEventID,
        setGameEventID,
      }}
    >
      {props.children}
    </GamePlayContext.Provider>
  );
};

export default GamePlayProvider;
