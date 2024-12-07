import { create } from "zustand";
import { User } from "~/types/user";

export interface useSessionStoreProps {
  user: User;
  setUser: (user: User) => void;
}

export const useSessionStore = create<useSessionStoreProps>((set) => ({
  user: {
    userId: "675423b92dde3a50bf569685",
    name: "Zachary Nemeroff",
    birthday: new Date("1998-11-10"),
    pfpUrl: "https://thispersondoesnotexist.com",
    groups: ["675423b92dde3a50bf569685"],
    events: ["675423b92dde3a50bf569685"],
    interests: ["🌳 Nature", "📸 Photography", "💻 Technology"],
    createdAt: new Date("2022-01-01"),
    countryCode: "US",
  },

  setUser: (user) => set({ user }),
}));
