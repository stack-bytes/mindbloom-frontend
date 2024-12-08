import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { MapPinIcon, Users } from "lucide-react-native";
import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
} from "react-native-calendars";
import { fetchAllUserEvents } from "~/actions/event";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { FallbackEvents } from "~/fallback/event";
import { NAV_THEME } from "~/lib/constants";
import { useSessionStore } from "~/lib/useSession";
import { Event } from "~/types/event";

export const oldAgendaItems = [
  {
    title: "ok",
    data: [{ hour: "12am", duration: "1h", title: "First Yoga" }],
  },
];

interface agendaItemsProps {
  title: string;
  data: {
    hour: string;
    duration: string;
    title: string;
    location: string;
  }[];
}

export function getMarkedDates(agendaItems: agendaItemsProps[]) {
  const marked: any = {};

  agendaItems.forEach((item) => {
    // NOTE: only mark dates with data
    if (item.data && item.data.length > 0) {
      marked[item.title] = { marked: true };
    } else {
      marked[item.title] = { disabled: true };
    }
  });
  return marked;
}

export default function ScheduleScreen() {
  const { user: localUser } = useSessionStore((state) => state);

  const renderItem = React.useCallback(({ item }: any) => {
    return (
      <TouchableOpacity
        className="flex w-full flex-row items-center justify-between px-4 py-4"
        onPress={() => {
          handlePresentModalPress();
          console.log("Item pressed", item);
        }}
      >
        <View className="flex-row gap-x-2">
          <Text className="font-semibold">{item.hour}</Text>
          <Text className="font-semibold">{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const router = useRouter();

  const [events, setEvents] = React.useState<Event[]>([]);
  const [agendaItems, setAgendaItems] = React.useState<agendaItemsProps[]>([]);
  const [markedDates, setMarkedDates] = React.useState<any>({});

  React.useEffect(() => {
    const fetchEvents = async () => {
      const data = await fetchAllUserEvents(localUser.userId);

      var eventData;
      if (!data) {
        console.warn("WARNING! No events found, using fallback data");
        eventData = FallbackEvents;
      } else {
        console.log("FETCHED EVENTS: ", data);
        eventData = data;
      }

      setEvents(eventData);

      //group events by date in map (event.time is a string in iso format)
      const eventsByDate = eventData.reduce(
        (acc: { [date: string]: Event[] }, event) => {
          const date = event.time.split("T")[0];
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(event);
          return acc;
        },
        {}
      );

      //create agenda items from grouped events
      const agendaItems = Object.keys(eventsByDate).map((date) => {
        return {
          title: date,
          data: eventsByDate[date].map((event) => ({
            hour: event.time.split("T")[1],
            duration: "1h",
            title: event.name,
            location: event.location,
          })),
        };
      });
      setAgendaItems(agendaItems);

      const markedDates = getMarkedDates(agendaItems);
      console.log(markedDates);
      setMarkedDates(markedDates);
    };

    fetchEvents();
  }, []);

  const handlePresentModalPress = React.useCallback(() => {
    console.log("Presenting modal");
    bottomSheetModalRef.current?.present();
    console.log("Modal presented", bottomSheetModalRef.current);
  }, []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const snapPoints = React.useMemo(() => ["65%", "65%"], []);

  if (agendaItems.length === 0) return <Text> Loading... </Text>;

  return (
    <SafeAreaView>
      <CalendarProvider date={agendaItems[0].title} showTodayButton>
        <View className="flex flex-col">
          <ExpandableCalendar firstDay={1} markedDates={markedDates} />
          <View className="h-[100vh] pb-52 pt-40">
            <AgendaList sections={agendaItems} renderItem={renderItem} />
          </View>
        </View>
      </CalendarProvider>

      <BottomSheetModalProvider>
        <BottomSheetModal
          style={{ zIndex: 100 }}
          index={1}
          snapPoints={snapPoints}
          ref={bottomSheetModalRef}
          onChange={handleSheetChanges}
        >
          <BottomSheetView
            style={{
              flex: 1,
              padding: 20,
              alignItems: "center",
              zIndex: 120,
              height: 70,
              flexDirection: "column",
              rowGap: 20,
            }}
          >
            <Avatar
              alt="Group image"
              className="h-32 w-32 border-2 border-primary"
            >
              <AvatarImage
                source={{ uri: "https://thispersondoesnotexist.com" }}
              />
              <AvatarFallback>
                <Text>G</Text>
              </AvatarFallback>
            </Avatar>

            <View className="flex w-full flex-col items-center justify-center gap-y-2">
              <Text className="text-2xl font-semibold text-foreground">
                Terapie de grup
              </Text>
              <Text className="text-lg font-medium text-muted-foreground">
                Grup de dezvoltare emotionala si cognitiva pentru adolescenti cu
                varste intre 14-17 ani
              </Text>

              <View className="flex flex-row items-center justify-center gap-x-1 pt-2">
                <MapPinIcon color={NAV_THEME.light.text} size={16} />
                <Text className="text-base font-medium text-muted-foreground">
                  Cluj Napoca, Romania
                </Text>
              </View>

              <View className="flex flex-row items-center justify-center gap-x-1 pt-2">
                <Users color={NAV_THEME.light.text} size={16} />
                <Text className="text-base font-medium text-muted-foreground">
                  53 members
                </Text>
              </View>

              <Button
                className="mt-6 flex w-full flex-row items-center justify-center rounded-xl border-2 border-border"
                size="lg"
                onPress={() => router.push("/groups/1")}
              >
                <Text className="text-lg font-semibold text-background">
                  See details
                </Text>
              </Button>
            </View>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
  );
}
