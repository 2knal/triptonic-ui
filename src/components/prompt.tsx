import React, { useState } from "react";
import Textarea from "../components/utils/textarea";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Button from "./utils/button";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { router } from "expo-router";

export default function Prompt() {
  const [text, setText] = useState("");
  const { close: closePrompt } = useBottomSheet();

  const generateTrip = async () => {
    try {
      const response = await fetch(
        "https://7542-68-101-122-32.ngrok-free.app/maps/restaurants"
      );
      // const response = await fetch(
      //   "https://7542-68-101-122-32.ngrok-free.app/maps/textsearch",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ text }),
      //   }
      // );

      const data = await response.json();
      console.log(data);

      router.push({ pathname: "/trip", params: { data: data.results } });
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
        <Pressable
          className="bg-powder-gold w-48 flex items-center justify-center px-4 py-4 rounded-3xl"
          onPress={() => closePrompt()}
        >
          <Text className="font-rethink text-2xl color-egg-white">Cancel</Text>
        </Pressable>
        <Link href="/trip" asChild>
          <Pressable
            className="bg-mintish  w-48 flex items-center justify-center px-4 py-4 rounded-3xl"
            onPress={generateTrip}
          >
            <Text className="font-rethink text-2xl color-dark-text">
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
