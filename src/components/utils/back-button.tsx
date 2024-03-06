import React, { useState } from 'react';
import { Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';

const BackButton = ({ title }) => {
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
        style={[styles.button, { backgroundColor: buttonColor }]}>
        <Text style={styles.text}>{'\u2190'}</Text>
      </TouchableOpacity>
    );
  };

const styles = StyleSheet.create({
  button: {
  position: 'absolute',
  top: 20,
  left: 20,
  width: 50,
  height: 50, 
  borderRadius: 34, 
  backgroundColor: '#EC988D',
  justifyContent: 'space-evenly', 
  alignItems: 'center',
  },
  text: {
    fontSize: 32,
    lineHeight: 30,
    color: 'white',
  },
});

export default BackButton;