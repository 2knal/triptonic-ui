import Login from '@/app/login';
import React, { useState } from 'react';
import { Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

const ForwardButton = ({ title, onPress }) => {
    const [isClicked, setIsClicked] = useState(false);
  
    const handlePressIn = () => {
      setIsClicked(true);
    };
  
    const handlePressOut = () => {
      setIsClicked(false);
    };
  
    const buttonColor = isClicked ? '#EC988D' : '#FFC8B8'; 
  
    return (
      <TouchableOpacity
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={[styles.button, { backgroundColor: buttonColor }]}>
        <Text style={styles.text}>{'\u2192'}</Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  button: {
  position: 'absolute',
  bottom: 20,
  right: 20,
  width: 50,
  height: 50, 
  borderRadius: 45, 
  backgroundColor: '#EC988D',
  justifyContent: 'center', 
  alignItems: 'center',
  },
  text: {
    fontSize: 30,
    lineHeight: 30,
    color: 'white',
    alignContent: 'center'
  },
});
export default ForwardButton;
