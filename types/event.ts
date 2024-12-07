export interface Event {
  id: string;
  name: string;
  description: string;
  time: string;
  location: string;
  coordinate_x: string;
  coordinate_y: string;
  participants: number;
  participantRefs: EventParticipantRef[];
}

export interface EventRequest {
  name: string;
  description: string;
  time: string;
  groupId: string;
  location: string;
  coordinate_x: string;
  coordinate_y: string;
}

export interface EventResponse {
  eventId: string;
}

export interface EventParticipantRef {
  id: string;
  name: string;
  pfpUrl: string;
}
