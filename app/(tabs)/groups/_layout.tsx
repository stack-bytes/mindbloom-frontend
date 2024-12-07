import { Stack, useLocalSearchParams } from "expo-router";
import { ArrowLeftIcon, EllipsisIcon } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
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
          animation: "slide_from_left",
          header: ({ navigation, options, route }) => (
            <View className="flex-row items-center justify-between bg-primary pt-20">
              <Button onPress={() => navigation.goBack()} variant="ghost">
                <ArrowLeftIcon color={NAV_THEME.light.background} />
              </Button>
              <Text className="text-lg font-semibold text-background">
                Group Details
              </Text>
              <Button
                onPress={() => navigation.setParams({ editing: "yes" })}
                variant="ghost"
              >
                <EllipsisIcon color={NAV_THEME.light.background} />
              </Button>
            </View>
          ),
        }}
      />
    </Stack>
  );
}
