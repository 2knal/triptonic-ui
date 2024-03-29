import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Textarea from "@/components/utils/textarea";
import CoolButton from "@/components/utils/cool-button";
import { TRIP } from "assets/constants";

const reqBody = {
  neighborhood: "USC",
  city: "Los Angeles",
  category: "Burger",
};

export default function Prompt() {
  const [text, setText] = useState("");
  const { close: closePrompt } = useBottomSheet();

  const generateTrip = async () => {
    try {
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: text
        }),
      };

      const url = "https://21c2-2600-8802-2601-7c0-4518-d8eb-ad47-9ffa.ngrok-free.app/prompt"
      const response = await fetch(url, options);

      // const url = "https://gauravghati.github.io/apis/restaurent.json";
      // const response = await fetch(url);
      const jsondata = await response.json();
      await AsyncStorage.clear();
      await AsyncStorage.flushGetRequests();
      await AsyncStorage.setItem(TRIP.DETAILS, JSON.stringify(jsondata));
      router.push({ pathname: "/trip" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Textarea
        placeholder="Enter Trip prompt..."
        text={text}
        onChangeText={(t: string) => setText(t)}
      />
      <View style={styles.row}>
        <CoolButton
          onPress={closePrompt}
          buttonCss="bg-bluei w-48"
          textCss="color-egg-white"
          text={"Cancel"}
        />
        <Link href="/trip" asChild>
          <Pressable
            className="flex items-center justify-center px-4 py-3 rounded-full bg-sageish w-48"
            onPress={generateTrip}
          >
            <Text className="font-rethink text-2xl color-egg-white">
              Generate!
            </Text>
          </Pressable>
        </Link>
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
