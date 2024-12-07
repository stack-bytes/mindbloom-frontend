import { ENDPOINT } from "~/lib/config";
import { Group } from "~/types/group";

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
