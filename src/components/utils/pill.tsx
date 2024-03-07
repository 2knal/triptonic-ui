import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface IButtonProps {
  onPress: any;
  title: string;  
  list: any[];
}

export default function Pill(props: IButtonProps) {
  const {onPress, title, list} = props;

  const selected = list.includes(title);
  const extStyle = selected ? styles.selected: styles.nothing;
  const extText = selected ? {color: 'white'}: styles.nothing;

  return (
    <Pressable style={[styles.button, extStyle]} onPress={onPress}>
      <Text style={[styles.text, extText]}>{title}</Text>
    </Pressable>
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
    elevation: 3,
    backgroundColor: 'white',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#EC988D'
  },
  nothing: {},
  selected: {
    backgroundColor: '#EC988D'
  },
  text: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#EC988D'
  },
});
