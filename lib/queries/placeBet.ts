import { EventType, requestCreateEvent } from "@puzzlehq/sdk";

export const placeBet = async (bet_amount: string, bet: number) => {
  console.log("placebet functino triggered");
  if (parseInt(bet_amount) < 0 || !bet) {
    console.log("in error");
    throw new Error(
      "Bet amount must be greater than 0 and you have to enter the bet"
    );
  }

  let convertedBetAmount = bet_amount + "u64";
  let convertedBet = bet + "u32";

  console.log(
    convertedBetAmount,
    "convertedBetAmount",
    "||||",
    convertedBet,
    "convertedBet"
  );

  let playInput = { bet_amount: convertedBetAmount, bet: convertedBet };

  const createEventResponse = await requestCreateEvent({
    type: EventType.Execute,
    programId: "cassino_game_final.aleo",
    functionId: "make_straightup_bet_public",
    fee: 1.5,
    inputs: Object.values(playInput),
  });

  console.log(createEventResponse);

  return createEventResponse;
};
