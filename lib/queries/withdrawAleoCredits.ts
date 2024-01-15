import {
  Account,
  ProgramManager,
  AleoKeyProvider, 
  NetworkRecordProvider,
  AleoNetworkClient
} from "@aleohq/sdk";
import { PuzzleAccount } from "@puzzlehq/sdk";

export async function withdrawAleoCredit(
  playerAccount: PuzzleAccount,
  value: number
) {
  const account = new Account({privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY});
  const networkClient = new AleoNetworkClient("https://api.explorer.aleo.org/v1");
  const keyProvider = new AleoKeyProvider();
  const recordProvider = new NetworkRecordProvider(account, networkClient);

  const programManager = new ProgramManager("https://api.explorer.aleo.org/v1", keyProvider, recordProvider);
  programManager.setAccount(account);
  const tx_id = await programManager.transfer(value, playerAccount.address, "transfer_public", 3, false);
  return tx_id;
}

onmessage = async function (e) {
  console.log(e.data)
  if (e.data.status === "execute") {
    const result = await withdrawAleoCredit(e.data.player_account, e.data.value);
    postMessage({type: "execute", result: result});
  }
};