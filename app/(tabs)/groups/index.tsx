import { FilterIcon, PlusIcon, UsersRound } from "lucide-react-native";
import React from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { createNewGroup, fetchUserGroups } from "~/actions/group";
import { GroupCard } from "~/components/group-card";
import { Header } from "~/components/Header";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { NAV_THEME } from "~/lib/constants";
import { useSessionStore } from "~/lib/useSession";
import { Group } from "~/types/group";

const items: {
  id: string;
  title: string;
  description: string;
  members: number;
}[] = [
  {
    id: "1",
    title: "Terapie pentru adolescenti",
    description: "Group therapy sessions tailored for teenagers",
    members: 12,
  },
  {
    id: "2",
    title: "New therapy group",
    description: "Please enter a description",
    members: 0,
  },
  {
    id: "3",
    title: "New therapy group",
    description: "Please enter a description",
    members: 0,
  },
];

export default function GroupsScreen() {
  const { user: localUser } = useSessionStore((state) => state);

  const [loading, setLoading] = React.useState(true);

  const [groups, setGroups] = React.useState<Group[] | null>(null);

  const createGroup = async () => {
    console.log("Creating new group...");
    // Create a new group
    const newGroupId = await createNewGroup(localUser.userId, {
      name: "New therapy group",
      description: "Please enter a description",
      location: "Online",
      coordinate_x: 0,
      coordinate_y: 0,
      owner: localUser.userId,
      members: [localUser.userId],
      metadata: {
        tags: ["therapy", "group"],
        interests: ["mental health"],
      },
    });

    if (newGroupId) {
      setLoading(true);
      console.log("Group created with id:", newGroupId);
    } else {
      return;
    }
  };

  React.useEffect(() => {
    console.log("Fetching user groups...");
    // Fetch user groups
    fetchUserGroups(localUser.userId).then((data) => {
      if (data) {
        setGroups(data);
      }
      setLoading(false);

      console.log("User groups:", data);
    });
  }, [loading]);

  return (
    <View className="h-full w-full bg-primary">
      <SafeAreaView className="flex flex-col gap-y-4">
        <Header
          title="Groups"
          icon={<UsersRound />}
          subtitle="Discover new groups"
        />

        <View className="flex h-full flex-col gap-y-4 rounded-xl bg-background px-4 pt-5">
          <View className="flex flex-row gap-x-2">
            <Input
              className="flex-1 rounded-xl"
              placeholder="Search for groups"
            />
            <Button
              onPress={createGroup}
              size="icon"
              className="rounded-lg border-2 border-border"
              variant="ghost"
            >
              <FilterIcon color={NAV_THEME.light.text} />
            </Button>
            <Button size="icon" className="rounded-lg border-2 border-border">
              <PlusIcon color={NAV_THEME.light.background} />
            </Button>
          </View>

          <FlatList
            data={groups}
            renderItem={({ item }) => (
              <GroupCard
                id={item.id}
                title={item.name}
                description={item.description}
                members={item.members.length}
                bestMatch={item.id === "1"}
              />
            )}
            contentContainerStyle={{ rowGap: 16 }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
