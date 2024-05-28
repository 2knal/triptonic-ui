import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import { View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, useRouter } from "expo-router";
import { COLORS } from "assets/constants";
import NavBarIcon from "@/components/utils/navbar-icon";
import { useAPIStore } from "@/store";

interface INavBarProps {
  onPress: any;
  optionNo: number;
}

export default function NavBar(props: INavBarProps) {
  const { onPress, optionNo } = props;
  const { savedTripId } = useAPIStore();
  const [ editModeOn, setEditModeOn ] = useState(false);
  const navBarStyles = editModeOn ? 'w-64' : 'w-72';

  const router = useRouter();

  useEffect(() => {
    if (savedTripId !== '') {
      console.log('Edit Mode on!')
      setEditModeOn(true);
    }
  }, [savedTripId])

  return (
    <View className="flex justify-center">
      <View className={"bg-reddish py-3 rounded-full flex flex-row justify-around " + navBarStyles}>
        {!editModeOn && <NavBarIcon
          onPress={() => onPress(1)}
          optionSelectedCss={optionNo === 1 ? 'bg-egg-white' : ''}
          optionNo={1}
          fontName={"pencil"} color={optionNo === 1 ? COLORS["reddish"] : COLORS["egg-white"]} />}
        <NavBarIcon
          onPress={() => onPress(2)}
          optionSelectedCss={optionNo === 2 ? 'bg-egg-white' : ''}
          optionNo={2}
          fontName={"sliders"} color={optionNo === 2 ? COLORS["reddish"] : COLORS["egg-white"]} />
        <NavBarIcon
          onPress={() => onPress(3)}
          optionSelectedCss={optionNo === 3 ? 'bg-egg-white' : ''}
          optionNo={3}
          fontName={"map"} color={optionNo === 3 ? COLORS["reddish"] : COLORS["egg-white"]} />
        <NavBarIcon
          onPress={() => {
            onPress(4);
            router.push({ pathname: '/save' });
          }}
          optionSelectedCss={optionNo === 4 ? 'bg-egg-white' : ''}
          optionNo={4}
          fontName={"floppy-o"} color={optionNo === 4 ? COLORS["reddish"] : COLORS["egg-white"]} />
      </View>
    </View>
  );
}
