import React, { useEffect, useState } from 'react';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import Button from './utils/button';
import { Text } from 'react-native';
import SmallBtn from './utils/smallBtn';
import Slider from '@react-native-community/slider';

export default function Filter() {
    const { close: closePrompt } = useBottomSheet();

    const allCuisine = ['🍕Italian', '🍛Indian', '🍜Japanese', '🌮Mexican', '🍟French', '🍖Chinese', '🍙Korean'];
    const allPlaces = ['🎢 Park', '🦖 Museums', '🕺🏻Clubs'];
    const [cuisineList, setCuisineList] = useState([]);
    const [placesList, setPlacesList] = useState([]);
    const [distance, setDistance] = useState(0);
    const [age, setAge] = useState(0);
    const [toggle, setToggle] = useState(0);

    const onCuisineBtnPress = (cuisine: string) => {
      if (cuisineList.includes(cuisine)) {
        const index = cuisineList.indexOf(cuisine);
        cuisineList.splice(index, 1);
      }
      else {
        cuisineList.push(cuisine);
        setCuisineList(cuisineList);
      }
      setToggle(toggle + 1)
    }

    const onPlacesBtnPress = (place: string) => {
      if (placesList.includes(place)) {
        const index = placesList.indexOf(place);
        placesList.splice(index, 1);
      }
      else {
        placesList.push(place);
        setCuisineList(placesList);
      }
      setToggle(toggle + 1)
    }

    const onChangeDist = (dist: number) => {
      setDistance(dist);
    }

    const onChangeAge = (tempAge: number) => {
      setDistance(tempAge);
    }

    useEffect(() => {
      setPlacesList(placesList);
      setCuisineList(cuisineList);
      setDistance(distance);
      setAge(age);
    }, [distance, age, toggle])

    return(
        <View className='flex-1 color-black-12 p-5'>
            <View className='items-center'>
              <Text className='font-bricolage text-2xl'>Applied Filters</Text>
            </View>

            <Text className='font-rethink text-lg p-1 tracking-widest'>Cuisine</Text>
            <View className='flex-row items-center justify-around flex-wrap'>
                {
                  allCuisine.map((cuisine, i) => {
                    return <SmallBtn key={i} title={cuisine} list={cuisineList} onPress={() => onCuisineBtnPress(cuisine)}/> 
                  })
                }
            </View>

            <View className='flex-row justify-between'>
              <Text className='font-rethink text-lg p-1 tracking-widest'>Distance (miles)</Text>
              <Text className='font-rethink right-2 p-1 text-lg tracking-widest'>{distance}</Text>
            </View>
            <Slider
              className='flex-1'
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#EC988D"
              maximumTrackTintColor="grey"
              onValueChange={(dist) => setDistance(Math.round(dist))}
            />

            <View className='flex-row justify-between'>
              <Text className='font-rethink text-lg p-1 tracking-widest'>Age</Text>
              <Text className='font-rethink right-2 p-1 text-lg tracking-widest'>{age}</Text>
            </View>
            <Slider
              className='flex-1'
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#EC988D"
              maximumTrackTintColor="grey"
              onValueChange={(age) => setAge(Math.round(age))}
            />

            <Text className='font-rethink text-lg p-1 tracking-widest'>Places to visit</Text>
            <View className='flex-row items-center justify-around flex-wrap'>
                {
                  allPlaces.map((place, i) => {
                    return <SmallBtn key={i} title={place} list={placesList} onPress={() => onPlacesBtnPress(place)}/> 
                  })
                }
            </View>

            <View className='absolute gap-5 bottom-20 flex-row self-center'>
            <Button
            textColor='#B6B6B6'
            title="Cancel"
            color='#EDD5D1'
            onPress={() => closePrompt()}/>
            <Button 
                title="Apply"
                color='#EC988D'
                onPress={() => {}}/>
            </View>
        </View>
    );
}
