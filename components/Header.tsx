import React from "react";

import { View } from "react-native";
import { Text } from "./ui/text";


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
    <View className="w-full px-8 pt-5">
      <View
        className=
          "flex flex-row items-center justify-start gap-x-2"
      
      >
        {React.cloneElement(props.icon, { size: 36, color: "black" })}
        <Text className="text-4xl font-bold">{props.title}</Text>
      </View>

      {props.subtitle && (
        <Text className="text-lg text-[#9F9F9F]">{props.subtitle}</Text>
      )}
    </View>
  );
};
