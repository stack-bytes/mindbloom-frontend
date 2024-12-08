import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "~/components/ui/button";
import {
  Bell,
  CalendarClock,
  FilterIcon,
  PlusIcon,
  UsersRound,
  Settings,
  ArrowDownUp,
} from "lucide-react-native";

import Slider from "@react-native-community/slider";

import { FlatList } from "react-native";
import { GroupCard } from "~/components/group-card";
import { Header } from "~/components/Header";

import { Input } from "~/components/ui/input";

import { NAV_THEME } from "~/lib/constants";

import React from "react";

import { useSessionStore } from "~/lib/useSession"; // import your Zustand store

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
  const { isTherapist, setisTherapist } = useSessionStore((state) => state);
  const toggleMode = () => {
    setisTherapist(!isTherapist);
  };
  const [sliderValue, setSliderValue] = React.useState<number>(0);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback>
          <ScrollView className="w-full">
            <View className="flex w-full flex-row items-center justify-between px-4 py-2">
              <Button size="icon" className="rounded-full bg-slate-300">
                <Bell color={NAV_THEME.light.text} />
              </Button>
              <Text className="items-center text-2xl text-primary">
                {isTherapist ? "Mode: Therapist" : "Mode: Pacient"}
              </Text>

              <View className="flex w-fit flex-row gap-x-4">
                <Button className="rounded-full bg-slate-300" size="icon">
                  <CalendarClock color={NAV_THEME.light.text} />
                </Button>

                <Button
                  className="rounded-full bg-slate-300"
                  size="icon"
                  onPress={toggleMode}
                >
                  <ArrowDownUp color={NAV_THEME.light.text} />
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
              <Text className="text-xl text-gray-600">
                Glad to have you back!
              </Text>
            </View>
            <View className="flex-auto items-center justify-center">
              <Text className="text-xl text-gray-600">
                Ready to get back to work?
              </Text>
            </View>

            <View className="ml-5 mr-5 mt-20 border-spacing-2 rounded-3xl border border-gray-300 px-4 py-4">
              <Text className="mb-3 mt-3 px-3">How are you feeling today?</Text>
              <Slider
                style={{ width: "100%", height: 40 }}
                minimumValue={1}
                maximumValue={10}
                minimumTrackTintColor={NAV_THEME.light.primary}
                maximumTrackTintColor={NAV_THEME.light.text}
                value={sliderValue}
                onValueChange={(value) => setSliderValue(value)}
              />
              <Text className="flex-auto px-4 py-4 text-gray-500">
                Describe it in a few words:
              </Text>
              <View className="flex-auto px-4">
                <ScrollView>
                  <KeyboardAvoidingView>
                    <Input className="h-10" />
                  </KeyboardAvoidingView>
                </ScrollView>
              </View>
            </View>

            <View className="ml-5 mr-5 mt-10 border-spacing-2 rounded-3xl border border-gray-300">
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
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
