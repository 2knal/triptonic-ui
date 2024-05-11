import React  from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Textarea from "@/components/utils/textarea";
import CoolButton from "@/components/utils/cool-button";
import { TRIP } from "assets/constants";
import { usePromptStore, useAPIStore } from "@/store";
import { useToast } from "react-native-toast-notifications";

const reqBody = {
  neighborhood: "USC",
  city: "Los Angeles",
  category: "Burger",
};

export default function Prompt() {
  const toast = useToast();
  const prompt = usePromptStore((state) => state.prompt);
  const changePrompt = usePromptStore((state) => state.changePrompt);
  const apiData = useAPIStore((state) => state.data);
  const setData = useAPIStore((state) => state.setData);
  const { close: closePrompt } = useBottomSheet();

  const generateTrip = async () => {
    if (prompt === '') {
      toast.show("Please add a text prompt");
      return;
    }
    try {
      const url = "https://gauravghati.github.io/apis/restaurent.json";
      const response = await fetch(url);
      const jsondata = await response.json();
      setData(jsondata);
      router.push({ pathname: '/trip' });
    } catch (error) {
      console.error(error);
    }
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
          {/* <Pressable
            className="flex items-center justify-center px-4 py-3 rounded-full bg-sageish w-48"
            onPress={generateTrip}
          >
            <Text className="font-rethink text-2xl color-white">
              Generate!
            </Text>
          </Pressable> */}
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
