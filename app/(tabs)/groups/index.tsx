import { FilterIcon, PlusIcon, UsersRound } from "lucide-react-native";
import { FlatList, SafeAreaView, View } from "react-native";
import { GroupCard } from "~/components/group-card";
import { Header } from "~/components/Header";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { NAV_THEME } from "~/lib/constants";

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
            data={items}
            renderItem={({ item }) => (
              <GroupCard
                id={item.id}
                title={item.title}
                description={item.description}
                members={item.members}
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
