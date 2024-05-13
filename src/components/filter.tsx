import React, { useEffect, useState } from "react";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { View, Text, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";

import CoolButton from "@/components/utils/cool-button";
import Pill from "@/components/utils/pill";
import Heading from "@/components/utils/heading";
import CoolText from "@/components/utils/cool-text";
import { COLORS } from "assets/constants";

export default function Filter() {
  const { close: closePrompt } = useBottomSheet();

  const allCuisine = [
    "Italian",
    "Indian",
    "Japanese",
    "Mexican",
    "French",
    "Chinese",
    "Korean",
    "Thai",
    "Greek"
  ];
  
  const allPlaces = ["Park", "Museums", "Clubs"];
  const allTripTypes = ["Family", "Friends", "Couple"];
  const modeOfTransport = ["Car", "Train", "Bus", "Plane"];
  const [cuisineList, setCuisineList] = useState([]);
  const [placesList, setPlacesList] = useState([]);
  const [tripTypeList, setTripTypeList] = useState([]);
  const [transportList, setTransportList] = useState([]);
  const [days, setDays] = useState(0);
  const [people, setPeople] = useState(0);
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

  const onTripTypeBtnPress = (tripType: string) => {
    if (tripTypeList.includes(tripType)) {
      const index = tripTypeList.indexOf(tripType);
      tripTypeList.splice(index, 1);
    } else {
      tripTypeList.push(tripType);
      setCuisineList(tripTypeList);
    }
    setToggle(toggle + 1);
  };

  const onTransportBtnPress = (transport: string) => {
    if (transportList.includes(transport)) {
      const index = transportList.indexOf(transport);
      transportList.splice(index, 1);
    } else {
      transportList.push(transport);
      setCuisineList(transportList);
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

  useEffect(() => {
    setPlacesList(placesList);
    setCuisineList(cuisineList);
    setDays(days);
    setPeople(people);
  }, [days, people, toggle]);

  return (
    <ScrollView className="flex flex-1 p-5" nestedScrollEnabled={true}>
      <Heading title="Applied Filters" css="text-2xl pb-6" />

      <View className="flex-row justify-between">
        <CoolText title="Number of days" css="text-xl pb-2" />
        <CoolText title={days} />
      </View>
      <View className="flex pb-4">
        <Slider
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={COLORS['reddish']}
          thumbTintColor={COLORS['sageish']}
          maximumTrackTintColor="grey"
          onValueChange={(value) => setDays(Math.round(value))}
        />
      </View>

      <View className="flex-row justify-between">
        <CoolText title="Number of People" css="text-xl pb-2" />
        <CoolText title={people} />
      </View>
      <View className="flex pb-4">
        <Slider
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={COLORS['reddish']}
          thumbTintColor={COLORS['sageish']}
          maximumTrackTintColor="grey"
          onValueChange={(value) => setPeople(Math.round(value))}
        />
      </View>

      <CoolText title="Tourist Attractions" css="text-xl pb-2" />
      <View className="flex-row items-center justify-around flex-wrap pb-4">
        {allPlaces.map((value, i) => {
          return (
            <Pill
              key={i}
              title={value}
              list={placesList}
              onPress={() => onPlacesBtnPress(value)}
            />
          );
        })}
      </View>

      <CoolText title="Trip Type" css="text-xl pb-2" />
      <View className="flex-row items-center justify-around flex-wrap pb-4">
        {allTripTypes.map((value, i) => {
          return (
            <Pill
              key={i}
              title={value}
              list={tripTypeList}
              onPress={() => onTripTypeBtnPress(value)}
            />
          );
        })}
      </View>

      <CoolText title="Mode of Transport" css="text-xl pb-2" />
      <View className="flex-row items-center justify-around flex-wrap pb-4">
        {modeOfTransport.map((value, i) => {
          return (
            <Pill
              key={i}
              title={value}
              list={transportList}
              onPress={() => onTransportBtnPress(value)}
            />
          );
        })}
      </View>

      <CoolText title="Cuisine" css="text-xl pb-2" />
      <View className="flex-row justify-around flex-wrap pb-8">
        {allCuisine.map((value, i) => {
          return (
            <Pill
              key={i}
              title={value}
              list={cuisineList}
              onPress={() => onCuisineBtnPress(value)}
            />
          );
        })}
      </View>

      <View className="gap-20 flex-row self-center pb-24">
        <CoolButton
          onPress={closePrompt}
          buttonCss="bg-bluei w-40"
          textCss="color-white"
          text={"Cancel"}
        />
        <CoolButton
          onPress={() => {}}
          buttonCss="bg-sageish w-40"
          textCss="color-white"
          text={"Apply"}
        />
      </View>
    </ScrollView>
  );
}
