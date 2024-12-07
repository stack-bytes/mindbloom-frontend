export interface Group {
  id: string;
  avatarUrl: string;
  name: string;
  description: string;
  location: string;
  coordinate_x: number;
  coordinate_y: number;
  owner: string;
  members: string[];
  events: string[];
  metadata: Metadata;
  createdAt: Date;
  updatedAt: Date;
}

export interface Metadata {
  tags: string[];
  interests: string[];
}
