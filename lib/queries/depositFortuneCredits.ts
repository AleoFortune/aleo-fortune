import { EventType, PuzzleAccount, requestCreateEvent } from "@puzzlehq/sdk";

export const depositFortuneCredit = async (
  account: PuzzleAccount,
  value: number
) => {
  if (!account || !value) {
    alert("no account");
    return;
  }

  const fields = {
    receiver: account?.address,
    amount: value.toString() + "u64",
  };

  const createEventResponse = await requestCreateEvent({
    type: EventType.Execute,
    programId: "cassino_game_final.aleo",
    functionId: "deposit_public",
    fee: 1,
    inputs: Object.values(fields),
  });
  if (createEventResponse.error) {
    console.log(createEventResponse.error);
  } else {
    console.log(createEventResponse);
  }
};
