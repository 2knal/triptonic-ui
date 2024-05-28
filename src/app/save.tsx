import { useState } from "react";
import { View, TextInput } from "react-native";
import CoolText from "@/components/utils/cool-text";
import NavButton from "@/components/utils/nav-button";
import { COLORS } from "assets/constants";
import { useAPIStore } from "@/store";

export default function Save() {
  const { tripName, setTripName, savedTripId } = useAPIStore();

  return (
    <View className="bg-egg-white flex flex-1 justify-center items-center p-4">
      <View className="absolute top-0 left-6">
        <NavButton direction='left'/>
      </View>
      <CoolText title={savedTripId === '' ? "Every trip must have a cool name!" : 'Edit this cool trip name!'} css="text-2xl pb-4 color-darker-text" />
      <TextInput
        className="font-rethink bg-white w-96 text-xl color-dark-text h-12 border-reddish border-2 rounded-full text-center"
        placeholder="It's Vegas baby!"
        onChangeText={(t) => setTripName(t)}
        value={tripName}
        selectionColor={COLORS['sageish']}
      ></TextInput>
      <View className="absolute bottom-6 right-6">
        <NavButton direction='right' nextPath='/share' />
      </View>
    </View>
  );
}
