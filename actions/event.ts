import { ENDPOINT } from "~/lib/config";
import { Event } from "~/types/event";

export const fetchAllUserEvents = async (
  userId: string
): Promise<Event[] | null> => {
  console.log("Fetching events for user", userId);
  const response = await fetch(`https://google.com/events/${userId}`);

  console.error("Response", response);
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data;
};
