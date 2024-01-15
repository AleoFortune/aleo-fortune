import {
  Account,
  initThreadPool,
  ProgramManager,
} from "@aleohq/sdk";
import { PuzzleAccount } from "@puzzlehq/sdk";

const credits_program =
    "program credits.aleo;\n" +
    "\n" +
    "function transfer_public:\n" +
    "    input r0 as address.public;\n" +
    "    input r1 as u64.public;\n" +
    "    async transfer_public self.caller r0 r1 into r2;\n" +
    "    output r2 as credits.aleo/transfer_public.future;\n"; +
    "    finalize transfer_public:\n"; +
    "    input r0 as address.public;\n"; +
    "    input r1 as address.public;\n"; +
    "    input r2 as u64.public;\n"; +
    "    get account[r0] into r3;\n"; +
    "    sub r3 r2 into r4;\n"; +
    "    set r4 into account[r0];\n"; +
    "    get.or_use account[r1] 0u64 into r5;\n"; +
    "    add r5 r2 into r6;\n"; +
    "    set r6 into account[r1];\n";

await initThreadPool();

export async function withdrawAleoCredit(
  playerAccount: PuzzleAccount,
  value: number
) {
  const programManager = new ProgramManager(undefined, undefined, undefined);
  // Create a temporary account for the execution of the program
  const account = new Account({
    privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY,
  });
  programManager.setAccount(account);

  const executionResponse = await programManager.run(
    credits_program,
      "transfer_public",
      [playerAccount?.address, 
      value.toString() + "000000u64",],
      false,
  );
  return executionResponse.getOutputs();
}

onmessage = async function (e) {
  console.log(e.data)
  if (e.data.status === "execute") {
    const result = await withdrawAleoCredit(e.data.player_account, e.data.value);
    console.log("APrivateKey1zkp9rg9BKFBsCFVp85QnTB3NqqNshJPUq7DwMysrWpQkUz7");
    postMessage({type: "execute", result: result});
  }
};