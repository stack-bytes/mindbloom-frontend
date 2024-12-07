import { Text, View } from "react-native";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CalendarClock, UsersRound } from "lucide-react-native";
import { NAV_THEME } from "~/lib/constants";
import { useRouter } from "expo-router";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import React from "react";

interface MemberCardProps {
  id: string; //The id of the member
}

export const MemberCard: React.FC<MemberCardProps> = ({ id }) => {
  const router = useRouter();

  const [member, setMember] = React.useState({
    name: "Tobias Kennedy",
    avatarUri: "https://thispersondoesnotexist.com",
    description: "Member since 15 January, 2023",
  });

  return (
    <View className="flex rounded-2xl border-2 border-border bg-card px-4 py-4">
      <View className="flex w-full flex-row items-center justify-start gap-x-2">
        <Avatar alt="Member Avatar" className="h-8 w-8">
          <AvatarImage source={{ uri: member.avatarUri }} />
          <AvatarFallback>
            <Text>{member.name[0]}</Text>
          </AvatarFallback>
        </Avatar>
        <Text className="text-lg font-bold text-foreground">{member.name}</Text>
      </View>

      <View className="flex w-full flex-row items-center justify-between">
        <Text className="text-sm font-medium text-muted-foreground">
          {member.description}
        </Text>
        <Button
          onPress={() => router.push(`/groups/${id}`)}
          className="rounded-xl border-2 border-border"
          size="sm"
          variant="destructive"
        >
          <Text className="font-semibold text-background">Kick</Text>
        </Button>
      </View>
    </View>
  );
};
