import { PuzzleAccount } from "@puzzlehq/sdk";

export const getUserFortuneCredit = async (account: PuzzleAccount) => {
  if (!account) return;
  const url = `https://api.explorer.aleo.org/v1/testnet3/program/cassino_game_test_fp.aleo/mapping/account/${account.address}`;

  const response = await fetch(url);

  let data = await response.json();

  return parseInt(data);
};
