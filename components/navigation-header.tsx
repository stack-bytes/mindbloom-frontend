import { Text, View } from "react-native";
import { Button } from "./ui/button";
import { ArrowLeftIcon, EllipsisIcon } from "lucide-react-native";
import { NAV_THEME } from "~/lib/constants";

import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
//
type propsType = BottomTabHeaderProps | NativeStackHeaderProps;

export const NavigationHeader = (props: propsType) => {
  return (
    <View className="flex-row items-center justify-between bg-primary pt-20">
      <Button onPress={() => props.navigation.goBack()} variant="ghost">
        <ArrowLeftIcon color={NAV_THEME.light.background} />
      </Button>
      <Text className="text-lg font-semibold text-background">
        {typeof props.options.headerTitle === "string"
          ? props.options.headerTitle
          : ""}
      </Text>
      <Button onPress={() => props.navigation.goBack()} variant="ghost">
        <EllipsisIcon color={NAV_THEME.light.background} />
      </Button>
    </View>
  );
};
