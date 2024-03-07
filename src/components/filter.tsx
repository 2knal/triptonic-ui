import React, { useEffect, useState } from "react";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";

import CoolButton from "@/components/utils/cool-button";
import Pill from "@/components/utils/pill";
import Heading from "@/components/utils/heading";
import CoolText from "@/components/utils/cool-text";

export default function Filter() {
  const { close: closePrompt } = useBottomSheet();

  const allCuisine = [
    "🍕Italian",
    "🍛Indian",
    "🍜Japanese",
    "🌮Mexican",
    "🍟French",
    "🍖Chinese",
    "🍙Korean",
  ];
  const allPlaces = ["🎢 Park", "🦖 Museums", "🕺🏻Clubs"];
  const [cuisineList, setCuisineList] = useState([]);
  const [placesList, setPlacesList] = useState([]);
  const [distance, setDistance] = useState(0);
  const [age, setAge] = useState(0);
  const [toggle, setToggle] = useState(0);

  const onCuisineBtnPress = (cuisine: string) => {
    if (cuisineList.includes(cuisine)) {
      const index = cuisineList.indexOf(cuisine);
      cuisineList.splice(index, 1);
    } else {
      cuisineList.push(cuisine);
      setCuisineList(cuisineList);
    }
    setToggle(toggle + 1);
  };

  const onPlacesBtnPress = (place: string) => {
    if (placesList.includes(place)) {
      const index = placesList.indexOf(place);
      placesList.splice(index, 1);
    } else {
      placesList.push(place);
      setCuisineList(placesList);
    }
    setToggle(toggle + 1);
  };

  const onChangeDist = (dist: number) => {
    setDistance(dist);
  };

  const onChangeAge = (tempAge: number) => {
    setDistance(tempAge);
  };

  useEffect(() => {
    setPlacesList(placesList);
    setCuisineList(cuisineList);
    setDistance(distance);
    setAge(age);
  }, [distance, age, toggle]);

  return (
    <View className="flex-1 color-black-12 p-5">
      <View className="items-center">
        <Heading title="Applied Filters" css="text-2xl mb-4" />
      </View>

      <CoolText title="Cuisine" css="p-1 text-xl" />
      <View className="flex-row items-center justify-around flex-wrap">
        {allCuisine.map((cuisine, i) => {
          return (
            <Pill
              key={i}
              title={cuisine}
              list={cuisineList}
              onPress={() => onCuisineBtnPress(cuisine)}
            />
          );
        })}
      </View>

      <View className="flex-row justify-between">
        <CoolText title="Distance" css="p-1 text-xl" />
        <Text className="font-rethink right-2 p-1 text-lg tracking-widest">
          {distance}
        </Text>
      </View>
      <Slider
        className="flex-1"
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#EC988D"
        maximumTrackTintColor="grey"
        onValueChange={(dist) => setDistance(Math.round(dist))}
      />

      <View className="flex-row justify-between">
        <Text className="font-rethink text-lg p-1 tracking-widest">Age</Text>
        <Text className="font-rethink right-2 p-1 text-lg tracking-widest">
          {age}
        </Text>
      </View>
      <Slider
        className="flex-1"
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="#EC988D"
        maximumTrackTintColor="grey"
        onValueChange={(age) => setAge(Math.round(age))}
      />

      <Text className="font-rethink text-lg p-1 tracking-widest">
        Places to visit
      </Text>
      <View className="flex-row items-center justify-around flex-wrap">
        {allPlaces.map((place, i) => {
          return (
            <Pill
              key={i}
              title={place}
              list={placesList}
              onPress={() => onPlacesBtnPress(place)}
            />
          );
        })}
      </View>

      <View className="absolute gap-20 bottom-36 flex-row self-center">
        <CoolButton
          onPress={closePrompt}
          buttonCss="bg-bluei w-40"
          textCss="color-egg-white"
          text={"Cancel"}
        />
        <CoolButton
          onPress={() => {}}
          buttonCss="bg-sageish w-40"
          textCss="color-egg-white"
          text={"Apply"}
        />
      </View>
    </View>
  );
}
