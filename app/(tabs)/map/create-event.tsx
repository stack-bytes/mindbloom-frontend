import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { addNewEvent } from "~/actions/event";
import { fetchAllGroups, fetchUserGroups } from "~/actions/group";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useSessionStore } from "~/lib/useSession";
import { Group } from "~/types/group";
import * as Location from "expo-location";

interface Coordinates {
  latitude: number;
  longitude: number;
}

export default function CreateEvent() {
  const { user: localUser } = useSessionStore((state) => state);
  const [groups, setGroups] = React.useState<Group[] | null>([]);
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [coordinates, setCoordinates] = React.useState<Coordinates | null>(
    null
  );
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);
  const [group, setGroup] = React.useState<Group | null>(null);
  const [groupOption, setGroupOption] = React.useState<Group | null>(null);
  React.useEffect(() => {
    // fetch groups
    const fetchGroups = async () => {
      const data = await fetchUserGroups(localUser.userId);
      console.log("Fetched data", data);
      if (data) {
        setGroups(data);
      } else {
        console.warn("WARNING! Couldn't fetch groups, using fallback data");
      }
    };
    fetchGroups();

    const fetchLocation = async () => {
      try {
        // Request permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        // Get the current position
        const currentLocation = await Location.getCurrentPositionAsync({});
        setCoordinates({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
      } catch (error) {
        setErrorMsg("Failed to fetch location");
      }
    };

    fetchLocation();
  }, []);
  return (
    <View className="h-full w-full bg-primary">
      <SafeAreaView className="flex flex-col gap-y-24">
        <View className="mt-10 flex h-full flex-col gap-y-4 rounded-xl bg-background px-4 py-4 pb-20">
          <View className="w-full">
            <Label className="text-lg font-semibold text-foreground">
              Title
            </Label>
            <Input
              placeholder="Enter the title of the event"
              className="rounded-xl"
              onChangeText={(text: string) => setTitle(text)}
            />
          </View>
          <View className="w-full">
            <Label className="text-lg font-semibold text-foreground">
              Description
            </Label>
            <Input
              placeholder="Enter the description of the event"
              className="rounded-xl"
              onChangeText={(text: string) => setDescription(text)}
            />
          </View>
          <View className="w-full">
            <Label className="text-lg font-semibold text-foreground">
              Location
            </Label>
            <Input
              placeholder="Enter the location of the event"
              className="rounded-xl"
              onChangeText={(text: string) => setLocation(text)}
            />
          </View>
          <View className="w-full gap-y-2">
            <Label className="text-lg font-semibold text-foreground">
              GPS Coordinates
            </Label>
            <View className="w-full flex-grow flex-row gap-x-4">
              <Input
                placeholder={coordinates?.latitude.toString()}
                className="flex-grow rounded-xl"
              />
              <Input
                placeholder={coordinates?.longitude.toString()}
                className="flex-grow rounded-xl"
              />
            </View>
          </View>
          <View className="w-full gap-y-2">
            <Label className="text-lg font-semibold text-foreground">
              Group
            </Label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-fit" variant="outline">
                  {groupOption ? (
                    <Text>{groupOption.name}</Text>
                  ) : (
                    <Text className="text-muted-foreground">
                      Select a group
                    </Text>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {groups?.map((group) => (
                  <DropdownMenuItem onPress={() => setGroupOption(group)}>
                    <Text>{group.name}</Text>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </View>
          <Button
            onPress={() => {
              (async () => {
                if (
                  !title ||
                  !description ||
                  !location ||
                  !coordinates ||
                  !groupOption
                ) {
                  console.error("Missing required fields for event creation");
                  alert(
                    "Please fill out all fields before creating the event."
                  );
                  return;
                }
                try {
                  const response = await addNewEvent({
                    name: title,
                    description,
                    time: new Date(),
                    location,
                    coordinate_x: coordinates.latitude.toString(),
                    coordinate_y: coordinates.longitude.toString(),
                    groupId: groupOption?.id,
                  });

                  if (!response) {
                    console.error("Failed to create event");
                    alert("Failed to create event. Please try again later.");
                    return;
                  }

                  alert("Event created successfully!");
                } catch (error) {
                  console.error("Error creating event:", error);
                  alert(
                    "An error occurred while creating the event. Please try again."
                  );
                }
              })();
            }}
          >
            <Text className="font-medium text-background">Create Event</Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
