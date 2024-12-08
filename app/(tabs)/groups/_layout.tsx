import { Stack, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon, EllipsisIcon } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { NavigationHeader } from "~/components/navigation-header";
import { Button } from "~/components/ui/button";
import { NAV_THEME } from "~/lib/constants";

export default function GroupsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="[groupId]/index"
        options={{
          headerShown: true,
          headerTitle: "Group Details",
          animation: "slide_from_left",
          header: (props) => <NavigationHeader {...props} />,
        }}
      />
    </Stack>
  );
}
