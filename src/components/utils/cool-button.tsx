import React, { useState } from 'react';
import { Text, Pressable, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ICoolButtonProps {
  onPress: () => void;
  buttonCss?: string;
  textCss?: string;
  text: string;
}

export default function CoolButton(props: ICoolButtonProps) {
  const { onPress, buttonCss, textCss, text } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View className={"flex items-center justify-center px-4 py-3 rounded-full " + buttonCss}>
          <Text className={"font-rethink text-2xl " + textCss}>
            {text}
          </Text>
      </View>
    </TouchableOpacity>
  );
}
