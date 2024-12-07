import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "~/components/ui/button";
import {
  Bell,
  CalendarClock,
  FilterIcon,
  PlusIcon,
  UsersRound,
  Settings,
} from "lucide-react-native";
import { FlatList } from "react-native";
import { GroupCard } from "~/components/group-card";
import { Header } from "~/components/Header";

import { Input } from "~/components/ui/input";

import { NAV_THEME } from "~/lib/constants";

const items: {
  id: string;
  title: string;
  description: string;
  members: number;
}[] = [
  {
    id: "1",
    title: "Terapie pentru adolescenti",
    description: "Group therapy sessions tailored for teenagers",
    members: 12,
  },
  {
    id: "2",
    title: "New therapy group",
    description: "Please enter a description",
    members: 0,
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView className="w-full">
        <View className="flex w-full flex-row items-center justify-between px-4 py-2">
          <Button size="icon" className="rounded-full bg-slate-300">
            <Bell color={NAV_THEME.light.text} />
          </Button>

          <View className="flex w-fit flex-row gap-x-4">
            <Button className="rounded-full bg-slate-300" size="icon">
              <CalendarClock color={NAV_THEME.light.text} />
            </Button>
            <Button className="rounded-full bg-slate-300" size="icon">
              <Settings color={NAV_THEME.light.text} />
            </Button>
          </View>
        </View>

        <View className="mt-20 flex-auto items-center justify-center">
          <Text className="text-5xl">
            Hello,
            <Text className="text-primary"> John!</Text>
          </Text>
        </View>
        <View className="mt-5 flex-auto items-center justify-center">
          <Text className="text-xl text-gray-600">Glad to have you back!</Text>
        </View>
        <View className="flex-auto items-center justify-center">
          <Text className="text-xl text-gray-600">
            Ready to get back to work?
          </Text>
        </View>

        <View className="ml-5 mr-5 mt-20 border-spacing-2 rounded-3xl border border-gray-300">
          <Text className="mb-3 mt-3 px-3">Groups:</Text>
          <FlatList
            className="mb-3 mt-3 px-3"
            data={items}
            renderItem={({ item }) => (
              <GroupCard
                id={item.id}
                title={item.title}
                description={item.description}
                members={item.members}
                bestMatch={item.id === "1"}
              />
            )}
            contentContainerStyle={{ rowGap: 16 }}
          />
        </View>

        <View className="mb-10 ml-5 mr-5 mt-10 border-spacing-2 rounded-3xl border border-gray-300 px-4 py-4">
          <Text className="mb-3 mt-3 px-3">How are you feeling today?</Text>
          <Text className="flex-auto px-4 py-4 text-gray-500">
            Describe it in a few words:
          </Text>
          <View className="flex-auto px-4">
            <KeyboardAvoidingView>
              <Input className="h-10" />
            </KeyboardAvoidingView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
