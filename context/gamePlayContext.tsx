"use client";
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
  const [isGamePlaying, setIsGamePlaying] = useState<boolean>(false);
  const [currentGameStatus, setCurrentGameStatus] = useState<any>(null);

  const [currentGameTransactionID, setCurrentGameTransactionID] =
    useState<any>(null);

  const resetGamePlayContext = () => {
    setSelection(null);
    setUserBet(null);
    setStartSpin(false);
    setPrizeNumber(null);
    setGameEventID(null);
    setIsGamePlaying(false);
  };

  useEffect(() => {
    if (prizeNumber !== null) {
      setStartSpin(true);
    }
  }, [prizeNumber]);

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
        isGamePlaying,
        currentGameStatus,
        setCurrentGameStatus,
        setIsGamePlaying,
        resetGamePlayContext,
        currentGameTransactionID,
        setCurrentGameTransactionID,
      }}
    >
      {props.children}
    </GamePlayContext.Provider>
  );
};

export default GamePlayProvider;
