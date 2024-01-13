import { EventType, PuzzleAccount, requestCreateEvent } from "@puzzlehq/sdk";

export const depositAleoCredit = async (
  account: PuzzleAccount,
  value: number
) => {
  if (!account || !value) {
    alert("no account");
    return;
  }

  const houseAddress = "aleo1696yxs062yrm0nmvflwcp7zjy0l8l4w8gpr3wn0ql3nttu54ayqsuxqus5";

  const fields = {
    receiver: houseAddress,
    amount: value.toString() + "u64",
  };

  const createEventResponse = await requestCreateEvent({
    type: EventType.Execute,
    programId: "credits.aleo",
    functionId: "tarnsfer_public",
    fee: 3.5,
    inputs: Object.values(fields),
  });
  if (createEventResponse.error) {
    console.log(createEventResponse.error);
  } else {
    alert(JSON.stringify(createEventResponse));
    console.log(createEventResponse);
  }
};
