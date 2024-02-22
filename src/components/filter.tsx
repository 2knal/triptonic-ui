import React, { useEffect, useState } from 'react';
import { useBottomSheet } from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import Button from './utils/button';
import { Text } from 'react-native';
import SmallBtn from './utils/smallBtn';
import Slider from '@react-native-community/slider';

export default function Filter() {
    const { close: closePrompt } = useBottomSheet();

    const [cuisineMap, setCuisineMap] = useState({'🍕Italian': false, '🍛Indian': false, '🍜Japanese':false, '🌮Mexican':false, '🍟French':false, '🍖Chinese':false, '🍙Korean':false});
    const [placesMap, setPlacesMap] = useState({'🎢 Park': false, '🦖 Museums': false, '🕺🏻Clubs': false});
    const [distance, setDistance] = useState(0);
    const [age, setAge] = useState(0);

    const onCuisineBtnPress = (cuisine: string) => {
      cuisineMap[cuisine] = true;
      setCuisineMap(cuisineMap);
    }

    const onPlacesBtnPress = (place: string) => {
      placesMap[place] = true;
      setPlacesMap(placesMap);
    }

    const onChangeDist = (dist: number) => {
      
    }

    const onChangeAge = (age: number) => {

    }

    return(
        <View className='flex-1 color-black-12 p-5'>
            <View className='items-center'>
              <Text className='font-bricolage text-2xl'>Applied Filters</Text>
            </View>

            <Text className='font-rethink text-lg p-1 tracking-widest'>Cuisine</Text>
            <View className='flex-row items-center justify-around flex-wrap'>
                {
                  Object.keys(cuisineMap).map((cuisine, i) => {
                    console.log(cuisine, cuisineMap[cuisine]);
                    return <SmallBtn key={i} title={cuisine} selected={cuisineMap[cuisine]} onPress={() => onCuisineBtnPress(cuisine)}/> 
                  })
                }
            </View>

            <Text className='font-rethink text-lg p-1 tracking-widest'>Distance</Text>
            <Slider
              className='flex-1'
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#EC988D"
              maximumTrackTintColor="grey"
            />

            <Text className='font-rethink text-lg p-1 tracking-widest'>Age</Text>
            <Slider
              className='flex-1'
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#EC988D"
              maximumTrackTintColor="grey"
            />

            <Text className='font-rethink text-lg p-1 tracking-widest'>Places to visit</Text>
            <View className='flex-row items-center justify-around flex-wrap'>
                {
                  Object.keys(placesMap).map((place, i) => {
                    console.log(place, placesMap[place]);
                    return <SmallBtn key={i} title={place} selected={placesMap[place]} onPress={() => onPlacesBtnPress(place)}/> 
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
