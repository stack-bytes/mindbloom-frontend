import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "~/components/ui/text";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <SafeAreaView>
        <Text>This screen doesn't exist.</Text>

        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
      </SafeAreaView>
    </>
  );
}
