import { useLocalSearchParams, usePathname } from "expo-router";
import {
  ArrowLeftIcon,
  EllipsisIcon,
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PinIcon,
  SquarePen,
  UsersRound,
} from "lucide-react-native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { createEvent, fetchAllUserEvents, mapEvent } from "~/actions/event";
import { fetchGroupById, joinGroup, leaveGroup } from "~/actions/group";
import { MemberCard } from "~/components/member-card";
import { SessionCard } from "~/components/session-card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { NAV_THEME } from "~/lib/constants";
import { useSessionStore } from "~/lib/useSession";
import { Event } from "~/types/event";
import { Group } from "~/types/group";

export default function GroupScreen() {
  const { groupId, editing } = useLocalSearchParams<{
    groupId: string;
    editing?: string;
  }>();

  const [loading, setLoading] = React.useState(true);
  const { user: localUser } = useSessionStore((state) => state);
  const [joined, setJoined] = React.useState(false);

  const [group, setGroup] = React.useState<Group | null>(null);
  const [events, setEvents] = React.useState<Event[] | null>([]);

  const pressedMainAction = async () => {
    if (joined) {
      console.log("Leave group", groupId, localUser.userId);
      leaveGroup(groupId, localUser.userId);
      setJoined(false);
    } else {
      console.log("Join group", groupId, localUser.userId);
      joinGroup(groupId, localUser.userId);
      setJoined(true);
    }
  };

  const pressNewEvent = async () => {
    console.log("Create new event");

    const response = await createEvent({
      name: "New Event",
      description: "New Event Description",
      location: "New Event Location",
      time: new Date("now").toISOString(),
      groupId: groupId,
      coordinate_x: "32.123",
      coordinate_y: "32.123",
    });

    if (!response) {
      console.log("Failed to create event");
      return;
    } else {
      console.log("Event created successfully", response.eventId);
    }
  };

  //Fetch events
  React.useEffect(() => {
    (async () => {
      const response = await mapEvent(groupId);
      if (!response) {
        return;
      }
      setEvents(response);
    })();
  }, [groupId, loading]);

  React.useEffect(() => {
    (async () => {
      const response = await fetchGroupById(groupId);
      if (!response) {
        return;
      }
      setGroup(response);

      // Check if local user is in group
      if (response.members.includes(localUser.userId)) {
        setJoined(true);
      }
    })();
  }, [groupId, joined, loading]);

  if (!group) return <Text>Loading...</Text>;

  return (
    <View className="h-full w-full bg-primary">
      <SafeAreaView className="flex flex-col gap-y-24">
        <ScrollView
          className="h-full w-full"
          contentContainerStyle={{
            paddingTop: 70,
            paddingBottom: 100,
          }}
        >
          <View className="flex h-full flex-col gap-y-4 rounded-xl bg-background pb-20 pt-5">
            {/* Group Avatar */}
            <View className="absolute -top-14 z-20 flex w-full items-center justify-center">
              <Avatar
                alt="Group Icon"
                className="h-32 w-32 border-4 border-background"
              >
                <AvatarImage
                  source={{ uri: "https://thispersondoesnotexist.com" }}
                />
                <AvatarFallback>
                  <Text>ZN</Text>
                </AvatarFallback>
              </Avatar>
            </View>

            <View className="flex flex-col gap-y-6 px-4 pt-16">
              {/* Info */}
              <View className="w-full flex-col items-center justify-center gap-y-2">
                {editing === "yes" ? (
                  <View className="flex flex-row items-center justify-center gap-x-2">
                    <Input className="text-xl font-semibold text-foreground">
                      {group.name}
                    </Input>
                    <SquarePen size={16} color={NAV_THEME.light.text} />
                  </View>
                ) : (
                  <Text className="text-xl font-semibold text-foreground">
                    {group.name}
                  </Text>
                )}

                {editing === "yes" ? (
                  <View className="flex flex-row items-center justify-center gap-x-2">
                    <Input className="h-16 text-center text-base font-medium text-muted-foreground">
                      {group.description}
                    </Input>
                    <SquarePen size={16} color={NAV_THEME.light.text} />
                  </View>
                ) : (
                  <Text className="text-center text-base font-medium text-muted-foreground">
                    {group.description}
                  </Text>
                )}

                <View className="flex flex-row items-center justify-center gap-x-1 pt-2">
                  <MapPinIcon color={NAV_THEME.light.text} size={16} />
                  <Text className="text-base font-medium text-muted-foreground">
                    {group.location}
                  </Text>
                </View>
              </View>

              {/* Badges */}
              <View className="flex w-full flex-row gap-x-2">
                <Badge
                  variant="outline"
                  className="flex-row gap-x-2 rounded-xl py-2"
                >
                  <UsersRound size={16} color={NAV_THEME.light.text} />
                  <Text className="text-base font-semibold text-muted-foreground">
                    {group.members.length} members
                  </Text>
                </Badge>
              </View>

              {/* Group Actions */}
              <View className="flex flex-row gap-x-2">
                <Button
                  className="flex flex-1 flex-row items-center justify-center rounded-lg border-2 border-border"
                  variant={joined ? "destructive" : "default"}
                  size="lg"
                  onPress={pressedMainAction}
                >
                  <Text className="text-lg font-semibold text-background">
                    {joined ? "Leave Group" : "Join Group"}
                  </Text>
                </Button>

                <Button variant="outline" className="aspect-square h-14 w-14">
                  <FacebookIcon color={NAV_THEME.light.text} />
                </Button>

                <Button variant="outline" className="aspect-square h-14 w-14">
                  <InstagramIcon color={NAV_THEME.light.text} />
                </Button>
              </View>

              {/* Tags */}
              <View className="h-fit w-full gap-y-2 rounded-xl border border-border bg-card px-3 py-3">
                <Text className="text-sm font-bold text-muted-foreground">
                  GROUP CATEGORIES
                </Text>

                <View className="flex w-full flex-row flex-wrap gap-x-2 gap-y-2">
                  {group.metadata.interests.map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="w-fit flex-row gap-x-2 rounded-xl bg-background px-3"
                    >
                      <Text className="text-base font-semibold text-muted-foreground">
                        {interest}
                      </Text>
                    </Badge>
                  ))}
                </View>
              </View>

              {/* Events */}
              <View className="h-fit w-full gap-y-2 rounded-xl border border-border bg-card px-3 py-3">
                <View className="flex w-full flex-row justify-between">
                  <Text className="text-sm font-bold text-muted-foreground">
                    UPCOMING SESSIONS
                  </Text>

                  <TouchableOpacity
                    className="flex flex-row items-center gap-x-2"
                    onPress={pressNewEvent}
                  >
                    <Text className="text-sm font-semibold text-muted-foreground">
                      NEW
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="flex h-fit w-full flex-col gap-y-4">
                  {!events ||
                    (events.length === 0 && <Text> No events found!</Text>)}

                  {events?.map((event) => (
                    <SessionCard
                      key={event.id}
                      id={event.id}
                      date={event.time}
                      title={event.name}
                      description={event.description}
                    />
                  ))}
                </View>
              </View>

              {/* Members */}
              <View className="h-fit w-full gap-y-2 rounded-xl border border-border bg-card px-3 py-3">
                <Text className="text-sm font-bold text-muted-foreground">
                  MEMBERS
                </Text>

                <View className="flex h-fit w-full flex-col gap-y-4">
                  {group.members.length === 0 && <Text> No users found!</Text>}
                  {group.members.map((memberId) => (
                    <MemberCard key={memberId} id={memberId} />
                  ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
