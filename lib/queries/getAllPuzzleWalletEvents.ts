import {
  EventType,
  EventsFilter,
  GetEventsResponse,
  getEvents,
} from "@puzzlehq/sdk";

export const getAllPuzzleWalletEvents = async () => {
  console.log("GET ALL PUZZLE WALLET EVENTS TRIGGERED");
  const filter: EventsFilter = {
    type: EventType.Execute,
    programId: "cassino_game_test_fp.aleo",
  };

  try {
    const events: GetEventsResponse = await getEvents(filter);

    return events.events;
  } catch (error) {
    console.log(error);
  }
};
