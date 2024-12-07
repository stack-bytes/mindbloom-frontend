import { Text, View } from "react-native";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CalendarClock, UsersRound } from "lucide-react-native";
import { NAV_THEME } from "~/lib/constants";
import { useRouter } from "expo-router";

interface SessionCardProps {
  id: string; //The id of the group
  title: string; //The name of the group
  description: string; //The description of the group
  date: string; //The date of the group
}

export const SessionCard: React.FC<SessionCardProps> = ({
  id,
  title = "New therapy session",
  description = "Please enter a description",
  date = "5:30 PM, 10/12/2024",
}) => {
  const router = useRouter();

  return (
    <View className="flex gap-y-2 rounded-2xl border-2 border-border bg-card px-4 pb-2 pt-6">
      <Text className="text-lg font-bold text-foreground">{title}</Text>
      <Text className="text-sm font-medium text-muted-foreground">
        {description}
      </Text>

      <View className="flex w-full flex-row items-center justify-between">
        <Badge variant="outline" className="h-8 flex-row gap-x-2 py-0">
          <CalendarClock size={16} color={NAV_THEME.light.text} />
          <Text className="text-base font-semibold text-muted-foreground">
            {date}
          </Text>
        </Badge>
        <Button
          onPress={() => router.push(`/groups/${id}`)}
          className="rounded-xl border-2 border-border"
          size="sm"
        >
          <Text className="font-semibold text-background">Attend</Text>
        </Button>
      </View>
    </View>
  );
};
