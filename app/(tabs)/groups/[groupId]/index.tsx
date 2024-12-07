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
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { MemberCard } from "~/components/member-card";
import { SessionCard } from "~/components/session-card";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { NAV_THEME } from "~/lib/constants";

export default function GroupScreen() {
  const { groupId, editing } = useLocalSearchParams<{
    groupId: string;
    editing?: string;
  }>();

  const [joined, setJoined] = React.useState(false);

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
                      Terapie pentru adolescenti
                    </Input>
                    <SquarePen size={16} color={NAV_THEME.light.text} />
                  </View>
                ) : (
                  <Text className="text-xl font-semibold text-foreground">
                    Terapie pentru adolescenti
                  </Text>
                )}

                {editing === "yes" ? (
                  <View className="flex flex-row items-center justify-center gap-x-2">
                    <Input className="h-16 text-center text-base font-medium text-muted-foreground">
                      Grup de dezvoltare emotionala si cognitiva pentru
                      adolescenti cu varste intre 14-17 ani
                    </Input>
                    <SquarePen size={16} color={NAV_THEME.light.text} />
                  </View>
                ) : (
                  <Text className="text-center text-base font-medium text-muted-foreground">
                    Grup de dezvoltare emotionala si cognitiva pentru
                    adolescenti cu varste intre 14-17 ani
                  </Text>
                )}

                <View className="flex flex-row items-center justify-center gap-x-1 pt-2">
                  <MapPinIcon color={NAV_THEME.light.text} size={16} />
                  <Text className="text-base font-medium text-muted-foreground">
                    Cluj Napoca, Romania
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
                    32 members
                  </Text>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex-row gap-x-2 rounded-xl py-2"
                >
                  <UsersRound size={16} color={NAV_THEME.light.text} />
                  <Text className="text-base font-semibold text-muted-foreground">
                    32 members
                  </Text>
                </Badge>
                <Badge
                  variant="outline"
                  className="flex-row gap-x-2 rounded-xl py-2"
                >
                  <UsersRound size={16} color={NAV_THEME.light.text} />
                  <Text className="text-base font-semibold text-muted-foreground">
                    32 members
                  </Text>
                </Badge>
              </View>

              {/* Group Actions */}
              <View className="flex flex-row gap-x-2">
                <Button
                  className="flex flex-1 flex-row items-center justify-center rounded-lg border-2 border-border"
                  variant={joined ? "destructive" : "default"}
                  size="lg"
                  onPress={() => setJoined(!joined)}
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
                  INTERESTS
                </Text>

                <View className="flex w-full flex-row gap-x-2">
                  <Badge
                    variant="outline"
                    className="w-32 flex-row gap-x-2 rounded-xl bg-background px-3"
                  >
                    <Text className="text-base font-semibold text-muted-foreground">
                      💀 Anxiety
                    </Text>
                  </Badge>
                </View>
              </View>

              {/* Events */}
              <View className="h-fit w-full gap-y-2 rounded-xl border border-border bg-card px-3 py-3">
                <Text className="text-sm font-bold text-muted-foreground">
                  UPCOMING SESSIONS
                </Text>

                <View className="flex h-fit w-full flex-col gap-y-4">
                  <SessionCard />
                  <SessionCard />
                  <SessionCard />
                  <SessionCard />
                </View>
              </View>

              {/* Members */}
              <View className="h-fit w-full gap-y-2 rounded-xl border border-border bg-card px-3 py-3">
                <Text className="text-sm font-bold text-muted-foreground">
                  MEMBERS
                </Text>

                <View className="flex h-fit w-full flex-col gap-y-4">
                  <MemberCard />
                  <MemberCard />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
