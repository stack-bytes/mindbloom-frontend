import React from "react";

import { View } from "react-native";
import { Text } from "./ui/text";
import { NAV_THEME } from "~/lib/constants";

export interface IHeaderProps {
  icon: React.ReactElement;
  title: string;
  subtitle?: string;

  //For pages that don't have a subtitle
  centered?: boolean;
}

// Custom header component for pages
export const Header: React.FC<IHeaderProps> = ({
  centered = false,

  ...props
}) => {
  return (
    <View className="w-full px-8 pt-8">
      <View className="flex flex-row items-center justify-start gap-x-2">
        {React.cloneElement(props.icon, {
          size: 36,
          color: NAV_THEME.light.background,
        })}
        <Text className="text-4xl font-bold text-background">
          {props.title}
        </Text>
      </View>

      {props.subtitle && (
        <Text className="text-lg text-border">{props.subtitle}</Text>
      )}
    </View>
  );
};
