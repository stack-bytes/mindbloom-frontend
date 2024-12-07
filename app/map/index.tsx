import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
  Clock,
  MapPinIcon,
  TriangleAlert,
  User,
  Users,
} from "lucide-react-native";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { NAV_THEME } from "~/lib/constants";

export default function MapScreen() {
  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);
  const mapViewRef = React.useRef<MapView>(null);
  const router = useRouter();
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
        <Marker
          coordinate={{
            latitude: 46.7712,
            longitude: 23.6236,
          }}
          onPress={() => {
            handleMarkerPress({
              latitude: 46.7712,
              longitude: 23.6236,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
            handlePresentModalPress();
          }}
          onSelect={() => console.log("Marker selected")}
          onDeselect={() => console.log("Marker deselected")}
        ></Marker>
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
