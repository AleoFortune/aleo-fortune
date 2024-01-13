import {
  EventType,
  EventsFilter,
  GetEventsResponse,
  getEvents,
} from "@puzzlehq/sdk";

export const getAllPuzzleWalletEvents = async () => {
  const filter: EventsFilter = {
    type: EventType.Execute,
    programId: "cassino_game_test_fp.aleo",
  };
  const events: GetEventsResponse = await getEvents(filter);
  return events.events;
};
