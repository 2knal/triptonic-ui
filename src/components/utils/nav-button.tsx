import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface INavButtonProps {
  direction: string;
  nextPath?: string;
}

export default function NavButton({ direction, nextPath }: INavButtonProps) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);
  const buttonColorOpacity = isClicked ? '/[0.8]' : '';
  const iconName: any = 'arrow-' + direction;

  const handleBtnPress = () => {
    if (direction === 'left') {
      router.back();
    } else {
      router.push({ pathname: nextPath });
    }
  }

  return (
    <Pressable
      onPressIn={() => setIsClicked(true)}
      onPressOut={() => setIsClicked(false)}
      onPress={handleBtnPress}
      className={"w-14 h-14 rounded-full text-center flex justify-center items-center font-thin bg-reddish" + buttonColorOpacity}>
      <FontAwesome name={iconName} color={'white'} size={24} />
    </Pressable>
  );
};
