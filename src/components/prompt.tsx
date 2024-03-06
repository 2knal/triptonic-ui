import React, { useState } from "react";
import Textarea from "../components/utils/textarea";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoolButton from "@/components/utils/cool-button";

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
      // var options = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     neighborhood: reqBody.neighborhood,
      //     city: reqBody.city,
      //     category: reqBody.category,
      //   }),
      // };

      // const url = "http://localhost:3000/maps/restaurents"
      // const response = await fetch(url, options);

      const url = "https://gauravghati.github.io/apis/restaurent.json";
      const response = await fetch(url);
      const jsondata = await response.json();
      await AsyncStorage.setItem("GENERATED_TEXT", JSON.stringify(jsondata));
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
