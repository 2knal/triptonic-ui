import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface INavButtonProps {
  direction: string;
  nextPath?: string;
}

export default function NavButton({ direction, nextPath }: INavButtonProps) {
  const router = useRouter();
  const iconName: any = 'arrow-' + direction;

  const handleBtnPress = () => {
    if (direction === 'left') {
      router.back();
    } else {
      router.push({ pathname: nextPath });
    }
  }

  return (
    <TouchableOpacity onPress={handleBtnPress}>
      <View className="w-14 h-14 rounded-full text-center flex justify-center items-center font-thin bg-reddish">
        <FontAwesome name={iconName} color={'white'} size={24} />
      </View>
    </TouchableOpacity>
  );
};
