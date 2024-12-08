import { Text, View } from "react-native";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { UsersRound } from "lucide-react-native";
import { NAV_THEME } from "~/lib/constants";
import { useFocusEffect, useRouter } from "expo-router";
import { useSessionStore } from "~/lib/useSession";
import React from "react";
import { fetchUserGroups } from "~/actions/group";

interface GroupCardProps {
  id: string; //The id of the group
  title: string; //The name of the group
  description: string; //The description of the group
  members: number; //The number of members in the group
  bestMatch: boolean; //Whether the group is a best match
  joined: boolean; //Whether the user has joined the group
}

export const GroupCard: React.FC<GroupCardProps> = ({
  id,
  title = "New therapy group",
  description = "Please enter a description",
  members = "0",
  bestMatch = false,
  joined = true,
}) => {
  const router = useRouter();
  const { user: localUser } = useSessionStore((state) => state);

  const [loading, setLoading] = React.useState(true);

  if (!loading) return <Text>Loading...</Text>;
  return (
    <View className="flex gap-y-2 rounded-2xl border-2 border-border bg-card px-4 pb-2 pt-6">
      {joined && (
        <Text className="text-base font-bold text-[#E6B745]">JOINED</Text>
      )}

      <Text className="text-lg font-bold text-foreground">{title}</Text>
      <Text className="text-sm font-medium text-muted-foreground">
        {description}
      </Text>

      <View className="flex w-full flex-row items-center justify-between">
        <Badge variant="outline" className="h-8 flex-row gap-x-2 py-0">
          <UsersRound size={16} color={NAV_THEME.light.text} />
          <Text className="text-base font-semibold text-muted-foreground">
            {members} members
          </Text>
        </Badge>
        <Button
          onPress={() => router.push(`/groups/${id}`)}
          className="rounded-xl border-2 border-border"
        >
          <Text className="font-semibold text-background">See details</Text>
        </Button>
      </View>
    </View>
  );
};
