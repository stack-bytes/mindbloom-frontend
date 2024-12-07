import { Stack } from "expo-router";

export default function MapLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="create-event"
        options={{
          headerTitle: "Create event",
        }}
      />
    </Stack>
  );
}
