import React, { useEffect, useState } from "react";
import { useBottomSheet } from "@gorhom/bottom-sheet";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";

import CoolButton from "@/components/utils/cool-button";
import Pill from "@/components/utils/pill";
import Heading from "@/components/utils/heading";
import CoolText from "@/components/utils/cool-text";
import { COLORS } from "assets/constants";
import { useAPIStore } from "@/store";
import { capitalizeFirstLetter, IPromptParams } from "@/utils";
import { router } from "expo-router";

export default function Filter() {
  const params = useAPIStore((state) => state.params);
  console.log('FILTER received', params);
  const { close: closePrompt } = useBottomSheet();

  const allCuisine = [
    "italian",
    "indian",
    "japanese",
    "mexican",
    "french",
    "chinese",
    "korean",
    "thai",
    "greek"
  ];
  const allPlaces = ["park", "museums", "clubs"];
  const allTripTypes = ["family", "friends", "couple"];
  const modeOfTransport = ["car", "train", "bus", "plane"];
  const [cuisineList, setCuisineList] = useState(params?.cuisine ? params.cuisine.split('|') : []);
  const [placesList, setPlacesList] = useState(params?.attractions ? params.attractions.split('|') : []);
  const [tripTypeList, setTripTypeList] = useState(params?.type_of_trip ? params.type_of_trip.split('|') : ['friends']);
  const [transportList, setTransportList] = useState(params?.mode_of_transport ? params.mode_of_transport.split('|') : ['car']);
  const [days, setDays] = useState(+params.duration);
  const [people, setPeople] = useState(+params.no_of_people);
  const [distance, setDistance] = useState(+params.distance);
  const budgetValues = ['low', 'medium', 'high'];

  const getPillBtnStyle = (value) => {
    return value === budget ? styles.selected: styles.nothing;
  };

  const getPillTextStyle = (value) => {
    return value === budget ? { color: 'white' }: styles.nothing;
  };

  const [budget, setBudget] = useState(params.budget);

  const onCuisineBtnPress = (cuisine: string) => {
    if (cuisineList.includes(cuisine)) {
      setCuisineList(prev => prev.filter(p => p !== cuisine));
    } else if (cuisine !== '') {
      setCuisineList(prev => [...prev, cuisine])
    }
    console.log(cuisine, cuisineList);
  };

  const onTripTypeBtnPress = (tripType: string) => {
    if (tripTypeList.includes(tripType)) {
      setTripTypeList(prev => prev.filter(p => p !== tripType));
    } else if (tripType !== '') {
      setTripTypeList(prev => [...prev, tripType])
    }
  };

  const onTransportBtnPress = (transport: string) => {
    console.log(transport, transportList);
    if (transportList.includes(transport)) {
      const index = transportList.indexOf(transport);
      transportList.splice(index, 1);
    } else if (transport !== '') {
      setTransportList([ ...transportList, transport ]);
    }
  };

  const onPlacesBtnPress = (place: string) => {
    if (placesList.includes(place)) {
      const index = placesList.indexOf(place);
      placesList.splice(index, 1);
    } else if (place !== '') {
      setPlacesList([ ...placesList, place ]);
    }
  };

  const handleFilterApply = () => {
    const sendParams: IPromptParams = {
      location: params.location,
      duration: days,
      cuisine: cuisineList.join('|'),
      mode_of_transport: transportList.join('|'),
      type_of_trip: tripTypeList.join('|'),
      no_of_people: people,
      attractions: placesList.join('|'),
    }
    router.push({ pathname: '/trip' , params: { ...sendParams }});
  };

  return (
    <ScrollView className="flex flex-1 p-6" nestedScrollEnabled={true}>
      <View className="items-center">
        <Heading title="Applied Filters" css="text-2xl pb-6" />
      </View>

      <View className="flex-row justify-between">
        <CoolText title="Number of days" css="text-xl pb-2" />
        <CoolText title={days} />
      </View>
      <View className="flex pb-4">
        <Slider
          value={days}
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
          value={people}
          minimumValue={0}
          maximumValue={20}
          minimumTrackTintColor={COLORS['reddish']}
          thumbTintColor={COLORS['sageish']}
          maximumTrackTintColor="grey"
          onValueChange={(value) => setPeople(Math.round(value))}
        />
      </View>

      <View className="flex-row justify-between">
        <CoolText title="Preferred distance of travel (miles)" css="text-xl pb-2" />
        <CoolText title={distance} />
      </View>
      <View className="flex pb-4">
        <Slider
          value={distance}
          minimumValue={0}
          maximumValue={500}
          minimumTrackTintColor={COLORS['reddish']}
          thumbTintColor={COLORS['sageish']}
          maximumTrackTintColor="grey"
          onValueChange={(value) => setDistance(Math.round(value))}
        />
      </View>

      <CoolText title="Budget" css="text-xl pb-2" />
      <View className="flex-row justify-around flex-wrap pb-8">
        {budgetValues.map((value) => (
          <TouchableOpacity
            key={value}
            style={[styles.button, getPillBtnStyle(value)]}
            className="w-32 flex items-center justify-center px-4 py-3 border-reddish"
            onPress={() => setBudget(value)}
          >
            <Text style={[styles.text, getPillTextStyle(value)]}>
              {capitalizeFirstLetter(value)}
            </Text>
          </TouchableOpacity>
        ))}
     </View>

      <CoolText title="Cuisine" css="text-xl pb-2" />
      <View className="flex-row justify-around flex-wrap pb-8">
        {allCuisine.map((value, i) => {
          return (
            <Pill
              key={i}
              title={capitalizeFirstLetter(value)}
              list={cuisineList}
              onPress={() => onCuisineBtnPress(value)}
            />
          );
        })}
      </View>

      <CoolText title="Tourist Attractions" css="text-xl pb-2" />
      <View className="flex-row items-center justify-around flex-wrap pb-4">
        {allPlaces.map((value, i) => {
          return (
            <Pill
              key={i}
              title={capitalizeFirstLetter(value)}
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
              title={capitalizeFirstLetter(value)}
              list={tripTypeList}
              onPress={() => onTripTypeBtnPress(value)}
            />
          );
        })}
      </View>

      <CoolText title="Mode of Transport" css="text-xl pb-2" />
      <View className="flex-row items-center justify-around flex-wrap pb-8">
        {modeOfTransport.map((value, i) => {
          return (
            <Pill
              key={i}
              title={capitalizeFirstLetter(value)}
              list={transportList}
              onPress={() => onTransportBtnPress(value)}
            />
          );
        })}
      </View>

      <View className="w-80 self-center flex flex-row justify-between items-center pb-24">
        <CoolButton
          onPress={closePrompt}
          buttonCss="w-36 bg-bluei"
          textCss="text-xl color-white"
          text={"Cancel"}
        />
        <CoolButton
          onPress={handleFilterApply}
          buttonCss="w-36 bg-sageish"
          textCss="text-xl color-white"
          text={"Apply"}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'baseline',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 40,
    backgroundColor: 'white',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS['reddish'],
  },
  nothing: {},
  selected: {
    backgroundColor: COLORS['reddish']
  },
  text: {
    fontSize: 14,
    lineHeight: 15,
    color: COLORS['reddish'],
    fontFamily: 'rethink'
  },
});
