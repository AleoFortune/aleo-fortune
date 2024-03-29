import { PuzzleAccount } from "@puzzlehq/sdk";

export const getRandomGeneratedNumber = async (account: PuzzleAccount) => {
  if (!account) return;
  const url = `https://api.explorer.aleo.org/v1/testnet3/program/cassino_game_final.aleo/mapping/random_number_map/${account.address}`;

  const response = await fetch(url);

  let data = await response.json();
  return parseInt(data);
};
