import React  from "react";
import { View, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <Textarea
        placeholder="Enter Trip prompt..."
        text={prompt}
        onChangeText={(t: string) => changePrompt(t)}
      />
      <View style={styles.row}>
        <CoolButton
          onPress={closePrompt}
          buttonCss="bg-bluei w-48"
          textCss="color-white"
          text={"Cancel"}
        />
        <CoolButton
          onPress={generateTrip}
          buttonCss="bg-sageish w-48"
          textCss="color-white"
          text={"Generate"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#1E1E1E",
    padding: 20,
  },
  row: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
