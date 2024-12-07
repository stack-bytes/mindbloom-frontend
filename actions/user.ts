import { ENDPOINT } from "~/lib/config";
import { User } from "~/types/user";

export const fetchUserInfo = async (userId: string): Promise<User | null> => {
  console.log("ENtered");
  const response = await fetch(`${ENDPOINT}/users/?userId=${userId}`);

  console.log(response);
  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data;
};
