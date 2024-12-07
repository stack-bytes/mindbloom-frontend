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

export interface EventParticipantRef {
  id: string;
  name: string;
  pfpUrl: string;
}
