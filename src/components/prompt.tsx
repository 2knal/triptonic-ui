import React  from "react";
import { View } from "react-native";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { router } from "expo-router";

import Textarea from "@/components/utils/textarea";
import CoolButton from "@/components/utils/cool-button";
import { usePromptStore } from "@/store";
import { useToast } from "react-native-toast-notifications";


export default function Prompt() {
  const toast = useToast();
  const prompt = usePromptStore((state) => state.prompt);
  const changePrompt = usePromptStore((state) => state.changePrompt);
  const { close: closePrompt } = useBottomSheet();

  const generateTrip = async () => {
    if (prompt === '') {
      toast.show("Please add a text prompt");
      return;
    }
    router.push({ pathname: '/trip' });
  };

  return (
    <View className="flex flex-1 p-6">
      <Textarea
        placeholder="Enter Trip prompt..."
        text={prompt}
        onChangeText={(t: string) => changePrompt(t)}
      />
      <View className="gap-6 flex-row self-center pb-24">
        <CoolButton
          onPress={closePrompt}
          buttonCss="w-48 bg-bluei"
          textCss="color-white"
          text={"Cancel"}
        />
        <CoolButton
          onPress={generateTrip}
          buttonCss="w-48 bg-sageish"
          textCss="color-white"
          text={"Generate"}
        />
      </View>
    </View>
  );
}

