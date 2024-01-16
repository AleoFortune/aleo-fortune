import { EventType, requestCreateEvent } from "@puzzlehq/sdk";

export const placeBet = async (bet_amount: string, bet: any) => {
  let convertedBetAmount = bet_amount + "u64";

  let convertedBet;
  let functionId;
  switch (bet) {
    case "1st":
      convertedBet = "1u32";
      functionId = "make_dozen_bet_public";
      break;
    case "2nd":
      convertedBet = "2u32";
      functionId = "make_dozen_bet_public";
      break;
    case "3rd":
      convertedBet = "3u32";
      functionId = "make_dozen_bet_public";
      break;
    case "1-18":
      convertedBet = "true";
      functionId = "make_low_high_bet_public";
      break;
    case "19-36":
      convertedBet = "false";
      functionId = "make_low_high_bet_public";
      break;
    case "Even":
      convertedBet = "0u32";
      functionId = "make_odd_even_bet_public";
      break;
    case "Odd":
      convertedBet = "1u32";
      functionId = "make_odd_even_bet_public";
      break;
    case "Red":
      convertedBet = "true";
      functionId = "make_red_black_bet_public";
      break;
    case "Black":
      convertedBet = "false";
      functionId = "make_red_black_bet_public";
      break;

    default:
      convertedBet = bet + "u32";
      functionId = "make_straightup_bet_public";
      break;
  }

  let playInput = { bet_amount: convertedBetAmount, bet: convertedBet };

  const createEventResponse = await requestCreateEvent({
    type: EventType.Execute,
    programId: "cassino_game_final.aleo",
    functionId: functionId,
    fee: 1.5,
    inputs: Object.values(playInput),
  });

  return createEventResponse;
};
