import { EventType, PuzzleAccount, requestCreateEvent } from "@puzzlehq/sdk";
import { useState } from "react";
import { AleoWorker } from "../workers/AleoWorker.js";

const aleoWorker = AleoWorker();
const [executing, setExecuting] = useState(false);

export const withdrawAleoCredit = async (
  account: PuzzleAccount,
  value: number
) => {
  if (!account || !value) {
    alert("no account");
    return;
  }

  setExecuting(true);
  const result = await aleoWorker.localProgramExecution(
    "credits.aleo",
    "transfer_public",
    [account, value],
  );
  setExecuting(false);

  alert(JSON.stringify(result));
};




