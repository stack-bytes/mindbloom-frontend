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

export const addUserInterests = async (
  userId: string,
  interest: Array<string>
): Promise<boolean | null> => {
  const response = await fetch(
    `${ENDPOINT}/users/interests/?userId=${userId}&interest=${interest}`,
    {
      method: "POST",
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

export const deleteUserInterest = async (
  userId: string,
  interest: string
): Promise<boolean | null> => {
  const response = await fetch(
    `${ENDPOINT}/users/interests/?userId=${userId}&interest=${interest}`,
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
