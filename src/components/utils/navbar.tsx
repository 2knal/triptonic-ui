import React, { useState } from "react";
import { Pressable } from "react-native";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link } from "expo-router";
import { COLORS } from "assets/constants";
import NavBarIcon from "@/components/utils/navbar-icon";

interface INavBarProps {
  onPress: any;
  optionNo: number;
}

export default function NavBar(props: INavBarProps) {
  const { onPress, optionNo } = props;

  return (
    <View className="flex justify-center">
      <View className="bg-reddish w-64 py-4 rounded-full flex flex-row justify-around">
        <NavBarIcon
          onPress={() => onPress(1)}
          optionSelectedCss={optionNo === 1 ? 'bg-egg-white' : ''}
          optionNo={1}
          fontName={"pencil"} color={optionNo === 1 ? COLORS["reddish"] : COLORS["egg-white"]} />
        <NavBarIcon
          onPress={() => onPress(2)}
          optionSelectedCss={optionNo === 2 ? 'bg-egg-white' : ''}
          optionNo={1}
          fontName={"sliders"} color={optionNo === 2 ? COLORS["reddish"] : COLORS["egg-white"]} />
        <Pressable
          className='rounded-full w-12 h-12 justify-center items-center'
          onPress={() => {}}>
          <Link href="/save" asChild>
            <FontAwesome name="floppy-o" color={COLORS["egg-white"]} size={24} />
          </Link>
        </Pressable>
      </View>
    </View>
  );
}
