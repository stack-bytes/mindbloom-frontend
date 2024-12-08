import { ENDPOINT } from "~/lib/config";
import { Group, Metadata } from "~/types/group";

export const createNewGroup = async (
  userId: string,
  group: Partial<Group>
): Promise<Group["id"] | null> => {
  const response = await fetch(`${ENDPOINT}/groups`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: group.name,
      description: group.description,
      location: group.location,
      coordinate_x: group.coordinate_x,
      coordinate_y: group.coordinate_y,
      owner: group.owner,
      members: group.members,
      metadata: group.metadata,
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  console.log("Created new group?");
  return data.id;
};

export const fetchUserGroups = async (
  userId: string
): Promise<Group[] | null> => {
  const response = await fetch(`${ENDPOINT}/groups/user?userId=${userId}`);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  console.log("OK User groups:", data);
  return data;
};

export const fetchGroupById = async (
  groupId: string
): Promise<Group | null> => {
  const response = await fetch(`${ENDPOINT}/groups?groupId=${groupId}`);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  console.log("OK Group by ID:", data);
  return data;
};

export const leaveGroup = async (
  groupId: string,
  userId: string
): Promise<boolean> => {
  const response = await fetch(
    `${ENDPOINT}/groups/user/remove?groupId=${groupId}&userId=${userId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    return false;
  }

  return true;
};

export const joinGroup = async (
  groupId: string,
  userId: string
): Promise<boolean> => {
  const response = await fetch(
    `${ENDPOINT}/groups/user/add?groupId=${groupId}&userId=${userId}`,
    {
      method: "PATCH",
    }
  );

  if (!response.ok) {
    return false;
  }

  return true;
};

export const fetchAllGroups = async (): Promise<Group[] | null> => {
  const response = await fetch(`${ENDPOINT}/groups/all`);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  console.log("OK All groups:", data);
  return data;
};

export const fetchRecommendedGroups = async (
  interests: Metadata["interests"]
): Promise<Group[] | null> => {
  //add interests to the query string
  //interests=1&interests=2&interests=3
  const queryString = interests
    .map((interest) => `interests=${interest}`)
    .join("&");
  const response = await fetch(`${ENDPOINT}/groups/interests?${queryString}`);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  console.log("OK Recommended groups:", data);
  return data;
};
