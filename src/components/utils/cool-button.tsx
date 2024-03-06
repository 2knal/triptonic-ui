import React from 'react';
import { Text, Pressable } from 'react-native';

interface ICoolButtonProps {
  onPress: () => void;
  buttonCss?: string;
  textCss?: string;
  text: string;
}

export default function CoolButton(props: ICoolButtonProps) {
  const { onPress, buttonCss, textCss, text } = props;
  return (
    <Pressable
      className={"flex items-center justify-center px-4 py-3 rounded-full " + buttonCss}
      onPress={onPress}
    >
      <Text className={"font-rethink text-2xl " + textCss}>
        {text}
      </Text>
    </Pressable>
  );
}

