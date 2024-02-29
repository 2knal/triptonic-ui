import React, { useState } from "react";
import Textarea from "../components/utils/textarea";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';

const reqBody = {
  'neighborhood': 'USC',
  'city': 'Los Angeles',
  'category': 'Burger'
}

export default function Prompt() {
  const [text, setText] = useState("");
  const { close: closePrompt } = useBottomSheet();

  async function fetchtheAPI() {
    try {
      var options = {
        method : 'POST',
        headers : { 
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            "neighborhood" : reqBody.neighborhood,
            "city" : reqBody.city,
            "category": reqBody.category
        })
      }

      // const url = "https://gauravghati.github.io/apis/restaurent.json";
      const url = "http://localhost:3000/maps/restaurents"
      const response = await fetch(url, options);
      const jsondata = await response.json();
      await AsyncStorage.setItem('GENERATED_TEXT', JSON.stringify(jsondata));
      router.push({ pathname: "/trip" });
    } catch (error) {
      console.error(error);
    }
  }
  
  const generateTrip = () => {
    fetchtheAPI();
  }

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
