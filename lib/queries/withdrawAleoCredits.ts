import { PuzzleAccount } from "@puzzlehq/sdk";
import { AleoWorker } from "../workers/AleoWorker.js";

const aleoWorker = AleoWorker();

export const withdrawAleoCredit = async (
  account: PuzzleAccount,
  value: number
) => {
  if (!account || !value) {
    alert("no account");
    return;
  }
  const result = await aleoWorker.localProgramExecution(
    "credits.aleo",
    "transfer_public",
    [account, value],
  );
  alert(JSON.stringify(result));
};




