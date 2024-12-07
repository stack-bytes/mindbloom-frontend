import { Tabs } from "expo-router";
import {
  CalendarClock,
  HomeIcon,
  MapPin,
  UserRound,
  UsersIcon,
} from "lucide-react-native";
import { View } from "react-native";
import { NavigationHeader } from "~/components/navigation-header";
import { useSessionStore } from "~/lib/useSession";

export default function TabsLayout() {
  const { user } = useSessionStore((state) => state);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="groups"
        options={{
          title: "Groups",
          tabBarIcon: ({ color }) => <UsersIcon color={color} size={24} />,
        }}
      />

      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          headerTitle: "Map",
          headerShown: true,
          tabBarIcon: ({ color }) => <MapPin color={color} size={24} />,
          header: (props) => <NavigationHeader {...props} />,
        }}
      />

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <HomeIcon color={color} size={24} />,
        }}
      />

      <Tabs.Screen
        name="schedule"
        options={{
          title: "Schedule",
          tabBarIcon: ({ color }) => <CalendarClock color={color} size={24} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          href: `/profile/${user.userId}`,
          title: "Profile",
          headerTitle: "Your Profile",
          headerShown: true,
          header: (props) => <NavigationHeader {...props} />,
          tabBarIcon: ({ color }) => <UserRound color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
