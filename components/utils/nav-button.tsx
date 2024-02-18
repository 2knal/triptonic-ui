import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface INavButtonProps {
  onPress: any;
  color?: string;
  textColor?: string;
  title: string;
}

export default function NavButton(props: INavButtonProps) {
  const { onPress, title, color = styles.button.backgroundColor, textColor = styles.text.color } = props;
  return (
    <Pressable style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    elevation: 3,
    backgroundColor: 'white',
    width: 32,
    height: 32,
    textAlign: 'center'
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
