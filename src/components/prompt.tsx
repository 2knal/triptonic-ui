import React  from "react";
import { View } from "react-native";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { router } from "expo-router";

import Textarea from "@/components/utils/textarea";
import CoolButton from "@/components/utils/cool-button";
import { useAPIStore, usePromptStore } from "@/store";
import { useToast } from "react-native-toast-notifications";


export default function Prompt() {
  const toast = useToast();
  const prompt = usePromptStore((state) => state.prompt);
  const changePrompt = usePromptStore((state) => state.changePrompt);
  const { close: closePrompt } = useBottomSheet();

  const generateTrip = async () => {
    if (prompt === '') {
      toast.show("Please add a text prompt", {
        duration: 3000,
        swipeEnabled: true,
        animationType: 'zoom-in'
      });
      return;
    }
    router.push({ pathname: '/trip' });
  };

  return (
    <View className="flex flex-1 p-6 w-full">
      <Textarea
        placeholder="Enter Trip prompt..."
        text={prompt}
        onChangeText={(t: string) => changePrompt(t)}
      />
      <View className="w-80 self-center flex flex-row justify-between items-center pb-24">
        <CoolButton
          onPress={closePrompt}
          buttonCss="w-36 bg-bluei"
          textCss="text-xl color-white"
          text={"Cancel"}
        />
        <CoolButton
          onPress={generateTrip}
          buttonCss="w-36 bg-sageish"
          textCss="text-xl color-white"
          text={"Generate"}
        />
      </View>
    </View>
  );
}

