import { create } from "zustand";
import { User } from "~/types/user";

export interface useSessionStoreProps {
  isTherapist: boolean;
  user: User;
  setUser: (user: User) => void;
  setisTherapist: (value: boolean) => void;
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

  isTherapist: false,
  setisTherapist: (value) => set({ isTherapist: value }),

  setUser: (user) => set({ user }),
}));
