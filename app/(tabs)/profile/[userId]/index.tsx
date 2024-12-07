import { useLocalSearchParams, usePathname } from "expo-router";
import {
  ArrowLeftIcon,
  EllipsisIcon,
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PinIcon,
  UsersRound,
} from "lucide-react-native";
import React, { useId } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { GroupCard } from "~/components/group-card";
import { MemberCard } from "~/components/member-card";
import { SessionCard } from "~/components/session-card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { NAV_THEME } from "~/lib/constants";
import { useSessionStore } from "~/lib/useSession";
import { User } from "~/types/user";
import { Group } from "~/types/group";

export default function ProfileScreen() {
  const { userId } = useLocalSearchParams();
  const path = usePathname();

  const { user: localUser } = useSessionStore((state) => state);

  const [joined, setJoined] = React.useState(false);

  const [userGroups, setUserGroups] = React.useState<Group>([]);

  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    // Fetch user data

    console.log(localUser, useId);
    if (userId === localUser.userId) {
      setUser(localUser);
    }

    // Fetch group data
  }, []);

  if (!user) return <Text> Loading user... </Text>;

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
                <AvatarImage source={{ uri: user.pfpUrl }} />
                <AvatarFallback>
                  <Text>{user.name[0]}</Text>
                </AvatarFallback>
              </Avatar>
            </View>

            <View className="flex flex-col gap-y-6 px-4 pt-16">
              {/* Info */}
              <View className="w-full flex-col items-center justify-center gap-y-2">
                <Text className="text-xl font-semibold text-foreground">
                  {user.name}
                </Text>
                <Text className="text-center text-base font-medium text-muted-foreground">
                  I'm interested in meeting new people and making friends.
                </Text>

                <View className="flex flex-row items-center justify-center gap-x-1 pt-2">
                  <MapPinIcon color={NAV_THEME.light.text} size={16} />
                  <Text className="text-base font-medium text-muted-foreground">
                    {user.countryCode}
                  </Text>
                </View>
              </View>

              {/* Tags */}
              <View className="h-fit w-full gap-y-2 rounded-xl border border-border bg-card px-3 py-3">
                <Text className="text-sm font-bold text-muted-foreground">
                  INTERESTS
                </Text>

                <View className="flex w-full flex-row flex-wrap gap-x-2 gap-y-2">
                  {user.interests.map((interest) => (
                    <Badge
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
                <Text className="text-sm font-bold text-muted-foreground">
                  GROUPS
                </Text>

                <View className="flex h-fit w-full flex-col gap-y-4">
                  {user.groups.map((group) => (
                    <GroupCard />
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
