import React from "react";
import { Pressable } from "react-native";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { COLORS } from "assets/constants";

interface INavBarProps {
  onPress: any;
}

export default function NavBar(props: INavBarProps) {
  const { onPress } = props;

  return (
    <View className="flex justify-center">
      <View className="bg-reddish w-60 py-4 rounded-full flex flex-row justify-around">
        <Pressable onPress={() => onPress(1)}>
          <FontAwesome name="pencil" color={COLORS["egg-white"]} size={24} />
        </Pressable>
        <Pressable onPress={() => onPress(2)}>
          <FontAwesome name="sliders" color={COLORS["egg-white"]} size={24} />
        </Pressable>
        <Pressable onPress={() => {}}>
          <Link href="/save" asChild>
            <FontAwesome name="floppy-o" color={COLORS["egg-white"]} size={24} />
          </Link>
        </Pressable>
      </View>
    </View>
  );
}
