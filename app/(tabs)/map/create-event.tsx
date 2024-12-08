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
export default function CreateEvent() {
  const { user: localUser } = useSessionStore((state) => state);
  const [groups, setGroups] = React.useState<Group[] | null>([]);
  const titleInputRef = React.useRef<HTMLInputElement>(null);
  const descriptionInputRef = React.useRef<HTMLInputElement>(null);
  const locationInputRef = React.useRef<HTMLInputElement>(null);
  const latitudeInputRef = React.useRef<HTMLInputElement>(null);
  const longitudeInputRef = React.useRef<HTMLInputElement>(null);
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
            />
          </View>
          <View className="w-full">
            <Label className="text-lg font-semibold text-foreground">
              Description
            </Label>
            <Input
              placeholder="Enter the description of the event"
              className="rounded-xl"
            />
          </View>
          <View className="w-full">
            <Label className="text-lg font-semibold text-foreground">
              Location
            </Label>
            <Input
              placeholder="Enter the location of the event"
              className="rounded-xl"
            />
          </View>
          <View className="w-full gap-y-2">
            <Label className="text-lg font-semibold text-foreground">
              GPS Coordinates
            </Label>
            <View className="w-full flex-grow flex-row gap-x-4">
              <Input placeholder="LATITUDE" className="flex-grow rounded-xl" />
              <Input placeholder="LONGITUDE" className="flex-grow rounded-xl" />
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
          <Button>
            <Text className="font-medium text-background">Create Event</Text>
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
