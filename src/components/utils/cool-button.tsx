import React, { useState } from 'react';
import { Text, Pressable } from 'react-native';

interface ICoolButtonProps {
  onPress: () => void;
  buttonCss?: string;
  textCss?: string;
  text: string;
}

export default function CoolButton(props: ICoolButtonProps) {
  const { onPress, buttonCss, textCss, text } = props;
  const [isClicked, setIsClicked] = useState(false);
  const buttonColorOpacity = isClicked ? '/[0.8]' : '';

  return (
    <Pressable
      onPressIn={() => setIsClicked(true)}
      onPressOut={() => setIsClicked(false)}
      className={"flex items-center justify-center px-4 py-3 rounded-full " + buttonCss + buttonColorOpacity}
      onPress={onPress}
    >
      <Text className={"font-rethink text-2xl " + textCss}>
        {text}
      </Text>
    </Pressable>
  );
}

