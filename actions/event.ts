import { ENDPOINT } from "~/lib/config";
import { Event, EventRequest, EventResponse } from "~/types/event";

export const fetchAllUserEvents = async (
  userId: string
): Promise<Event[] | null> => {
  const response = await fetch(
    `${ENDPOINT}/event-map-service/user/events?userId=` + userId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data;
};

export const createEvent = async (
  eventRequest: EventRequest
): Promise<EventResponse | null> => {
  const response = await fetch(`${ENDPOINT}/event-map-service/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventRequest),
  });

  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  return data;
};

export const removeUserFromEvent = async (
  eventId: string,
  userId: string
): Promise<boolean | null> => {
  const response = await fetch(
    `${ENDPOINT}/event-map-service/remove-user?eventId=` +
      eventId +
      "?userId=" +
      userId,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data;
};

export const getFullEvent = async (eventId: string): Promise<Event | null> => {
  const response = await fetch(
    `${ENDPOINT}/event-map-service/full-event?eventId=` + eventId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data;
};

export const mapEvent = async (groupId: string): Promise<Event[] | null> => {
  const response = await fetch(
    `${ENDPOINT}/event-map-service/map-event?groupId=` + groupId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data;
};

export const addUserToEvent = async (
  eventId: string,
  userId: string
): Promise<boolean | null> => {
  const response = await fetch(
    `${ENDPOINT}/event-map-service/add-user?eventId=` +
      eventId +
      "?userId=" +
      userId,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data;
};
