import React from 'react';
import { Pressable } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface INavBarIconProps {
  onPress: any;
  optionSelectedCss: string;
  optionNo: number;
  fontName: any;
  color: string;
}

export default function NavBarIcon(props: INavBarIconProps) {
  const { optionNo, optionSelectedCss, color, onPress, fontName } = props;
  return (
    <Pressable
      className={"rounded-full w-12 h-12 justify-center items-center " + optionSelectedCss}
    onPress={() => onPress(optionNo)}>
      <FontAwesome name={fontName} color={color} size={24} />
  </Pressable>
  );
}

