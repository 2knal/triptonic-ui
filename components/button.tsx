import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface IButtonProps {
  onPress: any;
  color?: string;
  title: string;
}

export default function Button(props: IButtonProps) {
  const { onPress, title, color = styles.button.backgroundColor } = props;
  return (
    <Pressable style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 40,
    elevation: 3,
    backgroundColor: 'black',
    width: 160,
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
