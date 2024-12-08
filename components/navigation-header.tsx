import { Text, View } from "react-native";
import { Button } from "./ui/button";
import { ArrowLeftIcon, EllipsisIcon } from "lucide-react-native";
import { NAV_THEME } from "~/lib/constants";

import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useRouter } from "expo-router";
//
type propsType = BottomTabHeaderProps | NativeStackHeaderProps;

export const NavigationHeader = (props: propsType) => {
  const router = useRouter();
  return (
    <View className="flex-row items-center justify-between bg-primary py-2 pt-16">
      <Button
        onPress={() => router.back()}
        variant="ghost"
        disabled={!router.canGoBack()}
      >
        {router.canGoBack() && (
          <ArrowLeftIcon color={NAV_THEME.light.background} />
        )}
      </Button>
      <Text className="text-3xl font-medium text-background">
        {typeof props.options.headerTitle === "string"
          ? props.options.headerTitle
          : ""}
      </Text>
      <Button variant="ghost">
        <EllipsisIcon color={NAV_THEME.light.background} />
      </Button>
    </View>
  );
};
