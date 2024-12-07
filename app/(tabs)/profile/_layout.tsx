import { Stack } from "expo-router";
import { NavigationHeader } from "~/components/navigation-header";

export default function ProfileLayout() {
  return (
    <Stack>
      <Stack.Screen name="[userId]/index" options={{ headerShown: false }} />
      <Stack.Screen name="edit-categories" options={{ headerShown: false }} />
    </Stack>
  );
}
