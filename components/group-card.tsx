import { Text, View } from "react-native";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { UsersRound } from "lucide-react-native";
import { NAV_THEME } from "~/lib/constants";
import { useRouter } from "expo-router";

interface GroupCardProps {
  id: string; //The id of the group
  title: string; //The name of the group
  description: string; //The description of the group
  members: number; //The number of members in the group
  bestMatch: boolean; //Whether the group is a best match
}

export const GroupCard: React.FC<GroupCardProps> = ({
  id,
  title = "New therapy group",
  description = "Please enter a description",
  members = "0",
  bestMatch = false,
}) => {
  const router = useRouter();

  return (
    <View className="flex gap-y-2 rounded-2xl border-2 border-border bg-card px-4 pb-2 pt-6">
      {bestMatch && (
        <Text className="text-lg font-bold text-[#E6B745]">BEST MATCH</Text>
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
