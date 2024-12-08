import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useNavigation, useRouter } from "expo-router";
import {
  CircleIcon,
  CirclePlusIcon,
  Clock,
  MapPinIcon,
  TriangleAlert,
  User,
  Users,
} from "lucide-react-native";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { fetchAllUserEvents } from "~/actions/event";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { FallbackEvents } from "~/fallback/event";
import { NAV_THEME } from "~/lib/constants";
import { useSessionStore } from "~/lib/useSession";

import { Event } from "~/types/event";

export default function MapScreen() {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const mapViewRef = React.useRef<MapView>(null);
  const router = useRouter();

  const navigation = useNavigation();
  const isFocused = navigation.isFocused();

  const { user: localUser } = useSessionStore((state) => state);

  const [events, setEvents] = React.useState<Event[]>([]);
  // callbacks
  const handlePresentModalPress = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = React.useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const snapPoints = React.useMemo(() => ["65%", "65%"], []);

  const handleMarkerPress = (coordinate: Region) => {
    mapViewRef.current?.animateToRegion({
      ...coordinate,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const [selectedEvent, setSelectedEvent] = React.useState<Event | null>(null);

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    console.log("Changed focus", isFocused);
    // fetch user events
    const fetchEvents = async () => {
      const data = await fetchAllUserEvents(localUser.userId);

      console.log("Fetched map event data", data);
      if (data) {
        console.log("Setting events", data);
        setEvents(data);
      } else {
        console.warn("WARNING! Couldn't fetch events, using fallback data");
        setEvents(FallbackEvents);
      }
    };

    fetchEvents();

    setLoading(false);
  }, [isFocused, loading]);

  return (
    <SafeAreaView className="flex h-full w-full">
      <MapView
        ref={mapViewRef}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
        }}
        // initial region cluj napoca
        initialRegion={{
          latitude: 46.7712,
          longitude: 23.6236,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        //set the theme of the map
        showsUserLocation
      >
        {events.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: parseFloat(event.coordinate_x),
              longitude: parseFloat(event.coordinate_y),
            }}
            onPress={() => {
              handleMarkerPress({
                latitude: parseFloat(event.coordinate_x),
                longitude: parseFloat(event.coordinate_y),
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              });
              handlePresentModalPress();
              setSelectedEvent(event);
            }}
          ></Marker>
        ))}

        <Button
          size="icon"
          onPress={() => router.push("/map/create-event")}
          className="absolute right-4 top-4 p-4"
        >
          <CirclePlusIcon size={24} color={NAV_THEME.light.background} />
        </Button>

        <Button
          size="icon"
          onPress={() => setLoading(true)}
          className="absolute right-4 top-16 p-4"
        >
          <Clock size={24} color={NAV_THEME.light.background} />
        </Button>
      </MapView>

      <BottomSheetModalProvider>
        <BottomSheetModal
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
              zIndex: 100,
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
                {selectedEvent?.name}
              </Text>
              <Text className="text-lg font-medium text-muted-foreground">
                {selectedEvent?.description}
              </Text>

              <View className="flex flex-row items-center justify-center gap-x-1 pt-2">
                <MapPinIcon color={NAV_THEME.light.text} size={16} />
                <Text className="text-base font-medium text-muted-foreground">
                  {selectedEvent?.location}
                </Text>
              </View>

              <View className="flex flex-row items-center justify-center gap-x-1 pt-2">
                <Users color={NAV_THEME.light.text} size={16} />
                <Text className="text-base font-medium text-muted-foreground">
                  {selectedEvent?.participants} participants
                </Text>
              </View>

              <Button
                className="mt-6 flex w-full flex-row items-center justify-center rounded-xl border-2 border-border"
                size="lg"
                onPress={() => router.push(`/groups/${selectedEvent?.id}`)}
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
