import {
  useLocalSearchParams,
  useNavigation,
  usePathname,
  useRouter,
} from "expo-router";
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
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { GroupCard } from "~/components/group-card";
import { MemberCard } from "~/components/member-card";
import { SessionCard } from "~/components/session-card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { NAV_THEME } from "~/lib/constants";
import { useSessionStore } from "~/lib/useSession";
import { User } from "~/types/user";
import { fetchUserGroups } from "~/actions/group";
import { Group } from "~/types/group";
import { fetchUserInfo } from "~/actions/user";

export default function ProfileScreen() {
  const { userId } = useLocalSearchParams();
  const path = usePathname();

  const router = useRouter();
  const navigation = useNavigation();
  const isFocused = navigation.isFocused();

  const { user: localUser } = useSessionStore((state) => state);

  const [joined, setJoined] = React.useState(false);

  const [userGroups, setUserGroups] = React.useState<Group[] | null>([]);

  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    // Fetch user data

    //console.log(localUser, useId);
    fetchUserInfo(userId as string).then((user) => {
      setUser(user);
    });
    // Fetch group data

    // Fetch user groups
    fetchUserGroups(userId as string).then((groups) => {
      setUserGroups(groups);
    });
  }, [localUser, userId, isFocused]);

  if (!user) return <Text> Loading user... </Text>;

  return (
    <View className="h-full w-full bg-primary">
      <SafeAreaView className="flex flex-col gap-y-24">
        <ScrollView
          className="h-full w-full"
          contentContainerStyle={{
            paddingTop: 70,
            paddingBottom: 0,
          }}
        >
          <View className="flex h-full flex-col gap-y-4 rounded-xl bg-background pt-5">
            {/* Group Avatar */}
            <View className="absolute -top-14 z-20 flex w-full items-center justify-center">
              <Avatar
                alt="Group Icon"
                className="h-36 w-36 border-4 border-background"
              >
                <AvatarImage source={{ uri: user.pfpUrl }} />
                <AvatarFallback>
                  <Text className="text-4xl">{user.name[0]}</Text>
                </AvatarFallback>
              </Avatar>
            </View>

            <View className="flex flex-col gap-y-6 px-4 pt-24">
              {/* Info */}
              <View className="w-full flex-col items-center justify-center gap-y-2">
                <Text className="text-xl font-semibold text-foreground">
                  {user.name}
                </Text>
                <Text className="text-center text-base text-lg font-medium text-muted-foreground">
                  I'm interested in meeting new people and making friends.
                </Text>

                <View className="flex flex-row items-center justify-center gap-x-1 pt-2">
                  <MapPinIcon color={NAV_THEME.light.text} size={16} />
                  <Text className="text-base font-medium text-muted-foreground">
                    {user.countryCode}
                  </Text>
                </View>
              </View>

              <View className="flex w-full items-start justify-start">
                <TouchableOpacity
                  className="rounded-lg bg-white px-6 py-3 shadow"
                  onPress={() => router.push("/(tabs)/profile/edit-categories")}
                >
                  <Text className="text-lg font-bold text-gray-800">
                    Manage interests
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Tags */}
              <View className="h-fit w-full gap-y-2 rounded-xl border border-border bg-card px-3 py-1">
                <Text className="text-sm font-bold text-muted-foreground">
                  GROUP CATEGORIES
                </Text>
                {/* Interests are now group categories */}
                <View className="flex w-full flex-row flex-wrap gap-x-2 gap-y-2">
                  {user?.interests.map((interest) => (
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
                <Text className="text-sm font-bold text-muted-foreground">
                  GROUPS
                </Text>

                <View className="flex h-fit w-full flex-col gap-y-4">
                  {userGroups ? (
                    userGroups.map((group) => (
                      <GroupCard
                        key={group.id}
                        id={group.id}
                        title={group.name}
                        description={group.description}
                        members={group.members.length}
                        bestMatch={false}
                        joined={false}
                      />
                    ))
                  ) : (
                    <Text> Loading groups... </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
