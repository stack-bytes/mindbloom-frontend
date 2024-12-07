export interface User {
  userId: string;
  name: string;
  birthday: Date;
  pfpUrl: string;
  groups: string[];
  events: string[];
  interests: string[];
  createdAt: Date;
  countryCode: string;
}
