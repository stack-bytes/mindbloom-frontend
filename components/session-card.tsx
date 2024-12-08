import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CalendarClock, UsersRound, X } from "lucide-react-native";
import { NAV_THEME } from "~/lib/constants";
import { useRouter } from "expo-router";
import { useSessionStore } from "~/lib/useSession";
import {
  addUserToEvent,
  fetchAllUserEvents,
  removeUserFromEvent,
} from "~/actions/event";
import React from "react";

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

  const { user: localUser } = useSessionStore((state) => state);

  const [attends, setAttends] = React.useState(false);

  /* Check if the user is attending the event */
  React.useEffect(() => {
    const checkAttends = async () => {
      const events = await fetchAllUserEvents(localUser.userId);

      if (events) {
        const event = events.find((event) => event.id === id);

        if (event) {
          setAttends(true);
        }
      }
    };

    checkAttends();
  }, []);

  const onPressAttend = async () => {
    if (attends) {
      //Remove user from the event
      const result = await removeUserFromEvent(id, localUser.userId);

      if (result) {
        setAttends(false);

        //Refresh the page
        router.reload();
        router.reload();
        router.reload();
      } else {
        console.log("Failed to remove user from event");
      }
    } else {
      const result = await addUserToEvent(id, localUser.userId);

      if (result) {
        setAttends(true);
      } else {
        console.log("Failed to add user to event");
      }
    }
  };

  const onRemovePress = () => {};
  return (
    <View className="flex gap-y-2 rounded-2xl border-2 border-border bg-card px-4 pb-2 pt-6">
      <View className="flex w-full flex-row items-center justify-between">
        <Text className="text-lg font-bold text-foreground">{title}</Text>

        <TouchableOpacity
          className="aspect-square h-6 w-6 items-center justify-center rounded-md bg-destructive p-2"
          onPress={onRemovePress}
        >
          <X size={16} color={NAV_THEME.light.background} />
        </TouchableOpacity>
      </View>

      <Text className="text-sm font-medium text-muted-foreground">
        {description}
      </Text>

      <View className="flex w-full flex-row items-center justify-between">
        <Badge variant="outline" className="h-8 flex-row gap-x-2 py-0">
          <CalendarClock size={16} color={NAV_THEME.light.text} />
          <Text className="text-base font-semibold text-muted-foreground">
            {new Date(date).toLocaleDateString()}
          </Text>
        </Badge>
        <Button
          onPress={onPressAttend}
          className="rounded-xl border-2 border-border"
          size="sm"
          variant={attends ? "destructive" : "default"}
        >
          <Text className="font-semibold text-background">
            {attends ? "Leave" : "Attend"}{" "}
          </Text>
        </Button>
      </View>
    </View>
  );
};
